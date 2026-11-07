
import { z } from 'zod';

// Validación de los datos de un servicio dentro de una reserva.
const bookingServiceSchema = z.object({
    service: z.string().regex(
        /^[0-9a-fA-F]{24}$/,
        'El ID del servicio no es válido'
    ),
    quantity: z.number().int().positive(
        'La cantidad debe ser mayor que cero'
    )
});

// Validación para crear una reserva.
export const createBookingSchema = z.object({
    clientName: z.string().trim().min(
        1,
        'El nombre de la clienta es obligatorio'
    ),
    clientEmail: z.string().email(
        'El correo electrónico no es válido'
    ),
    date: z.string().trim().min(
        1,
        'La fecha es obligatoria'
    ),
    time: z.string().trim().min(
        1,
        'La hora es obligatoria'
    ),
    status: z.string().trim().min(
        1,
        'El estado es obligatorio'
    ),
    services: z.array(bookingServiceSchema).optional()
});

// Validación al agregar un servicio a una reserva.
// La cantidad es opcional: si no se indica, se utilizará 1.
export const addServiceToBookingSchema = z.object({
    quantity: z.number().int().positive(
        'La cantidad debe ser mayor que cero'
    ).default(1)
});

