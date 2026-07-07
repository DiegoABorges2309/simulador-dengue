from dataclasses import dataclass
from PySide6.QtWidgets import QMessageBox, QSpinBox
from recolectar_datos import RecolectarDatos
from diseño_py.simuladorDengueUI import Ui_objeto_inicial
from acciones_tarjetas import AccionesBotonesTarjetas
from motor_de_simulacion.motor_simulacion import (
    DatosSimulacionHumanos,
    DatosSimulacionVector,
    Motor,
)


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
    def __init__(
        self, ui: Ui_objeto_inicial, control_tarjetas: AccionesBotonesTarjetas
    ):
        self.ui = ui
        self.control_tarjetas = control_tarjetas
        self.clase_datos = EstadoSpinBoxes()
        # Aqui se encuentran las función que reune
        # la conección de los botones con las acciones correspondientes:
        self.establecer_comportamientos_simulacion_iniciales()
        # Aqui se encuentran las función que reune los comportamientos iniciales:
        self.establecer_funciones_simulacion_botones()

    def establecer_funciones_simulacion_botones(self) -> None:
        # Boton "iniciar simulacion"
        self.ui.pb_boton_iniciar_simulacion.clicked.connect(
            self.accion_iniciar_simualacion
        )

    def establecer_comportamientos_simulacion_iniciales(self) -> None:
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
        self.cambiar_estado_boton_inicio()
        indice_combobox: int = self.ui.cb_duracion_simulacion.currentIndex()
        if indice_combobox == 1:
            self.ui.sb_duracion_dias.show()
        else:
            self.ui.sb_duracion_dias.hide()
        # realizar comprobacion del estado de datos:
        self.cambiar_estado_boton_inicio()

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

    def recolectar_informacion_simulacion(self) -> list:
        lista_widget = [
            self.ui.sb_tasa_transmision_h,
            self.ui.sb_dias_recuperacion,
            self.ui.sb_tasa_muerte,
            self.ui.sb_humanos_infectados,
            self.ui.sb_poblacion_mosquito,
            self.ui.sb_mosquitos_infectados,
        ]

        spinbox_oculto = self.ui.sb_duracion_dias
        if not spinbox_oculto.isHidden():
            lista_widget.append(spinbox_oculto)
        lista_de_valores = []
        for index, contenido in enumerate(lista_widget):
            lista_de_valores.append(RecolectarDatos().recolectar_datos(contenido))
        lista_de_valores.append(
            self.ui.cb_lugar.itemData(self.ui.cb_lugar.currentIndex())
        )
        return lista_de_valores

    def crear_clases_simulacion(self) -> list:
        datos_recolectados = self.recolectar_informacion_simulacion()
        periodo_de_incubacion = 0.2
        tasa_nacimiento = 0.2
        tasa_mortalidad_mosquito = tasa_nacimiento
        tasa_picaduras = 0.33  # dato basado en una investigacion cientifica: https://pmc.ncbi.nlm.nih.gov/articles/PMC11359999/#sec2-viruses-16-01315
        # otra manera de calcular la tasa de picaduras seria:
        # tasa_picaduras = picaduras por mosquito(int) / humano por mosquito * dia
        datos_sei = DatosSimulacionVector(
            tasa_picaduras,
            datos_recolectados[0] / 100,
            periodo_de_incubacion,
            tasa_nacimiento,
            tasa_mortalidad_mosquito,
        )

        datos_seir = DatosSimulacionHumanos(
            tasa_picaduras,
            datos_recolectados[0] / 100,
            periodo_de_incubacion,
            1 / datos_recolectados[1],
            datos_recolectados[2] / 100,
        )

        return [datos_seir, datos_sei, datos_recolectados]

    def accion_iniciar_simualacion(self):
        datos_iniciales = self.crear_clases_simulacion()
        resultados = []
        motor_simualacion = Motor(
            datos_iniciales[2][-1].NUMERO_POBLACION_HUMANA,
            datos_iniciales[2][3],
            datos_iniciales[0],
            datos_iniciales[2][4],
            datos_iniciales[2][5],
            datos_iniciales[1],
        )
        resultados = motor_simualacion.iniciar_simulacion()
        if resultados is None:
            error_dialog = QMessageBox()
            error_dialog.setWindowTitle("Error")
            error_dialog.setText("Error al ejecutar la simulacion.")
            error_dialog.exec()
        else:
            self.control_tarjetas.cambiar_ventana_resultados_simulacion()
