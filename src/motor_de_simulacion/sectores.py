from dataclasses import dataclass


class Sector:
    def __init__(self, poblacion: int, ciclo: int):
        self.NUMERO_POBLACION_HUMANA = poblacion
        self.CICLO_AGUA_POR_DIAS = ciclo


class AntiguoAeropuerto(Sector):
    def __init__(self):
        super().__init__(15000, 25)
