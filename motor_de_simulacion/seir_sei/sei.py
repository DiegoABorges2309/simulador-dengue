"""
Definicion del modelo SEI para vectores
como tambien de su propia clase de datos
de la simulacion.
"""

from .modelo_inicial import ModeloInicial, DatosSimulacion


class DatosSimulacionVector(DatosSimulacion):
    """
    Clase de datos propia y explusiva para el modelo
    SEI (vector).

    Hereda de la clase 'DatosSimulacion' del archivo
    'modelo_inicial.py'.
    """

    def __init__(
        self,
        tasa_picaduras: float,
        tasa_transmision: float,
        tasa_incubacion: float,
        tasa_nacimiento_vector: float,
        tasa_muerte_vector: float,
        tasa_bombeo_agua: float = 1.0,
    ):
        """
        Inicializa los datos necesarios del modelo SEI para la simualcion

        Parameters
        ----------
        tasa_picaduras
            Representa el promedio de picaduras que puede realizar un mosquito por dia.
        tasa_transmision
            Representa la tasa que tiene el dengue en infectar a un vector
            o persona despues de una picadura.
        tasa_incubacion
            Representa el tiempo que tarda el dengue en ser infeccioso dentro
            del huesped (humano o vector).
        tasa_nacimiento_vector
            Representa el porcentaje de nacimientos del vector
            respecto a la cantidad de poblacion de este mismo.
        tasa_muerte_vector
            Representa el porcentaje de muertes del vector con
            respecto a la cantidad de poblacion de este mismo.
        """
        super().__init__(tasa_picaduras, tasa_transmision, tasa_incubacion)
        self.tasa_bombeo_agua = tasa_bombeo_agua
        self.tasa_nacimiento = tasa_nacimiento_vector
        self.tasa_muerte = tasa_muerte_vector


class Sei(ModeloInicial):
    """
    Clase del modelo SEI (vector) el cual ejecuta
    los calculos necesarios para la simualcion por
    parte del vector.

    Hereda de la clase 'ModeloInicial' del archivo
    'modelo_inicial.py'.
    """

    def __init__(
        self,
        n_poblacion: float,
        n_infectados_inicio: float,
        datos_simulacion: DatosSimulacionVector,
    ):
        """
        Inicializa los datos necesarios para la simulacion del
        modelo SEI.

        Parameters
        ----------
        n_poblacion
            Representa el número inicial de la población total de vectores.
        n_infectados_inicio
            Representa el número inicial de infectados de vectores.
        datos_simulacion
            Representa un objeto de la clase 'DatosSimulacionVector' con los datos para los cálculos.
        """
        super().__init__(n_poblacion, n_infectados_inicio, datos_simulacion)
        self.datos_simulacion: DatosSimulacionVector = datos_simulacion

    def get_poblacion_total(self) -> float:
        """
        Calcula el numero total de la poblacion en la simulacion
        en tiempo de ejecucion.

        Returns
        -------
            Retorna la suma de susceptibles, expuestos y infectados
            lo cual representa la poblacion total del vector.
        """
        return (
            self.susceptibles + self.expuestos + self.infectados
        )  # pyright: ignore[reportOperatorIssue]

    def calcular_susceptibles(
        self, n_infectados_h: float, n_poblacion_h: float
    ) -> float:
        """
        Funcion la cual resuelve la ecuacion de susceptibles(vector)

        Parameters
        ----------
        n_infectados_h
            Representa el número de infectados por parte de los humanos.
        n_poblacion_h
            Representa el número total de la población de los humanos.

        Returns
        -------
            Retorna la derivada de susceptibles respecto al tiempo (dSv/dt).
        """
        if n_poblacion_h == 0:
            return 0.0

        n_nacimientos = (
            self.datos_simulacion.tasa_nacimiento
            * self.datos_simulacion.tasa_bombeo_agua
            * self.get_poblacion_total()
        )
        return (
            n_nacimientos
            - self.datos_simulacion.fuerza_infeccion
            * n_infectados_h
            / n_poblacion_h
            * self.susceptibles
            - self.datos_simulacion.tasa_muerte * self.susceptibles
        )

    def calcular_expuestos(self, n_infectados_h: float, n_poblacion_h: float) -> float:
        """
        Funcion la cual resuelve la ecuacion de Expuestos(vector)

        Parameters
        ----------
        n_infectados_h
            Representa el número de infectados por parte de los humanos.
        n_poblacion_h
            Representa el número total de la población de los humanos.

        Returns
        -------
            Retorna la derivada de expuestos respecto al tiempo (dEv/dt).
        """
        if n_poblacion_h == 0:
            return 0.0

        return (
            self.datos_simulacion.fuerza_infeccion
            * (n_infectados_h / n_poblacion_h)
            * self.susceptibles
            - self.datos_simulacion.tasa_incubacion * self.expuestos
            - self.datos_simulacion.tasa_muerte * self.expuestos
        )

    def calcular_infectados(self) -> float:
        """
        Funcion la cual resuelve la ecuacion de infectados(vector)

        Returns
        -------
            Retorna la derivada de infectados respecto al tiempo (dIv/dt).
        """
        return (
            self.datos_simulacion.tasa_incubacion * self.expuestos
            - self.datos_simulacion.tasa_muerte * self.infectados
        )

    def actualizar_variables(
        self,
        valor_nuevo_susceptibles: float,
        valor_nuevo_expuestos: float,
        valor_nuevo_infectados: float,
    ):
        """
        Funcion que se encarga de actualizar
        las variables de la clase 'Sei' con
        nuevos valores en cada iteracion.

        Parameters
        ----------
        valor_nuevo_susceptibles
            El nuevo valor de los susceptibles vector.
        valor_nuevo_expuestos
            El nuevo valor de los expuestos vector.
        valor_nuevo_infectados
            El nuevo valor de los infectados vector.
        """
        self.susceptibles = valor_nuevo_susceptibles
        self.expuestos = valor_nuevo_expuestos
        self.infectados = valor_nuevo_infectados
