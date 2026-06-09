import { Map } from 'leaflet';
import { Puntos } from './puntos';
import { FeatureCollection } from 'geojson';

export class SimulacionDePuntos {
    public cantidadSusceptibles: number;
    public cantidadInfectados: number;
    public geoJsonMapa: FeatureCollection;
    public mapa: Map;
    public puntos: Puntos[] = [];
    constructor(
        cantidadSusceptibles: number,
        cantidadInfectados: number,
        mapa: Map,
        geoJsonMapa: FeatureCollection) {
        this.cantidadSusceptibles = cantidadSusceptibles;
        this.cantidadInfectados = cantidadInfectados;
        this.mapa = mapa;
        this.geoJsonMapa = geoJsonMapa;
    }

    public crearPuntos() {
        const numeroTotal: number = this.cantidadSusceptibles + this.cantidadInfectados;
        for (let numero = 0; numero < numeroTotal; numero++) {
            this.puntos.push(new Puntos(this.geoJsonMapa));
            if (numero < this.cantidadInfectados) {
                this.puntos[numero].setEstado(2);
            }
        }
    }

    public colocarPuntos() {
        this.puntos.forEach(element => {
            element.dibujar(this.mapa);
            element.setColor();
        });
    }

    public actualizarAExpuestos(cantidadNuevosExpuestos: number) {
        const cantidadPuntos = this.puntos.length;
        let contador = 0;
        if (cantidadPuntos === 0 || cantidadNuevosExpuestos === 0) {
            return 0;
        }
        for (let i = 0; i < cantidadPuntos; i++) {
            if (contador === cantidadNuevosExpuestos) {
                break;
            }
            if (this.puntos[i].getEstado() === 0) {
                this.puntos[i].setEstado(1);
                this.puntos[i].setColor();
                contador += 1;
            }
        }
    }

    public actualizarAInfectados(cantidadNuevosInfectados: number) {
        const cantidadPuntos = this.puntos.length;
        let contador = 0;
        if (cantidadPuntos === 0 || cantidadNuevosInfectados === 0) {
            return 0;
        }
        for (let i = 0; i < cantidadPuntos; i++) {
            if (contador === cantidadNuevosInfectados) {
                break;
            }
            if (this.puntos[i].getEstado() === 1) {
                this.puntos[i].setEstado(2);
                this.puntos[i].setColor();
                contador += 1;
            }
        }
    }

    public actualizarARecuperados(cantidadNuevosRecuperados: number) {
        const cantidadPuntos = this.puntos.length;
        let contador = 0;
        if (cantidadPuntos === 0 || cantidadNuevosRecuperados === 0) {
            return 0;
        }
        for (let i = 0; i < cantidadPuntos; i++) {
            if (contador === cantidadNuevosRecuperados) {
                break;
            }
            if (this.puntos[i].getEstado() === 2) {
                this.puntos[i].setEstado(3);
                this.puntos[i].setColor();
                contador += 1;
            }
        }
    }

    public actualizarAMuerto(cantidadNuevosMuerto: number) {
        const cantidadPuntos = this.puntos.length;
        let contador = 0;
        if (cantidadPuntos === 0 || cantidadNuevosMuerto === 0) {
            return 0;
        }
        for (let i = 0; i < cantidadPuntos; i++) {
            if (contador === cantidadNuevosMuerto) {
                break;
            }
            if (this.puntos[i].getEstado() === 2) {
                this.puntos[i].setLatLng([-90, -180])
                contador += 1;
            }
        }
    }
}