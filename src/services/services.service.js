
// Importamos las funciones de nuestra intermediaria (Repository).
import * as servicesRepository from '../repositories/services.repository.js';

console.log('REPOSITORY getAll:', typeof servicesRepository.getAll);
console.log('REPOSITORY exports:', Object.keys(servicesRepository));

// Obtenemos todos los servicios y aplicamos los filtros.
export const getServices = async (filters = {}) => {
  
  // Esperamos a que MongoDB nos entregue los servicios.
  let services = await servicesRepository.getAll();

  const { category, available } = filters;

  // Filtramos por categoría si recibimos una.
  if (category) {
    services = services.filter(
      service => service.category === category
    );
  }

  // Filtramos por disponibilidad si recibimos el filtro.
  if (available !== undefined) {
    services = services.filter(
      service => service.available === (available === 'true')
    );
  }

  return services;
};

// Buscamos un servicio por su identificador.
export const getServiceById = async (id) => {
  return await servicesRepository.getById(id);
};

// Creamos un servicio nuevo.
export const createService = async (serviceData) => {
  return await servicesRepository.create(serviceData);
};

// Actualizamos un servicio existente.
export const updateService = async (id, updatedData) => {
  return await servicesRepository.update(id, updatedData);
};

// Eliminamos un servicio.
export const deleteService = async (id) => {
  return await servicesRepository.deleteService(id);
};
