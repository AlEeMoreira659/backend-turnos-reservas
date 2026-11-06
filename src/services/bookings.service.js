import * as bookingsRepository from '../repositories/bookings.repository.js'
import * as servicesService from './services.service.js'

// Creamos una reserva nueva.
export const createBooking = (bookingData) => {
  const requiredFields = [
    'clientName',
    'clientEmail',
    'date',
    'time',
    'status'
  ]

  for (const field of requiredFields) {
    if (
      bookingData[field] === undefined ||
      bookingData[field] === null ||
      bookingData[field] === ''
    ) {
      throw new Error(`Falta el campo obligatorio: ${field}`)
    }
  }

  return bookingsRepository.create(bookingData)
}

// Buscamos una reserva por su ID.
export const getBookingById = (id) => {
  return bookingsRepository.getById(id)
}
// Añadimos un servicio a una reserva.
export const addServiceToBooking = (bookingId, serviceId) => {

  // Buscamos la reserva por su ID.
  const booking = bookingsRepository.getById(bookingId)

  // Si la reserva no existe, devolvemos un error.
  if (!booking) {
    return { error: 'Reserva no encontrada' }
  }

  // Buscamos el servicio que queremos añadir.
  const service = servicesService.getServiceById(serviceId)

  // Si el servicio no existe, devolvemos un error.
  if (!service) {
    return { error: 'Servicio no encontrado' }
  }

  // Comprobamos si el servicio ya está incluido en la reserva.
  const existingItem = booking.services.find(
    item => item.service === serviceId
  )

  // Si el servicio ya existe, aumentamos su cantidad en uno.
  if (existingItem) {
    existingItem.quantity += 1
  } else {
    // Si todavía no existe, lo añadimos con cantidad inicial 1.
    booking.services.push({
      service: serviceId,
      quantity: 1
    })
  }

  // Guardamos los cambios y devolvemos la reserva actualizada.
  return bookingsRepository.update(bookingId, booking)
}