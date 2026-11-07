
import * as servicesRepository from '../repositories/services.repository.js';

// Obtener servicios con filtros, paginación y ordenamiento.
export const getServices = async (filters = {}) => {
    const {
        category,
        available,
        page = '1',
        limit = '10',
        sortBy = 'name',
        order = 'asc'
    } = filters;

    const currentPage = Number(page);
    const pageLimit = Number(limit);

    // Comprobar que la página y el límite sean números válidos.
    if (
        !Number.isInteger(currentPage) ||
        currentPage < 1 ||
        !Number.isInteger(pageLimit) ||
        pageLimit < 1
    ) {
        throw new Error('La página y el límite deben ser números enteros positivos');
    }

    // Comprobar los campos permitidos para ordenar.
    const allowedSortFields = [
        'name',
        'price',
        'duration',
        'category'
    ];

    if (!allowedSortFields.includes(sortBy)) {
        throw new Error('El campo de ordenación no es válido');
    }

    if (!['asc', 'desc'].includes(order)) {
        throw new Error('El orden debe ser asc o desc');
    }

    if (
        available !== undefined &&
        !['true', 'false'].includes(available)
    ) {
        throw new Error('El filtro available debe ser true o false');
    }

    // Enviar los filtros al repositorio y al DAO.
    return await servicesRepository.getAll({
        category,
        available,
        page: currentPage,
        limit: pageLimit,
        sortBy,
        order
    });
};

// Buscar un servicio por su identificador.
export const getServiceById = async (id) => {
    return await servicesRepository.getById(id);
};

// Crear un servicio.
export const createService = async (serviceData) => {
    return await servicesRepository.create(serviceData);
};

// Actualizar un servicio.
export const updateService = async (id, updatedData) => {
    return await servicesRepository.update(id, updatedData);
};

// Eliminar un servicio.
export const deleteService = async (id) => {
    return await servicesRepository.deleteService(id);
};
