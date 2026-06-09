import { Circle, LatLngLiteral, Map } from "leaflet";
import { CoordenadasAleatorias } from "./coordenadas-aleatorias";
import { FeatureCollection } from "geojson";

export class Puntos extends Circle {
  public estado: number = 0;
  static readonly colores: string[] = [
    "#11B4D4",
    "#D47E11",
    "#D41140",
    "#11D470",
  ];
  public geoJsonMapa: FeatureCollection;
  constructor(geoJsonMapa: FeatureCollection) {
    super([0, 0], {});
    this.setRadius(1);
    this.geoJsonMapa = geoJsonMapa;
    this.setLatLng(
      new CoordenadasAleatorias().generarCoordenadas(
        this.geoJsonMapa,
        1,
      )[0] as unknown as LatLngLiteral,
    );
  }

  public getEstado() {
    return this.estado;
  }

  public setEstado(estado: number) {
    this.estado = estado;
  }

  public setColor() {
    this.setStyle({
      color: Puntos.colores[this.estado],
      fillColor: Puntos.colores[this.estado],
      opacity: 0.9999,
    });
  }

  public dibujar(mapa: Map) {
    this.addTo(mapa);
  }
}
