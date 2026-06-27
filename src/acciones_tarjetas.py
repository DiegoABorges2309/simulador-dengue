from diseño_py.simuladorDengueUI import Ui_objeto_inicial


class AccionesBotonesTarjetas:
    def __init__(self, clase_ventana: Ui_objeto_inicial):

        self.ui = clase_ventana
        self.ui.sw_tarjetas_datos.hide()
        # Aqui se encuentran las función que reune
        # la conección de los botones con las acciones correspondientes:
        self.establecer_funciones_botones_inicio()
        # Aqui se encuentran las función que reune los comportamientos iniciales:
        self.establecer_comportamientos_tarjetas_iniciales()

    def establecer_funciones_botones_inicio(self) -> None:
        # Boton "nueva simulacion"
        self.ui.pb_boton_nueva_simulacion.clicked.connect(
            self.mostrar_tarjeta_datos_simulacion
        )
        return None

    def establecer_comportamientos_tarjetas_iniciales(self) -> None:
        self.se_presiono_pb_iniciar_simulacion = False
        self.ui.sb_duracion_dias.hide()
        return None

    def mostrar_tarjeta_datos_simulacion(self) -> bool:
        if not self.se_presiono_pb_iniciar_simulacion:
            self.ui.sw_tarjetas_datos.show()
            self.ui.sw_tarjetas_datos.setCurrentIndex(0)
            self.se_presiono_pb_iniciar_simulacion = True
            return True

        self.ui.sw_tarjetas_datos.hide()
        self.se_presiono_pb_iniciar_simulacion = False
        return True

    def cambiar_tarjeta_simulacion(self) -> None:
        self.ui.sw_panel_derecho.setCurrentIndex(1)
        return None
