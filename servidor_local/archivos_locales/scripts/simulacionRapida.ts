import { SimulacionDePuntos } from './simulacionPuntos'; // Ajusta la ruta según tu proyecto

export class SimuladorRapido {
    private simulacion: SimulacionDePuntos;
    private idIntervalo: number | null = null;

    // Pasamos la simulación ya creada al constructor
    constructor(simulacion: SimulacionDePuntos) {
        this.simulacion = simulacion;
    }

    public iniciar() {
        // Evitamos crear múltiples intervalos si se llama a "iniciar" varias veces
        if (this.idIntervalo !== null) {
            console.log("La simulación ya está corriendo.");
            return;
        }

        console.log("Iniciando simulación rápida...");

        // setInterval ejecuta esta función de flecha cada 30 milisegundos
        this.idIntervalo = window.setInterval(() => {

            // Generamos números aleatorios pequeños para cada estado
            // Math.random() da un número entre 0 y 1. Lo multiplicamos y redondeamos hacia abajo.
            const randomExpuestos = Math.floor(Math.random() * 6);   // De 0 a 5
            const randomInfectados = Math.floor(Math.random() * 4);  // De 0 a 3
            const randomRecuperados = Math.floor(Math.random() * 3); // De 0 a 2
            const randomMuertos = Math.floor(Math.random() * 2);     // De 0 a 1

            // Llamamos a los métodos de tu clase con esos números aleatorios
            this.simulacion.actualizarAExpuestos(randomExpuestos);
            this.simulacion.actualizarAInfectados(randomInfectados);
            this.simulacion.actualizarARecuperados(randomRecuperados);
            this.simulacion.actualizarAMuerto(randomMuertos);

        }, 150); // <-- Aquí definimos los 30 milisegundos
    }

    public detener() {
        // Es vital tener una forma de parar el setInterval, o tu navegador podría colapsar
        if (this.idIntervalo !== null) {
            window.clearInterval(this.idIntervalo);
            this.idIntervalo = null;
            console.log("Simulación detenida.");
        }
    }
}