
import { Router } from 'express';

import {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService
} from '../controllers/services.controller.js';

import { validate } from '../validators/validate.middleware.js';

import {
    createServiceSchema,
    updateServiceSchema
} from '../validators/service.validator.js';

const router = Router();

// Consultar todos los servicios.
router.get('/', getServices);

// Consultar un servicio por su ID.
router.get('/:sid', getServiceById);

// Crear un servicio: primero valida y después ejecuta el controlador.
router.post('/', validate(createServiceSchema), createService);

// Actualizar un servicio: primero valida y después ejecuta el controlador.
router.put('/:sid', validate(updateServiceSchema), updateService);

// Eliminar un servicio.
router.delete('/:sid', deleteService);

export default router;

