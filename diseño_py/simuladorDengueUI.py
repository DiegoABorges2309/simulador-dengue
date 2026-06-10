# -*- coding: utf-8 -*-

################################################################################
## Form generated from reading UI file 'simuladorDengueUI.ui'
##
## Created by: Qt User Interface Compiler version 6.11.0
##
## WARNING! All changes made in this file will be lost when recompiling UI file!
################################################################################

from PySide6.QtCore import (QCoreApplication, QDate, QDateTime, QLocale,
    QMetaObject, QObject, QPoint, QRect,
    QSize, QTime, QUrl, Qt)
from PySide6.QtGui import (QBrush, QColor, QConicalGradient, QCursor,
    QFont, QFontDatabase, QGradient, QIcon,
    QImage, QKeySequence, QLinearGradient, QPainter,
    QPalette, QPixmap, QRadialGradient, QTransform)
from PySide6.QtWidgets import (QApplication, QComboBox, QFrame, QGridLayout,
    QHBoxLayout, QLabel, QPushButton, QSizePolicy,
    QSpinBox, QStackedWidget, QVBoxLayout, QWidget)
import imagenes_rc

class Ui_objeto_inicial(object):
    def setupUi(self, objeto_inicial):
        if not objeto_inicial.objectName():
            objeto_inicial.setObjectName(u"objeto_inicial")
        objeto_inicial.resize(1280, 720)
        objeto_inicial.setMinimumSize(QSize(1280, 720))
        self.f_frame_principal = QFrame(objeto_inicial)
        self.f_frame_principal.setObjectName(u"f_frame_principal")
        self.f_frame_principal.setEnabled(True)
        self.f_frame_principal.setGeometry(QRect(0, 0, 1280, 720))
        self.f_frame_principal.setMinimumSize(QSize(1280, 720))
        self.f_frame_principal.setStyleSheet(u"background-color: rgb(16, 40, 52);")
        self.f_frame_principal.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_frame_principal.setFrameShadow(QFrame.Shadow.Raised)
        self.horizontalLayout = QHBoxLayout(self.f_frame_principal)
        self.horizontalLayout.setSpacing(10)
        self.horizontalLayout.setObjectName(u"horizontalLayout")
        self.horizontalLayout.setContentsMargins(10, 10, 10, 10)
        self.f_panel_izquierdo = QFrame(self.f_frame_principal)
        self.f_panel_izquierdo.setObjectName(u"f_panel_izquierdo")
        sizePolicy = QSizePolicy(QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Expanding)
        sizePolicy.setHorizontalStretch(6)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.f_panel_izquierdo.sizePolicy().hasHeightForWidth())
        self.f_panel_izquierdo.setSizePolicy(sizePolicy)
        self.f_panel_izquierdo.setMinimumSize(QSize(0, 0))
        self.f_panel_izquierdo.setMaximumSize(QSize(100, 16777215))
        self.f_panel_izquierdo.setStyleSheet(u"background-color: rgb(59, 88, 102);\n"
"border-radius: 22px;\n"
"")
        self.f_panel_izquierdo.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_panel_izquierdo.setFrameShadow(QFrame.Shadow.Raised)
        self.verticalLayout = QVBoxLayout(self.f_panel_izquierdo)
        self.verticalLayout.setObjectName(u"verticalLayout")
        self.f_logo = QFrame(self.f_panel_izquierdo)
        self.f_logo.setObjectName(u"f_logo")
        sizePolicy1 = QSizePolicy(QSizePolicy.Policy.Preferred, QSizePolicy.Policy.Preferred)
        sizePolicy1.setHorizontalStretch(0)
        sizePolicy1.setVerticalStretch(0)
        sizePolicy1.setHeightForWidth(self.f_logo.sizePolicy().hasHeightForWidth())
        self.f_logo.setSizePolicy(sizePolicy1)
        self.f_logo.setMinimumSize(QSize(62, 62))
        self.f_logo.setMaximumSize(QSize(16777215, 16777215))
        self.f_logo.setStyleSheet(u"border-image: url(:/svg/Logo SimcoreV2.svg);\n"
"border-radius: 14px;")
        self.f_logo.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_logo.setFrameShadow(QFrame.Shadow.Raised)

        self.verticalLayout.addWidget(self.f_logo)

        self.frame_3 = QFrame(self.f_panel_izquierdo)
        self.frame_3.setObjectName(u"frame_3")
        sizePolicy2 = QSizePolicy(QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Expanding)
        sizePolicy2.setHorizontalStretch(5)
        sizePolicy2.setVerticalStretch(30)
        sizePolicy2.setHeightForWidth(self.frame_3.sizePolicy().hasHeightForWidth())
        self.frame_3.setSizePolicy(sizePolicy2)
        self.frame_3.setMinimumSize(QSize(0, 0))
        self.frame_3.setMaximumSize(QSize(16777215, 16777215))
        self.frame_3.setStyleSheet(u"background:none;")
        self.frame_3.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_3.setFrameShadow(QFrame.Shadow.Raised)

        self.verticalLayout.addWidget(self.frame_3)

        self.pb_boton_iniciar_simulacion = QPushButton(self.f_panel_izquierdo)
        self.pb_boton_iniciar_simulacion.setObjectName(u"pb_boton_iniciar_simulacion")
        self.pb_boton_iniciar_simulacion.setMinimumSize(QSize(62, 62))
        self.pb_boton_iniciar_simulacion.setStyleSheet(u"QPushButton{\n"
"	border-image: url(:/svg/Boton Nueva Simulacion.svg);\n"
"	border-radius: 14px;\n"
"}\n"
"QPushButton::pressed{\n"
"	background-color: rgb(29, 53, 65);\n"
"}")

        self.verticalLayout.addWidget(self.pb_boton_iniciar_simulacion)

        self.pb_boton_historial_simulacion = QPushButton(self.f_panel_izquierdo)
        self.pb_boton_historial_simulacion.setObjectName(u"pb_boton_historial_simulacion")
        self.pb_boton_historial_simulacion.setMinimumSize(QSize(62, 62))
        self.pb_boton_historial_simulacion.setStyleSheet(u"\n"
"QPushButton{\n"
"	border-image: url(:/svg/Historial.svg);\n"
"	border-radius: 14px;\n"
"}\n"
"QPushButton::pressed{\n"
"	background-color: rgb(29, 53, 65);\n"
"}")

        self.verticalLayout.addWidget(self.pb_boton_historial_simulacion)

        self.frame_2 = QFrame(self.f_panel_izquierdo)
        self.frame_2.setObjectName(u"frame_2")
        sizePolicy3 = QSizePolicy(QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Expanding)
        sizePolicy3.setHorizontalStretch(5)
        sizePolicy3.setVerticalStretch(70)
        sizePolicy3.setHeightForWidth(self.frame_2.sizePolicy().hasHeightForWidth())
        self.frame_2.setSizePolicy(sizePolicy3)
        self.frame_2.setMinimumSize(QSize(0, 0))
        self.frame_2.setMaximumSize(QSize(16777215, 16777215))
        self.frame_2.setStyleSheet(u"background:none;")
        self.frame_2.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_2.setFrameShadow(QFrame.Shadow.Raised)

        self.verticalLayout.addWidget(self.frame_2)

        self.pb_boton_nueva_simulacion = QPushButton(self.f_panel_izquierdo)
        self.pb_boton_nueva_simulacion.setObjectName(u"pb_boton_nueva_simulacion")
        self.pb_boton_nueva_simulacion.setMinimumSize(QSize(62, 62))
        self.pb_boton_nueva_simulacion.setStyleSheet(u"QPushButton{\n"
"	border-image: url(:/svg/Base boton 'Inicio' apagado.svg);\n"
"	border-radius: 14px;\n"
"}\n"
"QPushButton::pressed{\n"
"	background-color: rgb(29, 53, 65);\n"
"}")

        self.verticalLayout.addWidget(self.pb_boton_nueva_simulacion)


        self.horizontalLayout.addWidget(self.f_panel_izquierdo)

        self.sw_panel_derecho = QStackedWidget(self.f_frame_principal)
        self.sw_panel_derecho.setObjectName(u"sw_panel_derecho")
        sizePolicy4 = QSizePolicy(QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Expanding)
        sizePolicy4.setHorizontalStretch(94)
        sizePolicy4.setVerticalStretch(0)
        sizePolicy4.setHeightForWidth(self.sw_panel_derecho.sizePolicy().hasHeightForWidth())
        self.sw_panel_derecho.setSizePolicy(sizePolicy4)
        self.sw_panel_derecho.setStyleSheet(u"background:none;\n"
"")
        self.panel_inicial = QWidget()
        self.panel_inicial.setObjectName(u"panel_inicial")
        self.panel_inicial.setStyleSheet(u"background-color: qlineargradient(spread:pad, x1:0, y1:0, x2:1, y2:1, stop:0.0511364 rgba(29, 53, 65, 255), stop:0.954545 rgba(16, 40, 52, 255));\n"
"border-radius: 32px;\n"
"border: 1px solid rgb(162, 170, 173);")
        self.horizontalLayout_2 = QHBoxLayout(self.panel_inicial)
        self.horizontalLayout_2.setObjectName(u"horizontalLayout_2")
        self.f_datos_izquierdos_vacio = QFrame(self.panel_inicial)
        self.f_datos_izquierdos_vacio.setObjectName(u"f_datos_izquierdos_vacio")
        sizePolicy5 = QSizePolicy(QSizePolicy.Policy.Preferred, QSizePolicy.Policy.Preferred)
        sizePolicy5.setHorizontalStretch(20)
        sizePolicy5.setVerticalStretch(0)
        sizePolicy5.setHeightForWidth(self.f_datos_izquierdos_vacio.sizePolicy().hasHeightForWidth())
        self.f_datos_izquierdos_vacio.setSizePolicy(sizePolicy5)
        self.f_datos_izquierdos_vacio.setStyleSheet(u"background: none;\n"
"border: 0px;")
        self.f_datos_izquierdos_vacio.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_datos_izquierdos_vacio.setFrameShadow(QFrame.Shadow.Raised)
        self.verticalLayout_2 = QVBoxLayout(self.f_datos_izquierdos_vacio)
        self.verticalLayout_2.setSpacing(10)
        self.verticalLayout_2.setObjectName(u"verticalLayout_2")
        self.verticalLayout_2.setContentsMargins(0, 0, 0, 0)
        self.f_grafica_humanos = QFrame(self.f_datos_izquierdos_vacio)
        self.f_grafica_humanos.setObjectName(u"f_grafica_humanos")
        sizePolicy6 = QSizePolicy(QSizePolicy.Policy.Preferred, QSizePolicy.Policy.Preferred)
        sizePolicy6.setHorizontalStretch(0)
        sizePolicy6.setVerticalStretch(30)
        sizePolicy6.setHeightForWidth(self.f_grafica_humanos.sizePolicy().hasHeightForWidth())
        self.f_grafica_humanos.setSizePolicy(sizePolicy6)
        self.f_grafica_humanos.setStyleSheet(u"background-color: rgb(32, 59, 73);\n"
"border-radius: 16px;")
        self.f_grafica_humanos.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_grafica_humanos.setFrameShadow(QFrame.Shadow.Raised)
        self.gridLayout_2 = QGridLayout(self.f_grafica_humanos)
        self.gridLayout_2.setObjectName(u"gridLayout_2")
        self.label_2 = QLabel(self.f_grafica_humanos)
        self.label_2.setObjectName(u"label_2")
        font = QFont()
        font.setFamilies([u"Consolas"])
        font.setPointSize(10)
        self.label_2.setFont(font)
        self.label_2.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_2.setAutoFillBackground(False)
        self.label_2.setStyleSheet(u"background: none;\n"
"color: rgb(18, 19, 22);\n"
"color: rgb(208, 212, 228);\n"
"border: 1px solid rgba(162, 170, 173, 100);")

        self.gridLayout_2.addWidget(self.label_2, 0, 0, 1, 1)


        self.verticalLayout_2.addWidget(self.f_grafica_humanos)

        self.f_grafica_total_humanos = QFrame(self.f_datos_izquierdos_vacio)
        self.f_grafica_total_humanos.setObjectName(u"f_grafica_total_humanos")
        sizePolicy6.setHeightForWidth(self.f_grafica_total_humanos.sizePolicy().hasHeightForWidth())
        self.f_grafica_total_humanos.setSizePolicy(sizePolicy6)
        self.f_grafica_total_humanos.setStyleSheet(u"background-color: rgb(32, 59, 73);\n"
"border-radius: 16px;")
        self.f_grafica_total_humanos.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_grafica_total_humanos.setFrameShadow(QFrame.Shadow.Raised)
        self.gridLayout_3 = QGridLayout(self.f_grafica_total_humanos)
        self.gridLayout_3.setObjectName(u"gridLayout_3")
        self.label_3 = QLabel(self.f_grafica_total_humanos)
        self.label_3.setObjectName(u"label_3")
        self.label_3.setFont(font)
        self.label_3.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_3.setAutoFillBackground(False)
        self.label_3.setStyleSheet(u"background: none;\n"
"color: rgb(18, 19, 22);\n"
"color: rgb(208, 212, 228);\n"
"border: 1px solid rgba(162, 170, 173, 100);")

        self.gridLayout_3.addWidget(self.label_3, 0, 0, 1, 1)


        self.verticalLayout_2.addWidget(self.f_grafica_total_humanos)

        self.f_datos_simulacion = QFrame(self.f_datos_izquierdos_vacio)
        self.f_datos_simulacion.setObjectName(u"f_datos_simulacion")
        sizePolicy7 = QSizePolicy(QSizePolicy.Policy.Preferred, QSizePolicy.Policy.Preferred)
        sizePolicy7.setHorizontalStretch(0)
        sizePolicy7.setVerticalStretch(40)
        sizePolicy7.setHeightForWidth(self.f_datos_simulacion.sizePolicy().hasHeightForWidth())
        self.f_datos_simulacion.setSizePolicy(sizePolicy7)
        self.f_datos_simulacion.setStyleSheet(u"background-color: rgba(14, 25, 31, 100);\n"
"border-radius: 16px;")
        self.f_datos_simulacion.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_datos_simulacion.setFrameShadow(QFrame.Shadow.Raised)
        self.gridLayout_4 = QGridLayout(self.f_datos_simulacion)
        self.gridLayout_4.setObjectName(u"gridLayout_4")
        self.label_4 = QLabel(self.f_datos_simulacion)
        self.label_4.setObjectName(u"label_4")
        self.label_4.setFont(font)
        self.label_4.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_4.setAutoFillBackground(False)
        self.label_4.setStyleSheet(u"background: none;\n"
"color: rgb(18, 19, 22);\n"
"color: rgb(208, 212, 228);\n"
"border: 1px solid rgba(162, 170, 173, 100);")

        self.gridLayout_4.addWidget(self.label_4, 0, 0, 1, 1)


        self.verticalLayout_2.addWidget(self.f_datos_simulacion)


        self.horizontalLayout_2.addWidget(self.f_datos_izquierdos_vacio)

        self.f_datos_central_vacio = QFrame(self.panel_inicial)
        self.f_datos_central_vacio.setObjectName(u"f_datos_central_vacio")
        sizePolicy8 = QSizePolicy(QSizePolicy.Policy.Preferred, QSizePolicy.Policy.Preferred)
        sizePolicy8.setHorizontalStretch(50)
        sizePolicy8.setVerticalStretch(0)
        sizePolicy8.setHeightForWidth(self.f_datos_central_vacio.sizePolicy().hasHeightForWidth())
        self.f_datos_central_vacio.setSizePolicy(sizePolicy8)
        self.f_datos_central_vacio.setStyleSheet(u"background: none;\n"
"border: 0px;\n"
"border-radius:0px;")
        self.f_datos_central_vacio.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_datos_central_vacio.setFrameShadow(QFrame.Shadow.Raised)
        self.gridLayout = QGridLayout(self.f_datos_central_vacio)
        self.gridLayout.setObjectName(u"gridLayout")
        self.label = QLabel(self.f_datos_central_vacio)
        self.label.setObjectName(u"label")
        font1 = QFont()
        font1.setFamilies([u"Consolas"])
        font1.setPointSize(14)
        self.label.setFont(font1)
        self.label.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label.setAutoFillBackground(False)
        self.label.setStyleSheet(u"background: none;\n"
"image: url(:/svg/Subtract (1).svg);\n"
"color: rgb(208, 212, 228);\n"
"border: 0px;")

        self.gridLayout.addWidget(self.label, 0, 0, 1, 1)


        self.horizontalLayout_2.addWidget(self.f_datos_central_vacio)

        self.f_datos_derecho_vacio = QFrame(self.panel_inicial)
        self.f_datos_derecho_vacio.setObjectName(u"f_datos_derecho_vacio")
        sizePolicy5.setHeightForWidth(self.f_datos_derecho_vacio.sizePolicy().hasHeightForWidth())
        self.f_datos_derecho_vacio.setSizePolicy(sizePolicy5)
        self.f_datos_derecho_vacio.setStyleSheet(u"background:none;\n"
"border: 0px;\n"
"")
        self.f_datos_derecho_vacio.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_datos_derecho_vacio.setFrameShadow(QFrame.Shadow.Raised)
        self.verticalLayout_8 = QVBoxLayout(self.f_datos_derecho_vacio)
        self.verticalLayout_8.setSpacing(10)
        self.verticalLayout_8.setObjectName(u"verticalLayout_8")
        self.verticalLayout_8.setContentsMargins(0, 0, 0, 0)
        self.f_grafica_total_mosquitos = QFrame(self.f_datos_derecho_vacio)
        self.f_grafica_total_mosquitos.setObjectName(u"f_grafica_total_mosquitos")
        sizePolicy9 = QSizePolicy(QSizePolicy.Policy.Preferred, QSizePolicy.Policy.Preferred)
        sizePolicy9.setHorizontalStretch(0)
        sizePolicy9.setVerticalStretch(25)
        sizePolicy9.setHeightForWidth(self.f_grafica_total_mosquitos.sizePolicy().hasHeightForWidth())
        self.f_grafica_total_mosquitos.setSizePolicy(sizePolicy9)
        self.f_grafica_total_mosquitos.setStyleSheet(u"background-color: rgb(32, 59, 73);\n"
"border-radius: 16px;")
        self.f_grafica_total_mosquitos.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_grafica_total_mosquitos.setFrameShadow(QFrame.Shadow.Raised)
        self.gridLayout_5 = QGridLayout(self.f_grafica_total_mosquitos)
        self.gridLayout_5.setObjectName(u"gridLayout_5")
        self.label_5 = QLabel(self.f_grafica_total_mosquitos)
        self.label_5.setObjectName(u"label_5")
        self.label_5.setFont(font)
        self.label_5.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_5.setAutoFillBackground(False)
        self.label_5.setStyleSheet(u"background: none;\n"
"color: rgb(18, 19, 22);\n"
"color: rgb(208, 212, 228);\n"
"border: 1px solid rgba(162, 170, 173, 100);")

        self.gridLayout_5.addWidget(self.label_5, 0, 0, 1, 1)


        self.verticalLayout_8.addWidget(self.f_grafica_total_mosquitos)

        self.f_grafica_expuestos = QFrame(self.f_datos_derecho_vacio)
        self.f_grafica_expuestos.setObjectName(u"f_grafica_expuestos")
        sizePolicy9.setHeightForWidth(self.f_grafica_expuestos.sizePolicy().hasHeightForWidth())
        self.f_grafica_expuestos.setSizePolicy(sizePolicy9)
        self.f_grafica_expuestos.setStyleSheet(u"background-color: rgb(32, 59, 73);\n"
"border-radius: 16px;")
        self.f_grafica_expuestos.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_grafica_expuestos.setFrameShadow(QFrame.Shadow.Raised)
        self.gridLayout_6 = QGridLayout(self.f_grafica_expuestos)
        self.gridLayout_6.setObjectName(u"gridLayout_6")
        self.label_6 = QLabel(self.f_grafica_expuestos)
        self.label_6.setObjectName(u"label_6")
        self.label_6.setFont(font)
        self.label_6.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_6.setAutoFillBackground(False)
        self.label_6.setStyleSheet(u"background: none;\n"
"color: rgb(18, 19, 22);\n"
"color: rgb(208, 212, 228);\n"
"border: 1px solid rgba(162, 170, 173, 100);")

        self.gridLayout_6.addWidget(self.label_6, 0, 0, 1, 1)


        self.verticalLayout_8.addWidget(self.f_grafica_expuestos)

        self.f_grafica_infectados = QFrame(self.f_datos_derecho_vacio)
        self.f_grafica_infectados.setObjectName(u"f_grafica_infectados")
        sizePolicy9.setHeightForWidth(self.f_grafica_infectados.sizePolicy().hasHeightForWidth())
        self.f_grafica_infectados.setSizePolicy(sizePolicy9)
        self.f_grafica_infectados.setStyleSheet(u"background-color: rgb(32, 59, 73);\n"
"border-radius: 16px;")
        self.f_grafica_infectados.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_grafica_infectados.setFrameShadow(QFrame.Shadow.Raised)
        self.gridLayout_7 = QGridLayout(self.f_grafica_infectados)
        self.gridLayout_7.setObjectName(u"gridLayout_7")
        self.label_7 = QLabel(self.f_grafica_infectados)
        self.label_7.setObjectName(u"label_7")
        self.label_7.setFont(font)
        self.label_7.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_7.setAutoFillBackground(False)
        self.label_7.setStyleSheet(u"background: none;\n"
"color: rgb(18, 19, 22);\n"
"color: rgb(208, 212, 228);\n"
"border: 1px solid rgba(162, 170, 173, 100);")

        self.gridLayout_7.addWidget(self.label_7, 0, 0, 1, 1)


        self.verticalLayout_8.addWidget(self.f_grafica_infectados)

        self.f_grafica_susceptibles = QFrame(self.f_datos_derecho_vacio)
        self.f_grafica_susceptibles.setObjectName(u"f_grafica_susceptibles")
        sizePolicy9.setHeightForWidth(self.f_grafica_susceptibles.sizePolicy().hasHeightForWidth())
        self.f_grafica_susceptibles.setSizePolicy(sizePolicy9)
        self.f_grafica_susceptibles.setStyleSheet(u"background-color: rgb(32, 59, 73);\n"
"border-radius: 16px;")
        self.f_grafica_susceptibles.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_grafica_susceptibles.setFrameShadow(QFrame.Shadow.Raised)
        self.gridLayout_8 = QGridLayout(self.f_grafica_susceptibles)
        self.gridLayout_8.setObjectName(u"gridLayout_8")
        self.label_8 = QLabel(self.f_grafica_susceptibles)
        self.label_8.setObjectName(u"label_8")
        self.label_8.setFont(font)
        self.label_8.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_8.setAutoFillBackground(False)
        self.label_8.setStyleSheet(u"background: none;\n"
"color: rgb(18, 19, 22);\n"
"color: rgb(208, 212, 228);\n"
"border: 1px solid rgba(162, 170, 173, 100);")

        self.gridLayout_8.addWidget(self.label_8, 0, 0, 1, 1)


        self.verticalLayout_8.addWidget(self.f_grafica_susceptibles)


        self.horizontalLayout_2.addWidget(self.f_datos_derecho_vacio)

        self.sw_panel_derecho.addWidget(self.panel_inicial)
        self.panel_datos = QWidget()
        self.panel_datos.setObjectName(u"panel_datos")
        self.panel_datos.setStyleSheet(u"background-color: qlineargradient(spread:pad, x1:0, y1:0, x2:1, y2:1, stop:0.0511364 rgba(29, 53, 65, 255), stop:0.954545 rgba(16, 40, 52, 255));\n"
"border-radius: 32px;\n"
"border: 1px solid rgb(162, 170, 173);")
        self.horizontalLayout_3 = QHBoxLayout(self.panel_datos)
        self.horizontalLayout_3.setObjectName(u"horizontalLayout_3")
        self.f_datos_izquierdos_vacio_2 = QFrame(self.panel_datos)
        self.f_datos_izquierdos_vacio_2.setObjectName(u"f_datos_izquierdos_vacio_2")
        sizePolicy5.setHeightForWidth(self.f_datos_izquierdos_vacio_2.sizePolicy().hasHeightForWidth())
        self.f_datos_izquierdos_vacio_2.setSizePolicy(sizePolicy5)
        self.f_datos_izquierdos_vacio_2.setStyleSheet(u"background: none;\n"
"border: 0px;")
        self.f_datos_izquierdos_vacio_2.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_datos_izquierdos_vacio_2.setFrameShadow(QFrame.Shadow.Raised)
        self.verticalLayout_4 = QVBoxLayout(self.f_datos_izquierdos_vacio_2)
        self.verticalLayout_4.setSpacing(10)
        self.verticalLayout_4.setObjectName(u"verticalLayout_4")
        self.verticalLayout_4.setContentsMargins(0, 0, 0, 0)
        self.f_grafica_humanos_3 = QFrame(self.f_datos_izquierdos_vacio_2)
        self.f_grafica_humanos_3.setObjectName(u"f_grafica_humanos_3")
        sizePolicy6.setHeightForWidth(self.f_grafica_humanos_3.sizePolicy().hasHeightForWidth())
        self.f_grafica_humanos_3.setSizePolicy(sizePolicy6)
        self.f_grafica_humanos_3.setStyleSheet(u"background-color: rgb(32, 59, 73);\n"
"border-radius: 16px;")
        self.f_grafica_humanos_3.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_grafica_humanos_3.setFrameShadow(QFrame.Shadow.Raised)
        self.gridLayout_22 = QGridLayout(self.f_grafica_humanos_3)
        self.gridLayout_22.setObjectName(u"gridLayout_22")

        self.verticalLayout_4.addWidget(self.f_grafica_humanos_3)

        self.f_grafica_total_humanos_3 = QFrame(self.f_datos_izquierdos_vacio_2)
        self.f_grafica_total_humanos_3.setObjectName(u"f_grafica_total_humanos_3")
        sizePolicy6.setHeightForWidth(self.f_grafica_total_humanos_3.sizePolicy().hasHeightForWidth())
        self.f_grafica_total_humanos_3.setSizePolicy(sizePolicy6)
        self.f_grafica_total_humanos_3.setStyleSheet(u"background-color: rgb(32, 59, 73);\n"
"border-radius: 16px;")
        self.f_grafica_total_humanos_3.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_grafica_total_humanos_3.setFrameShadow(QFrame.Shadow.Raised)
        self.gridLayout_23 = QGridLayout(self.f_grafica_total_humanos_3)
        self.gridLayout_23.setObjectName(u"gridLayout_23")

        self.verticalLayout_4.addWidget(self.f_grafica_total_humanos_3)

        self.f_datos_simulacion_3 = QFrame(self.f_datos_izquierdos_vacio_2)
        self.f_datos_simulacion_3.setObjectName(u"f_datos_simulacion_3")
        sizePolicy7.setHeightForWidth(self.f_datos_simulacion_3.sizePolicy().hasHeightForWidth())
        self.f_datos_simulacion_3.setSizePolicy(sizePolicy7)
        self.f_datos_simulacion_3.setStyleSheet(u"background-color: rgba(14, 25, 31, 100);\n"
"border-radius: 16px;")
        self.f_datos_simulacion_3.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_datos_simulacion_3.setFrameShadow(QFrame.Shadow.Raised)
        self.gridLayout_24 = QGridLayout(self.f_datos_simulacion_3)
        self.gridLayout_24.setObjectName(u"gridLayout_24")

        self.verticalLayout_4.addWidget(self.f_datos_simulacion_3)


        self.horizontalLayout_3.addWidget(self.f_datos_izquierdos_vacio_2)

        self.f_datos_central_vacio_2 = QFrame(self.panel_datos)
        self.f_datos_central_vacio_2.setObjectName(u"f_datos_central_vacio_2")
        sizePolicy8.setHeightForWidth(self.f_datos_central_vacio_2.sizePolicy().hasHeightForWidth())
        self.f_datos_central_vacio_2.setSizePolicy(sizePolicy8)
        self.f_datos_central_vacio_2.setStyleSheet(u"background: none;\n"
"border: 0px;\n"
"border-radius:0px;")
        self.f_datos_central_vacio_2.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_datos_central_vacio_2.setFrameShadow(QFrame.Shadow.Raised)
        self.verticalLayout_6 = QVBoxLayout(self.f_datos_central_vacio_2)
        self.verticalLayout_6.setObjectName(u"verticalLayout_6")
        self.f_frame_mapa = QFrame(self.f_datos_central_vacio_2)
        self.f_frame_mapa.setObjectName(u"f_frame_mapa")
        sizePolicy10 = QSizePolicy(QSizePolicy.Policy.Preferred, QSizePolicy.Policy.Preferred)
        sizePolicy10.setHorizontalStretch(0)
        sizePolicy10.setVerticalStretch(70)
        sizePolicy10.setHeightForWidth(self.f_frame_mapa.sizePolicy().hasHeightForWidth())
        self.f_frame_mapa.setSizePolicy(sizePolicy10)
        self.f_frame_mapa.setStyleSheet(u"background-color: rgba(14, 25, 31, 100);")
        self.f_frame_mapa.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_frame_mapa.setFrameShadow(QFrame.Shadow.Raised)

        self.verticalLayout_6.addWidget(self.f_frame_mapa)

        self.frame_4 = QFrame(self.f_datos_central_vacio_2)
        self.frame_4.setObjectName(u"frame_4")
        sizePolicy11 = QSizePolicy(QSizePolicy.Policy.Preferred, QSizePolicy.Policy.Preferred)
        sizePolicy11.setHorizontalStretch(0)
        sizePolicy11.setVerticalStretch(10)
        sizePolicy11.setHeightForWidth(self.frame_4.sizePolicy().hasHeightForWidth())
        self.frame_4.setSizePolicy(sizePolicy11)
        self.frame_4.setMaximumSize(QSize(16777215, 16777215))
        self.frame_4.setStyleSheet(u"background-color: rgba(32, 59, 73, 50);\n"
"border-radius: 16px;")
        self.frame_4.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_4.setFrameShadow(QFrame.Shadow.Raised)
        self.horizontalLayout_4 = QHBoxLayout(self.frame_4)
        self.horizontalLayout_4.setObjectName(u"horizontalLayout_4")
        self.horizontalLayout_4.setContentsMargins(-1, 0, -1, 0)
        self.frame_6 = QFrame(self.frame_4)
        self.frame_6.setObjectName(u"frame_6")
        sizePolicy8.setHeightForWidth(self.frame_6.sizePolicy().hasHeightForWidth())
        self.frame_6.setSizePolicy(sizePolicy8)
        self.frame_6.setStyleSheet(u"background:none;")
        self.frame_6.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_6.setFrameShadow(QFrame.Shadow.Raised)

        self.horizontalLayout_4.addWidget(self.frame_6)

        self.frame_7 = QFrame(self.frame_4)
        self.frame_7.setObjectName(u"frame_7")
        sizePolicy12 = QSizePolicy(QSizePolicy.Policy.Preferred, QSizePolicy.Policy.Preferred)
        sizePolicy12.setHorizontalStretch(30)
        sizePolicy12.setVerticalStretch(0)
        sizePolicy12.setHeightForWidth(self.frame_7.sizePolicy().hasHeightForWidth())
        self.frame_7.setSizePolicy(sizePolicy12)
        self.frame_7.setStyleSheet(u"background-color: rgb(32, 59, 73);\n"
"border-radius:16px;")
        self.frame_7.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_7.setFrameShadow(QFrame.Shadow.Raised)
        self.verticalLayout_5 = QVBoxLayout(self.frame_7)
        self.verticalLayout_5.setSpacing(0)
        self.verticalLayout_5.setObjectName(u"verticalLayout_5")
        self.verticalLayout_5.setContentsMargins(2, 2, 2, 2)
        self.frame_10 = QFrame(self.frame_7)
        self.frame_10.setObjectName(u"frame_10")
        sizePolicy6.setHeightForWidth(self.frame_10.sizePolicy().hasHeightForWidth())
        self.frame_10.setSizePolicy(sizePolicy6)
        self.frame_10.setStyleSheet(u"background:none;")
        self.frame_10.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_10.setFrameShadow(QFrame.Shadow.Raised)
        self.gridLayout_21 = QGridLayout(self.frame_10)
        self.gridLayout_21.setObjectName(u"gridLayout_21")
        self.label_17 = QLabel(self.frame_10)
        self.label_17.setObjectName(u"label_17")
        self.label_17.setFont(font)
        self.label_17.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_17.setAutoFillBackground(False)
        self.label_17.setStyleSheet(u"background: none;\n"
"color: rgb(18, 19, 22);\n"
"color: rgb(208, 212, 228);\n"
"border: 0px;")

        self.gridLayout_21.addWidget(self.label_17, 0, 0, 1, 1)


        self.verticalLayout_5.addWidget(self.frame_10)

        self.frame_9 = QFrame(self.frame_7)
        self.frame_9.setObjectName(u"frame_9")
        sizePolicy10.setHeightForWidth(self.frame_9.sizePolicy().hasHeightForWidth())
        self.frame_9.setSizePolicy(sizePolicy10)
        self.frame_9.setStyleSheet(u"background:none;")
        self.frame_9.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_9.setFrameShadow(QFrame.Shadow.Raised)
        self.gridLayout_25 = QGridLayout(self.frame_9)
        self.gridLayout_25.setObjectName(u"gridLayout_25")
        self.l_contador = QLabel(self.frame_9)
        self.l_contador.setObjectName(u"l_contador")
        font2 = QFont()
        font2.setFamilies([u"Unispace"])
        font2.setPointSize(28)
        font2.setBold(True)
        self.l_contador.setFont(font2)
        self.l_contador.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.l_contador.setAutoFillBackground(False)
        self.l_contador.setStyleSheet(u"background: none;\n"
"color: rgb(18, 19, 22);\n"
"color: rgb(208, 212, 228);\n"
"border: 0px;")

        self.gridLayout_25.addWidget(self.l_contador, 0, 0, 1, 1)


        self.verticalLayout_5.addWidget(self.frame_9)


        self.horizontalLayout_4.addWidget(self.frame_7)

        self.frame_8 = QFrame(self.frame_4)
        self.frame_8.setObjectName(u"frame_8")
        sizePolicy8.setHeightForWidth(self.frame_8.sizePolicy().hasHeightForWidth())
        self.frame_8.setSizePolicy(sizePolicy8)
        self.frame_8.setStyleSheet(u"background:none;")
        self.frame_8.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_8.setFrameShadow(QFrame.Shadow.Raised)

        self.horizontalLayout_4.addWidget(self.frame_8)


        self.verticalLayout_6.addWidget(self.frame_4)

        self.frame_5 = QFrame(self.f_datos_central_vacio_2)
        self.frame_5.setObjectName(u"frame_5")
        sizePolicy9.setHeightForWidth(self.frame_5.sizePolicy().hasHeightForWidth())
        self.frame_5.setSizePolicy(sizePolicy9)
        self.frame_5.setStyleSheet(u"background-color: rgb(32, 59, 73);\n"
"border-radius: 16px;")
        self.frame_5.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_5.setFrameShadow(QFrame.Shadow.Raised)

        self.verticalLayout_6.addWidget(self.frame_5)


        self.horizontalLayout_3.addWidget(self.f_datos_central_vacio_2)

        self.f_datos_derecho_vacio_2 = QFrame(self.panel_datos)
        self.f_datos_derecho_vacio_2.setObjectName(u"f_datos_derecho_vacio_2")
        sizePolicy5.setHeightForWidth(self.f_datos_derecho_vacio_2.sizePolicy().hasHeightForWidth())
        self.f_datos_derecho_vacio_2.setSizePolicy(sizePolicy5)
        self.f_datos_derecho_vacio_2.setStyleSheet(u"background:none;\n"
"border: 0px;\n"
"")
        self.f_datos_derecho_vacio_2.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_datos_derecho_vacio_2.setFrameShadow(QFrame.Shadow.Raised)
        self.verticalLayout_10 = QVBoxLayout(self.f_datos_derecho_vacio_2)
        self.verticalLayout_10.setSpacing(10)
        self.verticalLayout_10.setObjectName(u"verticalLayout_10")
        self.verticalLayout_10.setContentsMargins(0, 0, 0, 0)
        self.f_grafica_total_mosquitos_3 = QFrame(self.f_datos_derecho_vacio_2)
        self.f_grafica_total_mosquitos_3.setObjectName(u"f_grafica_total_mosquitos_3")
        sizePolicy9.setHeightForWidth(self.f_grafica_total_mosquitos_3.sizePolicy().hasHeightForWidth())
        self.f_grafica_total_mosquitos_3.setSizePolicy(sizePolicy9)
        self.f_grafica_total_mosquitos_3.setStyleSheet(u"background-color: rgb(32, 59, 73);\n"
"border-radius: 16px;")
        self.f_grafica_total_mosquitos_3.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_grafica_total_mosquitos_3.setFrameShadow(QFrame.Shadow.Raised)
        self.gridLayout_17 = QGridLayout(self.f_grafica_total_mosquitos_3)
        self.gridLayout_17.setObjectName(u"gridLayout_17")

        self.verticalLayout_10.addWidget(self.f_grafica_total_mosquitos_3)

        self.f_grafica_expuestos_3 = QFrame(self.f_datos_derecho_vacio_2)
        self.f_grafica_expuestos_3.setObjectName(u"f_grafica_expuestos_3")
        sizePolicy9.setHeightForWidth(self.f_grafica_expuestos_3.sizePolicy().hasHeightForWidth())
        self.f_grafica_expuestos_3.setSizePolicy(sizePolicy9)
        self.f_grafica_expuestos_3.setStyleSheet(u"background-color: rgb(32, 59, 73);\n"
"border-radius: 16px;")
        self.f_grafica_expuestos_3.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_grafica_expuestos_3.setFrameShadow(QFrame.Shadow.Raised)
        self.gridLayout_18 = QGridLayout(self.f_grafica_expuestos_3)
        self.gridLayout_18.setObjectName(u"gridLayout_18")

        self.verticalLayout_10.addWidget(self.f_grafica_expuestos_3)

        self.f_grafica_infectados_3 = QFrame(self.f_datos_derecho_vacio_2)
        self.f_grafica_infectados_3.setObjectName(u"f_grafica_infectados_3")
        sizePolicy9.setHeightForWidth(self.f_grafica_infectados_3.sizePolicy().hasHeightForWidth())
        self.f_grafica_infectados_3.setSizePolicy(sizePolicy9)
        self.f_grafica_infectados_3.setStyleSheet(u"background-color: rgb(32, 59, 73);\n"
"border-radius: 16px;")
        self.f_grafica_infectados_3.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_grafica_infectados_3.setFrameShadow(QFrame.Shadow.Raised)
        self.gridLayout_19 = QGridLayout(self.f_grafica_infectados_3)
        self.gridLayout_19.setObjectName(u"gridLayout_19")

        self.verticalLayout_10.addWidget(self.f_grafica_infectados_3)

        self.f_grafica_susceptibles_3 = QFrame(self.f_datos_derecho_vacio_2)
        self.f_grafica_susceptibles_3.setObjectName(u"f_grafica_susceptibles_3")
        sizePolicy9.setHeightForWidth(self.f_grafica_susceptibles_3.sizePolicy().hasHeightForWidth())
        self.f_grafica_susceptibles_3.setSizePolicy(sizePolicy9)
        self.f_grafica_susceptibles_3.setStyleSheet(u"background-color: rgb(32, 59, 73);\n"
"border-radius: 16px;")
        self.f_grafica_susceptibles_3.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_grafica_susceptibles_3.setFrameShadow(QFrame.Shadow.Raised)
        self.gridLayout_20 = QGridLayout(self.f_grafica_susceptibles_3)
        self.gridLayout_20.setObjectName(u"gridLayout_20")

        self.verticalLayout_10.addWidget(self.f_grafica_susceptibles_3)


        self.horizontalLayout_3.addWidget(self.f_datos_derecho_vacio_2)

        self.sw_panel_derecho.addWidget(self.panel_datos)

        self.horizontalLayout.addWidget(self.sw_panel_derecho)

        self.sw_tarjetas_datos = QStackedWidget(objeto_inicial)
        self.sw_tarjetas_datos.setObjectName(u"sw_tarjetas_datos")
        self.sw_tarjetas_datos.setEnabled(True)
        self.sw_tarjetas_datos.setGeometry(QRect(0, 0, 1280, 720))
        self.sw_tarjetas_datos.setMinimumSize(QSize(1280, 0))
        self.sw_tarjetas_datos.setStyleSheet(u"background: transparent;")
        self.ingresar_datos = QWidget()
        self.ingresar_datos.setObjectName(u"ingresar_datos")
        self.ingresar_datos.setStyleSheet(u"background:transparent;")
        self.f_frame_ingresar_datos = QFrame(self.ingresar_datos)
        self.f_frame_ingresar_datos.setObjectName(u"f_frame_ingresar_datos")
        self.f_frame_ingresar_datos.setGeometry(QRect(100, 170, 371, 531))
        self.f_frame_ingresar_datos.setMinimumSize(QSize(371, 531))
        self.f_frame_ingresar_datos.setStyleSheet(u"background-color: qlineargradient(spread:pad, x1:0, y1:0, x2:1, y2:0, stop:0.0511364 rgba(29, 53, 65, 255), stop:1 rgba(16, 40, 52, 255));\n"
"border: 1px solid rgba(162, 170, 173, 100);\n"
"border-radius: 16px;\n"
"color: rgb(208, 212, 228);")
        self.f_frame_ingresar_datos.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_frame_ingresar_datos.setFrameShadow(QFrame.Shadow.Raised)
        self.verticalLayout_9 = QVBoxLayout(self.f_frame_ingresar_datos)
        self.verticalLayout_9.setSpacing(10)
        self.verticalLayout_9.setObjectName(u"verticalLayout_9")
        self.verticalLayout_9.setContentsMargins(12, 12, 12, 12)
        self.label_9 = QLabel(self.f_frame_ingresar_datos)
        self.label_9.setObjectName(u"label_9")
        font3 = QFont()
        font3.setFamilies([u"Inter"])
        font3.setPointSize(14)
        self.label_9.setFont(font3)
        self.label_9.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_9.setAutoFillBackground(False)
        self.label_9.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(208, 212, 228);\n"
"")

        self.verticalLayout_9.addWidget(self.label_9)

        self.frame_18 = QFrame(self.f_frame_ingresar_datos)
        self.frame_18.setObjectName(u"frame_18")
        self.frame_18.setStyleSheet(u"border: 1px solid rgba(162, 170, 173, 60);\n"
"border:none;\n"
"border-radius:10px;")
        self.frame_18.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_18.setFrameShadow(QFrame.Shadow.Raised)
        self.verticalLayout_7 = QVBoxLayout(self.frame_18)
        self.verticalLayout_7.setObjectName(u"verticalLayout_7")
        self.label_18 = QLabel(self.frame_18)
        self.label_18.setObjectName(u"label_18")
        font4 = QFont()
        font4.setFamilies([u"Inter"])
        font4.setPointSize(12)
        self.label_18.setFont(font4)
        self.label_18.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_18.setAutoFillBackground(False)
        self.label_18.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(208, 212, 228);\n"
"")

        self.verticalLayout_7.addWidget(self.label_18)

        self.frame_19 = QFrame(self.frame_18)
        self.frame_19.setObjectName(u"frame_19")
        self.frame_19.setStyleSheet(u"border:none;")
        self.frame_19.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_19.setFrameShadow(QFrame.Shadow.Raised)
        self.horizontalLayout_12 = QHBoxLayout(self.frame_19)
        self.horizontalLayout_12.setObjectName(u"horizontalLayout_12")
        self.horizontalLayout_12.setContentsMargins(2, 2, 2, 2)
        self.cb_lugar = QComboBox(self.frame_19)
        self.cb_lugar.addItem("")
        self.cb_lugar.addItem("")
        self.cb_lugar.setObjectName(u"cb_lugar")
        sizePolicy13 = QSizePolicy(QSizePolicy.Policy.Preferred, QSizePolicy.Policy.Expanding)
        sizePolicy13.setHorizontalStretch(0)
        sizePolicy13.setVerticalStretch(0)
        sizePolicy13.setHeightForWidth(self.cb_lugar.sizePolicy().hasHeightForWidth())
        self.cb_lugar.setSizePolicy(sizePolicy13)
        self.cb_lugar.setMaximumSize(QSize(250, 16777215))
        self.cb_lugar.setFont(font4)
        self.cb_lugar.setStyleSheet(u"border-radius: 5px;")

        self.horizontalLayout_12.addWidget(self.cb_lugar)


        self.verticalLayout_7.addWidget(self.frame_19)


        self.verticalLayout_9.addWidget(self.frame_18)

        self.frame_12 = QFrame(self.f_frame_ingresar_datos)
        self.frame_12.setObjectName(u"frame_12")
        sizePolicy13.setHeightForWidth(self.frame_12.sizePolicy().hasHeightForWidth())
        self.frame_12.setSizePolicy(sizePolicy13)
        self.frame_12.setStyleSheet(u"border: 1px solid rgba(162, 170, 173, 60);\n"
"border:none;\n"
"border-radius:10px;")
        self.frame_12.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_12.setFrameShadow(QFrame.Shadow.Raised)
        self.horizontalLayout_7 = QHBoxLayout(self.frame_12)
        self.horizontalLayout_7.setSpacing(2)
        self.horizontalLayout_7.setObjectName(u"horizontalLayout_7")
        self.horizontalLayout_7.setContentsMargins(5, 5, 5, 5)
        self.label_12 = QLabel(self.frame_12)
        self.label_12.setObjectName(u"label_12")
        self.label_12.setFont(font4)
        self.label_12.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_12.setAutoFillBackground(False)
        self.label_12.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(208, 212, 228);\n"
"")

        self.horizontalLayout_7.addWidget(self.label_12)

        self.sb_humanos_infectados = QSpinBox(self.frame_12)
        self.sb_humanos_infectados.setObjectName(u"sb_humanos_infectados")
        sizePolicy14 = QSizePolicy(QSizePolicy.Policy.Minimum, QSizePolicy.Policy.Expanding)
        sizePolicy14.setHorizontalStretch(0)
        sizePolicy14.setVerticalStretch(0)
        sizePolicy14.setHeightForWidth(self.sb_humanos_infectados.sizePolicy().hasHeightForWidth())
        self.sb_humanos_infectados.setSizePolicy(sizePolicy14)
        self.sb_humanos_infectados.setMaximumSize(QSize(120, 16777215))
        self.sb_humanos_infectados.setFont(font4)
        self.sb_humanos_infectados.setStyleSheet(u"color: rgb(162, 170, 173);\n"
"border-radius: 5px;\n"
"border:none;")
        self.sb_humanos_infectados.setMaximum(100000000)

        self.horizontalLayout_7.addWidget(self.sb_humanos_infectados)


        self.verticalLayout_9.addWidget(self.frame_12)

        self.frame = QFrame(self.f_frame_ingresar_datos)
        self.frame.setObjectName(u"frame")
        self.frame.setStyleSheet(u"border: 1px solid rgba(162, 170, 173, 60);\n"
"border:none;\n"
"border-radius:10px;")
        self.frame.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame.setFrameShadow(QFrame.Shadow.Raised)
        self.horizontalLayout_5 = QHBoxLayout(self.frame)
        self.horizontalLayout_5.setSpacing(2)
        self.horizontalLayout_5.setObjectName(u"horizontalLayout_5")
        self.horizontalLayout_5.setContentsMargins(5, 5, 5, 5)
        self.label_10 = QLabel(self.frame)
        self.label_10.setObjectName(u"label_10")
        self.label_10.setFont(font4)
        self.label_10.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_10.setAutoFillBackground(False)
        self.label_10.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(208, 212, 228);\n"
"")

        self.horizontalLayout_5.addWidget(self.label_10)

        self.sb_poblacion_mosquito = QSpinBox(self.frame)
        self.sb_poblacion_mosquito.setObjectName(u"sb_poblacion_mosquito")
        sizePolicy14.setHeightForWidth(self.sb_poblacion_mosquito.sizePolicy().hasHeightForWidth())
        self.sb_poblacion_mosquito.setSizePolicy(sizePolicy14)
        self.sb_poblacion_mosquito.setMaximumSize(QSize(120, 16777215))
        self.sb_poblacion_mosquito.setFont(font4)
        self.sb_poblacion_mosquito.setStyleSheet(u"color: rgb(162, 170, 173);\n"
"border-radius: 5px;\n"
"border:none;")
        self.sb_poblacion_mosquito.setMaximum(100000000)

        self.horizontalLayout_5.addWidget(self.sb_poblacion_mosquito)


        self.verticalLayout_9.addWidget(self.frame)

        self.frame_11 = QFrame(self.f_frame_ingresar_datos)
        self.frame_11.setObjectName(u"frame_11")
        self.frame_11.setStyleSheet(u"border: 1px solid rgba(162, 170, 173, 60);\n"
"border:none;\n"
"border-radius:10px;")
        self.frame_11.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_11.setFrameShadow(QFrame.Shadow.Raised)
        self.horizontalLayout_6 = QHBoxLayout(self.frame_11)
        self.horizontalLayout_6.setSpacing(2)
        self.horizontalLayout_6.setObjectName(u"horizontalLayout_6")
        self.horizontalLayout_6.setContentsMargins(5, 5, 5, 5)
        self.label_11 = QLabel(self.frame_11)
        self.label_11.setObjectName(u"label_11")
        self.label_11.setFont(font4)
        self.label_11.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_11.setAutoFillBackground(False)
        self.label_11.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(208, 212, 228);\n"
"")

        self.horizontalLayout_6.addWidget(self.label_11)

        self.sb_mosquitos_infectados = QSpinBox(self.frame_11)
        self.sb_mosquitos_infectados.setObjectName(u"sb_mosquitos_infectados")
        sizePolicy14.setHeightForWidth(self.sb_mosquitos_infectados.sizePolicy().hasHeightForWidth())
        self.sb_mosquitos_infectados.setSizePolicy(sizePolicy14)
        self.sb_mosquitos_infectados.setMaximumSize(QSize(120, 16777215))
        self.sb_mosquitos_infectados.setFont(font4)
        self.sb_mosquitos_infectados.setStyleSheet(u"color: rgb(162, 170, 173);\n"
"border:none;\n"
"border-radius: 5px;")
        self.sb_mosquitos_infectados.setMaximum(100000000)

        self.horizontalLayout_6.addWidget(self.sb_mosquitos_infectados)


        self.verticalLayout_9.addWidget(self.frame_11)

        self.frame_13 = QFrame(self.f_frame_ingresar_datos)
        self.frame_13.setObjectName(u"frame_13")
        self.frame_13.setStyleSheet(u"border: 1px solid rgba(162, 170, 173, 60);\n"
"border:none;\n"
"border-radius:10px;")
        self.frame_13.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_13.setFrameShadow(QFrame.Shadow.Raised)
        self.verticalLayout_3 = QVBoxLayout(self.frame_13)
        self.verticalLayout_3.setObjectName(u"verticalLayout_3")
        self.label_13 = QLabel(self.frame_13)
        self.label_13.setObjectName(u"label_13")
        self.label_13.setFont(font4)
        self.label_13.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_13.setAutoFillBackground(False)
        self.label_13.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(208, 212, 228);\n"
"")

        self.verticalLayout_3.addWidget(self.label_13)

        self.frame_14 = QFrame(self.frame_13)
        self.frame_14.setObjectName(u"frame_14")
        self.frame_14.setStyleSheet(u"border:none;")
        self.frame_14.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_14.setFrameShadow(QFrame.Shadow.Raised)
        self.horizontalLayout_8 = QHBoxLayout(self.frame_14)
        self.horizontalLayout_8.setObjectName(u"horizontalLayout_8")
        self.horizontalLayout_8.setContentsMargins(2, 2, 2, 2)
        self.cb_duracion_simulacion = QComboBox(self.frame_14)
        self.cb_duracion_simulacion.addItem("")
        self.cb_duracion_simulacion.addItem("")
        self.cb_duracion_simulacion.setObjectName(u"cb_duracion_simulacion")
        sizePolicy13.setHeightForWidth(self.cb_duracion_simulacion.sizePolicy().hasHeightForWidth())
        self.cb_duracion_simulacion.setSizePolicy(sizePolicy13)
        self.cb_duracion_simulacion.setMaximumSize(QSize(165, 16777215))
        self.cb_duracion_simulacion.setFont(font4)
        self.cb_duracion_simulacion.setStyleSheet(u"border-radius: 5px;")

        self.horizontalLayout_8.addWidget(self.cb_duracion_simulacion)

        self.sb_duracion_dias = QSpinBox(self.frame_14)
        self.sb_duracion_dias.setObjectName(u"sb_duracion_dias")
        sizePolicy14.setHeightForWidth(self.sb_duracion_dias.sizePolicy().hasHeightForWidth())
        self.sb_duracion_dias.setSizePolicy(sizePolicy14)
        self.sb_duracion_dias.setMaximumSize(QSize(120, 16777215))
        self.sb_duracion_dias.setFont(font4)
        self.sb_duracion_dias.setStyleSheet(u"color: rgb(162, 170, 173);\n"
"border-radius: 5px;")
        self.sb_duracion_dias.setMaximum(200)

        self.horizontalLayout_8.addWidget(self.sb_duracion_dias)


        self.verticalLayout_3.addWidget(self.frame_14)


        self.verticalLayout_9.addWidget(self.frame_13)

        self.frame_15 = QFrame(self.f_frame_ingresar_datos)
        self.frame_15.setObjectName(u"frame_15")
        self.frame_15.setStyleSheet(u"border: 1px solid rgba(162, 170, 173, 60);\n"
"border:none;\n"
"border-radius:10px;")
        self.frame_15.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_15.setFrameShadow(QFrame.Shadow.Raised)
        self.horizontalLayout_9 = QHBoxLayout(self.frame_15)
        self.horizontalLayout_9.setSpacing(2)
        self.horizontalLayout_9.setObjectName(u"horizontalLayout_9")
        self.horizontalLayout_9.setContentsMargins(5, 5, 5, 5)
        self.label_14 = QLabel(self.frame_15)
        self.label_14.setObjectName(u"label_14")
        self.label_14.setFont(font4)
        self.label_14.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_14.setAutoFillBackground(False)
        self.label_14.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(208, 212, 228);\n"
"")

        self.horizontalLayout_9.addWidget(self.label_14)

        self.sb_tasa_transmision_h = QSpinBox(self.frame_15)
        self.sb_tasa_transmision_h.setObjectName(u"sb_tasa_transmision_h")
        sizePolicy14.setHeightForWidth(self.sb_tasa_transmision_h.sizePolicy().hasHeightForWidth())
        self.sb_tasa_transmision_h.setSizePolicy(sizePolicy14)
        self.sb_tasa_transmision_h.setMaximumSize(QSize(120, 16777215))
        self.sb_tasa_transmision_h.setFont(font4)
        self.sb_tasa_transmision_h.setStyleSheet(u"color: rgb(162, 170, 173);\n"
"border-radius: 5px;\n"
"border:none;")
        self.sb_tasa_transmision_h.setMaximum(99)

        self.horizontalLayout_9.addWidget(self.sb_tasa_transmision_h)


        self.verticalLayout_9.addWidget(self.frame_15)

        self.frame_16 = QFrame(self.f_frame_ingresar_datos)
        self.frame_16.setObjectName(u"frame_16")
        self.frame_16.setStyleSheet(u"border: 1px solid rgba(162, 170, 173, 60);\n"
"border:none;\n"
"border-radius:10px;")
        self.frame_16.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_16.setFrameShadow(QFrame.Shadow.Raised)
        self.horizontalLayout_10 = QHBoxLayout(self.frame_16)
        self.horizontalLayout_10.setSpacing(2)
        self.horizontalLayout_10.setObjectName(u"horizontalLayout_10")
        self.horizontalLayout_10.setContentsMargins(5, 5, 5, 5)
        self.label_15 = QLabel(self.frame_16)
        self.label_15.setObjectName(u"label_15")
        self.label_15.setFont(font4)
        self.label_15.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_15.setAutoFillBackground(False)
        self.label_15.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(208, 212, 228);\n"
"")

        self.horizontalLayout_10.addWidget(self.label_15)

        self.sb_dias_recuperacion = QSpinBox(self.frame_16)
        self.sb_dias_recuperacion.setObjectName(u"sb_dias_recuperacion")
        sizePolicy14.setHeightForWidth(self.sb_dias_recuperacion.sizePolicy().hasHeightForWidth())
        self.sb_dias_recuperacion.setSizePolicy(sizePolicy14)
        self.sb_dias_recuperacion.setMaximumSize(QSize(120, 16777215))
        self.sb_dias_recuperacion.setFont(font4)
        self.sb_dias_recuperacion.setStyleSheet(u"color: rgb(162, 170, 173);\n"
"border-radius: 5px;\n"
"border:none;")
        self.sb_dias_recuperacion.setMaximum(100)

        self.horizontalLayout_10.addWidget(self.sb_dias_recuperacion)


        self.verticalLayout_9.addWidget(self.frame_16)

        self.frame_17 = QFrame(self.f_frame_ingresar_datos)
        self.frame_17.setObjectName(u"frame_17")
        self.frame_17.setStyleSheet(u"border: 1px solid rgba(162, 170, 173, 60);\n"
"border:none;\n"
"border-radius:10px;")
        self.frame_17.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_17.setFrameShadow(QFrame.Shadow.Raised)
        self.horizontalLayout_11 = QHBoxLayout(self.frame_17)
        self.horizontalLayout_11.setSpacing(2)
        self.horizontalLayout_11.setObjectName(u"horizontalLayout_11")
        self.horizontalLayout_11.setContentsMargins(5, 5, 5, 5)
        self.label_16 = QLabel(self.frame_17)
        self.label_16.setObjectName(u"label_16")
        self.label_16.setFont(font4)
        self.label_16.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_16.setAutoFillBackground(False)
        self.label_16.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(208, 212, 228);\n"
"")

        self.horizontalLayout_11.addWidget(self.label_16)

        self.sb_tasa_muerte = QSpinBox(self.frame_17)
        self.sb_tasa_muerte.setObjectName(u"sb_tasa_muerte")
        sizePolicy14.setHeightForWidth(self.sb_tasa_muerte.sizePolicy().hasHeightForWidth())
        self.sb_tasa_muerte.setSizePolicy(sizePolicy14)
        self.sb_tasa_muerte.setMaximumSize(QSize(120, 16777215))
        self.sb_tasa_muerte.setFont(font4)
        self.sb_tasa_muerte.setStyleSheet(u"color: rgb(162, 170, 173);\n"
"border-radius: 5px;\n"
"border:none;")
        self.sb_tasa_muerte.setMaximum(99)

        self.horizontalLayout_11.addWidget(self.sb_tasa_muerte)


        self.verticalLayout_9.addWidget(self.frame_17)

        self.f_previzualizar_mapa = QFrame(self.ingresar_datos)
        self.f_previzualizar_mapa.setObjectName(u"f_previzualizar_mapa")
        self.f_previzualizar_mapa.setGeometry(QRect(480, 170, 300, 230))
        self.f_previzualizar_mapa.setMinimumSize(QSize(300, 230))
        self.f_previzualizar_mapa.setStyleSheet(u"background-color: qlineargradient(spread:pad, x1:0, y1:0, x2:1, y2:0, stop:0.0511364 rgba(29, 53, 65, 255), stop:1 rgba(16, 40, 52, 255));\n"
"border-radius: 16px")
        self.f_previzualizar_mapa.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_previzualizar_mapa.setFrameShadow(QFrame.Shadow.Raised)
        self.gridLayout_9 = QGridLayout(self.f_previzualizar_mapa)
        self.gridLayout_9.setObjectName(u"gridLayout_9")
        self.sw_tarjetas_datos.addWidget(self.ingresar_datos)
        self.page_2 = QWidget()
        self.page_2.setObjectName(u"page_2")
        self.sw_tarjetas_datos.addWidget(self.page_2)
        self.sw_tarjetas_datos.raise_()
        self.f_frame_principal.raise_()

        self.retranslateUi(objeto_inicial)

        self.sw_panel_derecho.setCurrentIndex(0)
        self.sw_tarjetas_datos.setCurrentIndex(0)


        QMetaObject.connectSlotsByName(objeto_inicial)
    # setupUi

    def retranslateUi(self, objeto_inicial):
        objeto_inicial.setWindowTitle(QCoreApplication.translate("objeto_inicial", u"Form", None))
        self.pb_boton_iniciar_simulacion.setText("")
        self.pb_boton_historial_simulacion.setText("")
        self.pb_boton_nueva_simulacion.setText("")
        self.label_2.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p align=\"center\">Sin datos que vizualizar</p></body></html>", None))
        self.label_3.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p align=\"center\">Sin datos que vizualizar</p></body></html>", None))
        self.label_4.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p align=\"center\">Sin datos que vizualizar</p></body></html>", None))
        self.label.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p align=\"center\"><span style=\" font-size:12pt; color:#d0d4e4;\">Esperando datos epidemiol\u00f3gicos</span></p></body></html>", None))
        self.label_5.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p align=\"center\">Sin datos que vizualizar</p></body></html>", None))
        self.label_6.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p align=\"center\">Sin datos que vizualizar</p></body></html>", None))
        self.label_7.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p align=\"center\">Sin datos que vizualizar</p></body></html>", None))
        self.label_8.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p align=\"center\">Sin datos que vizualizar</p></body></html>", None))
        self.label_17.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p align=\"center\">Dias transcurridos</p></body></html>", None))
        self.l_contador.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p align=\"center\">000</p></body></html>", None))
        self.label_9.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Datos de la simulacion:</p></body></html>", None))
        self.label_18.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Lugar de la simulacion:</p></body></html>", None))
        self.cb_lugar.setItemText(0, QCoreApplication.translate("objeto_inicial", u"Punto Fijo", None))
        self.cb_lugar.setItemText(1, QCoreApplication.translate("objeto_inicial", u"AntiguoAeropuerto", None))

        self.label_12.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Humanos infectados:</p></body></html>", None))
        self.label_10.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Poblacion mosquito:</p></body></html>", None))
        self.label_11.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Mosquitos infectados:</p></body></html>", None))
        self.label_13.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Duracion de la Simulacion:</p></body></html>", None))
        self.cb_duracion_simulacion.setItemText(0, QCoreApplication.translate("objeto_inicial", u"Final de la infeccion", None))
        self.cb_duracion_simulacion.setItemText(1, QCoreApplication.translate("objeto_inicial", u"Personalizado", None))

        self.label_14.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Tasa de transmision:%</p></body></html>", None))
        self.label_15.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Dias de recuperacion:</p></body></html>", None))
        self.label_16.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Tasa de muertes:%</p></body></html>", None))
    # retranslateUi

