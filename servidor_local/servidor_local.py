import os
import threading
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

carpeta_madre = os.path.dirname(os.path.abspath(__file__))
carpeta_archivos = os.path.join(carpeta_madre, "archivos_locales")

servidor = None


def iniciar_servidor():
    global servidor

    os.chdir(carpeta_archivos)

    servidor = ThreadingHTTPServer(("0.0.0.0", 2000), SimpleHTTPRequestHandler)

    hilo = threading.Thread(target=servidor.serve_forever, daemon=True)
    hilo.start()


def cerrar_servidor():
    global servidor
    if servidor:
        servidor.shutdown()
        servidor.server_close()
