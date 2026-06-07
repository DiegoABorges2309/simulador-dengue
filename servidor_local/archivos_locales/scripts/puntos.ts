import { Circle, Map } from "leaflet";

export class Puntos extends Circle {
    public estado: number = 0;
    constructor(longitud: number, latitud: number, radio: number, color: string) {
        super([longitud, latitud], {
            radius: radio,
            color: color
        })
    }

    public getEstado() {
        return this.estado;
    }

    public setEstado(estado: number) {
        this.estado = estado;
    }

}