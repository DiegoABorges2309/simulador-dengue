from matplotlib.figure import Figure
from matplotlib.backends.backend_qtagg import FigureCanvasQTAgg as FigureCanva
from PySide6.QtWidgets import QWidget, QVBoxLayout, QMainWindow


class Graficas(FigureCanva):
    def __init__(self, parent=None, width=200, height=100, dpi=100):
        figura = Figure(figsize=(width, height), dpi=dpi)
        self.axes = figura.add_subplot(111)
        super().__init__(figure=figura)


class WidgetGrafico(QWidget):
    def __init__(self, width=200, height=100, dpi=100):
        super().__init__()
        self.grafica = Graficas(self, width, height, dpi)
        self.grafica.axes.grid(True)
        self.mi_layout = QVBoxLayout(self)
        self.mi_layout.addWidget(self.grafica)

    def cambiar_axes(self, valores_x=[], valores_y=[]):
        self.grafica.axes.plot(valores_x, valores_y)
        self.grafica.draw()
