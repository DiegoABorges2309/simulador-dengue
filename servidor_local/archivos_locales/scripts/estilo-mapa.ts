import { MAPA } from "./variables-configuracion";
import { FeatureCollection } from "geojson";
import { Map, Polygon, polygon } from "leaflet";

export class EstilosMapa {
  private mascara: Polygon | null = null;

  public mapaInicial: Map = MAPA.MAPAPUNTOFIJO;

  constructor() {}

  public limpiarColorFueraLimite() {
    if (this.mascara == null) {
      return 0;
    }
    this.mascara.remove();
  }

  public colorearFueraLimite(geoJsonMapa: FeatureCollection) {
    let coordenadasCajaGigante: [number, number][] = [
      [-90, -180],
      [-90, 180],
      [90, 180],
      [90, -180],
      [-90, -180],
    ];
    let coordenadasGeoJson = geoJsonMapa.features[0].geometry as any;
    let espacioDentroGeojson: [number, number][] =
      coordenadasGeoJson.coordinates.map((coord: number[]) => [
        coord[1],
        coord[0],
      ]);
    this.mascara = polygon([coordenadasCajaGigante, espacioDentroGeojson], {
      color: "#1a1a4e",
      fillColor: "#1a1a4e",
      fillOpacity: 0.5,
      stroke: false,
    }).addTo(this.mapaInicial);
  }
}
