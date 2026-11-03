
// Importamos fs para leer y escribir archivos.
import fs from 'node:fs'

// Importamos path para construir rutas de archivos.
import path from 'node:path'

// Importamos fileURLToPath para obtener la ruta de este archivo.
import { fileURLToPath } from 'node:url'

// Obtenemos la ubicación actual del archivo ServiceManager.js.
const __filename = fileURLToPath(import.meta.url)

// Obtenemos la carpeta donde se encuentra este archivo.
const __dirname = path.dirname(__filename)

// Construimos la ruta del archivo services.json.
const servicesFilePath = path.join(
  __dirname,
  '../data/services.json'
)

// Creamos la clase ServiceManager.
// Esta clase administra los datos de los servicios.
export class ServiceManager {

  // El constructor se ejecuta al crear un objeto ServiceManager.
  constructor() {

    // Leemos el contenido del archivo services.json.
    const fileContent = fs.readFileSync(
      servicesFilePath,
      'utf-8'
    )

    // Convertimos el texto JSON en una lista de JavaScript.
    this.services = JSON.parse(fileContent)
  }

  // Guarda los servicios actuales dentro del archivo JSON.
  saveServices() {
    fs.writeFileSync(
      servicesFilePath,
      JSON.stringify(this.services, null, 2),
      'utf-8'
    )
  }

  // MÉTODO 1: devuelve todos los servicios.
  getServices() {
    return this.services
  }

  // MÉTODO 2: busca un servicio por su ID.
  // Si no lo encuentra, devuelve null.
  getServiceById(id) {
    const service = this.services.find(
      service => service.id === id
    )

    return service || null
  }

  // MÉTODO 3: agrega un servicio nuevo.
  addService(serviceData) {

    // Definimos los campos obligatorios.
    const requiredFields = [
      'name',
      'description',
      'duration',
      'price',
      'category',
      'available'
    ]

    // Comprobamos que estén presentes todos los campos.
    for (const field of requiredFields) {
      if (
        serviceData[field] === undefined ||
        serviceData[field] === null ||
        serviceData[field] === ''
      ) {
        throw new Error(
          `Falta el campo obligatorio: ${field}`
        )
      }
    }

    // Generamos un ID nuevo y consecutivo.
    const newId = this.services.length > 0
      ? Math.max(
          ...this.services.map(service => service.id)
        ) + 1
      : 1

    // Creamos el servicio y le asignamos su nuevo ID.
    const newService = {
      ...serviceData,
      id: newId
    }

    // Añadimos el servicio a la lista.
    this.services.push(newService)

    // Guardamos la lista actualizada en services.json.
    this.saveServices()

    // Devolvemos el servicio creado.
    return newService
  }

  // MÉTODO 4: actualiza los datos de un servicio.
  updateService(id, updatedData) {

    // Buscamos la posición del servicio dentro de la lista.
    const index = this.services.findIndex(
      service => service.id === id
    )

    // Si no existe, devolvemos null.
    if (index === -1) {
      return null
    }

    // Combinamos los datos anteriores con los nuevos.
    // Conservamos el ID original.
    this.services[index] = {
      ...this.services[index],
      ...updatedData,
      id: this.services[index].id
    }

    // Guardamos los cambios en el archivo JSON.
    this.saveServices()

    // Devolvemos el servicio actualizado.
    return this.services[index]
  }

  // MÉTODO 5: elimina un servicio por su ID.
  deleteService(id) {

    // Buscamos la posición del servicio.
    const index = this.services.findIndex(
      service => service.id === id
    )

    // Si no existe, devolvemos null.
    if (index === -1) {
      return null
    }

    // Eliminamos el servicio de la lista.
    const deletedServices = this.services.splice(index, 1)

    // Guardamos la lista después de eliminarlo.
    this.saveServices()

    // Devolvemos el servicio que fue eliminado.
    return deletedServices[0]
  }
}
