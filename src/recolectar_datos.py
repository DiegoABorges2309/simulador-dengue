from PySide6.QtWidgets import QComboBox, QSpinBox, QMessageBox


class RecolectarDatos:
    def __init__(self):
        pass

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
        elif isinstance(widget, QComboBox):
            return widget.currentText()
