
// Importamos las funciones de nuestra intermediaria (Repository).
import * as bookingsRepository from '../repositories/bookings.repository.js';

// Importamos las funciones de nuestra encargada de servicios.
import * as servicesService from './services.service.js';


// Obtenemos todas las reservas del centro.
export const getBookings = async () => {
    return await bookingsRepository.getAll();
};

// Creamos una reserva nueva.
export const createBooking = async (bookingData) => {

  // Definimos los campos obligatorios de una reserva.
  const requiredFields = [
    'clientName',
    'clientEmail',
    'date',
    'time',
    'status'
  ];

  // Comprobamos que todos los campos obligatorios tengan información.
  for (const field of requiredFields) {
    if (
      bookingData[field] === undefined ||
      bookingData[field] === null ||
      bookingData[field] === ''
    ) {
      throw new Error(`Falta el campo obligatorio: ${field}`);
    }
  }

  // Esperamos a que la intermediaria guarde la reserva.
  return await bookingsRepository.create(bookingData);
};

// Buscamos una reserva por su identificador.
export const getBookingById = async (id) => {
  return await bookingsRepository.getById(id);
};

// Añadimos un servicio a una reserva.
export const addServiceToBooking = async (bookingId, serviceId) => {

  // Buscamos la reserva y esperamos la respuesta de MongoDB.
  const booking = await bookingsRepository.getById(bookingId);

  // Si la reserva no existe, devolvemos un error.
  if (!booking) {
    return { error: 'Reserva no encontrada' };
  }

  // Buscamos el servicio que queremos añadir.
  const service = await servicesService.getServiceById(serviceId);

  // Si el servicio no existe, devolvemos un error.
  if (!service) {
    return { error: 'Servicio no encontrado' };
  }

  // Comprobamos si el servicio ya está incluido en la reserva.
  // Convertimos los ObjectId a texto para poder compararlos.
  const existingItem = booking.services.find(
    item => item.service._id.toString() === serviceId
  );

  // Si el servicio ya existe, aumentamos su cantidad en uno.
  if (existingItem) {
    existingItem.quantity += 1;

  } else {
    // Si todavía no existe, lo añadimos con cantidad inicial 1.
    booking.services.push({
      service: serviceId,
      quantity: 1
    });
  }

  // Guardamos los cambios y esperamos la reserva actualizada.
  return await bookingsRepository.update(bookingId, booking);
};
