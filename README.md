# Pruebas Automatizadas con Playwright y TypeScript

Este proyecto contiene pruebas Apis y Web, automatizadas utilizando Playwright con TypeScript. 

Sigue las instrucciones a continuación para configurar y ejecutar las pruebas.

## Requisitos Previos

1. **Node.js**: Debes tener instalado Node.js en tu máquina.
   - Versión recomendada: >= 18.17.0

2. **Git**: Para clonar este repositorio, debes tener instalado Git.

3. **Archivo .env**
Es necesario que crees un archivo .env en la raiz del proyecto. Dentro del mismo, crear la variable 'CLAVE_SECRETA' y asignar el valor de tu clave.
Ejemplo: CLAVE_SECRETA = vsa789-vsa897-vsa98-vsa98-dsa980d

## Instalación

1. **Clonar el Repositorio**

git clone https://github.com/Elias2696/Challenge-Playwright.git

2. **Instalar dependencias**
npm install

## Ejecucion de pruebas
npm run test:sequence

## Visualizacion de reporte
npx playwright show-report
