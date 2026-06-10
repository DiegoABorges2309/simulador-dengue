interface DatosSIRD {
  susceptibles: number;
  infectados: number;
  recuperados: number;
  muertos: number;
}

interface ConfigCirculo {
  color: string;
  fillColor: string;
}

export class SimulacionDengue {

  private map: L.Map;
  private geoJSON: object;
  private circulos!: Record<keyof DatosSIRD, L.Circle>;
  private datos: DatosSIRD;
  private intervalo: ReturnType<typeof setInterval> | null = null;
  private dia: number = 0;

  private readonly CONFIG_CIRCULOS: Record<keyof DatosSIRD, ConfigCirculo> = {
    susceptibles: { color: '#3B8BD4', fillColor: '#3B8BD4' },
    infectados:   { color: '#E24B4A', fillColor: '#E24B4A' },
    recuperados:  { color: '#639922', fillColor: '#639922' },
    muertos:      { color: '#5F5E5A', fillColor: '#5F5E5A' },
  };

  constructor(map: L.Map, geoJSON: object) {
    this.map     = map;
    this.geoJSON = geoJSON;
    this.datos   = {
      susceptibles: 1500,
      infectados:   10,
      recuperados:  0,
      muertos:      0,
    };

    this.inicializarCirculos();
    this.ejecutarSimulacion(); // arranca sola al crear la instancia
  }

  private getCentro(): L.LatLng {
    return L.geoJSON(this.geoJSON).getBounds().getCenter();
  }

  private calcularRadio(cantidad: number): number {
    return Math.sqrt(cantidad) * 5;
  }

  private inicializarCirculos(): void {
    const centro = this.getCentro();

    this.circulos = Object.fromEntries(
      (Object.keys(this.CONFIG_CIRCULOS) as Array<keyof DatosSIRD>).map((estado) => [
        estado,
        L.circle(centro, {
          radius:      this.calcularRadio(this.datos[estado]),
          color:       this.CONFIG_CIRCULOS[estado].color,
          fillColor:   this.CONFIG_CIRCULOS[estado].fillColor,
          fillOpacity: 0.35,
          weight:      2,
        }).addTo(this.map),
      ])
    ) as Record<keyof DatosSIRD, L.Circle>;
  }

  private actualizarCirculos(): void {
    (Object.keys(this.circulos) as Array<keyof DatosSIRD>).forEach((estado) => {
      this.circulos[estado].setRadius(this.calcularRadio(this.datos[estado]));
    });
  }

  private calcularSiguienteDia(): void {
    const nuevosInfectados  = Math.floor(this.datos.infectados * 0.30);
    const nuevosRecuperados = Math.floor(this.datos.infectados * 0.08);
    const nuevosMuertos     = Math.floor(this.datos.infectados * 0.01);

    this.datos.infectados   += nuevosInfectados - nuevosRecuperados - nuevosMuertos;
    this.datos.susceptibles -= nuevosInfectados;
    this.datos.recuperados  += nuevosRecuperados;
    this.datos.muertos      += nuevosMuertos;

    this.datos.susceptibles = Math.max(0, this.datos.susceptibles);
    this.datos.infectados   = Math.max(0, this.datos.infectados);
  }

  private ejecutarSimulacion(intervalMs: number = 1000): void {
    this.intervalo = setInterval(() => {
      this.dia++;
      this.calcularSiguienteDia();
      this.actualizarCirculos();

      console.log(`Día ${this.dia}:`, { ...this.datos });

      if (this.datos.susceptibles === 0 || this.datos.infectados === 0) {
        this.detener();
        console.log('Simulación terminada');
      }
    }, intervalMs);
  }

  // ── Públicos ─────────────────────────────────────────────────

  detener(): void {
    if (this.intervalo) {
      clearInterval(this.intervalo);
      this.intervalo = null;
    }
  }

  actualizarDesdePython(datos: DatosSIRD): void {
    this.datos = { ...datos };
    this.actualizarCirculos();
  }
}