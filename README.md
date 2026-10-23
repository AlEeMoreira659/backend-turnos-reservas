# Backend de Turnos y Reservas

## Descripción

Este proyecto es un backend desarrollado con Node.js para gestionar servicios relacionados con clases de Pilates y actividades de postparto.

Permite consultar, buscar, añadir, actualizar y eliminar servicios mediante la clase `ServiceManager`.

Los datos iniciales se almacenan en un archivo JSON.

## Tecnologías utilizadas

- Node.js
- JavaScript (ES Modules)
- dotenv
- JSON

## Requisitos previos

Antes de ejecutar el proyecto, es necesario tener instalado Node.js y npm.

## Instalación

1. Clonar el repositorio.
2. Entrar en la carpeta del proyecto.
3. Instalar las dependencias:

```bash
npm install
```

4. Crear un archivo `.env` en la carpeta principal con las siguientes variables:

```dotenv
PORT=8080
NODE_ENV=development
```

## Ejecución

Para ejecutar el proyecto, utilizar:

```bash
npm run dev
```

## Estructura del proyecto

```text
backend-turnos-reservas/
├── src/
│   ├── config/
│   │   └── env.config.js
│   ├── data/
│   │   └── services.json
│   ├── managers/
│   │   └── ServiceManager.js
│   └── app.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Gestión de servicios

Cada servicio contiene los siguientes campos:

- `id`: identificador único del servicio.
- `name`: nombre del servicio.
- `description`: descripción del servicio.
- `duration`: duración en minutos.
- `price`: precio del servicio.
- `category`: categoría del servicio.
- `available`: indica si el servicio está disponible.

## Métodos de ServiceManager

- `getServices()`: devuelve todos los servicios.
- `getServiceById(id)`: busca un servicio por su identificador.
- `addService(serviceData)`: añade un servicio y genera su identificador automáticamente.
- `updateService(id, updatedData)`: actualiza los datos de un servicio sin cambiar su identificador.
- `deleteService(id)`: elimina un servicio por su identificador.

## Notas

- Las variables de entorno se configuran mediante el archivo `.env`.
- El archivo `.env` no debe subirse al repositorio.
- El archivo `.env.example` sirve como plantilla de configuración.
- Los datos se gestionan en memoria a partir de `services.json`; los cambios realizados durante la ejecución no se guardan automáticamente en el archivo JSON.