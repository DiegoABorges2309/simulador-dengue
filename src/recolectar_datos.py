from PySide6.QtWidgets import QComboBox, QSpinBox, QMessageBox
from diseño_py.simuladorDengueUI import Ui_objeto_inicial
from PySide6.QtCore import QEvent


class RecolectarDatos:
    def __init__(self):
        pass

    @staticmethod
    def verificar_cambio_datos(widget: QSpinBox) -> bool:
        if widget.value() == 0:
            return False

        return True

    @staticmethod
    def recolectar_datos(
        widget: QSpinBox | QComboBox | None = None,
    ) -> int | str | None:
        if widget is None:
            return None
        if isinstance(widget, QSpinBox):
            valor = widget.value()
            if valor == 0:
                error_dialog = QMessageBox()
                error_dialog.setWindowTitle("Error")
                error_dialog.setText("El valor no puede ser cero.")
                error_dialog.exec()
                return None
            print(valor)
            return valor
        elif isinstance(widget, QComboBox):
            return widget.currentText()
