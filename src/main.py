from PySide6.QtWidgets import QApplication
import sys
from ventana_principal import ventana_principal

if __name__ == "__main__":
    app = QApplication(sys.argv)
    ventana = ventana_principal()
    ventana.show()
    sys.exit(app.exec())
