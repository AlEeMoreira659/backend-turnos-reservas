
// Importamos BookingManager para gestionar las reservas.
import { BookingManager } from '../managers/BookingManager.js'

// Importamos ServiceManager para comprobar que los servicios existen.
import { ServiceManager } from '../managers/ServiceManager.js'

// Creamos una instancia de cada administrador.
const bookingManager = new BookingManager()
const serviceManager = new ServiceManager()

// Creamos una reserva nueva.
export const createBooking = (req, res) => {
  try {
    // Enviamos los datos recibidos al manager.
    const newBooking = bookingManager.createBooking(req.body)

    // Respondemos con código 201 porque la reserva se ha creado.
    return res.status(201).json(newBooking)
  } catch (error) {
    // Si ocurre un error, respondemos con código 400.
    return res.status(400).json({ error: error.message })
  }
}

// Buscamos una reserva por su identificador.
export const getBookingById = (req, res) => {
  // Convertimos el ID recibido en un número.
  const id = Number(req.params.bid)

  // Comprobamos que el ID sea un número entero positivo.
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'ID de reserva inválido' })
  }

  // Buscamos la reserva mediante el manager.
  const booking = bookingManager.getBookingById(id)

  // Si no existe, respondemos con un error 404.
  if (!booking) {
    return res.status(404).json({ error: 'Reserva no encontrada' })
  }

  // Si existe, devolvemos la reserva.
  return res.status(200).json(booking)
}

// Agregamos un servicio a una reserva.
export const addServiceToBooking = (req, res) => {
  // Obtenemos los dos identificadores de la URL.
  const bookingId = Number(req.params.bid)
  const serviceId = Number(req.params.sid)

  // Comprobamos que ambos identificadores sean válidos.
  if (
    !Number.isInteger(bookingId) || bookingId <= 0 ||
    !Number.isInteger(serviceId) || serviceId <= 0
  ) {
    return res.status(400).json({
      error: 'ID de reserva o servicio inválido'
    })
  }

  // Llamamos al manager para agregar el servicio.
  // También le pasamos ServiceManager para comprobar que existe.
  const result = bookingManager.addServiceToBooking(
    bookingId,
    serviceId,
    serviceManager
  )

  // Si el manager devuelve un error, respondemos con código 404.
  if (result.error) {
    return res.status(404).json({ error: result.error })
  }

  // Si todo ha salido bien, devolvemos la reserva actualizada.
  return res.status(200).json(result)
}
