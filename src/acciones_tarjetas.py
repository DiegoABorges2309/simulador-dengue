from diseño_py.simuladorDengueUI import Ui_objeto_inicial


class AccionesTarjetas:
    def __init__(self, clase_ventana: Ui_objeto_inicial):
        self.se_presiono_pb_iniciar_simulacion = False
        self.ui = clase_ventana
        self.ui.pb_boton_iniciar_simulacion.clicked.connect(
            self.mostrar_tarjeta_datos_simulacion
        )

    def mostrar_tarjeta_datos_simulacion(self) -> bool:
        if not self.se_presiono_pb_iniciar_simulacion:
            self.ui.sw_tarjetas_datos.show()
            self.ui.sw_tarjetas_datos.setCurrentIndex(0)
            self.se_presiono_pb_iniciar_simulacion = True
            return True

        self.ui.sw_tarjetas_datos.hide()
        self.se_presiono_pb_iniciar_simulacion = False
        return True
