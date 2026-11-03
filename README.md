# Backend de Turnos y Reservas

## Descripción

Este proyecto es una API REST desarrollada con Node.js y Express para gestionar servicios relacionados con clases de Pilates y actividades de postparto, así como reservas de clientes.

La API permite consultar, crear, actualizar y eliminar servicios, crear y consultar reservas y añadir servicios a una reserva.

Los datos se almacenan en archivos JSON mediante las clases `ServiceManager` y `BookingManager`.

La API está organizada en tres capas para separar las responsabilidades:

- **Routes:** definen los endpoints y conectan las rutas con sus controladores.
- **Controllers:** reciben las peticiones HTTP, obtienen los datos necesarios, llaman a los gestores y devuelven las respuestas.
- **Managers:** gestionan la lógica de los datos y su persistencia en archivos JSON.

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

## Arquitectura del proyecto

La aplicación utiliza una arquitectura organizada en tres capas:

### 1. Routes

La carpeta `routes` contiene los routers de servicios y reservas.

Su responsabilidad es definir las rutas HTTP y asociarlas con las funciones correspondientes de los controladores.

Los routers no contienen lógica de negocio ni gestionan directamente los datos.

Archivos:

- `services.router.js`
- `bookings.router.js`

### 2. Controllers

La carpeta `controllers` contiene los controladores que gestionan las peticiones y respuestas HTTP.

Los controladores reciben los datos de `req.params`, `req.query` y `req.body`, llaman a los métodos de los managers y devuelven las respuestas mediante `res.status().json()`.

Archivos y funciones:

**services.controller.js**

- `getServices`: obtiene y filtra los servicios.
- `getServiceById`: busca un servicio por su ID.
- `createService`: crea un servicio.
- `updateService`: actualiza un servicio.
- `deleteService`: elimina un servicio.

**bookings.controller.js**

- `createBooking`: crea una reserva.
- `getBookingById`: consulta una reserva por su ID.
- `addServiceToBooking`: añade un servicio a una reserva y comprueba que el servicio exista.

### 3. Managers

La carpeta `managers` contiene las clases encargadas de gestionar los datos y su persistencia.

No reciben objetos `req` ni `res`, ya que su responsabilidad es trabajar con los datos independientemente de las peticiones HTTP.

Archivos:

- `ServiceManager.js`: gestiona los servicios.
- `BookingManager.js`: gestiona las reservas.

## Estructura del proyecto

```text
backend-turnos-reservas/
├── src/
│   ├── config/
│   │   └── env.config.js
│   ├── controllers/
│   │   ├── services.controller.js
│   │   └── bookings.controller.js
│   ├── managers/
│   │   ├── ServiceManager.js
│   │   └── BookingManager.js
│   ├── routes/
│   │   ├── services.router.js
│   │   └── bookings.router.js
│   ├── data/
│   │   ├── services.json
│   │   └── bookings.json
│   ├── app.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

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

La petición `POST /api/services` debe incluir un cuerpo JSON con los siguientes campos:

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

Ejemplo:

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

El controlador comprueba que el servicio exista antes de añadirlo.

Si el servicio ya está incluido en la reserva, se incrementa su cantidad (`quantity`) en lugar de crear otra entrada para el mismo servicio.

## Persistencia de datos

Los datos se almacenan en los siguientes archivos:

