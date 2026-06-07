import geopandas as gpd
import numpy as np
from shapely.geometry import Point


class Coordenadas:
    def __init__(self, cantidad_puntos: int, ruta_geojson: str):
        self.cantidad_puntos = cantidad_puntos
        self.geojson = gpd.read_file(ruta_geojson)

    def generar_puntos(self) -> list:
        poligono_unificado = self.geojson.geometry.union_all()
        minx, miny, maxx, maxy = poligono_unificado.bounds
        puntos_validos = []

        puntos_faltantes = self.cantidad_puntos
        while puntos_faltantes > 0:
            tamano_lote = int(puntos_faltantes * 1.2)
            x_random = np.random.uniform(minx, maxx, tamano_lote)
            y_random = np.random.uniform(miny, maxy, tamano_lote)

            df_puntos = gpd.GeoSeries(gpd.points_from_xy(x_random, y_random))
            puntos_adentro = df_puntos[df_puntos.intersects(poligono_unificado)]
            nuevos_puntos = list(zip(puntos_adentro.y, puntos_adentro.x))
            puntos_validos.extend(nuevos_puntos)
            puntos_faltantes = self.cantidad_puntos - len(puntos_validos)

        return puntos_validos[: self.cantidad_puntos]


from pathlib import Path

if __name__ == "__main__":
    # Obtiene la carpeta donde está tu script actual
    base_dir = Path(__file__).parent

    # Construye la ruta de forma segura, bajando por las carpetas
    ruta_archivo = (
        base_dir
        / "archivos_locales"
        / "scripts"
        / "geojson"
        / "antaeropuerto_full.geojson"
    )

    # Verifica si realmente existe antes de intentar leerlo
    if ruta_archivo.exists():
        print(f"Archivo encontrado en: {ruta_archivo}")
        gola = Coordenadas(3000, str(ruta_archivo))
        print(gola.generar_puntos())
    else:
        print(f"Error: No se encontró el archivo en {ruta_archivo}")
