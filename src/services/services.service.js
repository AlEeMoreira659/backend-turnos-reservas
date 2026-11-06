
import * as servicesRepository from '../repositories/services.repository.js'

// Obtenemos todos los servicios y aplicamos los filtros.
export const getServices = (filters = {}) => {
  let services = servicesRepository.getAll()

  const { category, available } = filters

  // Filtramos por categoría si recibimos una.
  if (category) {
    services = services.filter(
      service => service.category === category
    )
  }

  // Filtramos por disponibilidad si recibimos el filtro.
  if (available !== undefined) {
    services = services.filter(
      service => service.available === (available === 'true')
    )
  }

  return services
}

// Buscamos un servicio por su identificador.
export const getServiceById = (id) => {
  return servicesRepository.getById(id)
}

// Creamos un servicio nuevo.
export const createService = (serviceData) => {
  return servicesRepository.create(serviceData)
}

// Actualizamos un servicio existente.
export const updateService = (id, updatedData) => {
  return servicesRepository.update(id, updatedData)
}

// Eliminamos un servicio.
export const deleteService = (id) => {
  return servicesRepository.deleteService(id)
}

