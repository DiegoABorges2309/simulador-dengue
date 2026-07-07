from widgets.graficas import WidgetGrafico
from PySide6.QtWidgets import QVBoxLayout
from ventana_principal import Ui_objeto_inicial


class ComportamientosGraficas:
    def __init__(self, ui: Ui_objeto_inicial):
        self.ui = ui
        self.lista_graficos = []
        self.lista_frames = [
            self.ui.f_grafica_general_humano,
            self.ui.f_grafica_general_mosquito,
        ]
        # Iniciar la creacion de graficas:
        self.inicialiazar_comportamiento_inicial()

    def inicialiazar_comportamiento_inicial(self):
        self.crear_graficas()
        self.asignar_al_frame()

    # =================================
    #         Crear Graficas
    # =================================
    def crear_graficas(self):
        for i in range(len(self.lista_frames)):
            grafica = WidgetGrafico(1000, 1000, 80)
            self.lista_graficos.append(grafica)

    def asignar_al_frame(self):
        for indice in range(len(self.lista_frames)):
            layout_creado = QVBoxLayout(self.lista_frames[indice])
            layout_creado.addWidget(self.lista_graficos[indice])
