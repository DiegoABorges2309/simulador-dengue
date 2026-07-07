from PySide6.QtWidgets import QMainWindow
from diseño_py.simuladorDengueUI import Ui_objeto_inicial
from acciones_botones import AccionesBotones
from comportamientos_widgets import ComportamientoInicialWidgets
from comportamiento_graficas import ComportamientosGraficas


class VentanaPrincipal(QMainWindow):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.ui = Ui_objeto_inicial()
        self.ui.setupUi(self)
        self.acciones_botones = AccionesBotones(self.ui)
        self.comportamientos_iniciales = ComportamientoInicialWidgets(self.ui)
        self.comportamientos_graficas  = ComportamientosGraficas(self.ui)
        self._ajustar_widgets_al_tamano()

    def _ajustar_widgets_al_tamano(self):
        ancho = self.width()
        alto = self.height()
        self.ui.f_frame_principal.setGeometry(0, 0, ancho, alto)
        self.ui.sw_tarjetas_datos.setGeometry(0, 0, ancho, alto)

    def resizeEvent(self, event):
        super().resizeEvent(event)
        self._ajustar_widgets_al_tamano()
