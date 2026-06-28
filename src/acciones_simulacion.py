from PySide6.QtWidgets import QSpinBox
from recolectar_datos import RecolectarDatos
from diseño_py.simuladorDengueUI import Ui_objeto_inicial
from dataclasses import dataclass


@dataclass
class EstadoSpinBoxes:
    WIDGETS_ESTADOS = {
        "sb_humanos_infectados": False,
        "sb_poblacion_mosquito": False,
        "sb_mosquitos_infectados": False,
        "sb_tasa_transmision_h": False,
        "sb_dias_recuperacion": False,
        "sb_tasa_muerte": False,
        "sb_duracion_dias": False,
    }


class AccionesSimulacion:
    def __init__(self, ui: Ui_objeto_inicial):
        self.ui = ui
        self.clase_datos = EstadoSpinBoxes()
        # Aqui se encuentran las función que reune
        # la conección de los botones con las acciones correspondientes:
        self.establecer_comportamientos_simualacion_iniciales()
        # Aqui se encuentran las función que reune los comportamientos iniciales:
        self.establecer_funciones_simulacion_botones()

    def establecer_funciones_simulacion_botones(self) -> None:
        # Boton "iniciar simulacion"
        self.ui.pb_boton_iniciar_simulacion.clicked.connect(
            lambda: print("presionaste el boton inicio")
        )
        pass

    def establecer_comportamientos_simualacion_iniciales(self) -> None:
        self.ui.pb_boton_iniciar_simulacion.setEnabled(False)
        self.ui.cb_duracion_simulacion.currentIndexChanged.connect(
            self.mostrar_ocultar_cb_duracion_dias
        )
        #   detectar cambio de valores
        self.vinculacion_acciones_spinbox()

    def vinculacion_acciones_spinbox(self):

        # spinbox: humanos infectados al inicio de la simulacion:
        humano_infectados = self.ui.sb_humanos_infectados
        humano_infectados.valueChanged.connect(
            lambda: self.cambiar_estado_spinboxes(humano_infectados)
        )
        # spinbox: poblacion total de mosquitos:
        poblacion_mosquitos = self.ui.sb_poblacion_mosquito
        poblacion_mosquitos.valueChanged.connect(
            lambda: self.cambiar_estado_spinboxes(poblacion_mosquitos)
        )
        # spinbox: mosquitos infectados al inicio de la simulacion:
        mosquitos_infectados = self.ui.sb_mosquitos_infectados
        mosquitos_infectados.valueChanged.connect(
            lambda: self.cambiar_estado_spinboxes(mosquitos_infectados)
        )
        # spinbox: tasa de transmision humana - mosquito:
        tasa_transmision_h = self.ui.sb_tasa_transmision_h
        tasa_transmision_h.valueChanged.connect(
            lambda: self.cambiar_estado_spinboxes(tasa_transmision_h)
        )
        # spinbox: dias de recuperacion:
        dias_recuperacion = self.ui.sb_dias_recuperacion
        dias_recuperacion.valueChanged.connect(
            lambda: self.cambiar_estado_spinboxes(dias_recuperacion)
        )
        # spinbox: tasa de muerte:
        tasa_muerte = self.ui.sb_tasa_muerte
        tasa_muerte.valueChanged.connect(
            lambda: self.cambiar_estado_spinboxes(tasa_muerte)
        )
        # spinbox: dias de duracion de simulacion:
        dias_duracion_simulacion = self.ui.sb_duracion_dias
        dias_duracion_simulacion.valueChanged.connect(
            lambda: self.cambiar_estado_spinboxes(dias_duracion_simulacion)
        )

    # ================================
    #           Funciones:
    # ================================

    def mostrar_ocultar_cb_duracion_dias(self) -> None:
        indice_combobox: int = self.ui.cb_duracion_simulacion.currentIndex()
        if indice_combobox == 1:
            self.ui.sb_duracion_dias.show()
            self.ui.sb_duracion_dias.setValue(1)
            return None

        self.ui.sb_duracion_dias.hide()
        self.ui.sb_duracion_dias.setValue(0)
        return None

    def cambiar_estado_spinboxes(self, widget: QSpinBox) -> None:
        self.clase_datos.WIDGETS_ESTADOS[widget.objectName()] = (
            RecolectarDatos.verificar_cambio_datos(widget)
        )
        self.cambiar_estado_boton_inicio()

    def cambiar_estado_boton_inicio(self) -> None:
        lista_de_booleanos = []
        for indice, spinbox in enumerate(self.clase_datos.WIDGETS_ESTADOS.values()):
            if indice == 6 and self.ui.sb_duracion_dias.isHidden():
                pass
            else:
                lista_de_booleanos.append(spinbox)
        if all(lista_de_booleanos):
            self.ui.pb_boton_iniciar_simulacion.setEnabled(True)
            self.ui.pb_boton_iniciar_simulacion.setStyleSheet(
                "QPushButton{\n"
                "	image: url(:/svg/Base boton 'Inicio'.svg);\n"
                "	background-color: qlineargradient(spread:pad, x1:0, y1:0, x2:1, y2:1, stop:0 rgba(29, 53, 65, 255), stop:1 rgba(68, 220, 188, 255));\n"
                "	border-radius: 14px;\n"
                "}\n"
                "QPushButton::pressed{\n"
                "	background-color: rgb(29, 53, 65);\n"
                "}"
            )
        else:
            self.ui.pb_boton_iniciar_simulacion.setEnabled(False)
            self.ui.pb_boton_iniciar_simulacion.setStyleSheet(
                "QPushButton{\n"
                "	image: url(:/svg/Base boton 'Inicio'.svg);\n"
                "	background-color: rgb(28, 51, 63);\n"
                "	border-radius: 14px;\n"
                "}\n"
                "QPushButton::pressed{\n"
                "	background-color: rgb(29, 53, 65);\n"
                "}"
            )
