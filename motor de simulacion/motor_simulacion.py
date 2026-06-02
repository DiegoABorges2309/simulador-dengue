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
        self.datos_h = datos_simualcion_humanos
        self.datos_v = datos_simulacion_vector
        self.modelo_seir = Seir(
            humanos_poblacion, infectados_humanos, datos_simualcion_humanos
        )
        self.modelo_sei = Sei(
            vector_poblacion, infectados_vectores, datos_simulacion_vector
        )
        self.euler = Euler(0.1, 1.0)

        self.lista_de_dias = []

    def iniciar_simulacion(self):
        valor = True
        dia = 0
        while valor:
            dia += 1
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
