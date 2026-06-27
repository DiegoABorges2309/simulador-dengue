from recolectar_datos import RecolectarDatos
from diseño_py.simuladorDengueUI import Ui_objeto_inicial


class AccionesSimulacion:
    def __init__(self, ui: Ui_objeto_inicial):
        self.ui = ui
        # Aqui se encuentran las función que reune
        # la conección de los botones con las acciones correspondientes:
        self.establecer_comportamientos_simualacion_iniciales()
        # Aqui se encuentran las función que reune los comportamientos iniciales:
        self.establecer_funciones_simulacion_botones()

    def establecer_funciones_simulacion_botones(self) -> None:
        # Boton "iniciar simulacion"
        return None

    def establecer_comportamientos_simualacion_iniciales(self) -> None:
        self.ui.cb_duracion_simulacion.currentIndexChanged.connect(
            self.mostrar_ocultar_cb_duracion_dias
        )
        return None

    # ================================
    #           Funciones:
    # ================================

    def mostrar_ocultar_cb_duracion_dias(self) -> None:
        indice_combobox: int = self.ui.cb_duracion_simulacion.currentIndex()
        if indice_combobox == 1:
            self.ui.sb_duracion_dias.show()
            return None

        self.ui.sb_duracion_dias.hide()
        return None
