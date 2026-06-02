"""
Definicion del metodo de Euler para resolver,
las ecuaciones diferenciales del metodo SEIR-SEI.
"""

from .seir import Seir
from .sei import Sei


def diccionario_resultados_humano(
    paso_tiempo: float,
    susceptibles: float,
    expuestos: float,
    infectados: float,
    recuperados: float,
    muertos: float,
) -> dict[str, float]:
    """
    Una funcion independiente que se encarga
    de formatear las variables a un diccionario.

    Parameters
    ----------
    paso_tiempo
        Valor del paso del tiempo.
    susceptibles
        Cantidad de susceptibles.
    expuestos
        Cantidad de expuestos.
    infectados
        Cantidad de infectados.
    recuperados
        Cantidad de recuperados.

    Returns
    -------
        Retorna un diccionario de datos, con los
        valores ya expuestos.
    """
    return {
        "tiempo": paso_tiempo,
        "susceptibles": susceptibles,
        "expuestos": expuestos,
        "infectados": infectados,
        "recuperados": recuperados,
        "muertos": muertos,
    }


def diccionario_resultados_vector(
    paso_tiempo: float,
    susceptibles: float,
    expuestos: float,
    infectados: float,
) -> dict[str, float]:
    """
    Una funcion independiente que se encarga
    de formatear las variables a un diccionario.

    Parameters
    ----------
    paso_tiempo
        Valor del paso del tiempo.
    susceptibles
        Cantidad de susceptibles.
    expuestos
        Cantidad de expuestos.
    infectados
        Cantidad de infectados.

    Returns
    -------
        Retorna un diccionario de datos, con los
        valores ya expuestos.
    """
    return {
        "tiempo": paso_tiempo,
        "susceptibles": susceptibles,
        "expuestos": expuestos,
        "infectados": infectados,
    }


class Euler:
    """
    Clase que resuelve las ecuaciones direnciales
    del metodo de SEIR-SEI, ademas donde se implementan
    los metodos para calcularlo.
    """

    def __init__(self, paso_tiempo: float, tiempo_final: float):
        """
        Inicializador de la clase 'Euler'

        Parameters
        ----------
        paso_tiempo
            Valor en decimales que define el avance del tiempo
            en los cuales se haran los calculos hasta llegar al
            tiempo final.
        tiempo_final
            Valor que define el cierre del tiempo que se quiere calcular
            por ejemplo como tiempo inicial (0) y como tiempo final (1)
            los calculos se haran segun el 'paso_tiempo' hasta llegar a (1)
            'tiempo_final'.
        """
        self.paso_tiempo = paso_tiempo
        self.tiempo_final = tiempo_final
        self.dias_reales = 0.0
        self.variables_h = []
        self.variables_v = []

    def calculo_euler(self, modelo_seir: Seir, modelo_sei: Sei):
        """
        Funcion que se encarga de poner el metodo de euler
        en marcha.

        Parameters
        ----------
        modelo_seir
            Variable de tipo 'Seir' la cual dara acceso a
            las ecuaciones de la clase SEIR como a sus
            atributos.
        modelo_sei
            Variable de tipo 'Sei' la cual dara acceso a
            las ecuaciones de la clase SEI como a sus
            atributos.
        """
        self.variables_h.clear()
        self.variables_v.clear()
        pasos = int(self.tiempo_final / self.paso_tiempo)
        self.agregar_variables_h(
            diccionario_resultados_humano(
                self.dias_reales,
                modelo_seir.susceptibles,
                modelo_seir.expuestos,
                modelo_seir.infectados,
                modelo_seir.recuperados,
                modelo_seir.muertos,
            )
        )
        self.agregar_variables_v(
            diccionario_resultados_vector(
                self.dias_reales,
                modelo_sei.susceptibles,
                modelo_sei.expuestos,
                modelo_sei.infectados,
            )
        )
        while self.dias_reales < self.tiempo_final:
            self.dias_reales += self.paso_tiempo
            calculo_nuevo_h = self.recalcular_metodo_seir(modelo_seir, modelo_sei)
            calculo_nuevo_v = self.recalcular_metodo_sei(modelo_sei, modelo_seir)
            self.agregar_variables_h(calculo_nuevo_h)
            self.agregar_variables_v(calculo_nuevo_v)
            self.actualizar_metodo_sei(modelo_sei)
            self.actualizar_metodo_seir(modelo_seir)

    # ====================================
    #          variables de humano
    # ====================================
    def agregar_variables_h(self, calculo_nuevo_h: dict[str, float]):
        """
        Funcion que se encarga de guardar nuevos
        resultados en la lista 'variables_h'.

        Parameters
        ----------
        calculo_nuevo_h
            Diccionario de datos con los resultados.
        """
        self.variables_h.append(calculo_nuevo_h)

    def recalcular_susceptibles_h(self, modelo_seir: Seir, modelo_sei: Sei) -> float:
        """
        Funcion que se encarga de recalcular la
        ecuacion de susceptibles provenientes de la
        clase 'Seir' con nuevos valores.

        Parameters
        ----------
        modelo_seir
            Variable de tipo 'Seir' la cual dara acceso a
            las ecuaciones de la clase SEIR como a sus
            atributos.
        modelo_sei
            Variable de tipo 'Sei' la cual dara acceso a
            las ecuaciones de la clase SEI como a sus
            atributos.

        Returns
        -------
            retorna el resultado del metodo de euler al
            sumar la ultima cantidad de susceptibles por el paso
            de tiempo multiplicado por los susceptibles, calculados
            con nuevos datos.
        """
        susceptibles = self.variables_h[-1]["susceptibles"]
        return susceptibles + self.paso_tiempo * modelo_seir.calcular_susceptibles(
            modelo_sei.infectados, modelo_sei.get_poblacion_total()
        )

    def recalcular_expuestos_h(self, modelo_seir: Seir, modelo_sei: Sei) -> float:
        """
        Funcion que se encarga de recalcular la
        ecuacion de expuestos provenientes de la
        clase 'Seir' con nuevos valores.

        Parameters
        ----------
        modelo_seir
            Variable de tipo 'Seir' la cual dara acceso a
            las ecuaciones de la clase SEIR como a sus
            atributos.
        modelo_sei
            Variable de tipo 'Sei' la cual dara acceso a
            las ecuaciones de la clase SEI como a sus
            atributos.

        Returns
        -------
            retorna el resultado del metodo de euler al
            sumar la ultima cantidad de expuestos por el paso
            de tiempo multiplicado por los expuestos, calculados
            con nuevos datos.
        """
        expuestos = self.variables_h[-1]["expuestos"]
        return expuestos + self.paso_tiempo * modelo_seir.calcular_expuestos(
            modelo_sei.infectados, modelo_sei.get_poblacion_total()
        )

    def recalcular_infectados_h(self, modelo_seir: Seir) -> float:
        """
        Funcion que se encarga de recalcular la
        ecuacion de infectados provenientes de la
        clase 'Seir' con nuevos valores.

        Parameters
        ----------
        modelo_seir
            Variable de tipo 'Seir' la cual dara acceso a
            las ecuaciones de la clase SEIR como a sus
            atributos.
        modelo_sei
            Variable de tipo 'Sei' la cual dara acceso a
            las ecuaciones de la clase SEI como a sus
            atributos.

        Returns
        -------
            retorna el resultado del metodo de euler al
            sumar la ultima cantidad de infectados por el paso
            de tiempo multiplicado por los infectados, calculados
            con nuevos datos.
        """
        infectados = self.variables_h[-1]["infectados"]
        return infectados + self.paso_tiempo * modelo_seir.calcular_infectados()

    def recalcular_recuperados_h(self, modelo_seir: Seir) -> float:
        """
        Funcion que se encarga de recalcular la
        ecuacion de recuperados provenientes de la
        clase 'Seir' con nuevos valores.

        Parameters
        ----------
        modelo_seir
            Variable de tipo 'Seir' la cual dara acceso a
            las ecuaciones de la clase SEIR como a sus
            atributos.
        modelo_sei
            Variable de tipo 'Sei' la cual dara acceso a
            las ecuaciones de la clase SEI como a sus
            atributos.

        Returns
        -------
            retorna el resultado del metodo de euler al
            sumar la ultima cantidad de recuperados por el paso
            de tiempo multiplicado por los recuperados, calculados
            con nuevos datos.
        """
        recuperados = self.variables_h[-1]["recuperados"]
        return recuperados + self.paso_tiempo * modelo_seir.calcular_recuperados()

    def recalcular_muertos_h(self, modelo_seir: Seir) -> float:
        """
        Funcion que se encarga de recalcular la
        ecuacion de recuperados provenientes de la
        clase 'Seir' con nuevos valores.

        Parameters
        ----------
        modelo_seir
            Variable de tipo 'Seir' la cual dara acceso a
            las ecuaciones de la clase SEIR como a sus
            atributos.
        modelo_sei
            Variable de tipo 'Sei' la cual dara acceso a
            las ecuaciones de la clase SEI como a sus
            atributos.

        Returns
        -------
            retorna el resultado del metodo de euler al
            sumar la ultima cantidad de recuperados por el paso
            de tiempo multiplicado por los recuperados, calculados
            con nuevos datos.
        """
        muertos = self.variables_h[-1]["muertos"]
        return muertos + self.paso_tiempo * modelo_seir.calcular_muertes()

    def recalcular_metodo_seir(
        self, modelo_seir: Seir, modelo_sei: Sei
    ) -> dict[str, float]:
        """
        Funcion que se encarga de ejecutar en
        conjunto todos los calculos de los
        humanos con los nuevos datos.

        Parameters
        ----------
        modelo_seir
            Variable de tipo 'Seir' la cual dara acceso a
            las ecuaciones de la clase SEIR como a sus
            atributos.
        modelo_sei
            Variable de tipo 'Sei' la cual dara acceso a
            las ecuaciones de la clase SEI como a sus
            atributos.
        Returns
        -------
            Retorna un diccionario de datos con el valor
            del paso de tiempo, nuevos susceptibles,
            nuevos expuestos, nuevos infectados y nuevos
            recuperados.

        """
        euler_susceptibles = self.recalcular_susceptibles_h(modelo_seir, modelo_sei)
        euler_expuestos = self.recalcular_expuestos_h(modelo_seir, modelo_sei)
        euler_infectados = self.recalcular_infectados_h(modelo_seir)
        euler_recuperados = self.recalcular_recuperados_h(modelo_seir)
        euler_muertos = self.recalcular_muertos_h(modelo_seir)

        return diccionario_resultados_humano(
            self.dias_reales,
            euler_susceptibles,
            euler_expuestos,
            euler_infectados,
            euler_recuperados,
            euler_muertos,
        )

    def actualizar_metodo_seir(self, modelo_seir: Seir):
        """
        Funcion que se encarga de actualizar
        los valores del objeto de la clase
        'Seir' por los calculados por el
        metodo de euler.

        Parameters
        ----------
        modelo_seir
            Variable de tipo 'Seir' la cual dara acceso a
            las ecuaciones de la clase SEIR como a sus
            atributos.
        """
        modelo_seir.actualizar_variables(
            self.variables_h[-1]["susceptibles"],
            self.variables_h[-1]["expuestos"],
            self.variables_h[-1]["infectados"],
            self.variables_h[-1]["recuperados"],
            self.variables_h[-1]["muertos"],
        )

    # ====================================
    #          variables de vector
    # ====================================
    def agregar_variables_v(self, calculos_nuevo_v: dict[str, float]):
        """
        Funcion que se encarga de guardar nuevos
        resultados en la lista 'variables_v'.

        Parameters
        ----------
        calculo_nuevo_v
            Diccionario de datos con los resultados de
            las ecuaciones del vector.
        """
        self.variables_v.append(calculos_nuevo_v)

    def recalcular_susceptibles_v(self, modelo_sei: Sei, modelo_seir: Seir) -> float:
        """
        Funcion que se encarga de recalcular la
        ecuacion de susceptibles provenientes de la
        clase 'Sei' con nuevos valores.

        Parameters
        ----------
        modelo_sei
            Variable de tipo 'Sei' la cual dara acceso a
            las ecuaciones de la clase SEIR como a sus
            atributos.
        modelo_seir
            Variable de tipo 'Seir' la cual dara acceso a
            las ecuaciones de la clase SEI como a sus
            atributos.

        Returns
        -------
            retorna el resultado del metodo de euler al
            sumar la ultima cantidad de susceptibles por el paso
            de tiempo multiplicado por los susceptibles, calculados
            con nuevos datos.
        """
        susceptibles = self.variables_v[-1]["susceptibles"]
        return susceptibles + self.paso_tiempo * modelo_sei.calcular_susceptibles(
            modelo_seir.infectados, modelo_seir.get_poblacion_total()
        )

    def recalcular_expuestos_v(self, modelo_sei: Sei, modelo_seir: Seir) -> float:
        """
        Funcion que se encarga de recalcular la
        ecuacion de expuestos provenientes de la
        clase 'Sei' con nuevos valores.

        Parameters
        ----------
        modelo_sei
            Variable de tipo 'Sei' la cual dara acceso a
            las ecuaciones de la clase SEIR como a sus
            atributos.
        modelo_seir
            Variable de tipo 'Seir' la cual dara acceso a
            las ecuaciones de la clase SEI como a sus
            atributos.

        Returns
        -------
            retorna el resultado del metodo de euler al
            sumar la ultima cantidad de expuestos por el paso
            de tiempo multiplicado por los expuestos, calculados
            con nuevos datos.
        """
        expuestos = self.variables_v[-1]["expuestos"]
        return expuestos + self.paso_tiempo * modelo_sei.calcular_expuestos(
            modelo_seir.infectados, modelo_seir.get_poblacion_total()
        )

    def recalcular_infectados_v(self, modelo_sei: Sei) -> float:
        """
        Funcion que se encarga de recalcular la
        ecuacion de infectados provenientes de la
        clase 'Sei' con nuevos valores.

        Parameters
        ----------
        modelo_sei
            Variable de tipo 'Sei' la cual dara acceso a
            las ecuaciones de la clase SEIR como a sus
            atributos.
        modelo_seir
            Variable de tipo 'Seir' la cual dara acceso a
            las ecuaciones de la clase SEI como a sus
            atributos.

        Returns
        -------
            retorna el resultado del metodo de euler al
            sumar la ultima cantidad de infectados por el paso
            de tiempo multiplicado por los infectados, calculados
            con nuevos datos.
        """
        infectados = self.variables_v[-1]["infectados"]
        return infectados + self.paso_tiempo * modelo_sei.calcular_infectados()

    def recalcular_metodo_sei(
        self, modelo_sei: Sei, modelo_seir: Seir
    ) -> dict[str, float]:
        """
        Funcion que se encarga de ejecutar en
        conjunto todos los calculos de los
        vectores con los nuevos datos.

        Parameters
        ----------
        modelo_sei
            Variable de tipo 'Sei' la cual dara acceso a
            las ecuaciones de la clase SEIR como a sus
            atributos.
        modelo_seir
            Variable de tipo 'Seir' la cual dara acceso a
            las ecuaciones de la clase SEI como a sus
            atributos.
        Returns
        -------
            Retorna un diccionario de datos con el valor
            del paso de tiempo, nuevos susceptibles,
            nuevos expuestos, nuevos infectados.

        """
        euler_susceptibles = self.recalcular_susceptibles_v(modelo_sei, modelo_seir)
        euler_expuestos = self.recalcular_expuestos_v(modelo_sei, modelo_seir)
        euler_infectados = self.recalcular_infectados_v(modelo_sei)

        return diccionario_resultados_vector(
            self.dias_reales, euler_susceptibles, euler_expuestos, euler_infectados
        )

    def actualizar_metodo_sei(self, modelo_sei: Sei):
        """
        Funcion que se encarga de actualizar
        los valores del objeto de la clase
        'Sei' por los calculados por el
        metodo de euler.

        Parameters
        ----------
        modelo_sei
            Variable de tipo 'Sei' la cual dara acceso a
            las ecuaciones de la clase SEI como a sus
            atributos.
        """
        modelo_sei.actualizar_variables(
            self.variables_v[-1]["susceptibles"],
            self.variables_v[-1]["expuestos"],
            self.variables_v[-1]["infectados"],
        )
