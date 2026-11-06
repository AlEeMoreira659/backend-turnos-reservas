/*Dicho de forma sencilla: es el archivo que se encarga de leer y escribir directamente los datos en nuestro archivo JSON.

En nuestro proyecto:
- services.dao.js trabajará con services.json.
- Más adelante, bookings.dao.js trabajará con bookings.json.
El DAO no decidirá reglas de negocio ni utilizará req o res. Su trabajo será guardar, buscar, actualizar y eliminar datos.*/


// Importamos las herramientas necesarias de Node.js.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Obtenemos la ubicación actual de este archivo.
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Construimos la ruta del archivo services.json.
const filePath = path.join(__dirname, '../data/services.json')

// Esta función lee los servicios guardados en el archivo JSON.
const readData = () => {
  const data = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(data)
}

// Esta función guarda los servicios en el archivo JSON.
const writeData = (services) => {
  fs.writeFileSync(
    filePath,
    JSON.stringify(services, null, 2),
    'utf-8'
  )
}

// Obtenemos todos los servicios.
export const getAll = () => {
  return readData()
}

// Buscamos un servicio por su ID.
export const getById = (id) => {
  const services = readData()
  return services.find(service => service.id === id)
}

// Creamos un servicio nuevo.
export const create = (serviceData) => {
  const services = readData()

  // Generamos un nuevo ID automáticamente.
  const newId = services.length > 0
    ? Math.max(...services.map(service => service.id)) + 1
    : 1

  const newService = {
    ...serviceData,
    id: newId
  }

  services.push(newService)
  writeData(services)

  return newService
}



// Actualizamos un servicio existente.
export const update = (id, updatedData) => {
  const services = readData()

  const index = services.findIndex(service => service.id === id)

  if (index === -1) {
    return null
  }

  services[index] = {
    ...services[index],
    ...updatedData,
    id
  }

  writeData(services)

  return services[index]
}
// Eliminamos un servicio.

export const deleteService = (id) => {
  const services = readData()
  const index = services.findIndex(service => service.id === id)

  if (index === -1) {
    return null
  }

  const deletedService = services[index]

  services.splice(index, 1)

  writeData(services)

  return deletedService
}
export { deleteService as delete }