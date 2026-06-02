from motor_simulacion import Motor
from seir_sei.seir import DatosSimulacionHumanos
from seir_sei.sei import DatosSimulacionVector
import matplotlib.pyplot as plt


def crear_grafica_humana(d_s, d_e, d_i, d_r, d_m, engine):
    # plt.figure(figsize=(8, 8))
    dias = list(range(len(engine.lista_de_dias)))
    plt.plot(dias, d_s, label="Susceptibles", color="blue")
    plt.plot(dias, d_e, label="Expuestos", color="yellow")
    plt.plot(dias, d_i, label="Infectados", color="red")
    plt.plot(dias, d_r, label="Recuperados", color="green")
    plt.plot(dias, d_m, label="muertos", color="black")

    plt.title("Grafica Humana")
    plt.xlabel("Dias")
    plt.ylabel("Numero de Personas")
    plt.grid(True)

    plt.legend()
    plt.show()


def crear_grafica_vector(d_s, d_e, d_i, engine):
    # plt.figure(figsize=(8, 8))
    dias = list(range(len(engine.lista_de_dias)))
    plt.plot(dias, d_s, label="Susceptibles", color="blue")
    plt.plot(dias, d_e, label="Expuestos", color="yellow")
    plt.plot(dias, d_i, label="Infectados", color="red")

    plt.title("Grafica Vector")
    plt.xlabel("Dias")
    plt.ylabel("Numero de Vectores")
    plt.grid(True)

    plt.legend()
    plt.show()


if __name__ == "__main__":
    datos_h = DatosSimulacionHumanos(0.5, 0.75, 0.2, 0.14, 0.01)
    datos_v = DatosSimulacionVector(0.5, 0.75, 0.1, 0.07, 0.07)
    engine = Motor(10000, 10, datos_h, 20000, 100, datos_v)
    engine.iniciar_simulacion()
    ds = []
    de = []
    di = []
    dr = []
    dm = []

    dsv = []
    dev = []
    div = []
    for index, content in enumerate(engine.lista_de_dias):
        ds.append(content["humano"]["susceptibles"])
        de.append(content["humano"]["expuestos"])
        di.append(content["humano"]["infectados"])
        dr.append(content["humano"]["recuperados"])
        dm.append(content["humano"]["muertos"])

        dsv.append(content["vector"]["susceptibles"])
        dev.append(content["vector"]["expuestos"])
        div.append(content["vector"]["infectados"])
    crear_grafica_humana(ds, de, di, dr, dm, engine)
    crear_grafica_vector(dsv, dev, div, engine)
