
// Importamos el modelo Booking.
// Es nuestra ficha de reservas en MongoDB.
import Booking from '../models/booking.model.js';

// Creamos una reserva nueva.
export const create = async (bookingData) => {

    // Guardamos la reserva en MongoDB.
    // MongoDB genera automáticamente su identificador.
    const newBooking = await Booking.create({
        ...bookingData,
        services: []
    });

    return newBooking;
};


// Obtenemos todas las reservas guardadas en MongoDB.
export const getAll = async () => {
    return await Booking.find().populate('services.service');
};


// Buscamos una reserva por su identificador.
export const getById = async (id) => {

    // Buscamos la reserva utilizando su ObjectId.
    // populate permite obtener también los datos de los servicios relacionados.
    return await Booking.findById(id).populate('services.service');
};

// Actualizamos una reserva existente.
export const update = async (id, updatedData) => {

    // Buscamos la reserva, actualizamos sus datos
    // y devolvemos la reserva ya modificada.
    return await Booking.findByIdAndUpdate(
        id,
        updatedData,
        {
            new: true,
            runValidators: true
        }
    ).populate('services.service');
};
