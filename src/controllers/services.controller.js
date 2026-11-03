
// Importamos ServiceManager para gestionar los datos de los servicios.
import { ServiceManager } from '../managers/ServiceManager.js'

// Creamos una instancia del administrador de servicios.
const serviceManager = new ServiceManager()

// Obtenemos todos los servicios y permitimos filtrarlos.
export const getServices = (req, res) => {
  // Leemos los filtros que llegan en la URL.
  const { category, available } = req.query

  // Obtenemos todos los servicios del manager.
  let services = serviceManager.getServices()

  // Si recibimos una categoría, filtramos los servicios.
  if (category) {
    services = services.filter(
      service => service.category === category
    )
  }

  // Si recibimos available, filtramos por disponibilidad.
  if (available !== undefined) {
    services = services.filter(
      service => service.available === (available === 'true')
    )
  }

  // Respondemos con la lista de servicios.
  return res.status(200).json(services)
}

// Buscamos un servicio por su identificador.
export const getServiceById = (req, res) => {
  // Convertimos el ID recibido en un número.
  const id = Number(req.params.sid)

  // Buscamos el servicio mediante el manager.
  const service = serviceManager.getServiceById(id)

  // Si no existe, respondemos con un error 404.
  if (!service) {
    return res.status(404).json({ error: 'Servicio no encontrado' })
  }

  // Si existe, devolvemos el servicio.
  return res.status(200).json(service)
}

// Creamos un servicio nuevo.
export const createService = (req, res) => {
  try {
    // Enviamos los datos recibidos al manager.
    const newService = serviceManager.addService(req.body)

    // Respondemos con código 201 porque se ha creado.
    return res.status(201).json(newService)
  } catch (error) {
    // Si hay un error, respondemos con código 400.
    return res.status(400).json({ error: error.message })
  }
}

// Modificamos un servicio existente.
export const updateService = (req, res) => {
  // Obtenemos el ID del servicio.
  const id = Number(req.params.sid)

  try {
    // Enviamos el ID y los nuevos datos al manager.
    const updatedService = serviceManager.updateService(id, req.body)

    // Si no existe el servicio, respondemos con 404.
    if (!updatedService) {
      return res.status(404).json({ error: 'Servicio no encontrado' })
    }

    // Si existe, devolvemos el servicio actualizado.
    return res.status(200).json(updatedService)
  } catch (error) {
    // Si ocurre un error, respondemos con código 400.
    return res.status(400).json({ error: error.message })
  }
}

// Eliminamos un servicio.
export const deleteService = (req, res) => {
  // Obtenemos el ID del servicio desde la URL.
  const id = Number(req.params.sid)

  // Pedimos al manager que elimine el servicio.
  const deletedService = serviceManager.deleteService(id)

  // Si no existe, respondemos con un error 404.
  if (!deletedService) {
    return res.status(404).json({ error: 'Servicio no encontrado' })
  }

  // Devolvemos el servicio que hemos eliminado.
  return res.status(200).json(deletedService)
}
