import { EstilosMapa } from "./estilo-mapa";
import { SimulacionDePuntos, ConteoDia, EstadoPunto } from "./simulacion-puntos";
import { MAPA, GEOJSON } from "./variables-configuracion";
import { LimitesGeograficos } from "./limites-geograficos";

declare global {
  interface Window {
    bridge: SimulacionBridge;
    SimulacionControl: SimulacionBridge;
  }
}

export interface SimulacionBridge {
  crearSimulacionPuntosAntAeropuerto(
    datosIniciales: ConteoDia,
    maxVisualPoints?: number,
  ): void;
  actualizarDia(datos: ConteoDia): void;
  centrarMapa(lat: number, lng: number, zoom?: number): void;
  cambiarColores(coloresPorEstado: Record<string, string>): void;
  actualizarEstados(datos: ConteoDia): void;
  visualizarPuntoFijo(): void;
  visualizarAntAeropuerto(): void;
}

export class ConfigMapa {
  private estilosMapa: EstilosMapa = new EstilosMapa();
  private limitesGeograficos: LimitesGeograficos = new LimitesGeograficos();
  public latitud: number = 11.6988;
  public longitud: number = -70.1977;
  public mapaPuntoFijo = MAPA.MAPAPUNTOFIJO;
  public capaInicial = MAPA.CAPA;

  public constructor() {
    this.capaInicial.addTo(this.mapaPuntoFijo);
  }

  public visualizarPuntoFijo() {
    this.mapaPuntoFijo.setView([this.latitud, this.longitud], 12);
  }

  public visualizarAntAeropuerto() {
    this.mapaPuntoFijo.setView([11.719994, -70.191911], 16);
    this.estilosMapa.colorearFueraLimite(GEOJSON.ANTAEROPUERTO);
    this.limitesGeograficos.dibujarLimiteAntAeropuerto();
  }
}

class ControladorSimulacion implements SimulacionBridge {
  private configMapa = new ConfigMapa();
  private simulacionPuntos: SimulacionDePuntos | null = null;

  public crearSimulacionPuntosAntAeropuerto(
    datosIniciales: ConteoDia,
    maxVisualPoints = 3000,
  ) {
    this.configMapa.visualizarAntAeropuerto();
    this.simulacionPuntos = new SimulacionDePuntos(
      GEOJSON.ANTAEROPUERTO,
      this.configMapa.mapaPuntoFijo,
      maxVisualPoints,
    );
    const totalReal = this.calcularTotalReal(datosIniciales);
    this.simulacionPuntos.crearPuntos(totalReal, datosIniciales);
  }

  public actualizarDia(datos: ConteoDia) {
    if (!this.simulacionPuntos) {
      return;
    }
    this.simulacionPuntos.actualizarDia(datos);
  }

  public actualizarEstados(datos: ConteoDia) {
    this.actualizarDia(datos);
  }

  public centrarMapa(lat: number, lng: number, zoom = 14) {
    this.configMapa.mapaPuntoFijo.setView([lat, lng], zoom);
  }

  public cambiarColores(coloresPorEstado: Record<string, string>) {
    if (!this.simulacionPuntos) {
      return;
    }

    const mapeo: Partial<Record<EstadoPunto, string>> = {};
    for (const clave in coloresPorEstado) {
      if (!Object.prototype.hasOwnProperty.call(coloresPorEstado, clave)) {
        continue;
      }

      const color = coloresPorEstado[clave];
      const nombre = clave.toLowerCase().trim();
      switch (nombre) {
        case "susceptible":
          mapeo[EstadoPunto.Susceptible] = color;
          break;
        case "expuesto":
          mapeo[EstadoPunto.Expuesto] = color;
          break;
        case "infectado":
        case "infectados":
          mapeo[EstadoPunto.Infectado] = color;
          break;
        case "recuperado":
        case "recuperados":
          mapeo[EstadoPunto.Recuperado] = color;
          break;
        case "muerto":
        case "muertos":
          mapeo[EstadoPunto.Muerto] = color;
          break;
      }
    }

    this.simulacionPuntos.actualizarColores(mapeo);
  }

  public visualizarPuntoFijo() {
    this.configMapa.visualizarPuntoFijo();
  }

  public visualizarAntAeropuerto() {
    this.configMapa.visualizarAntAeropuerto();
  }

  private calcularTotalReal(datos: ConteoDia) {
    return (
      (datos.susceptibles ?? 0) +
      (datos.expuestos ?? 0) +
      (datos.infectados ?? 0) +
      (datos.recuperados ?? 0) +
      (datos.muertos ?? 0)
    );
  }
}

const inicio = new ControladorSimulacion();
window.bridge = inicio;
window.SimulacionControl = inicio;

