
import Service from '../models/service.model.js';

// Consultar servicios con filtros, ordenamiento y paginación.
export const getAll = async (filters = {}) => {
    const {
        category,
        available,
        page = 1,
        limit = 10,
        sortBy = 'name',
        order = 'asc'
    } = filters;

    const query = {};

    if (category) {
        query.category = category;
    }

    if (available !== undefined) {
        query.available = available === 'true';
    }

    const sortOrder = order === 'desc' ? -1 : 1;
    const skip = (page - 1) * limit;

    const [services, total] = await Promise.all([
        Service.find(query)
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(limit),
        Service.countDocuments(query)
    ]);

    return {
        services,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasPrevPage: page > 1,
        hasNextPage: page < Math.ceil(total / limit)
    };
};

// Buscar un servicio por su identificador.
export const getById = async (id) => {
    return await Service.findById(id);
};

// Crear un servicio.
export const create = async (serviceData) => {
    return await Service.create(serviceData);
};

// Actualizar un servicio.
export const update = async (id, updatedData) => {
    return await Service.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true
    });
};

// Eliminar un servicio.
export const deleteService = async (id) => {
    return await Service.findByIdAndDelete(id);
};

export { deleteService as delete };
