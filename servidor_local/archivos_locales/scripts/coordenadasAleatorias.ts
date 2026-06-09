import { FeatureCollection, MultiPolygon } from 'geojson';
import * as turf from "@turf/turf";
import { Polygon } from 'leaflet';

export class CoordenadasAleatorias {
    public coordenadas: number[][] = [];

    constructor() { }

    public generarCoordenadas(geoJsonMapa: FeatureCollection, cantidadDeCoordenadas: number) {
        var linea = geoJsonMapa.features[0];
        var poligono: Polygon | MultiPolygon = turf.lineToPolygon(linea as any);

        var bbox = geoJsonMapa.features[0].bbox!;
        var puntosValidos = 0;
        var intentos = 0;
        while (puntosValidos < cantidadDeCoordenadas && intentos < cantidadDeCoordenadas * 10) {
            intentos++;

            var puntoAleatorio = turf.randomPoint(1, { bbox: bbox });
            var punto = puntoAleatorio.features[0];

            if (turf.booleanPointInPolygon(punto, poligono)) {
                var lat = punto.geometry.coordinates[1];
                var lng = punto.geometry.coordinates[0];
                this.coordenadas.push([lat, lng]);
            }
        }
        return this.coordenadas;
    }
}