
// Importamos las funciones de nuestra archivista (DAO).
import * as servicesDao from '../dao/services.dao.js';

// Obtenemos todos los servicios del centro de Pilates.
export const getAll = async () => {
    return await servicesDao.getAll();
};

// Buscamos un servicio por su identificador.
export const getById = async (id) => {
    return await servicesDao.getById(id);
};

// Creamos un servicio nuevo.
export const create = async (serviceData) => {
    return await servicesDao.create(serviceData);
};

// Actualizamos un servicio existente.
export const update = async (id, updatedData) => {
    return await servicesDao.update(id, updatedData);
};

// Eliminamos un servicio.
export const deleteService = async (id) => {
    return await servicesDao.delete(id);
};
