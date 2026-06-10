import { geoJSON, Map, circle } from 'leaflet'; // ← agrega circle al import
import { FeatureCollection } from 'geojson';
import * as turf from '@turf/turf';

export interface DatosGeoJSON {
    geoJsonAntiguoAeropuerto: {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -70.199528,
                            11.717374
                        ],
                        [
                            -70.196579,
                            11.717557
                        ],
                        [
                            -70.192726,
                            11.717776
                        ],
                        [
                            -70.189611,
                            11.717963
                        ],
                        [
                            -70.184961,
                            11.718252
                        ],
                        [
                            -70.184541,
                            11.718278
                        ],
                        [
                            -70.18445,
                            11.718286
                        ],
                        [
                            -70.184383,
                            11.718276
                        ],
                        [
                            -70.184327,
                            11.71831
                        ],
                        [
                            -70.1843,
                            11.718394
                        ],
                        [
                            -70.184321,
                            11.718499
                        ],
                        [
                            -70.184658,
                            11.71944
                        ],
                        [
                            -70.184935,
                            11.720257
                        ],
                        [
                            -70.185664,
                            11.721855
                        ],
                        [
                            -70.185833,
                            11.722203
                        ],
                        [
                            -70.186004,
                            11.722649
                        ],
                        [
                            -70.186741,
                            11.724483
                        ],
                        [
                            -70.188286,
                            11.72432
                        ],
                        [
                            -70.190356,
                            11.723795
                        ],
                        [
                            -70.193118,
                            11.723086
                        ],
                        [
                            -70.193241,
                            11.722818
                        ],
                        [
                            -70.194336,
                            11.722734
                        ],
                        [
                            -70.196745,
                            11.722155
                        ],
                        [
                            -70.196696,
                            11.721908
                        ],
                        [
                            -70.197656,
                            11.721651
                        ],
                        [
                            -70.197693,
                            11.721127
                        ],
                        [
                            -70.197817,
                            11.720502
                        ],
                        [
                            -70.197902,
                            11.719536
                        ],
                        [
                            -70.199477,
                            11.719365
                        ],
                        [
                            -70.199531,
                            11.717375
                        ]
                    ]
                },
                "bbox": [
                    -70.199531,
                    11.717374,
                    -70.1843,
                    11.724483
                ]
            }
        ]
    }
}


export class GeoJson {

    public geojson_inicial: FeatureCollection = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            -70.199528,
                            11.717374
                        ],
                        [
                            -70.196579,
                            11.717557
                        ],
                        [
                            -70.192726,
                            11.717776
                        ],
                        [
                            -70.189611,
                            11.717963
                        ],
                        [
                            -70.184961,
                            11.718252
                        ],
                        [
                            -70.184541,
                            11.718278
                        ],
                        [
                            -70.18445,
                            11.718286
                        ],
                        [
                            -70.184383,
                            11.718276
                        ],
                        [
                            -70.184327,
                            11.71831
                        ],
                        [
                            -70.1843,
                            11.718394
                        ],
                        [
                            -70.184321,
                            11.718499
                        ],
                        [
                            -70.184658,
                            11.71944
                        ],
                        [
                            -70.184935,
                            11.720257
                        ],
                        [
                            -70.185664,
                            11.721855
                        ],
                        [
                            -70.185833,
                            11.722203
                        ],
                        [
                            -70.186004,
                            11.722649
                        ],
                        [
                            -70.186741,
                            11.724483
                        ],
                        [
                            -70.188286,
                            11.72432
                        ],
                        [
                            -70.190356,
                            11.723795
                        ],
                        [
                            -70.193118,
                            11.723086
                        ],
                        [
                            -70.193241,
                            11.722818
                        ],
                        [
                            -70.194336,
                            11.722734
                        ],
                        [
                            -70.196745,
                            11.722155
                        ],
                        [
                            -70.196696,
                            11.721908
                        ],
                        [
                            -70.197656,
                            11.721651
                        ],
                        [
                            -70.197693,
                            11.721127
                        ],
                        [
                            -70.197817,
                            11.720502
                        ],
                        [
                            -70.197902,
                            11.719536
                        ],
                        [
                            -70.199477,
                            11.719365
                        ],
                        [
                            -70.199531,
                            11.717375
                        ]
                    ]
                },
                "bbox": [
                    -70.199531,
                    11.717374,
                    -70.1843,
                    11.724483
                ]
            }
        ]
    }

    public map: Map;

    constructor(configuracion: Map) {
        this.map = configuracion;
    }

    public agregar_gj_antAeropuerto() {
        geoJSON(this.geojson_inicial).addTo(this.map);
    }

    public dibujar(cantidad: number) {  // ← cantidad como parámetro
        var bbox = this.geojson_inicial.features[0].bbox!; // ← this.geojson_inicial
        var puntos = turf.randomPoint(cantidad, {
            bbox: bbox,
        })

        var minLng = bbox[0], minLat = bbox[1];
        var maxLng = bbox[2], maxLat = bbox[3];

        for (var i = 0; i < cantidad; i++) {
            var lat = Math.random() * (maxLat - minLat) + minLat;
            var lng = Math.random() * (maxLng - minLng) + minLng;

            circle([lat, lng], {  // ← circle importado, no L.circle
                radius: 5,
                color: 'red',
                fillColor: 'red',
                fillOpacity: 1
            }).addTo(this.map);  // ← this.map
        }
    }

    public dibujar2(cantidad: number) {
        // 1. Convertir el LineString a Polígono
        var linea = this.geojson_inicial.features[0];
        var poligono = turf.lineToPolygon(linea as any);

        var bbox = this.geojson_inicial.features[0].bbox!;
        var puntosValidos = 0;
        var intentos = 0;

        // 2. Generar puntos hasta tener la cantidad deseada
        while (puntosValidos < cantidad && intentos < cantidad * 10) {
            intentos++;

            var puntoAleatorio = turf.randomPoint(1, { bbox: bbox });
            var punto = puntoAleatorio.features[0];

            // 3. Verificar si cae dentro del polígono
            if (turf.booleanPointInPolygon(punto, poligono)) {
                var lat = punto.geometry.coordinates[1];
                var lng = punto.geometry.coordinates[0];

                circle([lat, lng], {
                    radius: 1,
                    color: 'red',
                    fillColor: 'red',
                    fillOpacity: 1
                }).addTo(this.map);

                puntosValidos++;
            }
        }
    }
}