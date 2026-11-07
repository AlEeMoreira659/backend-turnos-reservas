
# Backend de Turnos y Reservas

## Descripción

API REST desarrollada con Node.js, Express y MongoDB para gestionar servicios relacionados con clases de Pilates y actividades de postparto, así como reservas de clientes.

La aplicación utiliza Mongoose para comunicarse con MongoDB Atlas y una arquitectura en capas para separar las responsabilidades.

## Tecnologías utilizadas

- Node.js
- Express
- JavaScript (ES Modules)
- MongoDB Atlas
- Mongoose
- dotenv

## Requisitos previos

Es necesario tener instalado:

- Node.js
- npm
- Una cuenta y una base de datos en MongoDB Atlas.

## Instalación

1. Clonar el repositorio.
2. Entrar en la carpeta del proyecto.
3. Instalar las dependencias:

```bash
npm install
```

4. Crear un archivo `.env` en la raíz del proyecto tomando como referencia `.env.example`.

Configurar las siguientes variables:

```env
PORT=8080
NODE_ENV=development
MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/backend_turnos_reservas
```

Sustituir los valores de ejemplo por los datos de conexión propios de MongoDB Atlas.

**Importante:** el archivo `.env` contiene credenciales privadas y no debe subirse a GitHub.

## Ejecución

Para iniciar el servidor:

```bash
npm run dev
```

El servidor estará disponible en:

`http://localhost:8080`

## Migración inicial de servicios

El proyecto incluye un programa para trasladar los servicios de `src/data/services.json` a MongoDB.

Para ejecutarlo:

```bash
node src/seed.js
```

El programa comprueba si ya existen servicios en la colección antes de insertarlos, evitando duplicados al volver a ejecutarlo.

## Arquitectura del proyecto

La aplicación utiliza una arquitectura en capas:

**Routes → Controllers → Services → Repositories → DAO → MongoDB**

### 1. Routes

Define los endpoints HTTP y conecta las rutas con los controladores.

Archivos:
- `services.router.js`
- `bookings.router.js`

### 2. Controllers

Gestiona las peticiones y respuestas HTTP.

Archivos:
- `services.controller.js`
- `bookings.controller.js`

### 3. Services

Contiene la lógica de negocio y las validaciones.

Archivos:
- `services.service.js`
- `bookings.service.js`

### 4. Repositories

Actúa como intermediario entre los services y los DAO.

Archivos:
- `services.repository.js`
- `bookings.repository.js`

### 5. DAO

Gestiona el acceso directo a MongoDB mediante Mongoose.

Archivos:
- `services.dao.js`
- `bookings.dao.js`

### 6. Models

Define la estructura de los documentos de MongoDB mediante esquemas de Mongoose.

Archivos:
- `service.model.js`
- `booking.model.js`
- `message.model.js`

## Endpoints de servicios

Prefijo: `/api/services`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/services` | Obtener todos los servicios |
| GET | `/api/services/:sid` | Obtener un servicio por su ID |
| POST | `/api/services` | Crear un servicio |
| PUT | `/api/services/:sid` | Actualizar un servicio |
| DELETE | `/api/services/:sid` | Eliminar un servicio |

Se pueden filtrar los servicios mediante:

- `category`: filtra por categoría.
- `available`: filtra por disponibilidad.

Ejemplos:

```http
GET /api/services?category=Pilates
GET /api/services?available=false
```

## Endpoints de reservas

Prefijo: `/api/bookings`

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/bookings` | Crear una reserva |
| GET | `/api/bookings/:bid` | Consultar una reserva |
| POST | `/api/bookings/:bid/services/:sid` | Añadir un servicio a una reserva |

Las reservas se relacionan con los servicios mediante identificadores ObjectId de MongoDB.

Si se añade un servicio que ya existe en una reserva, aumenta su cantidad (`quantity`) en lugar de crear una entrada duplicada.

## Persistencia de datos

Los datos se almacenan en MongoDB Atlas.

Los modelos de Mongoose definen la estructura de los documentos:

- `Service`
- `Booking`
- `Message`

El archivo `src/data/services.json` se conserva como origen de los datos para la migración inicial.

## Variables de entorno

- `PORT`: puerto del servidor.
- `NODE_ENV`: entorno de ejecución.
- `MONGO_URI`: dirección de conexión a MongoDB Atlas.

El archivo `.env` no debe subirse al repositorio.

El archivo `.env.example` sirve como plantilla de configuración.

## Control de versiones

El archivo `.gitignore` evita subir:

- `node_modules`
- `.env`

## Autor

Proyecto desarrollado como práctica de backend con Node.js, Express, MongoDB y Mongoose.
