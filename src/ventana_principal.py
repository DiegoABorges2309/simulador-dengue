from PySide6.QtWidgets import QMainWindow, QWidget, QVBoxLayout, QPushButton, QLabel
from diseño_py.simuladorDengueUI import Ui_objeto_inicial
from acciones_botones import AccionesBotones


class ventana_principal(QMainWindow):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.ui = Ui_objeto_inicial()
        self.ui.setupUi(self)
        self.acciones_botones = AccionesBotones(self.ui)
        self.ui.sw_tarjetas_datos.hide()
        self.ui.pb_boton_iniciar_simulacion.clicked.connect(
            lambda: self.acciones_botones.nueva_simulacion()
        )
        self.ui.pb_boton_nueva_simulacion.clicked.connect(
            lambda: self.acciones_botones.iniciar_simulacion(
                self.acciones_botones.recolectar_datos_simulacion()
            )
        )
