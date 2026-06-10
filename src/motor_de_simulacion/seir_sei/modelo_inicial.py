"""
Archivo inicial donde se encuentra la logica inicial
del modelo SEIR-SEI que usamos, aqui se encuentran
las clases padres del modelo.
"""

from abc import ABC, abstractmethod


class DatosSimulacion(ABC):
    """
    Clase inicial de datos necesarios para los modelos,
    esta clase cumple como funcion almacenar los valores
    que seran usados para calcular las ecuaciones
    """

    def __init__(
        self, tasa_picaduras: float, tasa_transmision: float, tasa_incubacion: float
    ):
        """
        Inicializa los datos necesarios para la simualcion

        Parameters
        ----------
        tasa_picaduras
            Representa el promedio de picaduras que puede realizar un mosquito por dia.
        tasa_transmision
            Representa la tasa que tiene el dengue en infectar a un vector
            o persona despues de una picadura.
        tasa_incubacion
            Representa cuantos por dia pasan de expuesto a infectado.
        """
        self.fuerza_infeccion = tasa_picaduras * tasa_transmision
        self.tasa_incubacion = tasa_incubacion


class ModeloInicial(ABC):
    """
    Clase padre para los modelos SEIR-SEI el cual
    establece variables que comparten entre si.
    """

    def __init__(
        self,
        n_poblacion: float,
        n_infectados_inicio: float,
        datos_simulacion: DatosSimulacion,
    ):
        """
        Inicializa los datos necesarios para el modelo SEIR-SEI

        Parameters
        ----------
        n_poblacion
            Representa el número inicial que se tomará para la simulación.
        n_infectados_inicio
            Representa el número inicial de infectados que se tomará para la simulación.
        datos_simulacion
            Representa un objeto de la clase 'DatosSimulacion' con los datos para las ecuaciones.
        """
        self.susceptibles = n_poblacion - n_infectados_inicio
        self.expuestos = 0
        self.infectados = n_infectados_inicio
        self.datos_simulacion = datos_simulacion

    @abstractmethod
    def get_poblacion_total(self) -> float:
        """
        Calculo de la poblacion total de humanos o vectores
        mientras corre la simulacion.
        """
        pass

    @abstractmethod
    def calcular_susceptibles(
        self, n_infectados_h: float, n_poblacion_h: float
    ) -> float:
        """
        Función abstracta para el cálculo de susceptibles.
        """
        pass

    @abstractmethod
    def calcular_expuestos(self, n_infectados_h: float, n_poblacion_h: float) -> float:
        """
        Función abstracta para el cálculo de expuestos.
        """
        pass

    @abstractmethod
    def calcular_infectados(self) -> float:
        """
        Funcion abstracta del calculo de la ecuacion
        de los infectados
        """
        pass

    @abstractmethod
    def actualizar_variables(
        self,
        valor_nuevo_susceptibles: float,
        valor_nuevo_expuestos: float,
        valor_nuevo_infectados: float,
    ):
        pass
