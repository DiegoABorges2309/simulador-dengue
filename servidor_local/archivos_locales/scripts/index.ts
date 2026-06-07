import { tileLayer, Map, CRS } from "leaflet"
import { GeoJson } from "./geojson";
import { Puntos } from "./puntos";
import { EstilosMapa } from "./estilo-mapa";
import { CoordenadasAleatoreas } from "./coordenadasAleatorias";

export class ConfigMapa {
    public latitud: number = 11.6988;
    public longitud: number = -70.1977;
    public mapa_punto_fijo = new Map("mapa",
        {
            center: [this.latitud, this.longitud],
            crs: CRS.EPSG3857,
            ...{
                "zoom": 14,
                "zoomControl": true,
                "preferCanvas": false,
            }
        });
    public capa_inicial = tileLayer(
        "http://localhost:2000/tiles_local/{z}/{x}/{y}.png",
        {
            "minZoom": 13,
            "maxZoom": 16,
            "maxNativeZoom": 16,
            "noWrap": false,
            "attribution": "OpenStreetMap",
            "subdomains": "abc",
            "detectRetina": false,
            "tms": false,
            "opacity": 1,
        }
    ).addTo(this.mapa_punto_fijo);

    public gjson = new GeoJson(this.mapa_punto_fijo);
    public constructor() { };

    public lista_puntos: Puntos[] = [];

    public visualizar_puntoFijo() {
        this.gjson.agregar_gj_antAeropuerto();
        this.mapa_punto_fijo.setView([this.latitud, this.longitud], 12);
    }

    public visualizar_antAeropuerto() {
        this.gjson.agregar_gj_antAeropuerto();
        this.mapa_punto_fijo.setView([11.719994, -70.191911], 16);
        this.gjson.dibujar2(3000);
        let stylos = new EstilosMapa(this.mapa_punto_fijo)
        stylos.colorearFueraLimite(this.gjson.geojson_inicial);
        let random = new CoordenadasAleatoreas()
        let cantidad = random.generarCoordenadasAleatoreas(this.gjson.geojson_inicial, 10)
        for (let i = 0; i < 10; i++){
            console.log(cantidad[i])
        }
    }
}


const inicio = new ConfigMapa();
inicio.visualizar_antAeropuerto();
