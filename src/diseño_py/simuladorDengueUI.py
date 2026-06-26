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
from .imagenes_rc import *

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
        self.f_frame_principal.setStyleSheet(u"background-color: rgb(232, 236, 239);\n"
"")
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
        self.f_panel_izquierdo.setMaximumSize(QSize(70, 16777215))
        self.f_panel_izquierdo.setStyleSheet(u"background-color: rgb(255, 255, 255);\n"
"border-radius: 16px;\n"
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
        self.f_logo.setMinimumSize(QSize(52, 52))
        self.f_logo.setMaximumSize(QSize(16777215, 16777215))
        self.f_logo.setStyleSheet(u"image: url(:/svg/Base Logo.svg);\n"
"border-radius: 10px;\n"
"border: 1px solid rgba(32, 59, 73, 15);")
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
        self.pb_boton_iniciar_simulacion.setMinimumSize(QSize(52, 52))
        self.pb_boton_iniciar_simulacion.setStyleSheet(u"QPushButton{\n"
"	\n"
"	image: url(:/svg/Boton Nueva Simulacion.svg);\n"
"	background-color: qlineargradient(spread:pad, x1:0, y1:0, x2:1, y2:1, stop:0 rgba(232, 235, 235, 255), stop:1 rgba(253, 254, 254, 255));\n"
"	border-radius: 16px;\n"
"	border: 1px solid rgba(32, 59, 73, 15);\n"
"}\n"
"QPushButton::pressed{\n"
"	background-color: rgba(29, 53, 65, 100);\n"
"}")

        self.verticalLayout.addWidget(self.pb_boton_iniciar_simulacion)

        self.pb_boton_historial_simulacion = QPushButton(self.f_panel_izquierdo)
        self.pb_boton_historial_simulacion.setObjectName(u"pb_boton_historial_simulacion")
        self.pb_boton_historial_simulacion.setMinimumSize(QSize(52, 52))
        self.pb_boton_historial_simulacion.setStyleSheet(u"\n"
"QPushButton{\n"
"	image: url(:/svg/Historial.svg);\n"
"		background-color: qlineargradient(spread:pad, x1:0, y1:0, x2:1, y2:1, stop:0 rgba(232, 235, 235, 255), stop:1 rgba(253, 254, 254, 255));\n"
"	border-radius: 16px;\n"
"	border: 1px solid rgba(32, 59, 73, 15);\n"
"}\n"
"QPushButton::pressed{\n"
"	background-color: rgba(29, 53, 65, 100);\n"
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
        self.pb_boton_nueva_simulacion.setMinimumSize(QSize(52, 52))
        self.pb_boton_nueva_simulacion.setStyleSheet(u"QPushButton{\n"
"	image: url(:/svg/Base boton 'Inicio'.svg);\n"
"	background-color: rgb(28, 51, 63);\n"
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
        self.sw_panel_derecho.setStyleSheet(u"background:transparent;")
        self.panel_inicial = QWidget()
        self.panel_inicial.setObjectName(u"panel_inicial")
        self.panel_inicial.setStyleSheet(u"background-color: qlineargradient(spread:pad, x1:0, y1:0, x2:1, y2:1, stop:0 rgba(232, 235, 235, 255), stop:1 rgba(253, 254, 254, 255));\n"
"border-radius: 16px;\n"
"border: 0px;")
        self.horizontalLayout_2 = QHBoxLayout(self.panel_inicial)
        self.horizontalLayout_2.setObjectName(u"horizontalLayout_2")
        self.horizontalLayout_2.setContentsMargins(-1, 0, -1, 0)
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
        self.f_grafica_humanos.setStyleSheet(u"background-color: rgb(255, 255, 255);\n"
"border-radius: 16px;")
        self.f_grafica_humanos.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_grafica_humanos.setFrameShadow(QFrame.Shadow.Raised)
        self.gridLayout_2 = QGridLayout(self.f_grafica_humanos)
        self.gridLayout_2.setObjectName(u"gridLayout_2")
        self.label_2 = QLabel(self.f_grafica_humanos)
        self.label_2.setObjectName(u"label_2")
        font = QFont()
        font.setFamilies([u"Inter"])
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
        self.f_grafica_total_humanos.setStyleSheet(u"background-color: rgb(255, 255, 255);\n"
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
        self.f_datos_simulacion.setStyleSheet(u"background-color: rgb(255, 255, 255);\n"
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
        font1.setFamilies([u"Inter"])
        font1.setPointSize(14)
        self.label.setFont(font1)
        self.label.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label.setAutoFillBackground(False)
        self.label.setStyleSheet(u"background: none;\n"
"image: url(:/svg/Subtract (1).svg);\n"
"color: rgb(218, 221, 221);\n"
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
        self.f_grafica_total_mosquitos.setStyleSheet(u"background-color: rgb(255, 255, 255);\n"
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
        self.f_grafica_expuestos.setStyleSheet(u"background-color: rgb(255, 255, 255);\n"
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
        self.f_grafica_infectados.setStyleSheet(u"background-color: rgb(255, 255, 255);\n"
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
        self.f_grafica_susceptibles.setStyleSheet(u"background-color: rgb(255, 255, 255);\n"
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
        self.panel_datos.setStyleSheet(u"background-color: qlineargradient(spread:pad, x1:0, y1:0, x2:1, y2:1, stop:0 rgba(232, 235, 235, 255), stop:1 rgba(253, 254, 254, 255));\n"
"border-radius: 16px;\n"
"border: 0px;\n"
"")
        self.horizontalLayout_3 = QHBoxLayout(self.panel_datos)
        self.horizontalLayout_3.setObjectName(u"horizontalLayout_3")
        self.horizontalLayout_3.setContentsMargins(-1, 0, -1, 0)
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
        self.f_grafica_humanos_3.setStyleSheet(u"background-color: rgb(255, 255, 255);\n"
"border-radius: 16px;")
        self.f_grafica_humanos_3.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_grafica_humanos_3.setFrameShadow(QFrame.Shadow.Raised)
        self.gridLayout_10 = QGridLayout(self.f_grafica_humanos_3)
        self.gridLayout_10.setObjectName(u"gridLayout_10")
        self.f_grafica_general_humano = QFrame(self.f_grafica_humanos_3)
        self.f_grafica_general_humano.setObjectName(u"f_grafica_general_humano")
        sizePolicy6.setHeightForWidth(self.f_grafica_general_humano.sizePolicy().hasHeightForWidth())
        self.f_grafica_general_humano.setSizePolicy(sizePolicy6)
        self.f_grafica_general_humano.setStyleSheet(u"background-color: rgb(255, 255, 255);\n"
"border-radius: 16px;\n"
"border: 1px solid rgba(162, 170, 173, 100);")
        self.f_grafica_general_humano.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_grafica_general_humano.setFrameShadow(QFrame.Shadow.Raised)
        self.gridLayout_22 = QGridLayout(self.f_grafica_general_humano)
        self.gridLayout_22.setObjectName(u"gridLayout_22")

        self.gridLayout_10.addWidget(self.f_grafica_general_humano, 0, 0, 1, 1)


        self.verticalLayout_4.addWidget(self.f_grafica_humanos_3)

        self.f_grafica_total_humanos_3 = QFrame(self.f_datos_izquierdos_vacio_2)
        self.f_grafica_total_humanos_3.setObjectName(u"f_grafica_total_humanos_3")
        sizePolicy6.setHeightForWidth(self.f_grafica_total_humanos_3.sizePolicy().hasHeightForWidth())
        self.f_grafica_total_humanos_3.setSizePolicy(sizePolicy6)
        self.f_grafica_total_humanos_3.setStyleSheet(u"background-color: rgb(255, 255, 255);\n"
"border-radius: 16px;")
        self.f_grafica_total_humanos_3.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_grafica_total_humanos_3.setFrameShadow(QFrame.Shadow.Raised)
        self.gridLayout_11 = QGridLayout(self.f_grafica_total_humanos_3)
        self.gridLayout_11.setObjectName(u"gridLayout_11")
        self.f_grafica_sistema_bombeo = QFrame(self.f_grafica_total_humanos_3)
        self.f_grafica_sistema_bombeo.setObjectName(u"f_grafica_sistema_bombeo")
        sizePolicy6.setHeightForWidth(self.f_grafica_sistema_bombeo.sizePolicy().hasHeightForWidth())
        self.f_grafica_sistema_bombeo.setSizePolicy(sizePolicy6)
        self.f_grafica_sistema_bombeo.setStyleSheet(u"background-color: rgb(255, 255, 255);\n"
"border-radius: 16px;\n"
"border: 1px solid rgba(162, 170, 173, 100);")
        self.f_grafica_sistema_bombeo.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_grafica_sistema_bombeo.setFrameShadow(QFrame.Shadow.Raised)
        self.gridLayout_23 = QGridLayout(self.f_grafica_sistema_bombeo)
        self.gridLayout_23.setObjectName(u"gridLayout_23")

        self.gridLayout_11.addWidget(self.f_grafica_sistema_bombeo, 0, 0, 1, 1)


        self.verticalLayout_4.addWidget(self.f_grafica_total_humanos_3)

        self.f_datos_simulacion_3 = QFrame(self.f_datos_izquierdos_vacio_2)
        self.f_datos_simulacion_3.setObjectName(u"f_datos_simulacion_3")
        sizePolicy7.setHeightForWidth(self.f_datos_simulacion_3.sizePolicy().hasHeightForWidth())
        self.f_datos_simulacion_3.setSizePolicy(sizePolicy7)
        self.f_datos_simulacion_3.setStyleSheet(u"background-color: rgb(255, 255, 255);\n"
"border-radius: 16px;")
        self.f_datos_simulacion_3.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_datos_simulacion_3.setFrameShadow(QFrame.Shadow.Raised)
        self.gridLayout_12 = QGridLayout(self.f_datos_simulacion_3)
        self.gridLayout_12.setObjectName(u"gridLayout_12")
        self.f_datos_simulacion_4 = QFrame(self.f_datos_simulacion_3)
        self.f_datos_simulacion_4.setObjectName(u"f_datos_simulacion_4")
        sizePolicy7.setHeightForWidth(self.f_datos_simulacion_4.sizePolicy().hasHeightForWidth())
        self.f_datos_simulacion_4.setSizePolicy(sizePolicy7)
        self.f_datos_simulacion_4.setStyleSheet(u"background-color: rgb(255, 255, 255);\n"
"border-radius: 16px;\n"
"border: 1px solid rgba(162, 170, 173, 100);")
        self.f_datos_simulacion_4.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_datos_simulacion_4.setFrameShadow(QFrame.Shadow.Raised)
        self.verticalLayout_3 = QVBoxLayout(self.f_datos_simulacion_4)
        self.verticalLayout_3.setObjectName(u"verticalLayout_3")
        self.label_44 = QLabel(self.f_datos_simulacion_4)
        self.label_44.setObjectName(u"label_44")
        font2 = QFont()
        font2.setFamilies([u"Inter"])
        font2.setPointSize(12)
        self.label_44.setFont(font2)
        self.label_44.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_44.setAutoFillBackground(False)
        self.label_44.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(44, 65, 76);\n"
"")

        self.verticalLayout_3.addWidget(self.label_44)

        self.frame_37 = QFrame(self.f_datos_simulacion_4)
        self.frame_37.setObjectName(u"frame_37")
        sizePolicy10 = QSizePolicy(QSizePolicy.Policy.Fixed, QSizePolicy.Policy.Fixed)
        sizePolicy10.setHorizontalStretch(0)
        sizePolicy10.setVerticalStretch(0)
        sizePolicy10.setHeightForWidth(self.frame_37.sizePolicy().hasHeightForWidth())
        self.frame_37.setSizePolicy(sizePolicy10)
        self.frame_37.setStyleSheet(u"border:0px;")
        self.frame_37.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_37.setFrameShadow(QFrame.Shadow.Raised)
        self.horizontalLayout_17 = QHBoxLayout(self.frame_37)
        self.horizontalLayout_17.setSpacing(0)
        self.horizontalLayout_17.setObjectName(u"horizontalLayout_17")
        self.horizontalLayout_17.setContentsMargins(0, 0, 0, 0)
        self.frame_38 = QFrame(self.frame_37)
        self.frame_38.setObjectName(u"frame_38")
        self.frame_38.setMinimumSize(QSize(25, 25))
        self.frame_38.setMaximumSize(QSize(25, 25))
        self.frame_38.setStyleSheet(u"border:0px;\n"
"image: url(:/svg/bio.svg);\n"
"border-radius:0px;\n"
"background-color: none;")
        self.frame_38.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_38.setFrameShadow(QFrame.Shadow.Raised)

        self.horizontalLayout_17.addWidget(self.frame_38)

        self.label_26 = QLabel(self.frame_37)
        self.label_26.setObjectName(u"label_26")
        sizePolicy10.setHeightForWidth(self.label_26.sizePolicy().hasHeightForWidth())
        self.label_26.setSizePolicy(sizePolicy10)
        self.label_26.setFont(font)
        self.label_26.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_26.setAutoFillBackground(False)
        self.label_26.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(150, 161, 168);\n"
"")

        self.horizontalLayout_17.addWidget(self.label_26)


        self.verticalLayout_3.addWidget(self.frame_37)

        self.l_ritmo_contagio_general = QLabel(self.f_datos_simulacion_4)
        self.l_ritmo_contagio_general.setObjectName(u"l_ritmo_contagio_general")
        sizePolicy1.setHeightForWidth(self.l_ritmo_contagio_general.sizePolicy().hasHeightForWidth())
        self.l_ritmo_contagio_general.setSizePolicy(sizePolicy1)
        self.l_ritmo_contagio_general.setMinimumSize(QSize(82, 0))
        self.l_ritmo_contagio_general.setMaximumSize(QSize(16777215, 16777215))
        self.l_ritmo_contagio_general.setFont(font)
        self.l_ritmo_contagio_general.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.l_ritmo_contagio_general.setAutoFillBackground(False)
        self.l_ritmo_contagio_general.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgba(44, 65, 76, 150);\n"
"padding-right: 20px;\n"
"")

        self.verticalLayout_3.addWidget(self.l_ritmo_contagio_general)

        self.frame_30 = QFrame(self.f_datos_simulacion_4)
        self.frame_30.setObjectName(u"frame_30")
        sizePolicy10.setHeightForWidth(self.frame_30.sizePolicy().hasHeightForWidth())
        self.frame_30.setSizePolicy(sizePolicy10)
        self.frame_30.setStyleSheet(u"border:0px;")
        self.frame_30.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_30.setFrameShadow(QFrame.Shadow.Raised)
        self.horizontalLayout_16 = QHBoxLayout(self.frame_30)
        self.horizontalLayout_16.setSpacing(0)
        self.horizontalLayout_16.setObjectName(u"horizontalLayout_16")
        self.horizontalLayout_16.setContentsMargins(0, 0, 0, 0)
        self.frame_36 = QFrame(self.frame_30)
        self.frame_36.setObjectName(u"frame_36")
        self.frame_36.setMinimumSize(QSize(25, 25))
        self.frame_36.setMaximumSize(QSize(25, 25))
        self.frame_36.setStyleSheet(u"border:0px;\n"
"image: url(:/svg/humano.svg);\n"
"border-radius:0px;\n"
"background-color: none;")
        self.frame_36.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_36.setFrameShadow(QFrame.Shadow.Raised)

        self.horizontalLayout_16.addWidget(self.frame_36)

        self.label_22 = QLabel(self.frame_30)
        self.label_22.setObjectName(u"label_22")
        sizePolicy10.setHeightForWidth(self.label_22.sizePolicy().hasHeightForWidth())
        self.label_22.setSizePolicy(sizePolicy10)
        self.label_22.setFont(font)
        self.label_22.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_22.setAutoFillBackground(False)
        self.label_22.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(150, 161, 168);\n"
"")

        self.horizontalLayout_16.addWidget(self.label_22)


        self.verticalLayout_3.addWidget(self.frame_30)

        self.l_poblacion_humana_total = QLabel(self.f_datos_simulacion_4)
        self.l_poblacion_humana_total.setObjectName(u"l_poblacion_humana_total")
        sizePolicy1.setHeightForWidth(self.l_poblacion_humana_total.sizePolicy().hasHeightForWidth())
        self.l_poblacion_humana_total.setSizePolicy(sizePolicy1)
        self.l_poblacion_humana_total.setMinimumSize(QSize(0, 0))
        self.l_poblacion_humana_total.setMaximumSize(QSize(16777215, 16777215))
        self.l_poblacion_humana_total.setFont(font)
        self.l_poblacion_humana_total.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.l_poblacion_humana_total.setAutoFillBackground(False)
        self.l_poblacion_humana_total.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgba(44, 65, 76, 150);\n"
"padding-right: 20px;\n"
"")

        self.verticalLayout_3.addWidget(self.l_poblacion_humana_total)

        self.frame_43 = QFrame(self.f_datos_simulacion_4)
        self.frame_43.setObjectName(u"frame_43")
        sizePolicy10.setHeightForWidth(self.frame_43.sizePolicy().hasHeightForWidth())
        self.frame_43.setSizePolicy(sizePolicy10)
        self.frame_43.setStyleSheet(u"border:0px;")
        self.frame_43.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_43.setFrameShadow(QFrame.Shadow.Raised)
        self.horizontalLayout_18 = QHBoxLayout(self.frame_43)
        self.horizontalLayout_18.setSpacing(0)
        self.horizontalLayout_18.setObjectName(u"horizontalLayout_18")
        self.horizontalLayout_18.setContentsMargins(0, 0, 0, 0)
        self.frame_44 = QFrame(self.frame_43)
        self.frame_44.setObjectName(u"frame_44")
        self.frame_44.setMinimumSize(QSize(25, 25))
        self.frame_44.setMaximumSize(QSize(25, 25))
        self.frame_44.setStyleSheet(u"border:0px;\n"
"image: url(:/svg/muerte.svg);\n"
"border-radius:0px;\n"
"background-color: none;")
        self.frame_44.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_44.setFrameShadow(QFrame.Shadow.Raised)

        self.horizontalLayout_18.addWidget(self.frame_44)

        self.label_30 = QLabel(self.frame_43)
        self.label_30.setObjectName(u"label_30")
        sizePolicy10.setHeightForWidth(self.label_30.sizePolicy().hasHeightForWidth())
        self.label_30.setSizePolicy(sizePolicy10)
        self.label_30.setFont(font)
        self.label_30.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_30.setAutoFillBackground(False)
        self.label_30.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(150, 161, 168);\n"
"")

        self.horizontalLayout_18.addWidget(self.label_30)


        self.verticalLayout_3.addWidget(self.frame_43)

        self.l_cantidad_muertos = QLabel(self.f_datos_simulacion_4)
        self.l_cantidad_muertos.setObjectName(u"l_cantidad_muertos")
        sizePolicy1.setHeightForWidth(self.l_cantidad_muertos.sizePolicy().hasHeightForWidth())
        self.l_cantidad_muertos.setSizePolicy(sizePolicy1)
        self.l_cantidad_muertos.setMinimumSize(QSize(0, 0))
        self.l_cantidad_muertos.setMaximumSize(QSize(16777215, 16777215))
        self.l_cantidad_muertos.setFont(font)
        self.l_cantidad_muertos.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.l_cantidad_muertos.setAutoFillBackground(False)
        self.l_cantidad_muertos.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgba(44, 65, 76, 150);\n"
"padding-right: 20px;\n"
"")

        self.verticalLayout_3.addWidget(self.l_cantidad_muertos)

        self.frame_45 = QFrame(self.f_datos_simulacion_4)
        self.frame_45.setObjectName(u"frame_45")
        sizePolicy10.setHeightForWidth(self.frame_45.sizePolicy().hasHeightForWidth())
        self.frame_45.setSizePolicy(sizePolicy10)
        self.frame_45.setStyleSheet(u"border:0px;")
        self.frame_45.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_45.setFrameShadow(QFrame.Shadow.Raised)
        self.horizontalLayout_21 = QHBoxLayout(self.frame_45)
        self.horizontalLayout_21.setSpacing(0)
        self.horizontalLayout_21.setObjectName(u"horizontalLayout_21")
        self.horizontalLayout_21.setContentsMargins(0, 0, 0, 0)
        self.frame_46 = QFrame(self.frame_45)
        self.frame_46.setObjectName(u"frame_46")
        self.frame_46.setMinimumSize(QSize(25, 25))
        self.frame_46.setMaximumSize(QSize(25, 25))
        self.frame_46.setStyleSheet(u"border:0px;\n"
"image: url(:/svg/infectado.svg);\n"
"border-radius:0px;\n"
"background-color: none;")
        self.frame_46.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_46.setFrameShadow(QFrame.Shadow.Raised)

        self.horizontalLayout_21.addWidget(self.frame_46)

        self.label_43 = QLabel(self.frame_45)
        self.label_43.setObjectName(u"label_43")
        sizePolicy10.setHeightForWidth(self.label_43.sizePolicy().hasHeightForWidth())
        self.label_43.setSizePolicy(sizePolicy10)
        self.label_43.setFont(font)
        self.label_43.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_43.setAutoFillBackground(False)
        self.label_43.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(150, 161, 168);\n"
"")

        self.horizontalLayout_21.addWidget(self.label_43)


        self.verticalLayout_3.addWidget(self.frame_45)

        self.l_infectados_acumulados = QLabel(self.f_datos_simulacion_4)
        self.l_infectados_acumulados.setObjectName(u"l_infectados_acumulados")
        sizePolicy1.setHeightForWidth(self.l_infectados_acumulados.sizePolicy().hasHeightForWidth())
        self.l_infectados_acumulados.setSizePolicy(sizePolicy1)
        self.l_infectados_acumulados.setMinimumSize(QSize(0, 0))
        self.l_infectados_acumulados.setMaximumSize(QSize(16777215, 16777215))
        self.l_infectados_acumulados.setFont(font)
        self.l_infectados_acumulados.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.l_infectados_acumulados.setAutoFillBackground(False)
        self.l_infectados_acumulados.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgba(44, 65, 76, 150);\n"
"padding-right: 20px;\n"
"")

        self.verticalLayout_3.addWidget(self.l_infectados_acumulados)


        self.gridLayout_12.addWidget(self.f_datos_simulacion_4, 0, 0, 1, 1)


        self.verticalLayout_4.addWidget(self.f_datos_simulacion_3)


        self.horizontalLayout_3.addWidget(self.f_datos_izquierdos_vacio_2)

        self.f_datos_central_vacio_2 = QFrame(self.panel_datos)
        self.f_datos_central_vacio_2.setObjectName(u"f_datos_central_vacio_2")
        sizePolicy8.setHeightForWidth(self.f_datos_central_vacio_2.sizePolicy().hasHeightForWidth())
        self.f_datos_central_vacio_2.setSizePolicy(sizePolicy8)
        self.f_datos_central_vacio_2.setStyleSheet(u"background: none;\n"
"border: 0px;\n"
"border-radius:0px;\n"
"")
        self.f_datos_central_vacio_2.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_datos_central_vacio_2.setFrameShadow(QFrame.Shadow.Raised)
        self.verticalLayout_6 = QVBoxLayout(self.f_datos_central_vacio_2)
        self.verticalLayout_6.setObjectName(u"verticalLayout_6")
        self.verticalLayout_6.setContentsMargins(-1, 0, -1, -1)
        self.f_frame_mapa = QFrame(self.f_datos_central_vacio_2)
        self.f_frame_mapa.setObjectName(u"f_frame_mapa")
        sizePolicy11 = QSizePolicy(QSizePolicy.Policy.Preferred, QSizePolicy.Policy.Preferred)
        sizePolicy11.setHorizontalStretch(0)
        sizePolicy11.setVerticalStretch(90)
        sizePolicy11.setHeightForWidth(self.f_frame_mapa.sizePolicy().hasHeightForWidth())
        self.f_frame_mapa.setSizePolicy(sizePolicy11)
        self.f_frame_mapa.setStyleSheet(u"background-color: rgb(255, 255, 255);\n"
"border-radius: 16px;\n"
"image: url(:/svg/Subtract (1).svg);")
        self.f_frame_mapa.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_frame_mapa.setFrameShadow(QFrame.Shadow.Raised)

        self.verticalLayout_6.addWidget(self.f_frame_mapa)

        self.frame_4 = QFrame(self.f_datos_central_vacio_2)
        self.frame_4.setObjectName(u"frame_4")
        sizePolicy12 = QSizePolicy(QSizePolicy.Policy.Preferred, QSizePolicy.Policy.Preferred)
        sizePolicy12.setHorizontalStretch(0)
        sizePolicy12.setVerticalStretch(5)
        sizePolicy12.setHeightForWidth(self.frame_4.sizePolicy().hasHeightForWidth())
        self.frame_4.setSizePolicy(sizePolicy12)
        self.frame_4.setMinimumSize(QSize(45, 45))
        self.frame_4.setMaximumSize(QSize(16777215, 16777215))
        self.frame_4.setStyleSheet(u"background:none;\n"
"border:none;\n"
"border-radius: 16px;")
        self.frame_4.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_4.setFrameShadow(QFrame.Shadow.Raised)
        self.gridLayout_20 = QGridLayout(self.frame_4)
        self.gridLayout_20.setObjectName(u"gridLayout_20")
        self.gridLayout_20.setHorizontalSpacing(0)
        self.gridLayout_20.setContentsMargins(0, 0, 0, 0)
        self.frame_6 = QFrame(self.frame_4)
        self.frame_6.setObjectName(u"frame_6")
        sizePolicy12.setHeightForWidth(self.frame_6.sizePolicy().hasHeightForWidth())
        self.frame_6.setSizePolicy(sizePolicy12)
        self.frame_6.setMinimumSize(QSize(400, 45))
        self.frame_6.setMaximumSize(QSize(400, 16777215))
        self.frame_6.setStyleSheet(u"background-color: rgb(255, 255, 255);\n"
"border: 1px solid rgba(162, 170, 173, 100);\n"
"border-radius: 16px;")
        self.frame_6.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_6.setFrameShadow(QFrame.Shadow.Raised)
        self.horizontalLayout_4 = QHBoxLayout(self.frame_6)
        self.horizontalLayout_4.setObjectName(u"horizontalLayout_4")
        self.horizontalLayout_4.setContentsMargins(-1, 0, -1, 0)
        self.frame_7 = QFrame(self.frame_6)
        self.frame_7.setObjectName(u"frame_7")
        sizePolicy8.setHeightForWidth(self.frame_7.sizePolicy().hasHeightForWidth())
        self.frame_7.setSizePolicy(sizePolicy8)
        self.frame_7.setStyleSheet(u"background:none;\n"
"image:none;\n"
"border:none;")
        self.frame_7.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_7.setFrameShadow(QFrame.Shadow.Raised)
        self.horizontalLayout_20 = QHBoxLayout(self.frame_7)
        self.horizontalLayout_20.setSpacing(0)
        self.horizontalLayout_20.setObjectName(u"horizontalLayout_20")
        self.pb_retrasar = QPushButton(self.frame_7)
        self.pb_retrasar.setObjectName(u"pb_retrasar")
        self.pb_retrasar.setMinimumSize(QSize(32, 32))
        self.pb_retrasar.setMaximumSize(QSize(32, 32))
        self.pb_retrasar.setStyleSheet(u"QPushButton{\n"
"	border-radius: 8px;\n"
"	border:none;\n"
"	background-color: rgb(255, 255, 255);\n"
"	\n"
"	image: url(:/svg/retrasar.svg);\n"
"}\n"
"QPushButton::pressed{\n"
"	background-color: rgba(29, 53, 65, 100);\n"
"}")

        self.horizontalLayout_20.addWidget(self.pb_retrasar)

        self.pb_pausa = QPushButton(self.frame_7)
        self.pb_pausa.setObjectName(u"pb_pausa")
        self.pb_pausa.setMinimumSize(QSize(32, 32))
        self.pb_pausa.setMaximumSize(QSize(32, 32))
        self.pb_pausa.setStyleSheet(u"QPushButton{\n"
"	border-radius: 8px;\n"
"	border:none;\n"
"	background-color: rgb(255, 255, 255);\n"
"	\n"
"	image: url(:/svg/pausa.svg);\n"
"}\n"
"QPushButton::pressed{\n"
"	background-color: rgba(29, 53, 65, 100);\n"
"}")

        self.horizontalLayout_20.addWidget(self.pb_pausa)


        self.horizontalLayout_4.addWidget(self.frame_7)

        self.frame_8 = QFrame(self.frame_6)
        self.frame_8.setObjectName(u"frame_8")
        sizePolicy13 = QSizePolicy(QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Preferred)
        sizePolicy13.setHorizontalStretch(30)
        sizePolicy13.setVerticalStretch(0)
        sizePolicy13.setHeightForWidth(self.frame_8.sizePolicy().hasHeightForWidth())
        self.frame_8.setSizePolicy(sizePolicy13)
        self.frame_8.setStyleSheet(u"background-color: rgb(255, 255, 255);\n"
"border: 1px solid rgba(162, 170, 173, 100);\n"
"border-radius: 16px;\n"
"image: none;")
        self.frame_8.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_8.setFrameShadow(QFrame.Shadow.Raised)
        self.verticalLayout_5 = QVBoxLayout(self.frame_8)
        self.verticalLayout_5.setSpacing(0)
        self.verticalLayout_5.setObjectName(u"verticalLayout_5")
        self.verticalLayout_5.setContentsMargins(10, 0, 10, 0)
        self.label_17 = QLabel(self.frame_8)
        self.label_17.setObjectName(u"label_17")
        font3 = QFont()
        font3.setFamilies([u"Inter"])
        font3.setPointSize(8)
        self.label_17.setFont(font3)
        self.label_17.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_17.setAutoFillBackground(False)
        self.label_17.setStyleSheet(u"background: none;\n"
"color: rgb(24, 49, 61);\n"
"border: 0px;")

        self.verticalLayout_5.addWidget(self.label_17)

        self.l_contador = QLabel(self.frame_8)
        self.l_contador.setObjectName(u"l_contador")
        font4 = QFont()
        font4.setFamilies([u"Unispace"])
        font4.setPointSize(16)
        font4.setBold(True)
        self.l_contador.setFont(font4)
        self.l_contador.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.l_contador.setAutoFillBackground(False)
        self.l_contador.setStyleSheet(u"background: none;\n"
"color: rgba(24, 49, 61, 150);\n"
"border: 0px;")

        self.verticalLayout_5.addWidget(self.l_contador)


        self.horizontalLayout_4.addWidget(self.frame_8)

        self.frame_9 = QFrame(self.frame_6)
        self.frame_9.setObjectName(u"frame_9")
        sizePolicy14 = QSizePolicy(QSizePolicy.Policy.Preferred, QSizePolicy.Policy.Expanding)
        sizePolicy14.setHorizontalStretch(50)
        sizePolicy14.setVerticalStretch(0)
        sizePolicy14.setHeightForWidth(self.frame_9.sizePolicy().hasHeightForWidth())
        self.frame_9.setSizePolicy(sizePolicy14)
        self.frame_9.setStyleSheet(u"background:none;\n"
"border:none;\n"
"image:none;")
        self.frame_9.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_9.setFrameShadow(QFrame.Shadow.Raised)
        self.horizontalLayout_19 = QHBoxLayout(self.frame_9)
        self.horizontalLayout_19.setObjectName(u"horizontalLayout_19")
        self.pb_play = QPushButton(self.frame_9)
        self.pb_play.setObjectName(u"pb_play")
        self.pb_play.setMinimumSize(QSize(32, 32))
        self.pb_play.setMaximumSize(QSize(32, 32))
        self.pb_play.setStyleSheet(u"QPushButton{\n"
"	border-radius: 8px;\n"
"	border:none;\n"
"	background-color: rgb(255, 255, 255);\n"
"	image: url(:/svg/play.svg);\n"
"}\n"
"QPushButton::pressed{\n"
"	background-color: rgba(29, 53, 65, 100);\n"
"}")

        self.horizontalLayout_19.addWidget(self.pb_play)

        self.pb_adelantar = QPushButton(self.frame_9)
        self.pb_adelantar.setObjectName(u"pb_adelantar")
        self.pb_adelantar.setMinimumSize(QSize(32, 32))
        self.pb_adelantar.setMaximumSize(QSize(32, 32))
        self.pb_adelantar.setStyleSheet(u"QPushButton{\n"
"	border-radius: 8px;\n"
"	border:none;\n"
"	background-color: rgb(255, 255, 255);\n"
"	\n"
"	image: url(:/svg/adelantar.svg);\n"
"}\n"
"QPushButton::pressed{\n"
"	background-color: rgba(29, 53, 65, 100);\n"
"}")

        self.horizontalLayout_19.addWidget(self.pb_adelantar)


        self.horizontalLayout_4.addWidget(self.frame_9)


        self.gridLayout_20.addWidget(self.frame_6, 0, 0, 1, 1)


        self.verticalLayout_6.addWidget(self.frame_4)

        self.frame_5 = QFrame(self.f_datos_central_vacio_2)
        self.frame_5.setObjectName(u"frame_5")
        sizePolicy9.setHeightForWidth(self.frame_5.sizePolicy().hasHeightForWidth())
        self.frame_5.setSizePolicy(sizePolicy9)
        self.frame_5.setMinimumSize(QSize(0, 185))
        self.frame_5.setStyleSheet(u"background-color: rgb(255, 255, 255);\n"
"image:none;\n"
"border-radius: 16px;")
        self.frame_5.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_5.setFrameShadow(QFrame.Shadow.Raised)
        self.verticalLayout_19 = QVBoxLayout(self.frame_5)
        self.verticalLayout_19.setObjectName(u"verticalLayout_19")
        self.label_45 = QLabel(self.frame_5)
        self.label_45.setObjectName(u"label_45")
        self.label_45.setFont(font2)
        self.label_45.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_45.setAutoFillBackground(False)
        self.label_45.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(44, 65, 76);\n"
"")

        self.verticalLayout_19.addWidget(self.label_45)

        self.frame_19 = QFrame(self.frame_5)
        self.frame_19.setObjectName(u"frame_19")
        sizePolicy9.setHeightForWidth(self.frame_19.sizePolicy().hasHeightForWidth())
        self.frame_19.setSizePolicy(sizePolicy9)
        self.frame_19.setMinimumSize(QSize(0, 100))
        self.frame_19.setStyleSheet(u"background-color: rgb(255, 255, 255);\n"
"border-radius: 16px;\n"
"border: 1px solid rgba(162, 170, 173, 100);")
        self.frame_19.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_19.setFrameShadow(QFrame.Shadow.Raised)
        self.horizontalLayout_12 = QHBoxLayout(self.frame_19)
        self.horizontalLayout_12.setObjectName(u"horizontalLayout_12")
        self.frame_39 = QFrame(self.frame_19)
        self.frame_39.setObjectName(u"frame_39")
        self.frame_39.setStyleSheet(u"border:none;")
        self.frame_39.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_39.setFrameShadow(QFrame.Shadow.Raised)
        self.verticalLayout_16 = QVBoxLayout(self.frame_39)
        self.verticalLayout_16.setSpacing(15)
        self.verticalLayout_16.setObjectName(u"verticalLayout_16")
        self.frame_42 = QFrame(self.frame_39)
        self.frame_42.setObjectName(u"frame_42")
        sizePolicy10.setHeightForWidth(self.frame_42.sizePolicy().hasHeightForWidth())
        self.frame_42.setSizePolicy(sizePolicy10)
        self.frame_42.setStyleSheet(u"border: 1px solid rgba(162, 170, 173, 60);\n"
"border:none;\n"
"border-radius:10px;")
        self.frame_42.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_42.setFrameShadow(QFrame.Shadow.Raised)
        self.horizontalLayout_26 = QHBoxLayout(self.frame_42)
        self.horizontalLayout_26.setSpacing(0)
        self.horizontalLayout_26.setObjectName(u"horizontalLayout_26")
        self.horizontalLayout_26.setContentsMargins(0, 0, 0, 0)
        self.frame_51 = QFrame(self.frame_42)
        self.frame_51.setObjectName(u"frame_51")
        self.frame_51.setMinimumSize(QSize(15, 15))
        self.frame_51.setMaximumSize(QSize(15, 15))
        self.frame_51.setStyleSheet(u"border:0px;\n"
"image: none;\n"
"border-radius:0px;\n"
"background-color: none;")
        self.frame_51.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_51.setFrameShadow(QFrame.Shadow.Raised)

        self.horizontalLayout_26.addWidget(self.frame_51)

        self.label_35 = QLabel(self.frame_42)
        self.label_35.setObjectName(u"label_35")
        sizePolicy15 = QSizePolicy(QSizePolicy.Policy.Fixed, QSizePolicy.Policy.Preferred)
        sizePolicy15.setHorizontalStretch(0)
        sizePolicy15.setVerticalStretch(0)
        sizePolicy15.setHeightForWidth(self.label_35.sizePolicy().hasHeightForWidth())
        self.label_35.setSizePolicy(sizePolicy15)
        self.label_35.setFont(font)
        self.label_35.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_35.setAutoFillBackground(False)
        self.label_35.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(150, 161, 168);\n"
"")

        self.horizontalLayout_26.addWidget(self.label_35)


        self.verticalLayout_16.addWidget(self.frame_42)

        self.frame_33 = QFrame(self.frame_39)
        self.frame_33.setObjectName(u"frame_33")
        sizePolicy10.setHeightForWidth(self.frame_33.sizePolicy().hasHeightForWidth())
        self.frame_33.setSizePolicy(sizePolicy10)
        self.frame_33.setStyleSheet(u"border: 1px solid rgba(162, 170, 173, 60);\n"
"border:none;\n"
"border-radius:10px;")
        self.frame_33.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_33.setFrameShadow(QFrame.Shadow.Raised)
        self.horizontalLayout_24 = QHBoxLayout(self.frame_33)
        self.horizontalLayout_24.setSpacing(0)
        self.horizontalLayout_24.setObjectName(u"horizontalLayout_24")
        self.horizontalLayout_24.setContentsMargins(0, 0, 0, 0)
        self.frame_49 = QFrame(self.frame_33)
        self.frame_49.setObjectName(u"frame_49")
        self.frame_49.setMinimumSize(QSize(15, 15))
        self.frame_49.setMaximumSize(QSize(15, 15))
        self.frame_49.setStyleSheet(u"border:0px;\n"
"image: none;\n"
"border-radius:0px;\n"
"background-color: none;")
        self.frame_49.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_49.setFrameShadow(QFrame.Shadow.Raised)

        self.horizontalLayout_24.addWidget(self.frame_49)

        self.label_33 = QLabel(self.frame_33)
        self.label_33.setObjectName(u"label_33")
        sizePolicy15.setHeightForWidth(self.label_33.sizePolicy().hasHeightForWidth())
        self.label_33.setSizePolicy(sizePolicy15)
        self.label_33.setFont(font)
        self.label_33.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_33.setAutoFillBackground(False)
        self.label_33.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(150, 161, 168);\n"
"")

        self.horizontalLayout_24.addWidget(self.label_33)


        self.verticalLayout_16.addWidget(self.frame_33)

        self.frame_31 = QFrame(self.frame_39)
        self.frame_31.setObjectName(u"frame_31")
        sizePolicy10.setHeightForWidth(self.frame_31.sizePolicy().hasHeightForWidth())
        self.frame_31.setSizePolicy(sizePolicy10)
        self.frame_31.setStyleSheet(u"border: 1px solid rgba(162, 170, 173, 60);\n"
"border:none;\n"
"border-radius:10px;")
        self.frame_31.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_31.setFrameShadow(QFrame.Shadow.Raised)
        self.horizontalLayout_22 = QHBoxLayout(self.frame_31)
        self.horizontalLayout_22.setSpacing(0)
        self.horizontalLayout_22.setObjectName(u"horizontalLayout_22")
        self.horizontalLayout_22.setContentsMargins(0, 0, 0, 0)
        self.frame_47 = QFrame(self.frame_31)
        self.frame_47.setObjectName(u"frame_47")
        self.frame_47.setMinimumSize(QSize(15, 15))
        self.frame_47.setMaximumSize(QSize(15, 15))
        self.frame_47.setStyleSheet(u"border:0px;\n"
"image: none;\n"
"border-radius:0px;\n"
"background-color: none;")
        self.frame_47.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_47.setFrameShadow(QFrame.Shadow.Raised)

        self.horizontalLayout_22.addWidget(self.frame_47)

        self.label_31 = QLabel(self.frame_31)
        self.label_31.setObjectName(u"label_31")
        sizePolicy15.setHeightForWidth(self.label_31.sizePolicy().hasHeightForWidth())
        self.label_31.setSizePolicy(sizePolicy15)
        self.label_31.setFont(font)
        self.label_31.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_31.setAutoFillBackground(False)
        self.label_31.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(150, 161, 168);\n"
"")

        self.horizontalLayout_22.addWidget(self.label_31)


        self.verticalLayout_16.addWidget(self.frame_31)

        self.frame_32 = QFrame(self.frame_39)
        self.frame_32.setObjectName(u"frame_32")
        sizePolicy10.setHeightForWidth(self.frame_32.sizePolicy().hasHeightForWidth())
        self.frame_32.setSizePolicy(sizePolicy10)
        self.frame_32.setStyleSheet(u"border: 1px solid rgba(162, 170, 173, 60);\n"
"border:none;\n"
"border-radius:10px;")
        self.frame_32.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_32.setFrameShadow(QFrame.Shadow.Raised)
        self.horizontalLayout_23 = QHBoxLayout(self.frame_32)
        self.horizontalLayout_23.setSpacing(0)
        self.horizontalLayout_23.setObjectName(u"horizontalLayout_23")
        self.horizontalLayout_23.setContentsMargins(0, 0, 0, 0)
        self.frame_48 = QFrame(self.frame_32)
        self.frame_48.setObjectName(u"frame_48")
        self.frame_48.setMinimumSize(QSize(15, 15))
        self.frame_48.setMaximumSize(QSize(15, 15))
        self.frame_48.setStyleSheet(u"border:0px;\n"
"image: none;\n"
"border-radius:0px;\n"
"background-color: none;")
        self.frame_48.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_48.setFrameShadow(QFrame.Shadow.Raised)

        self.horizontalLayout_23.addWidget(self.frame_48)

        self.label_32 = QLabel(self.frame_32)
        self.label_32.setObjectName(u"label_32")
        sizePolicy15.setHeightForWidth(self.label_32.sizePolicy().hasHeightForWidth())
        self.label_32.setSizePolicy(sizePolicy15)
        self.label_32.setFont(font)
        self.label_32.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_32.setAutoFillBackground(False)
        self.label_32.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(150, 161, 168);\n"
"")

        self.horizontalLayout_23.addWidget(self.label_32)


        self.verticalLayout_16.addWidget(self.frame_32)


        self.horizontalLayout_12.addWidget(self.frame_39)

        self.frame_40 = QFrame(self.frame_19)
        self.frame_40.setObjectName(u"frame_40")
        sizePolicy15.setHeightForWidth(self.frame_40.sizePolicy().hasHeightForWidth())
        self.frame_40.setSizePolicy(sizePolicy15)
        self.frame_40.setStyleSheet(u"border:none;")
        self.frame_40.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_40.setFrameShadow(QFrame.Shadow.Raised)
        self.verticalLayout_15 = QVBoxLayout(self.frame_40)
        self.verticalLayout_15.setSpacing(15)
        self.verticalLayout_15.setObjectName(u"verticalLayout_15")
        self.verticalLayout_15.setContentsMargins(9, 9, 9, 9)
        self.l_susceptibles_h = QLabel(self.frame_40)
        self.l_susceptibles_h.setObjectName(u"l_susceptibles_h")
        sizePolicy1.setHeightForWidth(self.l_susceptibles_h.sizePolicy().hasHeightForWidth())
        self.l_susceptibles_h.setSizePolicy(sizePolicy1)
        self.l_susceptibles_h.setMinimumSize(QSize(0, 0))
        self.l_susceptibles_h.setMaximumSize(QSize(16777215, 16777215))
        self.l_susceptibles_h.setFont(font)
        self.l_susceptibles_h.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.l_susceptibles_h.setAutoFillBackground(False)
        self.l_susceptibles_h.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgba(44, 65, 76, 150);\n"
"")

        self.verticalLayout_15.addWidget(self.l_susceptibles_h)

        self.l_expuestos_h = QLabel(self.frame_40)
        self.l_expuestos_h.setObjectName(u"l_expuestos_h")
        sizePolicy15.setHeightForWidth(self.l_expuestos_h.sizePolicy().hasHeightForWidth())
        self.l_expuestos_h.setSizePolicy(sizePolicy15)
        self.l_expuestos_h.setMinimumSize(QSize(65, 0))
        self.l_expuestos_h.setMaximumSize(QSize(65, 16777215))
        self.l_expuestos_h.setFont(font)
        self.l_expuestos_h.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.l_expuestos_h.setAutoFillBackground(False)
        self.l_expuestos_h.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgba(44, 65, 76, 150);\n"
"")

        self.verticalLayout_15.addWidget(self.l_expuestos_h)

        self.l_infectados_h = QLabel(self.frame_40)
        self.l_infectados_h.setObjectName(u"l_infectados_h")
        sizePolicy15.setHeightForWidth(self.l_infectados_h.sizePolicy().hasHeightForWidth())
        self.l_infectados_h.setSizePolicy(sizePolicy15)
        self.l_infectados_h.setMinimumSize(QSize(65, 0))
        self.l_infectados_h.setMaximumSize(QSize(65, 16777215))
        self.l_infectados_h.setFont(font)
        self.l_infectados_h.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.l_infectados_h.setAutoFillBackground(False)
        self.l_infectados_h.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgba(44, 65, 76, 150);\n"
"")

        self.verticalLayout_15.addWidget(self.l_infectados_h)

        self.l_recuperados = QLabel(self.frame_40)
        self.l_recuperados.setObjectName(u"l_recuperados")
        sizePolicy15.setHeightForWidth(self.l_recuperados.sizePolicy().hasHeightForWidth())
        self.l_recuperados.setSizePolicy(sizePolicy15)
        self.l_recuperados.setMinimumSize(QSize(65, 0))
        self.l_recuperados.setMaximumSize(QSize(65, 16777215))
        self.l_recuperados.setFont(font)
        self.l_recuperados.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.l_recuperados.setAutoFillBackground(False)
        self.l_recuperados.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgba(44, 65, 76, 150);\n"
"")

        self.verticalLayout_15.addWidget(self.l_recuperados)


        self.horizontalLayout_12.addWidget(self.frame_40)

        self.frame_52 = QFrame(self.frame_19)
        self.frame_52.setObjectName(u"frame_52")
        self.frame_52.setStyleSheet(u"border:none;")
        self.frame_52.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_52.setFrameShadow(QFrame.Shadow.Raised)
        self.verticalLayout_18 = QVBoxLayout(self.frame_52)
        self.verticalLayout_18.setSpacing(15)
        self.verticalLayout_18.setObjectName(u"verticalLayout_18")
        self.frame_53 = QFrame(self.frame_52)
        self.frame_53.setObjectName(u"frame_53")
        sizePolicy10.setHeightForWidth(self.frame_53.sizePolicy().hasHeightForWidth())
        self.frame_53.setSizePolicy(sizePolicy10)
        self.frame_53.setStyleSheet(u"border: 1px solid rgba(162, 170, 173, 60);\n"
"border:none;\n"
"border-radius:10px;")
        self.frame_53.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_53.setFrameShadow(QFrame.Shadow.Raised)
        self.horizontalLayout_27 = QHBoxLayout(self.frame_53)
        self.horizontalLayout_27.setSpacing(0)
        self.horizontalLayout_27.setObjectName(u"horizontalLayout_27")
        self.horizontalLayout_27.setContentsMargins(0, 0, 0, 0)
        self.frame_54 = QFrame(self.frame_53)
        self.frame_54.setObjectName(u"frame_54")
        self.frame_54.setMinimumSize(QSize(15, 15))
        self.frame_54.setMaximumSize(QSize(15, 15))
        self.frame_54.setStyleSheet(u"border:0px;\n"
"image: none;\n"
"border-radius:0px;\n"
"background-color: none;")
        self.frame_54.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_54.setFrameShadow(QFrame.Shadow.Raised)

        self.horizontalLayout_27.addWidget(self.frame_54)

        self.label_40 = QLabel(self.frame_53)
        self.label_40.setObjectName(u"label_40")
        sizePolicy15.setHeightForWidth(self.label_40.sizePolicy().hasHeightForWidth())
        self.label_40.setSizePolicy(sizePolicy15)
        self.label_40.setFont(font)
        self.label_40.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_40.setAutoFillBackground(False)
        self.label_40.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(150, 161, 168);")

        self.horizontalLayout_27.addWidget(self.label_40)


        self.verticalLayout_18.addWidget(self.frame_53)

        self.frame_34 = QFrame(self.frame_52)
        self.frame_34.setObjectName(u"frame_34")
        sizePolicy10.setHeightForWidth(self.frame_34.sizePolicy().hasHeightForWidth())
        self.frame_34.setSizePolicy(sizePolicy10)
        self.frame_34.setStyleSheet(u"border: 1px solid rgba(162, 170, 173, 60);\n"
"border:none;\n"
"border-radius:10px;")
        self.frame_34.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_34.setFrameShadow(QFrame.Shadow.Raised)
        self.horizontalLayout_28 = QHBoxLayout(self.frame_34)
        self.horizontalLayout_28.setSpacing(0)
        self.horizontalLayout_28.setObjectName(u"horizontalLayout_28")
        self.horizontalLayout_28.setContentsMargins(0, 0, 0, 0)
        self.frame_55 = QFrame(self.frame_34)
        self.frame_55.setObjectName(u"frame_55")
        self.frame_55.setMinimumSize(QSize(15, 15))
        self.frame_55.setMaximumSize(QSize(15, 15))
        self.frame_55.setStyleSheet(u"border:0px;\n"
"image: none;\n"
"border-radius:0px;\n"
"background-color: none;")
        self.frame_55.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_55.setFrameShadow(QFrame.Shadow.Raised)

        self.horizontalLayout_28.addWidget(self.frame_55)

        self.label_41 = QLabel(self.frame_34)
        self.label_41.setObjectName(u"label_41")
        sizePolicy15.setHeightForWidth(self.label_41.sizePolicy().hasHeightForWidth())
        self.label_41.setSizePolicy(sizePolicy15)
        self.label_41.setFont(font)
        self.label_41.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_41.setAutoFillBackground(False)
        self.label_41.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(150, 161, 168);")

        self.horizontalLayout_28.addWidget(self.label_41)


        self.verticalLayout_18.addWidget(self.frame_34)

        self.frame_35 = QFrame(self.frame_52)
        self.frame_35.setObjectName(u"frame_35")
        sizePolicy10.setHeightForWidth(self.frame_35.sizePolicy().hasHeightForWidth())
        self.frame_35.setSizePolicy(sizePolicy10)
        self.frame_35.setStyleSheet(u"border: 1px solid rgba(162, 170, 173, 60);\n"
"border:none;\n"
"border-radius:10px;")
        self.frame_35.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_35.setFrameShadow(QFrame.Shadow.Raised)
        self.horizontalLayout_29 = QHBoxLayout(self.frame_35)
        self.horizontalLayout_29.setSpacing(0)
        self.horizontalLayout_29.setObjectName(u"horizontalLayout_29")
        self.horizontalLayout_29.setContentsMargins(0, 0, 0, 0)
        self.frame_56 = QFrame(self.frame_35)
        self.frame_56.setObjectName(u"frame_56")
        self.frame_56.setMinimumSize(QSize(15, 15))
        self.frame_56.setMaximumSize(QSize(15, 15))
        self.frame_56.setStyleSheet(u"border:0px;\n"
"image: none;\n"
"border-radius:0px;\n"
"background-color: none;")
        self.frame_56.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_56.setFrameShadow(QFrame.Shadow.Raised)

        self.horizontalLayout_29.addWidget(self.frame_56)

        self.label_42 = QLabel(self.frame_35)
        self.label_42.setObjectName(u"label_42")
        sizePolicy15.setHeightForWidth(self.label_42.sizePolicy().hasHeightForWidth())
        self.label_42.setSizePolicy(sizePolicy15)
        self.label_42.setFont(font)
        self.label_42.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_42.setAutoFillBackground(False)
        self.label_42.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(150, 161, 168);")

        self.horizontalLayout_29.addWidget(self.label_42)


        self.verticalLayout_18.addWidget(self.frame_35)


        self.horizontalLayout_12.addWidget(self.frame_52)

        self.frame_41 = QFrame(self.frame_19)
        self.frame_41.setObjectName(u"frame_41")
        sizePolicy15.setHeightForWidth(self.frame_41.sizePolicy().hasHeightForWidth())
        self.frame_41.setSizePolicy(sizePolicy15)
        self.frame_41.setStyleSheet(u"border:none;")
        self.frame_41.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_41.setFrameShadow(QFrame.Shadow.Raised)
        self.verticalLayout_17 = QVBoxLayout(self.frame_41)
        self.verticalLayout_17.setSpacing(15)
        self.verticalLayout_17.setObjectName(u"verticalLayout_17")
        self.verticalLayout_17.setContentsMargins(9, 9, 9, 9)
        self.l_susceptibles_m = QLabel(self.frame_41)
        self.l_susceptibles_m.setObjectName(u"l_susceptibles_m")
        sizePolicy1.setHeightForWidth(self.l_susceptibles_m.sizePolicy().hasHeightForWidth())
        self.l_susceptibles_m.setSizePolicy(sizePolicy1)
        self.l_susceptibles_m.setMinimumSize(QSize(0, 0))
        self.l_susceptibles_m.setMaximumSize(QSize(16777215, 16777215))
        self.l_susceptibles_m.setFont(font)
        self.l_susceptibles_m.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.l_susceptibles_m.setAutoFillBackground(False)
        self.l_susceptibles_m.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgba(44, 65, 76, 150);\n"
"")

        self.verticalLayout_17.addWidget(self.l_susceptibles_m)

        self.l_expuestos_m = QLabel(self.frame_41)
        self.l_expuestos_m.setObjectName(u"l_expuestos_m")
        sizePolicy15.setHeightForWidth(self.l_expuestos_m.sizePolicy().hasHeightForWidth())
        self.l_expuestos_m.setSizePolicy(sizePolicy15)
        self.l_expuestos_m.setMinimumSize(QSize(65, 0))
        self.l_expuestos_m.setMaximumSize(QSize(65, 16777215))
        self.l_expuestos_m.setFont(font)
        self.l_expuestos_m.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.l_expuestos_m.setAutoFillBackground(False)
        self.l_expuestos_m.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgba(44, 65, 76, 150);\n"
"")

        self.verticalLayout_17.addWidget(self.l_expuestos_m)

        self.l_infectados_m = QLabel(self.frame_41)
        self.l_infectados_m.setObjectName(u"l_infectados_m")
        sizePolicy15.setHeightForWidth(self.l_infectados_m.sizePolicy().hasHeightForWidth())
        self.l_infectados_m.setSizePolicy(sizePolicy15)
        self.l_infectados_m.setMinimumSize(QSize(65, 0))
        self.l_infectados_m.setMaximumSize(QSize(65, 16777215))
        self.l_infectados_m.setFont(font)
        self.l_infectados_m.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.l_infectados_m.setAutoFillBackground(False)
        self.l_infectados_m.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgba(44, 65, 76, 150);\n"
"")

        self.verticalLayout_17.addWidget(self.l_infectados_m)


        self.horizontalLayout_12.addWidget(self.frame_41)


        self.verticalLayout_19.addWidget(self.frame_19)


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
        self.f_grafica_total_mosquitos_3.setStyleSheet(u"background-color: rgb(255, 255, 255);\n"
"border-radius: 16px;")
        self.f_grafica_total_mosquitos_3.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_grafica_total_mosquitos_3.setFrameShadow(QFrame.Shadow.Raised)
        self.gridLayout_16 = QGridLayout(self.f_grafica_total_mosquitos_3)
        self.gridLayout_16.setObjectName(u"gridLayout_16")
        self.f_grafica_general_mosquito = QFrame(self.f_grafica_total_mosquitos_3)
        self.f_grafica_general_mosquito.setObjectName(u"f_grafica_general_mosquito")
        sizePolicy9.setHeightForWidth(self.f_grafica_general_mosquito.sizePolicy().hasHeightForWidth())
        self.f_grafica_general_mosquito.setSizePolicy(sizePolicy9)
        self.f_grafica_general_mosquito.setStyleSheet(u"background-color: rgb(255, 255, 255);\n"
"border-radius: 16px;\n"
"border: 1px solid rgba(162, 170, 173, 100);")
        self.f_grafica_general_mosquito.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_grafica_general_mosquito.setFrameShadow(QFrame.Shadow.Raised)
        self.gridLayout_17 = QGridLayout(self.f_grafica_general_mosquito)
        self.gridLayout_17.setObjectName(u"gridLayout_17")

        self.gridLayout_16.addWidget(self.f_grafica_general_mosquito, 0, 0, 1, 1)


        self.verticalLayout_10.addWidget(self.f_grafica_total_mosquitos_3)

        self.f_grafica_expuestos_3 = QFrame(self.f_datos_derecho_vacio_2)
        self.f_grafica_expuestos_3.setObjectName(u"f_grafica_expuestos_3")
        sizePolicy9.setHeightForWidth(self.f_grafica_expuestos_3.sizePolicy().hasHeightForWidth())
        self.f_grafica_expuestos_3.setSizePolicy(sizePolicy9)
        self.f_grafica_expuestos_3.setStyleSheet(u"background-color: rgb(255, 255, 255);\n"
"border-radius: 16px;")
        self.f_grafica_expuestos_3.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_grafica_expuestos_3.setFrameShadow(QFrame.Shadow.Raised)
        self.gridLayout_15 = QGridLayout(self.f_grafica_expuestos_3)
        self.gridLayout_15.setObjectName(u"gridLayout_15")
        self.f_grafica_cantidad_mosquitos = QFrame(self.f_grafica_expuestos_3)
        self.f_grafica_cantidad_mosquitos.setObjectName(u"f_grafica_cantidad_mosquitos")
        sizePolicy9.setHeightForWidth(self.f_grafica_cantidad_mosquitos.sizePolicy().hasHeightForWidth())
        self.f_grafica_cantidad_mosquitos.setSizePolicy(sizePolicy9)
        self.f_grafica_cantidad_mosquitos.setStyleSheet(u"background-color: rgb(255, 255, 255);\n"
"border-radius: 16px;\n"
"border: 1px solid rgba(162, 170, 173, 100);")
        self.f_grafica_cantidad_mosquitos.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_grafica_cantidad_mosquitos.setFrameShadow(QFrame.Shadow.Raised)
        self.gridLayout_18 = QGridLayout(self.f_grafica_cantidad_mosquitos)
        self.gridLayout_18.setObjectName(u"gridLayout_18")

        self.gridLayout_15.addWidget(self.f_grafica_cantidad_mosquitos, 0, 0, 1, 1)


        self.verticalLayout_10.addWidget(self.f_grafica_expuestos_3)

        self.f_grafica_susceptibles_3 = QFrame(self.f_datos_derecho_vacio_2)
        self.f_grafica_susceptibles_3.setObjectName(u"f_grafica_susceptibles_3")
        sizePolicy9.setHeightForWidth(self.f_grafica_susceptibles_3.sizePolicy().hasHeightForWidth())
        self.f_grafica_susceptibles_3.setSizePolicy(sizePolicy9)
        self.f_grafica_susceptibles_3.setStyleSheet(u"background-color: rgb(255, 255, 255);\n"
"border-radius: 16px;")
        self.f_grafica_susceptibles_3.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_grafica_susceptibles_3.setFrameShadow(QFrame.Shadow.Raised)
        self.gridLayout_13 = QGridLayout(self.f_grafica_susceptibles_3)
        self.gridLayout_13.setObjectName(u"gridLayout_13")
        self.f_datos_simulacion_5 = QFrame(self.f_grafica_susceptibles_3)
        self.f_datos_simulacion_5.setObjectName(u"f_datos_simulacion_5")
        sizePolicy7.setHeightForWidth(self.f_datos_simulacion_5.sizePolicy().hasHeightForWidth())
        self.f_datos_simulacion_5.setSizePolicy(sizePolicy7)
        self.f_datos_simulacion_5.setStyleSheet(u"background-color: rgb(255, 255, 255);\n"
"border-radius: 16px;\n"
"border: 1px solid rgba(162, 170, 173, 100);")
        self.f_datos_simulacion_5.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_datos_simulacion_5.setFrameShadow(QFrame.Shadow.Raised)
        self.verticalLayout_21 = QVBoxLayout(self.f_datos_simulacion_5)
        self.verticalLayout_21.setObjectName(u"verticalLayout_21")
        self.label_55 = QLabel(self.f_datos_simulacion_5)
        self.label_55.setObjectName(u"label_55")
        self.label_55.setFont(font2)
        self.label_55.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_55.setAutoFillBackground(False)
        self.label_55.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(44, 65, 76);\n"
"")

        self.verticalLayout_21.addWidget(self.label_55)

        self.frame_64 = QFrame(self.f_datos_simulacion_5)
        self.frame_64.setObjectName(u"frame_64")
        sizePolicy10.setHeightForWidth(self.frame_64.sizePolicy().hasHeightForWidth())
        self.frame_64.setSizePolicy(sizePolicy10)
        self.frame_64.setStyleSheet(u"border:0px;")
        self.frame_64.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_64.setFrameShadow(QFrame.Shadow.Raised)
        self.horizontalLayout_33 = QHBoxLayout(self.frame_64)
        self.horizontalLayout_33.setSpacing(0)
        self.horizontalLayout_33.setObjectName(u"horizontalLayout_33")
        self.horizontalLayout_33.setContentsMargins(0, 0, 0, 0)
        self.frame_65 = QFrame(self.frame_64)
        self.frame_65.setObjectName(u"frame_65")
        self.frame_65.setMinimumSize(QSize(25, 25))
        self.frame_65.setMaximumSize(QSize(25, 25))
        self.frame_65.setStyleSheet(u"border:0px;\n"
"image: url(:/svg/Boton Nueva Simulacion.svg);\n"
"border-radius:0px;\n"
"background-color: none;")
        self.frame_65.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_65.setFrameShadow(QFrame.Shadow.Raised)

        self.horizontalLayout_33.addWidget(self.frame_65)

        self.label_56 = QLabel(self.frame_64)
        self.label_56.setObjectName(u"label_56")
        sizePolicy10.setHeightForWidth(self.label_56.sizePolicy().hasHeightForWidth())
        self.label_56.setSizePolicy(sizePolicy10)
        self.label_56.setFont(font)
        self.label_56.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_56.setAutoFillBackground(False)
        self.label_56.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(150, 161, 168);\n"
"")

        self.horizontalLayout_33.addWidget(self.label_56)


        self.verticalLayout_21.addWidget(self.frame_64)

        self.l_tasa_trans_m_h = QLabel(self.f_datos_simulacion_5)
        self.l_tasa_trans_m_h.setObjectName(u"l_tasa_trans_m_h")
        sizePolicy1.setHeightForWidth(self.l_tasa_trans_m_h.sizePolicy().hasHeightForWidth())
        self.l_tasa_trans_m_h.setSizePolicy(sizePolicy1)
        self.l_tasa_trans_m_h.setMinimumSize(QSize(82, 0))
        self.l_tasa_trans_m_h.setMaximumSize(QSize(16777215, 16777215))
        self.l_tasa_trans_m_h.setFont(font)
        self.l_tasa_trans_m_h.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.l_tasa_trans_m_h.setAutoFillBackground(False)
        self.l_tasa_trans_m_h.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgba(44, 65, 76, 150);\n"
"padding-right: 20px;\n"
"")

        self.verticalLayout_21.addWidget(self.l_tasa_trans_m_h)

        self.frame_66 = QFrame(self.f_datos_simulacion_5)
        self.frame_66.setObjectName(u"frame_66")
        sizePolicy10.setHeightForWidth(self.frame_66.sizePolicy().hasHeightForWidth())
        self.frame_66.setSizePolicy(sizePolicy10)
        self.frame_66.setStyleSheet(u"border:0px;")
        self.frame_66.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_66.setFrameShadow(QFrame.Shadow.Raised)
        self.horizontalLayout_34 = QHBoxLayout(self.frame_66)
        self.horizontalLayout_34.setSpacing(0)
        self.horizontalLayout_34.setObjectName(u"horizontalLayout_34")
        self.horizontalLayout_34.setContentsMargins(0, 0, 0, 0)
        self.frame_67 = QFrame(self.frame_66)
        self.frame_67.setObjectName(u"frame_67")
        self.frame_67.setMinimumSize(QSize(25, 25))
        self.frame_67.setMaximumSize(QSize(25, 25))
        self.frame_67.setStyleSheet(u"border:0px;\n"
"image: url(:/svg/humano.svg);\n"
"border-radius:0px;\n"
"background-color: none;")
        self.frame_67.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_67.setFrameShadow(QFrame.Shadow.Raised)

        self.horizontalLayout_34.addWidget(self.frame_67)

        self.label_58 = QLabel(self.frame_66)
        self.label_58.setObjectName(u"label_58")
        sizePolicy10.setHeightForWidth(self.label_58.sizePolicy().hasHeightForWidth())
        self.label_58.setSizePolicy(sizePolicy10)
        self.label_58.setFont(font)
        self.label_58.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_58.setAutoFillBackground(False)
        self.label_58.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(150, 161, 168);\n"
"")

        self.horizontalLayout_34.addWidget(self.label_58)


        self.verticalLayout_21.addWidget(self.frame_66)

        self.l_tasa_trans_h_m = QLabel(self.f_datos_simulacion_5)
        self.l_tasa_trans_h_m.setObjectName(u"l_tasa_trans_h_m")
        sizePolicy1.setHeightForWidth(self.l_tasa_trans_h_m.sizePolicy().hasHeightForWidth())
        self.l_tasa_trans_h_m.setSizePolicy(sizePolicy1)
        self.l_tasa_trans_h_m.setMinimumSize(QSize(0, 0))
        self.l_tasa_trans_h_m.setMaximumSize(QSize(16777215, 16777215))
        self.l_tasa_trans_h_m.setFont(font)
        self.l_tasa_trans_h_m.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.l_tasa_trans_h_m.setAutoFillBackground(False)
        self.l_tasa_trans_h_m.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgba(44, 65, 76, 150);\n"
"padding-right: 20px;\n"
"")

        self.verticalLayout_21.addWidget(self.l_tasa_trans_h_m)

        self.frame_68 = QFrame(self.f_datos_simulacion_5)
        self.frame_68.setObjectName(u"frame_68")
        sizePolicy10.setHeightForWidth(self.frame_68.sizePolicy().hasHeightForWidth())
        self.frame_68.setSizePolicy(sizePolicy10)
        self.frame_68.setStyleSheet(u"border:0px;")
        self.frame_68.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_68.setFrameShadow(QFrame.Shadow.Raised)
        self.horizontalLayout_35 = QHBoxLayout(self.frame_68)
        self.horizontalLayout_35.setSpacing(0)
        self.horizontalLayout_35.setObjectName(u"horizontalLayout_35")
        self.horizontalLayout_35.setContentsMargins(0, 0, 0, 0)
        self.frame_69 = QFrame(self.frame_68)
        self.frame_69.setObjectName(u"frame_69")
        self.frame_69.setMinimumSize(QSize(25, 25))
        self.frame_69.setMaximumSize(QSize(25, 25))
        self.frame_69.setStyleSheet(u"border:0px;\n"
"image: url(:/svg/calendario.svg);\n"
"border-radius:0px;\n"
"background-color: none;")
        self.frame_69.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_69.setFrameShadow(QFrame.Shadow.Raised)

        self.horizontalLayout_35.addWidget(self.frame_69)

        self.label_60 = QLabel(self.frame_68)
        self.label_60.setObjectName(u"label_60")
        sizePolicy10.setHeightForWidth(self.label_60.sizePolicy().hasHeightForWidth())
        self.label_60.setSizePolicy(sizePolicy10)
        self.label_60.setFont(font)
        self.label_60.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_60.setAutoFillBackground(False)
        self.label_60.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(150, 161, 168);\n"
"")

        self.horizontalLayout_35.addWidget(self.label_60)


        self.verticalLayout_21.addWidget(self.frame_68)

        self.l_tiempo_recuperacion = QLabel(self.f_datos_simulacion_5)
        self.l_tiempo_recuperacion.setObjectName(u"l_tiempo_recuperacion")
        sizePolicy1.setHeightForWidth(self.l_tiempo_recuperacion.sizePolicy().hasHeightForWidth())
        self.l_tiempo_recuperacion.setSizePolicy(sizePolicy1)
        self.l_tiempo_recuperacion.setMinimumSize(QSize(0, 0))
        self.l_tiempo_recuperacion.setMaximumSize(QSize(16777215, 16777215))
        self.l_tiempo_recuperacion.setFont(font)
        self.l_tiempo_recuperacion.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.l_tiempo_recuperacion.setAutoFillBackground(False)
        self.l_tiempo_recuperacion.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgba(44, 65, 76, 150);\n"
"padding-right: 20px;\n"
"")

        self.verticalLayout_21.addWidget(self.l_tiempo_recuperacion)

        self.frame_70 = QFrame(self.f_datos_simulacion_5)
        self.frame_70.setObjectName(u"frame_70")
        sizePolicy10.setHeightForWidth(self.frame_70.sizePolicy().hasHeightForWidth())
        self.frame_70.setSizePolicy(sizePolicy10)
        self.frame_70.setStyleSheet(u"border:0px;")
        self.frame_70.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_70.setFrameShadow(QFrame.Shadow.Raised)
        self.horizontalLayout_36 = QHBoxLayout(self.frame_70)
        self.horizontalLayout_36.setSpacing(0)
        self.horizontalLayout_36.setObjectName(u"horizontalLayout_36")
        self.horizontalLayout_36.setContentsMargins(0, 0, 0, 0)
        self.frame_71 = QFrame(self.frame_70)
        self.frame_71.setObjectName(u"frame_71")
        self.frame_71.setMinimumSize(QSize(25, 25))
        self.frame_71.setMaximumSize(QSize(25, 25))
        self.frame_71.setStyleSheet(u"border:0px;\n"
"image: url(:/svg/time.svg);\n"
"border-radius:0px;\n"
"background-color: none;")
        self.frame_71.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_71.setFrameShadow(QFrame.Shadow.Raised)

        self.horizontalLayout_36.addWidget(self.frame_71)

        self.label_62 = QLabel(self.frame_70)
        self.label_62.setObjectName(u"label_62")
        sizePolicy10.setHeightForWidth(self.label_62.sizePolicy().hasHeightForWidth())
        self.label_62.setSizePolicy(sizePolicy10)
        self.label_62.setFont(font)
        self.label_62.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_62.setAutoFillBackground(False)
        self.label_62.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(150, 161, 168);\n"
"")

        self.horizontalLayout_36.addWidget(self.label_62)


        self.verticalLayout_21.addWidget(self.frame_70)

        self.l_tiempo_incubacion = QLabel(self.f_datos_simulacion_5)
        self.l_tiempo_incubacion.setObjectName(u"l_tiempo_incubacion")
        sizePolicy1.setHeightForWidth(self.l_tiempo_incubacion.sizePolicy().hasHeightForWidth())
        self.l_tiempo_incubacion.setSizePolicy(sizePolicy1)
        self.l_tiempo_incubacion.setMinimumSize(QSize(0, 0))
        self.l_tiempo_incubacion.setMaximumSize(QSize(16777215, 16777215))
        self.l_tiempo_incubacion.setFont(font)
        self.l_tiempo_incubacion.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.l_tiempo_incubacion.setAutoFillBackground(False)
        self.l_tiempo_incubacion.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgba(44, 65, 76, 150);\n"
"padding-right: 20px;\n"
"")

        self.verticalLayout_21.addWidget(self.l_tiempo_incubacion)


        self.gridLayout_13.addWidget(self.f_datos_simulacion_5, 0, 0, 1, 1)


        self.verticalLayout_10.addWidget(self.f_grafica_susceptibles_3)


        self.horizontalLayout_3.addWidget(self.f_datos_derecho_vacio_2)

        self.sw_panel_derecho.addWidget(self.panel_datos)

        self.horizontalLayout.addWidget(self.sw_panel_derecho)

        self.sw_tarjetas_datos = QStackedWidget(objeto_inicial)
        self.sw_tarjetas_datos.setObjectName(u"sw_tarjetas_datos")
        self.sw_tarjetas_datos.setEnabled(True)
        self.sw_tarjetas_datos.setGeometry(QRect(100, 0, 1280, 720))
        self.sw_tarjetas_datos.setMinimumSize(QSize(1280, 0))
        self.sw_tarjetas_datos.setStyleSheet(u"background: transparent;")
        self.ingresar_datos = QWidget()
        self.ingresar_datos.setObjectName(u"ingresar_datos")
        self.ingresar_datos.setStyleSheet(u"background:transparent;")
        self.f_frame_ingresar_datos = QFrame(self.ingresar_datos)
        self.f_frame_ingresar_datos.setObjectName(u"f_frame_ingresar_datos")
        self.f_frame_ingresar_datos.setGeometry(QRect(0, 10, 371, 715))
        self.f_frame_ingresar_datos.setMinimumSize(QSize(371, 531))
        self.f_frame_ingresar_datos.setStyleSheet(u"background-color: rgb(255, 255, 255);\n"
"border: 1px solid rgba(32, 59, 73, 20);\n"
"border-radius: 16px;\n"
"color: rgb(44, 65, 76);")
        self.f_frame_ingresar_datos.setFrameShape(QFrame.Shape.StyledPanel)
        self.f_frame_ingresar_datos.setFrameShadow(QFrame.Shadow.Raised)
        self.verticalLayout_9 = QVBoxLayout(self.f_frame_ingresar_datos)
        self.verticalLayout_9.setObjectName(u"verticalLayout_9")
        self.verticalLayout_9.setContentsMargins(15, 15, 15, 15)
        self.frame_20 = QFrame(self.f_frame_ingresar_datos)
        self.frame_20.setObjectName(u"frame_20")
        self.frame_20.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_20.setFrameShadow(QFrame.Shadow.Raised)
        self.verticalLayout_14 = QVBoxLayout(self.frame_20)
        self.verticalLayout_14.setObjectName(u"verticalLayout_14")
        self.label_9 = QLabel(self.frame_20)
        self.label_9.setObjectName(u"label_9")
        sizePolicy16 = QSizePolicy(QSizePolicy.Policy.Preferred, QSizePolicy.Policy.Fixed)
        sizePolicy16.setHorizontalStretch(0)
        sizePolicy16.setVerticalStretch(0)
        sizePolicy16.setHeightForWidth(self.label_9.sizePolicy().hasHeightForWidth())
        self.label_9.setSizePolicy(sizePolicy16)
        font5 = QFont()
        font5.setFamilies([u"Inter"])
        font5.setPointSize(14)
        font5.setBold(False)
        self.label_9.setFont(font5)
        self.label_9.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_9.setAutoFillBackground(False)
        self.label_9.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(44, 65, 76);\n"
"")

        self.verticalLayout_14.addWidget(self.label_9)

        self.frame_28 = QFrame(self.frame_20)
        self.frame_28.setObjectName(u"frame_28")
        sizePolicy15.setHeightForWidth(self.frame_28.sizePolicy().hasHeightForWidth())
        self.frame_28.setSizePolicy(sizePolicy15)
        self.frame_28.setStyleSheet(u"border:0px;")
        self.frame_28.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_28.setFrameShadow(QFrame.Shadow.Raised)
        self.horizontalLayout_15 = QHBoxLayout(self.frame_28)
        self.horizontalLayout_15.setSpacing(2)
        self.horizontalLayout_15.setObjectName(u"horizontalLayout_15")
        self.horizontalLayout_15.setContentsMargins(0, 0, 0, 0)
        self.frame_29 = QFrame(self.frame_28)
        self.frame_29.setObjectName(u"frame_29")
        self.frame_29.setMinimumSize(QSize(30, 30))
        self.frame_29.setMaximumSize(QSize(30, 30))
        self.frame_29.setStyleSheet(u"border:0px;\n"
"image: url(:/svg/humano.svg);\n"
"border-radius:0px;\n"
"background-color: none;")
        self.frame_29.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_29.setFrameShadow(QFrame.Shadow.Raised)

        self.horizontalLayout_15.addWidget(self.frame_29)

        self.label_21 = QLabel(self.frame_28)
        self.label_21.setObjectName(u"label_21")
        sizePolicy10.setHeightForWidth(self.label_21.sizePolicy().hasHeightForWidth())
        self.label_21.setSizePolicy(sizePolicy10)
        self.label_21.setFont(font2)
        self.label_21.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_21.setAutoFillBackground(False)
        self.label_21.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(150, 161, 168);\n"
"")

        self.horizontalLayout_15.addWidget(self.label_21)


        self.verticalLayout_14.addWidget(self.frame_28)

        self.frame_27 = QFrame(self.frame_20)
        self.frame_27.setObjectName(u"frame_27")
        sizePolicy16.setHeightForWidth(self.frame_27.sizePolicy().hasHeightForWidth())
        self.frame_27.setSizePolicy(sizePolicy16)
        self.frame_27.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_27.setFrameShadow(QFrame.Shadow.Raised)
        self.verticalLayout_13 = QVBoxLayout(self.frame_27)
        self.verticalLayout_13.setObjectName(u"verticalLayout_13")
        self.frame_12 = QFrame(self.frame_27)
        self.frame_12.setObjectName(u"frame_12")
        sizePolicy17 = QSizePolicy(QSizePolicy.Policy.Preferred, QSizePolicy.Policy.Expanding)
        sizePolicy17.setHorizontalStretch(0)
        sizePolicy17.setVerticalStretch(0)
        sizePolicy17.setHeightForWidth(self.frame_12.sizePolicy().hasHeightForWidth())
        self.frame_12.setSizePolicy(sizePolicy17)
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
        self.label_12.setFont(font2)
        self.label_12.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_12.setAutoFillBackground(False)
        self.label_12.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(44, 65, 76);\n"
"")

        self.horizontalLayout_7.addWidget(self.label_12)

        self.sb_humanos_infectados = QSpinBox(self.frame_12)
        self.sb_humanos_infectados.setObjectName(u"sb_humanos_infectados")
        sizePolicy18 = QSizePolicy(QSizePolicy.Policy.Minimum, QSizePolicy.Policy.Expanding)
        sizePolicy18.setHorizontalStretch(0)
        sizePolicy18.setVerticalStretch(0)
        sizePolicy18.setHeightForWidth(self.sb_humanos_infectados.sizePolicy().hasHeightForWidth())
        self.sb_humanos_infectados.setSizePolicy(sizePolicy18)
        self.sb_humanos_infectados.setMinimumSize(QSize(0, 34))
        self.sb_humanos_infectados.setMaximumSize(QSize(120, 34))
        self.sb_humanos_infectados.setFont(font2)
        self.sb_humanos_infectados.setStyleSheet(u"color: rgb(44, 65, 76);\n"
"background-color: rgba(240, 244, 247, 125);\n"
"border-radius: 8px;\n"
"padding-left: 10px;\n"
"border: 1px solid rgba(32, 59, 73, 15);")
        self.sb_humanos_infectados.setMaximum(100000000)

        self.horizontalLayout_7.addWidget(self.sb_humanos_infectados)


        self.verticalLayout_13.addWidget(self.frame_12)


        self.verticalLayout_14.addWidget(self.frame_27)

        self.frame_25 = QFrame(self.frame_20)
        self.frame_25.setObjectName(u"frame_25")
        sizePolicy15.setHeightForWidth(self.frame_25.sizePolicy().hasHeightForWidth())
        self.frame_25.setSizePolicy(sizePolicy15)
        self.frame_25.setStyleSheet(u"border:0px;")
        self.frame_25.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_25.setFrameShadow(QFrame.Shadow.Raised)
        self.horizontalLayout_14 = QHBoxLayout(self.frame_25)
        self.horizontalLayout_14.setSpacing(2)
        self.horizontalLayout_14.setObjectName(u"horizontalLayout_14")
        self.horizontalLayout_14.setContentsMargins(0, 0, 0, 0)
        self.frame_26 = QFrame(self.frame_25)
        self.frame_26.setObjectName(u"frame_26")
        self.frame_26.setMinimumSize(QSize(30, 30))
        self.frame_26.setMaximumSize(QSize(30, 30))
        self.frame_26.setStyleSheet(u"border:0px;\n"
"border-radius:0px;\n"
"image: url(:/svg/Boton Nueva Simulacion.svg);\n"
"background-color:none;")
        self.frame_26.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_26.setFrameShadow(QFrame.Shadow.Raised)

        self.horizontalLayout_14.addWidget(self.frame_26)

        self.label_20 = QLabel(self.frame_25)
        self.label_20.setObjectName(u"label_20")
        sizePolicy10.setHeightForWidth(self.label_20.sizePolicy().hasHeightForWidth())
        self.label_20.setSizePolicy(sizePolicy10)
        font6 = QFont()
        font6.setFamilies([u"Inter"])
        font6.setPointSize(11)
        self.label_20.setFont(font6)
        self.label_20.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_20.setAutoFillBackground(False)
        self.label_20.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(150, 161, 168);\n"
"")

        self.horizontalLayout_14.addWidget(self.label_20)


        self.verticalLayout_14.addWidget(self.frame_25)

        self.frame_24 = QFrame(self.frame_20)
        self.frame_24.setObjectName(u"frame_24")
        self.frame_24.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_24.setFrameShadow(QFrame.Shadow.Raised)
        self.verticalLayout_12 = QVBoxLayout(self.frame_24)
        self.verticalLayout_12.setObjectName(u"verticalLayout_12")
        self.verticalLayout_12.setContentsMargins(-1, 5, -1, 5)
        self.frame = QFrame(self.frame_24)
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
        self.label_10.setFont(font2)
        self.label_10.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_10.setAutoFillBackground(False)
        self.label_10.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(44, 65, 76);\n"
"")

        self.horizontalLayout_5.addWidget(self.label_10)

        self.sb_poblacion_mosquito = QSpinBox(self.frame)
        self.sb_poblacion_mosquito.setObjectName(u"sb_poblacion_mosquito")
        sizePolicy18.setHeightForWidth(self.sb_poblacion_mosquito.sizePolicy().hasHeightForWidth())
        self.sb_poblacion_mosquito.setSizePolicy(sizePolicy18)
        self.sb_poblacion_mosquito.setMinimumSize(QSize(0, 34))
        self.sb_poblacion_mosquito.setMaximumSize(QSize(120, 34))
        self.sb_poblacion_mosquito.setFont(font2)
        self.sb_poblacion_mosquito.setStyleSheet(u"color: rgb(44, 65, 76);\n"
"background-color: rgba(240, 244, 247, 125);\n"
"border-radius: 8px;\n"
"padding-left: 10px;\n"
"border: 1px solid rgba(32, 59, 73, 15);\n"
"")
        self.sb_poblacion_mosquito.setMaximum(100000000)

        self.horizontalLayout_5.addWidget(self.sb_poblacion_mosquito)


        self.verticalLayout_12.addWidget(self.frame)

        self.frame_11 = QFrame(self.frame_24)
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
        self.label_11.setFont(font2)
        self.label_11.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_11.setAutoFillBackground(False)
        self.label_11.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(44, 65, 76);\n"
"")

        self.horizontalLayout_6.addWidget(self.label_11)

        self.sb_mosquitos_infectados = QSpinBox(self.frame_11)
        self.sb_mosquitos_infectados.setObjectName(u"sb_mosquitos_infectados")
        sizePolicy18.setHeightForWidth(self.sb_mosquitos_infectados.sizePolicy().hasHeightForWidth())
        self.sb_mosquitos_infectados.setSizePolicy(sizePolicy18)
        self.sb_mosquitos_infectados.setMinimumSize(QSize(0, 34))
        self.sb_mosquitos_infectados.setMaximumSize(QSize(120, 34))
        self.sb_mosquitos_infectados.setFont(font2)
        self.sb_mosquitos_infectados.setStyleSheet(u"color: rgb(44, 65, 76);\n"
"background-color: rgba(240, 244, 247, 125);\n"
"border-radius: 8px;\n"
"padding-left: 10px;\n"
"border: 1px solid rgba(32, 59, 73, 15);")
        self.sb_mosquitos_infectados.setMaximum(100000000)

        self.horizontalLayout_6.addWidget(self.sb_mosquitos_infectados)


        self.verticalLayout_12.addWidget(self.frame_11)


        self.verticalLayout_14.addWidget(self.frame_24)

        self.frame_22 = QFrame(self.frame_20)
        self.frame_22.setObjectName(u"frame_22")
        sizePolicy15.setHeightForWidth(self.frame_22.sizePolicy().hasHeightForWidth())
        self.frame_22.setSizePolicy(sizePolicy15)
        self.frame_22.setStyleSheet(u"border:0px;")
        self.frame_22.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_22.setFrameShadow(QFrame.Shadow.Raised)
        self.horizontalLayout_13 = QHBoxLayout(self.frame_22)
        self.horizontalLayout_13.setSpacing(2)
        self.horizontalLayout_13.setObjectName(u"horizontalLayout_13")
        self.horizontalLayout_13.setContentsMargins(0, 0, 0, 0)
        self.frame_23 = QFrame(self.frame_22)
        self.frame_23.setObjectName(u"frame_23")
        self.frame_23.setMinimumSize(QSize(30, 30))
        self.frame_23.setMaximumSize(QSize(30, 30))
        self.frame_23.setStyleSheet(u"border:0px;\n"
"border-radius:0px;\n"
"background-color: none;\n"
"image: url(:/svg/simulacion.svg);")
        self.frame_23.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_23.setFrameShadow(QFrame.Shadow.Raised)

        self.horizontalLayout_13.addWidget(self.frame_23)

        self.label_19 = QLabel(self.frame_22)
        self.label_19.setObjectName(u"label_19")
        sizePolicy10.setHeightForWidth(self.label_19.sizePolicy().hasHeightForWidth())
        self.label_19.setSizePolicy(sizePolicy10)
        self.label_19.setFont(font6)
        self.label_19.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_19.setAutoFillBackground(False)
        self.label_19.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(150, 161, 168);\n"
"")

        self.horizontalLayout_13.addWidget(self.label_19)


        self.verticalLayout_14.addWidget(self.frame_22)

        self.frame_21 = QFrame(self.frame_20)
        self.frame_21.setObjectName(u"frame_21")
        self.frame_21.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_21.setFrameShadow(QFrame.Shadow.Raised)
        self.verticalLayout_11 = QVBoxLayout(self.frame_21)
        self.verticalLayout_11.setObjectName(u"verticalLayout_11")
        self.verticalLayout_11.setContentsMargins(-1, 5, -1, 5)
        self.frame_18 = QFrame(self.frame_21)
        self.frame_18.setObjectName(u"frame_18")
        self.frame_18.setStyleSheet(u"border: 1px solid rgba(162, 170, 173, 60);\n"
"border:none;\n"
"border-radius:10px;")
        self.frame_18.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_18.setFrameShadow(QFrame.Shadow.Raised)
        self.verticalLayout_7 = QVBoxLayout(self.frame_18)
        self.verticalLayout_7.setObjectName(u"verticalLayout_7")
        self.verticalLayout_7.setContentsMargins(5, -1, -1, -1)
        self.label_18 = QLabel(self.frame_18)
        self.label_18.setObjectName(u"label_18")
        self.label_18.setFont(font2)
        self.label_18.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_18.setAutoFillBackground(False)
        self.label_18.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(44, 65, 76);\n"
"")

        self.verticalLayout_7.addWidget(self.label_18)

        self.cb_lugar = QComboBox(self.frame_18)
        self.cb_lugar.addItem("")
        self.cb_lugar.addItem("")
        self.cb_lugar.setObjectName(u"cb_lugar")
        sizePolicy17.setHeightForWidth(self.cb_lugar.sizePolicy().hasHeightForWidth())
        self.cb_lugar.setSizePolicy(sizePolicy17)
        self.cb_lugar.setMinimumSize(QSize(0, 34))
        self.cb_lugar.setMaximumSize(QSize(250, 16777215))
        self.cb_lugar.setFont(font2)
        self.cb_lugar.setStyleSheet(u"background-color: rgba(240, 244, 247, 125);\n"
"border-radius: 8px;\n"
"padding-left: 10px;\n"
"border: 1px solid rgba(32, 59, 73, 15);")

        self.verticalLayout_7.addWidget(self.cb_lugar)


        self.verticalLayout_11.addWidget(self.frame_18)

        self.frame_13 = QFrame(self.frame_21)
        self.frame_13.setObjectName(u"frame_13")
        self.frame_13.setStyleSheet(u"border: 1px solid rgba(162, 170, 173, 60);\n"
"border:none;\n"
"border-radius:10px;")
        self.frame_13.setFrameShape(QFrame.Shape.StyledPanel)
        self.frame_13.setFrameShadow(QFrame.Shadow.Raised)
        self.gridLayout_9 = QGridLayout(self.frame_13)
        self.gridLayout_9.setObjectName(u"gridLayout_9")
        self.gridLayout_9.setContentsMargins(5, -1, -1, -1)
        self.label_13 = QLabel(self.frame_13)
        self.label_13.setObjectName(u"label_13")
        self.label_13.setFont(font2)
        self.label_13.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_13.setAutoFillBackground(False)
        self.label_13.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(44, 65, 76);\n"
"")

        self.gridLayout_9.addWidget(self.label_13, 0, 0, 1, 1)

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
        sizePolicy17.setHeightForWidth(self.cb_duracion_simulacion.sizePolicy().hasHeightForWidth())
        self.cb_duracion_simulacion.setSizePolicy(sizePolicy17)
        self.cb_duracion_simulacion.setMaximumSize(QSize(165, 16777215))
        self.cb_duracion_simulacion.setFont(font2)
        self.cb_duracion_simulacion.setStyleSheet(u"border-radius: 5px;\n"
"background-color: rgba(240, 244, 247, 125);\n"
"border-radius: 8px;\n"
"padding-left: 10px;\n"
"border: 1px solid rgba(32, 59, 73, 15);")

        self.horizontalLayout_8.addWidget(self.cb_duracion_simulacion)

        self.sb_duracion_dias = QSpinBox(self.frame_14)
        self.sb_duracion_dias.setObjectName(u"sb_duracion_dias")
        sizePolicy18.setHeightForWidth(self.sb_duracion_dias.sizePolicy().hasHeightForWidth())
        self.sb_duracion_dias.setSizePolicy(sizePolicy18)
        self.sb_duracion_dias.setMinimumSize(QSize(0, 34))
        self.sb_duracion_dias.setMaximumSize(QSize(120, 34))
        self.sb_duracion_dias.setFont(font2)
        self.sb_duracion_dias.setStyleSheet(u"color: rgb(44, 65, 76);\n"
"background-color: rgba(240, 244, 247, 125);\n"
"border-radius: 8px;\n"
"padding-left: 10px;\n"
"border: 1px solid rgba(32, 59, 73, 15);")
        self.sb_duracion_dias.setMaximum(200)

        self.horizontalLayout_8.addWidget(self.sb_duracion_dias)


        self.gridLayout_9.addWidget(self.frame_14, 1, 0, 1, 1)


        self.verticalLayout_11.addWidget(self.frame_13)

        self.frame_15 = QFrame(self.frame_21)
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
        self.label_14.setFont(font2)
        self.label_14.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_14.setAutoFillBackground(False)
        self.label_14.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(44, 65, 76);\n"
"")

        self.horizontalLayout_9.addWidget(self.label_14)

        self.sb_tasa_transmision_h = QSpinBox(self.frame_15)
        self.sb_tasa_transmision_h.setObjectName(u"sb_tasa_transmision_h")
        sizePolicy18.setHeightForWidth(self.sb_tasa_transmision_h.sizePolicy().hasHeightForWidth())
        self.sb_tasa_transmision_h.setSizePolicy(sizePolicy18)
        self.sb_tasa_transmision_h.setMinimumSize(QSize(0, 34))
        self.sb_tasa_transmision_h.setMaximumSize(QSize(120, 34))
        self.sb_tasa_transmision_h.setFont(font2)
        self.sb_tasa_transmision_h.setStyleSheet(u"color: rgb(44, 65, 76);\n"
"background-color: rgba(240, 244, 247, 125);\n"
"border-radius: 8px;\n"
"padding-left: 10px;\n"
"border: 1px solid rgba(32, 59, 73, 15);")
        self.sb_tasa_transmision_h.setMaximum(99)

        self.horizontalLayout_9.addWidget(self.sb_tasa_transmision_h)


        self.verticalLayout_11.addWidget(self.frame_15)

        self.frame_16 = QFrame(self.frame_21)
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
        self.label_15.setFont(font2)
        self.label_15.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_15.setAutoFillBackground(False)
        self.label_15.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(44, 65, 76);\n"
"")

        self.horizontalLayout_10.addWidget(self.label_15)

        self.sb_dias_recuperacion = QSpinBox(self.frame_16)
        self.sb_dias_recuperacion.setObjectName(u"sb_dias_recuperacion")
        sizePolicy18.setHeightForWidth(self.sb_dias_recuperacion.sizePolicy().hasHeightForWidth())
        self.sb_dias_recuperacion.setSizePolicy(sizePolicy18)
        self.sb_dias_recuperacion.setMinimumSize(QSize(0, 34))
        self.sb_dias_recuperacion.setMaximumSize(QSize(120, 34))
        self.sb_dias_recuperacion.setFont(font2)
        self.sb_dias_recuperacion.setStyleSheet(u"color: rgb(44, 65, 76);\n"
"background-color: rgba(240, 244, 247, 125);\n"
"border-radius: 8px;\n"
"padding-left: 10px;\n"
"border: 1px solid rgba(32, 59, 73, 15);")
        self.sb_dias_recuperacion.setMaximum(100)

        self.horizontalLayout_10.addWidget(self.sb_dias_recuperacion)


        self.verticalLayout_11.addWidget(self.frame_16)

        self.frame_17 = QFrame(self.frame_21)
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
        self.label_16.setFont(font2)
        self.label_16.setLayoutDirection(Qt.LayoutDirection.RightToLeft)
        self.label_16.setAutoFillBackground(False)
        self.label_16.setStyleSheet(u"background: none;\n"
"border:none;\n"
"color: rgb(44, 65, 76);\n"
"")

        self.horizontalLayout_11.addWidget(self.label_16)

        self.sb_tasa_muerte = QSpinBox(self.frame_17)
        self.sb_tasa_muerte.setObjectName(u"sb_tasa_muerte")
        sizePolicy18.setHeightForWidth(self.sb_tasa_muerte.sizePolicy().hasHeightForWidth())
        self.sb_tasa_muerte.setSizePolicy(sizePolicy18)
        self.sb_tasa_muerte.setMinimumSize(QSize(0, 34))
        self.sb_tasa_muerte.setMaximumSize(QSize(120, 34))
        self.sb_tasa_muerte.setFont(font2)
        self.sb_tasa_muerte.setStyleSheet(u"color: rgb(44, 65, 76);\n"
"background-color: rgba(240, 244, 247, 125);\n"
"border-radius: 8px;\n"
"padding-left: 10px;\n"
"border: 1px solid rgba(32, 59, 73, 15);")
        self.sb_tasa_muerte.setMaximum(99)

        self.horizontalLayout_11.addWidget(self.sb_tasa_muerte)


        self.verticalLayout_11.addWidget(self.frame_17)


        self.verticalLayout_14.addWidget(self.frame_21)


        self.verticalLayout_9.addWidget(self.frame_20)

        self.sw_tarjetas_datos.addWidget(self.ingresar_datos)
        self.page_2 = QWidget()
        self.page_2.setObjectName(u"page_2")
        self.sw_tarjetas_datos.addWidget(self.page_2)
        self.sw_tarjetas_datos.raise_()
        self.f_frame_principal.raise_()

        self.retranslateUi(objeto_inicial)

        self.sw_panel_derecho.setCurrentIndex(1)
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
        self.label_44.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Estad\u00edsticas clave:</p></body></html>", None))
        self.label_26.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Ritmo de contagio general:</p></body></html>", None))
        self.l_ritmo_contagio_general.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>000000</p></body></html>", None))
        self.label_22.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Poblaci\u00f3n humana total:</p></body></html>", None))
        self.l_poblacion_humana_total.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>000000</p></body></html>", None))
        self.label_30.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Cantidad de muertos:</p></body></html>", None))
        self.l_cantidad_muertos.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>000000</p></body></html>", None))
        self.label_43.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Infectados acumulados:</p></body></html>", None))
        self.l_infectados_acumulados.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>000000</p></body></html>", None))
        self.pb_retrasar.setText("")
        self.pb_pausa.setText("")
        self.label_17.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p align=\"center\">Dias transcurridos</p></body></html>", None))
        self.l_contador.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p align=\"center\">000</p></body></html>", None))
        self.pb_play.setText("")
        self.pb_adelantar.setText("")
        self.label_45.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p align=\"center\">Indicadores en tiempo real</p></body></html>", None))
        self.label_35.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Susceptibles humanos:</p></body></html>", None))
        self.label_33.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Expuestos humanos:</p></body></html>", None))
        self.label_31.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Infectados humanos:</p></body></html>", None))
        self.label_32.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Recuperados humanos:</p></body></html>", None))
        self.l_susceptibles_h.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>000000</p></body></html>", None))
        self.l_expuestos_h.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>000000</p></body></html>", None))
        self.l_infectados_h.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>000000</p></body></html>", None))
        self.l_recuperados.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>000000</p></body></html>", None))
        self.label_40.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Susceptibles mosquitos:</p></body></html>", None))
        self.label_41.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Expuestos mosquitos:</p></body></html>", None))
        self.label_42.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Infectados mosquitos:</p></body></html>", None))
        self.l_susceptibles_m.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>000000</p></body></html>", None))
        self.l_expuestos_m.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>000000</p></body></html>", None))
        self.l_infectados_m.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>000000</p></body></html>", None))
        self.label_55.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Resumen epidemiol\u00f3gico:</p></body></html>", None))
        self.label_56.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Tasa de transmisi\u00f3n M-H:</p></body></html>", None))
        self.l_tasa_trans_m_h.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>000000</p></body></html>", None))
        self.label_58.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Tasa de transmisi\u00f3n H-M:</p></body></html>", None))
        self.l_tasa_trans_h_m.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>000000</p></body></html>", None))
        self.label_60.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Tiempo de recuperaci\u00f3n:</p></body></html>", None))
        self.l_tiempo_recuperacion.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>000000</p></body></html>", None))
        self.label_62.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Tiempo de incubaci\u00f3n:</p></body></html>", None))
        self.l_tiempo_incubacion.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>000000</p></body></html>", None))
        self.label_9.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Datos de la simulacion</p></body></html>", None))
        self.label_21.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p><span style=\" font-size:11pt;\">Configuraci\u00f3n de humanos</span></p></body></html>", None))
        self.label_12.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Humanos infectados:</p></body></html>", None))
        self.label_20.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Configuraci\u00f3n de mosquitos</p></body></html>", None))
        self.label_10.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Poblacion mosquito:</p></body></html>", None))
        self.label_11.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Mosquitos infectados:</p></body></html>", None))
        self.label_19.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Configuraci\u00f3n de la simulaci\u00f3n</p></body></html>", None))
        self.label_18.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Lugar de la simulacion:</p></body></html>", None))
        self.cb_lugar.setItemText(0, QCoreApplication.translate("objeto_inicial", u"Punto Fijo", None))
        self.cb_lugar.setItemText(1, QCoreApplication.translate("objeto_inicial", u"AntiguoAeropuerto", None))

        self.label_13.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Duracion de la Simulacion:</p></body></html>", None))
        self.cb_duracion_simulacion.setItemText(0, QCoreApplication.translate("objeto_inicial", u"Final de la infeccion", None))
        self.cb_duracion_simulacion.setItemText(1, QCoreApplication.translate("objeto_inicial", u"Personalizado", None))

        self.label_14.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Tasa de transmision:%</p></body></html>", None))
        self.label_15.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Dias de recuperacion:</p></body></html>", None))
        self.label_16.setText(QCoreApplication.translate("objeto_inicial", u"<html><head/><body><p>Tasa de muertes:%</p></body></html>", None))
    # retranslateUi

