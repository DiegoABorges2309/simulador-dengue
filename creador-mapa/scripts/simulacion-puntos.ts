import { Map, LatLngLiteral } from "leaflet";
import { Puntos, EstadoPunto } from "./puntos";
import { MAPA } from "./variables-configuracion";
import { FeatureCollection } from "geojson";
import { CoordenadasAleatorias } from "./coordenadas-aleatorias";

export interface ConteoDia {
  susceptibles?: number;
  infectados?: number;
  recuperados?: number;
  expuestos?: number;
  muertos?: number;
  [estado: string]: number | undefined;
}

export { EstadoPunto } from "./puntos";

export class SimulacionDePuntos {
  public geoJsonMapa: FeatureCollection;
  public mapa: Map;
  public puntos: Puntos[] = [];
  public maxVisualPoints: number;
  public visualCount: number = 0;
  public totalRealPoblacion: number = 0;
  public estadoColores: { [estado: number]: string };

  private coordenadasAleatorias = new CoordenadasAleatorias();

  constructor(
    geoJsonMapa: FeatureCollection,
    mapa: Map = MAPA.MAPAPUNTOFIJO,
    maxVisualPoints = 3000,
  ) {
    this.geoJsonMapa = geoJsonMapa;
    this.mapa = mapa;
    this.maxVisualPoints = Math.max(1, maxVisualPoints);
    this.estadoColores = {
      [EstadoPunto.Susceptible]: Puntos.colores[EstadoPunto.Susceptible],
      [EstadoPunto.Expuesto]: Puntos.colores[EstadoPunto.Expuesto],
      [EstadoPunto.Infectado]: Puntos.colores[EstadoPunto.Infectado],
      [EstadoPunto.Recuperado]: Puntos.colores[EstadoPunto.Recuperado],
      [EstadoPunto.Muerto]: Puntos.colores[EstadoPunto.Muerto],
      [EstadoPunto.Oculto]: Puntos.colores[EstadoPunto.Oculto],
    };
  }

  public crearPuntos(totalReal: number, distribucionInicial: ConteoDia) {
    this.totalRealPoblacion = Math.max(0, totalReal);
    const cantidadPuntos = Math.min(this.maxVisualPoints, this.totalRealPoblacion);
    this.visualCount = cantidadPuntos;

    const coordenadas = this.coordenadasAleatorias.generarCoordenadas(
      this.geoJsonMapa,
      cantidadPuntos,
    );

    this.puntos = coordenadas.map((coords) => {
      const [lat, lng] = coords;
      return new Puntos({ lat, lng }, EstadoPunto.Susceptible, 1);
    });

    this.dibujarPuntos();
    this.actualizarDia(distribucionInicial);
  }

  public actualizarDia(datos: ConteoDia) {
    this.totalRealPoblacion = this.calcularTotalReal(datos);
    this.visualCount = Math.min(
      this.maxVisualPoints,
      this.totalRealPoblacion,
      this.puntos.length,
    );

    const distribucionVisual = this.calcularDistribucionVisual(
      datos,
      this.visualCount,
    );
    const pesosPorEstado = this.calcularPesoPorPunto(datos, distribucionVisual);

    this.asignarEstados(distribucionVisual, pesosPorEstado);
  }

  public actualizarColores(estadoColores: Partial<Record<EstadoPunto, string>>) {
    Object.assign(this.estadoColores, estadoColores);
    this.puntos.forEach((punto) => {
      const estado = punto.getEstado();
      const color = this.estadoColores[estado] ?? Puntos.colores[estado];
      punto.setStyle({
        color,
        fillColor: color,
      });
    });
  }

  private calcularTotalReal(datos: ConteoDia) {
    const valores = [
      datos.susceptibles ?? 0,
      datos.expuestos ?? 0,
      datos.infectados ?? 0,
      datos.recuperados ?? 0,
      datos.muertos ?? 0,
    ];
    return Math.max(0, valores.reduce((suma, valor) => suma + Math.max(0, valor), 0));
  }

  private obtenerConteoReal(datos: ConteoDia): Record<EstadoPunto, number> {
    return {
      [EstadoPunto.Susceptible]: Math.max(0, datos.susceptibles ?? 0),
      [EstadoPunto.Expuesto]: Math.max(0, datos.expuestos ?? 0),
      [EstadoPunto.Infectado]: Math.max(0, datos.infectados ?? 0),
      [EstadoPunto.Recuperado]: Math.max(0, datos.recuperados ?? 0),
      [EstadoPunto.Muerto]: Math.max(0, datos.muertos ?? 0),
      [EstadoPunto.Oculto]: 0,
    };
  }

  private calcularDistribucionVisual(
    datos: ConteoDia,
    cantidadVisual: number,
  ): Record<EstadoPunto, number> {
    const conteoReal = this.obtenerConteoReal(datos);
    const totalReal = Object.values(conteoReal).reduce(
      (acc, valor) => acc + valor,
      0,
    );

    const distribucionVisual: Record<EstadoPunto, number> = {
      [EstadoPunto.Susceptible]: 0,
      [EstadoPunto.Expuesto]: 0,
      [EstadoPunto.Infectado]: 0,
      [EstadoPunto.Recuperado]: 0,
      [EstadoPunto.Muerto]: 0,
      [EstadoPunto.Oculto]: 0,
    };

    if (cantidadVisual <= 0 || totalReal <= 0) {
      return distribucionVisual;
    }

    const residuos: Array<{ estado: EstadoPunto; residuo: number }> = [];
    let acumulado = 0;

    Object.entries(conteoReal).forEach(([key, valorReal]) => {
      const estado = Number(key) as EstadoPunto;
      if (estado === EstadoPunto.Oculto || valorReal <= 0) {
        distribucionVisual[estado] = 0;
        return;
      }

      const exacto = (valorReal / totalReal) * cantidadVisual;
      const entero = Math.floor(exacto);
      distribucionVisual[estado] = entero;
      residuos.push({ estado, residuo: exacto - entero });
      acumulado += entero;
    });

    let faltantes = cantidadVisual - acumulado;
    residuos.sort((a, b) => b.residuo - a.residuo);
    for (let i = 0; i < faltantes && i < residuos.length; i++) {
      distribucionVisual[residuos[i].estado] += 1;
    }

    return distribucionVisual;
  }

  private calcularPesoPorPunto(
    real: ConteoDia,
    distribucionVisual: Record<EstadoPunto, number>,
  ): Record<EstadoPunto, number> {
    const conteoReal = this.obtenerConteoReal(real);
    const pesos: Record<EstadoPunto, number> = {
      [EstadoPunto.Susceptible]: 0,
      [EstadoPunto.Expuesto]: 0,
      [EstadoPunto.Infectado]: 0,
      [EstadoPunto.Recuperado]: 0,
      [EstadoPunto.Muerto]: 0,
      [EstadoPunto.Oculto]: 0,
    };

    Object.entries(distribucionVisual).forEach(([key, puntosVisibles]) => {
      const estado = Number(key) as EstadoPunto;
      const personasReales = conteoReal[estado] ?? 0;
      pesos[estado] =
        puntosVisibles > 0
          ? personasReales / puntosVisibles
          : 0;
    });

    return pesos;
  }

  private crearSecuenciaEstados(
    distribucionVisual: Record<EstadoPunto, number>,
  ): EstadoPunto[] {
    const ordenEstados = [
      EstadoPunto.Infectado,
      EstadoPunto.Recuperado,
      EstadoPunto.Expuesto,
      EstadoPunto.Susceptible,
    ];
    const resultado: EstadoPunto[] = [];

    ordenEstados.forEach((estado) => {
      const cantidad = distribucionVisual[estado] ?? 0;
      for (let i = 0; i < cantidad; i += 1) {
        resultado.push(estado);
      }
    });

    return resultado.slice(0, this.visualCount);
  }

  private asignarEstados(
    distribucionVisual: Record<EstadoPunto, number>,
    pesosPorEstado: Record<EstadoPunto, number>,
  ) {
    const estados = this.crearSecuenciaEstados(distribucionVisual);
    const totalVisibles = estados.length;

    for (let index = 0; index < this.puntos.length; index += 1) {
      const estado = index < totalVisibles
        ? estados[index]
        : EstadoPunto.Oculto;
      const peso = estado === EstadoPunto.Oculto
        ? 0
        : pesosPorEstado[estado];
      this.puntos[index].setEstado(estado, peso);
    }
  }

  private dibujarPuntos() {
    this.puntos.forEach((punto) => punto.dibujar(this.mapa));
  }
}
