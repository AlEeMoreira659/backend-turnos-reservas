# Backend de Turnos y Reservas

## Descripción

Este proyecto es un backend desarrollado con Node.js y Express para gestionar servicios relacionados con clases de Pilates y actividades de postparto.

Permite consultar, buscar, añadir, actualizar y eliminar servicios mediante una API REST. La lógica de gestión se encuentra en la clase `ServiceManager`.

Los datos iniciales se cargan desde un archivo JSON y las modificaciones se gestionan en memoria.

## Tecnologías utilizadas

- Node.js
- Express
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

También se puede utilizar `.env.example` como plantilla de configuración.

## Ejecución

Para iniciar el servidor, ejecutar:

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:8080`.

## Endpoints de la API

El servidor utiliza el prefijo `/api/services` para gestionar los servicios.

| Método HTTP | Ruta | Función |
|---|---|---|
| GET | `/api/services` | Obtener todos los servicios |
| GET | `/api/services/:id` | Obtener un servicio por su ID |
| POST | `/api/services` | Crear un servicio |
| PUT | `/api/services/:id` | Actualizar un servicio |
| DELETE | `/api/services/:id` | Eliminar un servicio |

### Filtros de servicios

La ruta `GET /api/services` permite filtrar los resultados mediante parámetros de consulta:

- `category`: filtra por categoría.
- `available`: filtra por disponibilidad (`true` o `false`).

Ejemplos:

```http
GET /api/services?category=Pilates
GET /api/services?available=true
GET /api/services?category=Postparto&available=true
```

### Crear un servicio

Las peticiones `POST` deben enviar los datos en formato JSON. Los campos obligatorios son `name`, `description`, `duration`, `price`, `category` y `available`.

Ejemplo de cuerpo JSON:

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

El identificador se genera automáticamente.

Las peticiones `PUT` también reciben los datos en formato JSON y permiten actualizar un servicio existente sin modificar su identificador.

### Códigos de respuesta

- `200 OK`: operación realizada correctamente.
- `201 Created`: servicio creado correctamente.
- `400 Bad Request`: faltan campos obligatorios al crear un servicio.
- `404 Not Found`: el servicio solicitado no existe.

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
│   ├── routes/
│   │   └── services.router.js
│   ├── app.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
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

- Las variables de entorno se configuran mediante `.env`.
- El archivo `.env` no debe subirse al repositorio.
- El archivo `.env.example` sirve como plantilla de configuración.
- Los datos se cargan inicialmente desde `services.json`.
- Los cambios realizados durante la ejecución se mantienen en memoria y no se guardan automáticamente en el archivo JSON.

## Ejemplos de uso de ServiceManager

Los siguientes ejemplos ilustran cómo utilizar los métodos de `ServiceManager`:

```javascript
import { ServiceManager } from './src/managers/ServiceManager.js'

const serviceManager = new ServiceManager()

// Obtener todos los servicios.
const services = serviceManager.getServices()
console.log(services)

// Buscar un servicio por su ID.
const service = serviceManager.getServiceById(2)
console.log(service)

// Añadir un servicio nuevo.
const newService = serviceManager.addService({
  name: 'Pilates para principiantes',
  description: 'Clase de iniciación al Pilates',
  duration: 45,
  price: 16,
  category: 'Pilates',
  available: true
})
console.log(newService)

// Actualizar el precio del servicio creado.
const updatedService = serviceManager.updateService(
  newService.id,
  { price: 19 }
)
console.log(updatedService)

// Eliminar el servicio creado.
const deletedService = serviceManager.deleteService(newService.id)
console.log(deletedService)
```

**Nota:** estos ejemplos son ilustrativos. Las operaciones se realizan en memoria y no guardan automáticamente los cambios en `services.json`.