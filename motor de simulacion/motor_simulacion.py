"""
Clase que se encarga de cargar e iniciar
la simulacion
"""

from seir_sei.seir import Seir, DatosSimulacionHumanos
from seir_sei.sei import Sei, DatosSimulacionVector
from seir_sei.euler import Euler


class Motor:
    def __init__(
        self,
        humanos_poblacion: int,
        infectados_humanos: int,
        datos_simualcion_humanos: DatosSimulacionHumanos,
        vector_poblacion: int,
        infectados_vectores: int,
        datos_simulacion_vector: DatosSimulacionVector,
    ):
        """
        Clase 'Motor' que se encarga de iniciar
        los datos de la simulacion.

        Parameters
        ----------
        humanos_poblacion
            Cantidad de humanos al iniciar.
        infectados_humanos
            Cantidad inicial de infectados humanos
            al inicio.
        datos_simualcion_humanos
            Datos necesarios para la simulacion
            por el lado de humanos.
        vector_poblacion
            Cantidad inicial de vectores al inicio.
        infectados_vectores
            Cantidad inicial de infectados vectores
            al inicio.
        datos_simulacion_vector
            Datos necesarios para la simulacion
            por el lado de vectores.
        """
        self.lista_de_dias = []
        self.datos_h = datos_simualcion_humanos
        self.datos_v = datos_simulacion_vector
        self.modelo_seir = Seir(
            humanos_poblacion, infectados_humanos, datos_simualcion_humanos
        )
        self.modelo_sei = Sei(
            vector_poblacion, infectados_vectores, datos_simulacion_vector
        )
        self.euler = Euler(
            0.041, 1.0
        )  # Uso un paso de 0.041 para que la simulacion se calcule en 24 iteraciones, 24h

    def variable_bombeo_agua(self, dia_actual: int, lapso_t_bombeo_agua: int):
        """
        Funcion que se encarga de simular
        el sistema de bombeo de agua en Punto Fijo.

        Parameters
        ----------
        dia_actual
            Dia actual de la simulacion
        lapso_t_bombeo_agua
            Cuanto tarda en dias que llegue el
            agua nuevamente en la ciudad.
        """
        dia_en_ciclo = dia_actual % lapso_t_bombeo_agua
        self.datos_v.tasa_bombeo_agua = 1.6 - (
            1.2 * dia_en_ciclo / (lapso_t_bombeo_agua - 1)
        )

    def iniciar_simulacion(self):
        """
        Funcion que da inicio a la simulacion
        con los datos ingresados.
        """
        valor = True
        dia = 0
        while valor:
            dia += 1
            self.variable_bombeo_agua(dia, 30)
            self.euler.calculo_euler(self.modelo_seir, self.modelo_sei)
            self.euler.dias_reales = 0.0
            valores_dia_transcurrido = {
                "dia": dia,
                "humano": self.euler.variables_h[-1],
                "vector": self.euler.variables_v[-1],
            }
            self.lista_de_dias.append(valores_dia_transcurrido)
            if self.modelo_seir.infectados < 1 and self.modelo_sei.infectados < 1:
                valor = False
