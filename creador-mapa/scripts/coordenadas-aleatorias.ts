import { FeatureCollection } from "geojson";
import * as turf from "@turf/turf";
import { Polygon, MultiPolygon } from "geojson";

export class CoordenadasAleatorias {
  public generarCoordenadas(
    geoJsonMapa: FeatureCollection,
    cantidadDeCoordenadas: number,
  ): [number, number][] {
    const linea = geoJsonMapa.features[0];
    const poligono: Polygon | MultiPolygon = turf.lineToPolygon(linea as any);
    const bbox = geoJsonMapa.features[0].bbox!;
    const coordenadas: [number, number][] = [];

    let puntosValidos = 0;
    let intentos = 0;
    while (
      puntosValidos < cantidadDeCoordenadas &&
      intentos < cantidadDeCoordenadas * 20
    ) {
      intentos += 1;
      const puntoAleatorio = turf.randomPoint(1, { bbox });
      const punto = puntoAleatorio.features[0];

      if (turf.booleanPointInPolygon(punto, poligono)) {
        const lat = punto.geometry.coordinates[1];
        const lng = punto.geometry.coordinates[0];
        coordenadas.push([lat, lng]);
        puntosValidos += 1;
      }
    }

    return coordenadas;
  }
}
