
import * as bookingsRepository from '../repositories/bookings.repository.js';
import * as servicesService from './services.service.js';

// Obtener todas las reservas.
export const getBookings = async () => {
    return await bookingsRepository.getAll();
};

// Crear una reserva.
export const createBooking = async (bookingData) => {
    return await bookingsRepository.create(bookingData);
};

// Buscar una reserva por su identificador.
export const getBookingById = async (id) => {
    return await bookingsRepository.getById(id);
};

// Agregar un servicio a una reserva.
export const addServiceToBooking = async (bookingId, serviceId, quantity = 1) => {

    // Buscar la reserva.
    const booking = await bookingsRepository.getById(bookingId);

    if (!booking) {
        return { error: 'Reserva no encontrada' };
    }

    // Comprobar que el servicio existe.
    const service = await servicesService.getServiceById(serviceId);

    if (!service) {
        return { error: 'Servicio no encontrado' };
    }

    // Comprobar si el servicio ya está en la reserva.
    const existingItem = booking.services.find(
        item => item.service._id.toString() === serviceId
    );

    if (existingItem) {
        // Si ya existe, sumar la cantidad recibida.
        existingItem.quantity += quantity;
    } else {
        // Si no existe, guardar su ObjectId y la cantidad.
        booking.services.push({
            service: serviceId,
            quantity: quantity
        });
    }

    // Guardar la reserva actualizada.
    return await bookingsRepository.update(bookingId, booking);
};
