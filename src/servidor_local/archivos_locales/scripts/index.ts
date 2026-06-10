import { EstilosMapa } from "./estilo-mapa";
import { SimulacionDePuntos } from "./simulacion-puntos";
import { MAPA, GEOJSON } from "./variables-configuracion";
import { LimitesGeograficos } from "./limites-geograficos";

export class ConfigMapa {
  private simulacionPuntos: SimulacionDePuntos | null = null;
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

  public crearSimulacionPuntosAntAeropuerto(
    cantidadSusceptibles: number,
    cantidadInfectados: number,
  ) {
    this.simulacionPuntos = new SimulacionDePuntos(
      cantidadSusceptibles,
      cantidadInfectados,
      GEOJSON.ANTAEROPUERTO,
    );
    this.simulacionPuntos.crearPuntos();
    this.simulacionPuntos.colocarPuntos();
  }
}

const inicio = new ConfigMapa();
inicio.crearSimulacionPuntosAntAeropuerto(15000, 500)
inicio.visualizarAntAeropuerto();

