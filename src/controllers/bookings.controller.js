
import mongoose from 'mongoose';
import * as bookingsService from '../services/bookings.service.js';

// Crear una reserva.
export const createBooking = async (req, res) => {
    try {
        const newBooking = await bookingsService.createBooking(req.body);

        return res.status(201).json(newBooking);

    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
};

// Consultar una reserva por su identificador.
export const getBookingById = async (req, res) => {
    const id = req.params.bid;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            error: 'ID de reserva inválido'
        });
    }

    try {
        const booking = await bookingsService.getBookingById(id);

        if (!booking) {
            return res.status(404).json({
                error: 'Reserva no encontrada'
            });
        }

        return res.status(200).json(booking);

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

// Agregar un servicio a una reserva.
export const addServiceToBooking = async (req, res) => {
    const bookingId = req.params.bid;
    const serviceId = req.params.sid;

    // Si no se indica cantidad, añadimos una unidad.
    const quantity = req.body.quantity ?? 1;

    if (
        !mongoose.isValidObjectId(bookingId) ||
        !mongoose.isValidObjectId(serviceId)
    ) {
        return res.status(400).json({
            error: 'ID de reserva o servicio inválido'
        });
    }

    try {
        const result = await bookingsService.addServiceToBooking(
            bookingId,
            serviceId,
            quantity
        );

        if (result.error) {
            return res.status(404).json({
                error: result.error
            });
        }

        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};
