
import mongoose from 'mongoose';
import * as servicesService from '../services/services.service.js';

// Obtener servicios con filtros, paginación y ordenamiento.
export const getServices = async (req, res) => {
    try {
        const {
            category,
            available,
            page,
            limit,
            sortBy,
            order
        } = req.query;

        const result = await servicesService.getServices({
            category,
            available,
            page,
            limit,
            sortBy,
            order
        });

        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

// Buscar un servicio por su identificador.
export const getServiceById = async (req, res) => {
    const id = req.params.sid;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            error: 'ID de servicio inválido'
        });
    }

    try {
        const service = await servicesService.getServiceById(id);

        if (!service) {
            return res.status(404).json({
                error: 'Servicio no encontrado'
            });
        }

        return res.status(200).json(service);

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

// Crear un servicio y avisar mediante Socket.io.
export const createService = async (req, res) => {
    try {
        const newService = await servicesService.createService(req.body);

        const io = req.app.get('io');

        io.emit('serviceCreated', newService);

        return res.status(201).json(newService);

    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
};

// Actualizar un servicio.
export const updateService = async (req, res) => {
    const id = req.params.sid;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            error: 'ID de servicio inválido'
        });
    }

    try {
        const updatedService = await servicesService.updateService(id, req.body);

        if (!updatedService) {
            return res.status(404).json({
                error: 'Servicio no encontrado'
            });
        }

        return res.status(200).json(updatedService);

    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
};

// Eliminar un servicio.
export const deleteService = async (req, res) => {
    const id = req.params.sid;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            error: 'ID de servicio inválido'
        });
    }

    try {
        const deletedService = await servicesService.deleteService(id);

        if (!deletedService) {
            return res.status(404).json({
                error: 'Servicio no encontrado'
            });
        }

        return res.status(200).json(deletedService);

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};
