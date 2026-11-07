
// Importamos Mongoose para comprobar los identificadores.
import mongoose from 'mongoose';

// Importamos las funciones de nuestra encargada (Service).
import * as bookingsService from '../services/bookings.service.js';

// Creamos una reserva nueva.
export const createBooking = async (req, res) => {
  try {
    // Enviamos los datos recibidos a nuestra encargada.
    const newBooking = await bookingsService.createBooking(req.body);

    // Respondemos con código 201 porque la reserva se ha creado.
    return res.status(201).json(newBooking);

  } catch (error) {
    // Si ocurre un error, respondemos con código 400.
    return res.status(400).json({ error: error.message });
  }
};

// Buscamos una reserva por su identificador.
export const getBookingById = async (req, res) => {
  // Obtenemos el identificador de la URL.
  const id = req.params.bid;

  // Comprobamos que tenga un formato válido de MongoDB.
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: 'ID de reserva inválido' });
  }

  try {
    // Buscamos la reserva y esperamos la respuesta.
    const booking = await bookingsService.getBookingById(id);

    // Si no existe, respondemos con un error 404.
    if (!booking) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }

    // Si existe, devolvemos la reserva.
    return res.status(200).json(booking);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Agregamos un servicio a una reserva.
export const addServiceToBooking = async (req, res) => {
  // Obtenemos los dos identificadores de la URL.
  const bookingId = req.params.bid;
  const serviceId = req.params.sid;

  // Comprobamos que ambos identificadores sean válidos.
  if (
    !mongoose.isValidObjectId(bookingId) ||
    !mongoose.isValidObjectId(serviceId)
  ) {
    return res.status(400).json({
      error: 'ID de reserva o servicio inválido'
    });
  }

  try {
    // Llamamos a nuestra encargada para agregar el servicio.
    const result = await bookingsService.addServiceToBooking(
      bookingId,
      serviceId
    );

    // Si la encargada devuelve un error, respondemos con código 404.
    if (result.error) {
      return res.status(404).json({ error: result.error });
    }

    // Si todo ha salido bien, devolvemos la reserva actualizada.
    return res.status(200).json(result);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
