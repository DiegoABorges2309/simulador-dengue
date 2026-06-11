import { circle, Circle, CircleMarkerOptions, LatLngLiteral, Map } from "leaflet";

export enum EstadoPunto {
  Susceptible = 0,
  Infectado = 1,
  Recuperado = 2,
  Expuesto = 3,
  Muerto = 4,
  Oculto = 99,
}

export class Puntos {
  public estado: EstadoPunto;
  public pesoRepresentado: number;
  public marker: Circle;
  private tooltipTexto: string;

  public static readonly colores: { [estado: number]: string } = {
    [EstadoPunto.Susceptible]: "#11B4D4",
    [EstadoPunto.Expuesto]: "#D47E11",
    [EstadoPunto.Infectado]: "#D41140",
    [EstadoPunto.Recuperado]: "#11D470",
    [EstadoPunto.Muerto]: "#5A5A5A",
    [EstadoPunto.Oculto]: "rgba(0,0,0,0)",
  };

  constructor(
    latlng: LatLngLiteral,
    estado: EstadoPunto = EstadoPunto.Susceptible,
    pesoRepresentado = 1,
  ) {
    this.estado = estado;
    this.pesoRepresentado = pesoRepresentado;
    this.tooltipTexto = "";

    this.marker = circle(latlng, {
      radius: 3,
      color: Puntos.colores[estado],
      fillColor: Puntos.colores[estado],
      fillOpacity: estado === EstadoPunto.Oculto ? 0 : 0.80,
      opacity: estado === EstadoPunto.Oculto ? 0 : 0.90,
      weight: 0,
      interactive: false,
    });

    this.actualizarTooltip();
  }

  public getEstado() {
    return this.estado;
  }

  public setEstado(
    estado: EstadoPunto,
    pesoRepresentado: number = this.pesoRepresentado,
  ) {
    const estadoCambiado = this.estado !== estado;
    const pesoCambiado = this.pesoRepresentado !== pesoRepresentado;

    if (!estadoCambiado && !pesoCambiado) {
      return;
    }

    this.estado = estado;
    this.pesoRepresentado = pesoRepresentado;

    this.marker.setStyle({
      color: Puntos.colores[estado],
      fillColor: Puntos.colores[estado],
      opacity: estado === EstadoPunto.Oculto ? 0 : 0.90,
      fillOpacity: estado === EstadoPunto.Oculto ? 0 : 0.80,
      radius: estado === EstadoPunto.Oculto ? 0 : 3,
    });

    this.actualizarTooltip();
  }

  public dibujar(mapa: Map) {
    this.marker.addTo(mapa);
  }

  public setStyle(options: Partial<CircleMarkerOptions>) {
    this.marker.setStyle(options);
  }

  private getTooltipText() {
    if (this.estado === EstadoPunto.Oculto) {
      return "";
    }

    const pesoTexto = Number.isFinite(this.pesoRepresentado)
      ? this.pesoRepresentado.toFixed(0)
      : "0";

    return `${this.getNombreEstado()} · ${pesoTexto} personas`;
  }

  private getNombreEstado() {
    switch (this.estado) {
      case EstadoPunto.Infectado:
        return "Infectado";
      case EstadoPunto.Recuperado:
        return "Recuperado";
      case EstadoPunto.Expuesto:
        return "Expuesto";
      case EstadoPunto.Muerto:
        return "Muerto";
      default:
        return "Susceptible";
    }
  }

  private actualizarTooltip() {
    const texto = this.getTooltipText();
    if (texto.length === 0) {
      this.marker.unbindTooltip();
      return;
    }

    this.tooltipTexto = texto;
    this.marker.unbindTooltip();
    this.marker.bindTooltip(texto, {
      permanent: false,
      direction: "top",
      className: "simulacion-tooltip",
    });
  }
}
