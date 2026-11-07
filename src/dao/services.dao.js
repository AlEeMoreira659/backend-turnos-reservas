// Importamos el modelo Service.
// Es nuestra ficha de servicios y nos permite trabajar con MongoDB.
import Service from '../models/service.model.js';

// Obtenemos todos los servicios del centro de Pilates.
export const getAll = async () => {
    return await Service.find();
};

// Buscamos un servicio por su identificador.
export const getById = async (id) => {
    return await Service.findById(id);
};

// Creamos un servicio nuevo.
export const create = async (serviceData) => {
    return await Service.create(serviceData);
};

// Actualizamos un servicio existente.
export const update = async (id, updatedData) => {
    return await Service.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true
    });
};

// Eliminamos un servicio.
export const deleteService = async (id) => {
    return await Service.findByIdAndDelete(id);
};

// Mantenemos el nombre "delete" que utiliza el repositorio.
export { deleteService as delete };