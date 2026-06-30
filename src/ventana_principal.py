from PySide6.QtWidgets import QMainWindow
from diseño_py.simuladorDengueUI import Ui_objeto_inicial
from acciones_botones import AccionesBotones
from comportamientos_widgets import ComportamientoInicialWidgets


class VentanaPrincipal(QMainWindow):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.ui = Ui_objeto_inicial()
        self.ui.setupUi(self)
        self.acciones_botones = AccionesBotones(self.ui)
        self.comportamientos_iniciales = ComportamientoInicialWidgets(self.ui)
