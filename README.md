# Backend de Turnos y Reservas

## Descripción

Este proyecto es una API REST desarrollada con Node.js y Express para gestionar servicios relacionados con clases de Pilates y actividades de postparto, así como reservas de clientes.

La API permite consultar, crear, actualizar y eliminar servicios, crear y consultar reservas, y añadir servicios a una reserva.

Los datos se almacenan en archivos JSON mediante las clases `ServiceManager` y `BookingManager`, que gestionan la lectura y escritura de la información.

## Tecnologías utilizadas

- Node.js
- Express
- JavaScript (ES Modules)
- dotenv
- JSON y FileSystem de Node.js

## Requisitos previos

Es necesario tener instalado Node.js y npm.

## Instalación

1. Clonar el repositorio.
2. Entrar en la carpeta del proyecto.
3. Instalar las dependencias:

```bash
npm install
```

4. Crear un archivo `.env` en la raíz del proyecto con estas variables:

```dotenv
PORT=8080
NODE_ENV=development
```

También se puede utilizar `.env.example` como plantilla.

## Ejecución

Para iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

El servidor estará disponible en:

`http://localhost:8080`

## Endpoints de servicios

Todas las rutas de servicios utilizan el prefijo `/api/services`.

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/services` | Obtener todos los servicios |
| GET | `/api/services/:sid` | Obtener un servicio por su ID |
| POST | `/api/services` | Crear un servicio |
| PUT | `/api/services/:sid` | Actualizar un servicio |
| DELETE | `/api/services/:sid` | Eliminar un servicio |

### Filtrar servicios

La ruta `GET /api/services` permite utilizar estos parámetros de consulta:

- `category`: filtra por categoría.
- `available`: filtra por disponibilidad (`true` o `false`).

Ejemplos:

```http
GET /api/services?category=Pilates
GET /api/services?available=true
GET /api/services?category=Postparto&available=true
```

### Crear un servicio

La petición `POST /api/services` debe incluir un cuerpo JSON con los campos obligatorios:

- `name`
- `description`
- `duration`
- `price`
- `category`
- `available`

Ejemplo:

```json
{
  "name": "Pilates para principiantes",
  "description": "Clase de iniciación al Pilates",
  "duration": 45,
  "price": 16,
  "category": "Pilates",
  "available": true
}
```

El identificador `id` se genera automáticamente.

La petición `PUT /api/services/:sid` permite actualizar un servicio existente sin modificar su identificador.

## Endpoints de reservas

Todas las rutas de reservas utilizan el prefijo `/api/bookings`.

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/bookings` | Crear una reserva |
| GET | `/api/bookings/:bid` | Consultar una reserva por su ID |
| POST | `/api/bookings/:bid/services/:sid` | Añadir un servicio a una reserva |

### Crear una reserva

La petición `POST /api/bookings` debe incluir los siguientes campos:

- `clientName`: nombre del cliente.
- `clientEmail`: correo electrónico del cliente.
- `date`: fecha de la reserva.
- `time`: hora de la reserva.
- `status`: estado de la reserva.

Ejemplo de cuerpo JSON:

```json
{
  "clientName": "Ana Ejemplo",
  "clientEmail": "ana@example.com",
  "date": "2026-11-05",
  "time": "10:00",
  "status": "pending"
}
```

El identificador `id` se genera automáticamente y la reserva se crea con una lista `services` vacía.

### Añadir un servicio a una reserva

Para añadir un servicio se utiliza la ruta:

```http
POST /api/bookings/:bid/services/:sid
```

Por ejemplo:

```http
POST /api/bookings/1/services/2
```

Esta petición añade el servicio con ID `2` a la reserva con ID `1`.

Si el servicio ya está incluido en la reserva, se incrementa su cantidad (`quantity`) en lugar de crear otra entrada para el mismo servicio.

## Persistencia de datos

Los datos se almacenan en los siguientes archivos:

- `src/data/services.json`: contiene los servicios.
- `src/data/bookings.json`: contiene las reservas.

Los gestores utilizan el módulo FileSystem de Node.js para leer y escribir los archivos JSON. Por tanto, las modificaciones se conservan después de reiniciar el servidor.

## Estructura del proyecto

```text
backend-turnos-reservas/
├── src/
│   ├── config/
│   │   └── env.config.js
│   ├── data/
│   │   ├── services.json
│   │   └── bookings.json
│   ├── managers/
│   │   ├── ServiceManager.js
│   │   └── BookingManager.js
│   ├── routes/
│   │   ├── services.router.js
│   │   └── bookings.router.js
│   ├── app.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Gestión de servicios: ServiceManager

La clase `ServiceManager` incluye los siguientes métodos:

- `getServices()`: devuelve todos los servicios.
- `getServiceById(id)`: busca un servicio por su identificador.
- `addService(serviceData)`: añade un servicio y genera su ID automáticamente.
- `updateService(id, updatedData)`: actualiza un servicio existente.
- `deleteService(id)`: elimina un servicio.

Los cambios se guardan en `services.json`.

## Gestión de reservas: BookingManager

La clase `BookingManager` incluye los siguientes métodos:

- `createBooking(bookingData)`: crea una reserva con un ID automático.
- `getBookingById(id)`: busca una reserva por su identificador.
- `addServiceToBooking(bookingId, serviceId, serviceManager)`: añade un servicio a una reserva o incrementa su cantidad si ya existe.

Los cambios se guardan en `bookings.json`.

## Códigos de respuesta HTTP

La API utiliza, según la operación, los siguientes códigos:

- `200 OK`: operación realizada correctamente.
- `201 Created`: recurso creado correctamente.
- `400 Bad Request`: petición o datos obligatorios incorrectos.
- `404 Not Found`: servicio o reserva no encontrados.

## Variables de entorno y seguridad

- Las variables de entorno se configuran mediante `.env`.
- El archivo `.env` no debe subirse al repositorio.
- El archivo `.env.example` sirve como plantilla de configuración.
- La carpeta `node_modules` no debe incluirse en GitHub.

## Datos iniciales

Los archivos JSON contienen los datos iniciales utilizados por la API. Para comenzar con una lista de reservas vacía, `bookings.json` debe contener:

```json
[]
```
