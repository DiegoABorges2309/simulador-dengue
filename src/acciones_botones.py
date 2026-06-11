from diseño_py.simuladorDengueUI import Ui_objeto_inicial
from recolectar_datos import RecolectarDatos
from motor_de_simulacion.motor_simulacion import (
    Motor,
    DatosSimulacionHumanos,
    DatosSimulacionVector,
)


class AccionesBotones:
    def __init__(self, ui: Ui_objeto_inicial):
        self.presiono_boton_iniciar_simulacion = False
        self.ui = ui

    def nueva_simulacion(self):
        if not self.presiono_boton_iniciar_simulacion:
            self.presiono_boton_iniciar_simulacion = True
            self.ui.sw_tarjetas_datos.show()
            self.ui.f_previzualizar_mapa.hide()
        else:
            self.presiono_boton_iniciar_simulacion = False
            self.ui.sw_tarjetas_datos.hide()

    def recolectar_datos_simulacion(self) -> list:
        lista_de_widgets = [
            self.ui.sb_humanos_infectados,
            self.ui.sb_poblacion_mosquito,
            self.ui.sb_mosquitos_infectados,
            self.ui.sb_tasa_transmision_h,
            self.ui.sb_dias_recuperacion,
            self.ui.sb_tasa_muerte,
        ]
        return [RecolectarDatos.recolectar_datos(widget) for widget in lista_de_widgets]

    def iniciar_simulacion(self, datos_simulacion: list) -> bool:
        datos_humanos = DatosSimulacionHumanos(
            0.5,
            datos_simulacion[3] / 100,
            0.2,
            1 / datos_simulacion[4],
            datos_simulacion[5] / 100,
        )
        datos_vectores = DatosSimulacionVector(0.5, 0.75, 0.1, 0.07, 0.07)
        engine = Motor(
            15000,
            datos_simulacion[0],
            datos_humanos,
            datos_simulacion[1],
            datos_simulacion[2],
            datos_vectores,
        )

        if engine.iniciar_simulacion():
            self.ui.sw_panel_derecho.setCurrentIndex(1)
            return True
        return False
