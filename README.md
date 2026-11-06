# Backend de Turnos y Reservas

## Descripción

Este proyecto es una API REST desarrollada con Node.js y Express para gestionar servicios relacionados con clases de Pilates y actividades de postparto, así como reservas de clientes.

La API permite consultar, crear, actualizar y eliminar servicios, crear y consultar reservas y añadir servicios a una reserva.

Los datos se almacenan en archivos JSON mediante una arquitectura en capas que separa las responsabilidades de cada parte de la aplicación.

La arquitectura sigue el siguiente flujo:

**Routes → Controllers → Services → Repositories → DAO → JSON**

Esta organización facilita el mantenimiento, la reutilización del código y una futura migración a una base de datos como MongoDB.

## Tecnologías utilizadas

- Node.js
- Express
- JavaScript (ES Modules)
- dotenv
- JSON
- FileSystem de Node.js

## Requisitos previos

Es necesario tener instalado:

- Node.js
- npm

## Instalación

1. Clonar el repositorio.
2. Entrar en la carpeta del proyecto.
3. Instalar las dependencias:

```bash
npm install
```

4. Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

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

La aplicación utiliza una arquitectura organizada en seis capas, cada una con una responsabilidad específica.

### 1. Routes

La carpeta `routes` contiene los routers de servicios y reservas.

Su responsabilidad es definir los endpoints HTTP y conectar las rutas con las funciones correspondientes de los controladores.

Los routers no contienen lógica de negocio ni acceden directamente a los datos.

Archivos:

- `services.router.js`
- `bookings.router.js`

### 2. Controllers

La carpeta `controllers` contiene los controladores que gestionan las peticiones y respuestas HTTP.

Los controladores reciben los datos de `req.params`, `req.query` y `req.body`, llaman a los services y devuelven las respuestas mediante `res.status().json()`.

Los controladores son la única capa que trabaja directamente con los objetos `req` y `res`.

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
- `addServiceToBooking`: añade un servicio a una reserva.

### 3. Services

La carpeta `services` contiene la lógica de negocio de la aplicación.

Se encarga de aplicar las reglas necesarias y coordinar las operaciones solicitadas a los repositories.

Archivos:

- `services.service.js`: gestiona las operaciones y los filtros de servicios.
- `bookings.service.js`: gestiona las operaciones de reservas y las reglas para añadir servicios.

Una de las reglas de negocio consiste en que, si se añade a una reserva un servicio que ya existe en ella, se incrementa su cantidad (`quantity`) en lugar de crear una entrada duplicada.

También comprueba que la reserva y el servicio existan antes de realizar la operación.

### 4. Repositories

La carpeta `repositories` actúa como intermediaria entre los services y los DAO.

Su responsabilidad es ofrecer métodos para consultar, crear, actualizar y eliminar datos.

Los repositories no contienen lógica de negocio ni acceden directamente a las peticiones HTTP.

Archivos:

- `services.repository.js`
- `bookings.repository.js`

### 5. DAO (Data Access Object)

La carpeta `dao` contiene los módulos encargados del acceso directo a los datos.

Su responsabilidad es leer y escribir los archivos JSON utilizando el módulo FileSystem de Node.js.

Los DAO no contienen lógica de negocio.

Archivos:

- `services.dao.js`
- `bookings.dao.js`

### 6. Data

La carpeta `data` contiene los archivos JSON donde se almacenan los datos de la aplicación.

Archivos:

- `services.json`: almacena los servicios.
- `bookings.json`: almacena las reservas.

### Flujo de funcionamiento

Todas las operaciones siguen el siguiente recorrido:

**Router → Controller → Service → Repository → DAO → JSON**

Cada capa se comunica únicamente con la siguiente, manteniendo separadas las responsabilidades de la aplicación.

Esta organización permite sustituir en el futuro el almacenamiento en archivos JSON por una base de datos como MongoDB, modificando principalmente la capa DAO.

## Estructura del proyecto

```text
backend-turnos-reservas/
├── src/
│   ├── config/
│   │   └── env.config.js
│   ├── controllers/
│   │   ├── services.controller.js
│   │   └── bookings.controller.js
│   ├── services/
│   │   ├── services.service.js
│   │   └── bookings.service.js
│   ├── repositories/
│   │   ├── services.repository.js
│   │   └── bookings.repository.js
│   ├── dao/
│   │   ├── services.dao.js
│   │   └── bookings.dao.js
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

La ruta `GET /api/services` permite utilizar los siguientes parámetros de consulta:

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

La petición `DELETE /api/services/:sid` permite eliminar un servicio existente.

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

### Consultar una reserva

La petición `GET /api/bookings/:bid` permite consultar una reserva utilizando su identificador.

Ejemplo:

```http
GET /api/bookings/1
```

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

El service comprueba que la reserva y el servicio existan antes de realizar la operación.

Si el servicio ya está incluido en la reserva, se incrementa su cantidad (`quantity`) en lugar de crear otra entrada para el mismo servicio.

## Persistencia de datos

Los datos de la aplicación se almacenan en archivos JSON ubicados en la carpeta `src/data/`.

Los DAO son los únicos módulos encargados de acceder directamente a estos archivos mediante FileSystem de Node.js.

Los controllers, services y repositories no acceden directamente a los archivos JSON.

Esta separación permite modificar el sistema de almacenamiento en el futuro sin tener que cambiar toda la lógica de la aplicación.

## Variables de entorno

La aplicación utiliza variables de entorno para configurar el servidor.

Las variables necesarias son:

- `PORT`: puerto en el que se ejecuta el servidor.
- `NODE_ENV`: entorno de ejecución de la aplicación.

El archivo `.env` contiene la configuración local y no debe subirse al repositorio.

El archivo `.env.example` sirve como plantilla para indicar las variables necesarias.

## Control de versiones

El archivo `.gitignore` evita subir al repositorio:

- `node_modules`
- `.env`

De esta forma se evita incluir dependencias instaladas y configuraciones locales o credenciales en el repositorio.

## Autor

Proyecto desarrollado como práctica de backend con Node.js y Express.