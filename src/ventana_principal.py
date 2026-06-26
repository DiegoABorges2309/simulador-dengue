from PySide6.QtWidgets import QMainWindow, QWidget, QVBoxLayout, QPushButton, QLabel
from diseño_py.simuladorDengueUI import Ui_objeto_inicial
from acciones_botones import AccionesBotones


class VentanaPrincipal(QMainWindow):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.ui = Ui_objeto_inicial()
        self.ui.setupUi(self)
        self.acciones_botones = AccionesBotones(self.ui)
