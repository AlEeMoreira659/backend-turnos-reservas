
import * as servicesDao from '../dao/services.dao.js';

// Obtener servicios aplicando los filtros recibidos.
export const getAll = async (filters = {}) => {
    return await servicesDao.getAll(filters);
};

// Buscar un servicio por su identificador.
export const getById = async (id) => {
    return await servicesDao.getById(id);
};

// Crear un servicio nuevo.
export const create = async (serviceData) => {
    return await servicesDao.create(serviceData);
};

// Actualizar un servicio existente.
export const update = async (id, updatedData) => {
    return await servicesDao.update(id, updatedData);
};

// Eliminar un servicio.
export const deleteService = async (id) => {
    return await servicesDao.delete(id);
};
