from diseño_py.simuladorDengueUI import Ui_objeto_inicial
from motor_de_simulacion.sectores import AntiguoAeropuerto
from widgets.graficas import Graficas, WidgetGrafico
from PySide6.QtWidgets import QVBoxLayout


class ComportamientoInicialWidgets:
    def __init__(self, ui: Ui_objeto_inicial):
        self.ui = ui
        self.iniciar_comportamientos()

    def iniciar_comportamientos(self):
        # colocar items dentro del comboBox de los lugares:
        self.ui.sb_humanos_infectados.setEnabled(False)
        self.ui.cb_lugar.addItem("")
        self.ui.cb_lugar.addItem(AntiguoAeropuerto.__name__, AntiguoAeropuerto())
        self.ui.cb_lugar.currentIndexChanged.connect(self.verificar_lugar)
        # comportamientos de widgets al iniciar el programa:
        # definir tamanos del maximos y minimos del spinbox:
        self.ui.sb_poblacion_mosquito.valueChanged.connect(
            lambda: self.ui.sb_mosquitos_infectados.setMaximum(
                self.ui.sb_poblacion_mosquito.value()
            )
        )
        self.ui.sb_dias_recuperacion.setMaximum(365)
        # iniciar las graficas en la tarjeta central:
        self.crear_graficas()

    # ================================
    #           Funciones:
    # ================================
    def verificar_lugar(self):
        objeto_lugar = self.ui.cb_lugar.itemData(self.ui.cb_lugar.currentIndex())
        self.ui.sb_humanos_infectados.setMaximum(objeto_lugar.NUMERO_POBLACION_HUMANA)
        self.ui.sb_humanos_infectados.setEnabled(True)

    def crear_graficas(self):
        self.graficos = WidgetGrafico(100, 100, 100)
        hola = QVBoxLayout(self.ui.f_grafica_general_humano)
        hola.addWidget(self.graficos)
        print(self.ui.f_grafica_general_humano.layout())
        
