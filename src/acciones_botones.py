from diseño_py.simuladorDengueUI import Ui_objeto_inicial


def nueva_simulacion(objeto_inicial: Ui_objeto_inicial):
    print("Iniciando nueva simulación...")
    objeto_inicial.sw_tarjetas_datos.raise_()
    objeto_inicial.sw_tarjetas_datos.setCurrentIndex(0)
