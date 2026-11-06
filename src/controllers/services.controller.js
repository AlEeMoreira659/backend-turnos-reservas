
import * as servicesService from '../services/services.service.js'

// Obtenemos todos los servicios y permitimos filtrarlos.
export const getServices = (req, res) => {
  const { category, available } = req.query

  const services = servicesService.getServices({
    category,
    available
  })

  return res.status(200).json(services)
}

// Buscamos un servicio por su identificador.
export const getServiceById = (req, res) => {
  const id = Number(req.params.sid)

  const service = servicesService.getServiceById(id)

  if (!service) {
    return res.status(404).json({ error: 'Servicio no encontrado' })
  }

  return res.status(200).json(service)
}

// Creamos un servicio nuevo.
export const createService = (req, res) => {
  try {
    const newService = servicesService.createService(req.body)

    return res.status(201).json(newService)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

// Modificamos un servicio existente.
export const updateService = (req, res) => {
  const id = Number(req.params.sid)

  try {
    const updatedService = servicesService.updateService(id, req.body)

    if (!updatedService) {
      return res.status(404).json({ error: 'Servicio no encontrado' })
    }

    return res.status(200).json(updatedService)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

// Eliminamos un servicio.
export const deleteService = (req, res) => {
  const id = Number(req.params.sid)

  const deletedService = servicesService.deleteService(id)

  if (!deletedService) {
    return res.status(404).json({ error: 'Servicio no encontrado' })
  }

  return res.status(200).json(deletedService)
}
