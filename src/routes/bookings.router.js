
import { Router } from 'express';

import {
    createBooking,
    getBookingById,
    addServiceToBooking
} from '../controllers/bookings.controller.js';

import { validate } from '../validators/validate.middleware.js';

import {
    createBookingSchema,
    addServiceToBookingSchema
} from '../validators/booking.validator.js';

const router = Router();

// Crear una reserva: validar los datos antes del controlador.
router.post('/', validate(createBookingSchema), createBooking);

// Consultar una reserva.
router.get('/:bid', getBookingById);

// Agregar un servicio: validar los datos antes del controlador.
router.post(
    '/:bid/services/:sid',
    validate(addServiceToBookingSchema),
    addServiceToBooking
);

export default router;
