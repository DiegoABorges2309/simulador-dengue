"""
Definición del modelo SEIR para humanos y su clase de datos.
"""

from .modelo_inicial import ModeloInicial, DatosSimulacion


class DatosSimulacionHumanos(DatosSimulacion):
    """
    Datos específicos para el modelo SEIR humano.

    Hereda de DatosSimulacion y añade la tasa de recuperación.
    """

    def __init__(
        self,
        tasa_picaduras: float,
        tasa_transmision: float,
        tasa_incubacion: float,
        tasa_recuperacion: float,
        tasa_muerte_h: float,
    ):
        """
        Inicializa los datos de simulación para humanos.

        Parameters
        ----------
        tasa_picaduras
            Promedio de picaduras de mosquitos por día.
        tasa_transmision
            Tasa de transmisión del dengue por picadura.
        tasa_incubacion
            Tasa de paso de expuestos a infectados.
        tasa_recuperacion
            Tasa de recuperación de infectados.
        """
        super().__init__(tasa_picaduras, tasa_transmision, tasa_incubacion)
        self.tasa_recuperacion = tasa_recuperacion
        self.tasa_muerte_h = tasa_muerte_h


class Seir(ModeloInicial):
    """
    Modelo SEIR para humanos en la simulación.

    Define las ecuaciones para susceptibles, expuestos, infectados y recuperados.
    """

    def __init__(
        self,
        n_poblacion: float,
        n_infectados_inicio: float,
        datos_simulacion: DatosSimulacionHumanos,
    ):
        """
        Inicializa el modelo SEIR para humanos.

        Parameters
        ----------
        n_poblacion
            Población inicial de humanos.
        n_infectados_inicio
            Número inicial de humanos infectados.
        datos_simulacion
            Objeto DatosSimulacionHumanos con las tasas del modelo.
        """
        super().__init__(n_poblacion, n_infectados_inicio, datos_simulacion)
        self.recuperados = 0
        self.muertos = 0
        self.datos_simulacion: DatosSimulacionHumanos = datos_simulacion

    def get_poblacion_total(self) -> float:
        """
        Calcula la población humana total en la simulación.

        Returns
        -------
        float
            Suma de susceptibles, expuestos, infectados y recuperados.
        """
        return (
            self.susceptibles + self.expuestos + self.infectados + self.recuperados
        )  # pyright: ignore[reportOperatorIssue]

    def calcular_susceptibles(
        self, n_infectados_v: float, n_poblacion_v: float
    ) -> float:
        """
        Calcula la derivada de susceptibles humanos.

        Parameters
        ----------
        n_infectados_v
            Número de vectores infectados.
        n_poblacion_v
            Población total de vectores.

        Returns
        -------
        float
            dSh/dt para los humanos.
        """
        if n_poblacion_v == 0:
            return 0.0
        return (
            -self.datos_simulacion.fuerza_infeccion
            * n_infectados_v
            / n_poblacion_v
            * self.susceptibles
        )

    def calcular_expuestos(self, n_infectados_v: float, n_poblacion_v: float) -> float:
        """
        Calcula la derivada de expuestos humanos.

        Parameters
        ----------
        n_infectados_v
            Número de vectores infectados.
        n_poblacion_v
            Población total de vectores.

        Returns
        -------
        float
            dEh/dt para los humanos.
        """
        if n_poblacion_v == 0:
            return 0.0
        return (
            self.datos_simulacion.fuerza_infeccion
            * n_infectados_v
            / n_poblacion_v
            * self.susceptibles
            - self.datos_simulacion.tasa_incubacion * self.expuestos
        )

    def calcular_infectados(self) -> float:
        """
        Calcula la derivada de infectados humanos.

        Returns
        -------
        float
            dIh/dt para los humanos.
        """
        return (
            self.datos_simulacion.tasa_incubacion * self.expuestos
            - self.datos_simulacion.tasa_recuperacion * self.infectados
            - self.datos_simulacion.tasa_muerte_h * self.infectados
        )

    def calcular_recuperados(self) -> float:
        """
        Calcula la derivada de recuperados humanos.

        Returns
        -------
        float
            dRh/dt para los humanos.
        """
        return self.datos_simulacion.tasa_recuperacion * self.infectados

    def calcular_muertes(self) -> float:
        """
        Calcula la cantidad de muertos que
        puede haber en la simulacion

        Returns
        -------
        float
            dMh/dt para los humanos.
        """
        return self.datos_simulacion.tasa_muerte_h * self.infectados

    def actualizar_variables(
        self,
        valor_nuevo_susceptibles: float,
        valor_nuevo_expuestos: float,
        valor_nuevo_infectados: float,
        valor_nuevo_recuperados: float,
        valor_nuevo_muertes: float,
    ):
        """
        Funcion que se encarga de actualizar
        las variables de la clase 'Seir' con
        nuevos valores en cada iteracion.

        Parameters
        ----------
        valor_nuevo_susceptibles
            El nuevo valor de los susceptibles humanos.
        valor_nuevo_expuestos
            El nuevo valor de los expuestos humanos.
        valor_nuevo_infectados
            El nuevo valor de los infectados humanos.
        valor_nuevo_recuperados
            El nuevo valor de los recuperados humanos.
        valor_nuevo_muertes
            El nuevo valor de los muertos humanos.
        """
        self.susceptibles = valor_nuevo_susceptibles
        self.expuestos = valor_nuevo_expuestos
        self.infectados = valor_nuevo_infectados
        self.recuperados = valor_nuevo_recuperados
        self.muertos = valor_nuevo_muertes
