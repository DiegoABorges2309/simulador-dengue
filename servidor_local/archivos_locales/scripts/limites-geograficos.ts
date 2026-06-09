import { GEOJSON, MAPA } from "./variables-configuracion";
import { geoJSON } from "leaflet";
export class LimitesGeograficos {
  constructor() {}

  public dibujarLimiteAntAeropuerto() {
    geoJSON(GEOJSON.ANTAEROPUERTO).addTo(MAPA.MAPAPUNTOFIJO);
  }
}
