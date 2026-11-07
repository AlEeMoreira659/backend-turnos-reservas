
# Backend de Turnos y Reservas

## Descripción

API REST desarrollada con Node.js, Express y MongoDB para gestionar servicios relacionados con clases de Pilates y actividades de postparto, así como reservas de clientes.

La aplicación utiliza Mongoose para comunicarse con MongoDB Atlas y una arquitectura en capas para separar las responsabilidades.

También incorpora validaciones con Zod, consultas avanzadas con filtros y paginación, relaciones entre documentos mediante populate, vistas dinámicas con Handlebars y comunicación en tiempo real mediante Socket.io.

## Tecnologías utilizadas

- Node.js
- Express
- JavaScript (ES Modules)
- MongoDB Atlas
- Mongoose
- Zod
- dotenv
- Express Handlebars
- Socket.io

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
- `views.router.js`

### 2. Controllers

Gestiona las peticiones y respuestas HTTP.

Archivos:

- `services.controller.js`
- `bookings.controller.js`
- `views.controller.js`

### 3. Services

Contiene la lógica de negocio y las operaciones de la aplicación.

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

### 7. Validators

Contiene los esquemas de validación de datos mediante Zod y el middleware que los aplica antes de ejecutar los controladores.

Archivos:

- `service.validator.js`
- `booking.validator.js`
- `validate.middleware.js`

## Endpoints de servicios

Prefijo: `/api/services`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/services` | Obtener servicios con filtros y paginación |
| GET | `/api/services/:sid` | Obtener un servicio por su ID |
| POST | `/api/services` | Crear un servicio |
| PUT | `/api/services/:sid` | Actualizar un servicio |
| DELETE | `/api/services/:sid` | Eliminar un servicio |

### Consultas avanzadas

El endpoint `GET /api/services` permite utilizar los siguientes parámetros:

| Parámetro | Descripción | Ejemplo |
|---|---|---|
| `category` | Filtra por categoría | `category=Pilates` |
| `available` | Filtra por disponibilidad | `available=true` |
| `page` | Número de página | `page=1` |
| `limit` | Resultados por página | `limit=2` |
| `sortBy` | Campo por el que ordenar | `sortBy=price` |
| `order` | Orden ascendente o descendente | `order=asc` |

Campos permitidos para ordenar:

- `name`
- `price`
- `duration`
- `category`

El parámetro `order` acepta `asc` o `desc`.

Ejemplos de consultas:

```http
GET /api/services?category=Pilates
GET /api/services?available=false
GET /api/services?page=1&limit=2
GET /api/services?sortBy=price&order=asc
GET /api/services?category=Pilates&available=true&page=1&limit=5&sortBy=price&order=desc
```

### Respuesta de paginación

La respuesta incluye la lista de servicios y los metadatos de paginación:

```json
{
  "services": [
    {
      "_id": "ID_DEL_SERVICIO",
      "name": "Pilates",
      "description": "Clase de Pilates",
      "duration": 60,
      "price": 22,
      "category": "Pilates",
      "available": true
    }
  ],
  "total": 6,
  "page": 1,
  "limit": 2,
  "totalPages": 3,
  "hasPrevPage": false,
  "hasNextPage": true
}
```

Los filtros, el ordenamiento y la paginación se ejecutan directamente en MongoDB mediante Mongoose.

## Endpoints de reservas

Prefijo: `/api/bookings`

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/bookings` | Crear una reserva |
| GET | `/api/bookings/:bid` | Consultar una reserva |
| POST | `/api/bookings/:bid/services/:sid` | Añadir un servicio a una reserva |

### Relaciones entre reservas y servicios

Las reservas almacenan referencias a los servicios mediante `ObjectId` de MongoDB.

Cada servicio asociado a una reserva contiene:

- `service`: referencia al documento del servicio.
- `quantity`: cantidad reservada.

El modelo utiliza una referencia a `Service`:

```javascript
service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
}
```

### Populate

Para consultar una reserva con los datos completos de sus servicios se utiliza Mongoose `populate`.

En el DAO:

```javascript
export const getById = async (id) => {
    return await Booking.findById(id)
        .populate('services.service');
};
```

De esta forma, al consultar:

```http
GET /api/bookings/:bid
```

se obtiene la información de la reserva junto con los servicios relacionados, incluyendo sus nombres, descripciones, duración, precio y categoría.

Ejemplo de la estructura de respuesta:

```json
{
  "_id": "ID_DE_LA_RESERVA",
  "clientName": "Laura",
  "clientEmail": "laura@email.com",
  "date": "2026-11-10",
  "time": "10:00",
  "status": "confirmed",
  "services": [
    {
      "service": {
        "_id": "ID_DEL_SERVICIO",
        "name": "Pilates",
        "description": "Clase de Pilates",
        "duration": 60,
        "price": 22,
        "category": "Pilates",
        "available": true
      },
      "quantity": 3
    }
  ]
}
```

Si se añade un servicio que ya existe en una reserva, aumenta su cantidad (`quantity`) en lugar de crear una entrada duplicada.

## Validaciones con Zod

El proyecto utiliza Zod para validar los datos recibidos por la API antes de que lleguen a los controladores y se guarden en MongoDB.

Las validaciones se encuentran en `src/validators/`.

### Validación de servicios

Al crear o actualizar servicios se comprueban:

- Nombre obligatorio.
- Descripción obligatoria.
- Duración mayor que cero.
- Precio igual o superior a cero.
- Categoría obligatoria.
- Disponibilidad de tipo booleano, cuando se proporciona.

### Validación de reservas

Al crear una reserva se comprueban:

- Nombre de la clienta obligatorio.
- Correo electrónico con formato válido.
- Fecha obligatoria.
- Hora obligatoria.
- Estado obligatorio.

### Validación al añadir servicios a una reserva

Se comprueba que la cantidad sea un número entero positivo.

Si no se indica cantidad, se utiliza el valor predeterminado `1`.

### Middleware de validación

El middleware `validate.middleware.js` utiliza `safeParse()` para comprobar los datos recibidos.

Si los datos no son válidos, la API devuelve un código HTTP `400` con el campo y el mensaje del error.

Ejemplo de respuesta:

```json
{
  "error": "Error de validación",
  "details": [
    {
      "field": "clientEmail",
      "message": "El correo electrónico no es válido"
    }
  ]
}
```

Las validaciones se aplican en las rutas mediante el middleware correspondiente, antes de ejecutar los controladores.

## Vistas con Handlebars

El proyecto utiliza Express Handlebars como motor de plantillas para mostrar información almacenada en MongoDB mediante páginas HTML dinámicas.

Las vistas disponibles son:

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/views/services` | Mostrar los servicios registrados |
| GET | `/views/availability` | Mostrar las reservas registradas |

Las vistas muestran información obtenida de la base de datos, sin utilizar datos estáticos:

- **Servicios:** nombre, descripción, duración, precio, categoría y disponibilidad.
- **Reservas:** cliente, correo electrónico, fecha, hora, estado y servicios reservados.

Los archivos de las vistas se encuentran en `src/views/` y los estilos CSS en `src/public/css/styles.css`.

## Comunicación en tiempo real con Socket.io

El proyecto incorpora Socket.io para permitir la comunicación en tiempo real entre el servidor y los clientes conectados.

Cuando se crea un nuevo servicio mediante la API REST, el servidor emite el evento:

`serviceCreated`

Los navegadores conectados escuchan este evento mediante `src/public/js/socket.js`.

Al recibirlo, la página de servicios incorpora automáticamente el nuevo servicio a la vista, sin necesidad de recargar el navegador.

El servidor configura Socket.io mediante el servidor HTTP y mantiene la API REST existente.

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

Proyecto desarrollado como práctica de backend con Node.js, Express, MongoDB, Mongoose, Zod, Handlebars y Socket.io.
