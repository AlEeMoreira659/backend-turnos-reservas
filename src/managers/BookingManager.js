
// Importamos fs para leer y escribir archivos.
import fs from 'node:fs'

// Importamos path para construir rutas de archivos.
import path from 'node:path'

// Importamos fileURLToPath para obtener la ubicación de este archivo.
import { fileURLToPath } from 'node:url'

// Obtenemos la ruta actual de BookingManager.js.
const __filename = fileURLToPath(import.meta.url)

// Obtenemos la carpeta donde está ubicado BookingManager.js.
const __dirname = path.dirname(__filename)

// Construimos la ruta del archivo bookings.json.
const bookingsFilePath = path.join(
  __dirname,
  '../data/bookings.json'
)

// Creamos la clase BookingManager.
// Esta clase administra los datos de las reservas.
export class BookingManager {

  // El constructor se ejecuta cuando creamos un objeto BookingManager.
  constructor() {

    // Leemos el contenido del archivo bookings.json.
    const fileContent = fs.readFileSync(
      bookingsFilePath,
      'utf-8'
    )

    // Convertimos el texto JSON en una lista de JavaScript.
    this.bookings = JSON.parse(fileContent)
  }

  // Guarda todas las reservas actuales en bookings.json.
  saveBookings() {
    fs.writeFileSync(
      bookingsFilePath,
      JSON.stringify(this.bookings, null, 2),
      'utf-8'
    )
  }

  // MÉTODO 1: crea una nueva reserva.
  createBooking(bookingData) {

    // Definimos los campos obligatorios de una reserva.
    const requiredFields = [
      'clientName',
      'clientEmail',
      'date',
      'time',
      'status'
    ]

    // Comprobamos que no falte ningún campo obligatorio.
    for (const field of requiredFields) {
      if (
        bookingData[field] === undefined ||
        bookingData[field] === null ||
        bookingData[field] === ''
      ) {
        throw new Error(
          `Falta el campo obligatorio: ${field}`
        )
      }
    }

    // Calculamos un ID nuevo para la reserva.
    // Si ya existen reservas, usamos el número siguiente al mayor ID.
    // Si no hay reservas, comenzamos con el ID 1.
    const newId = this.bookings.length > 0
      ? Math.max(
          ...this.bookings.map(booking => booking.id)
        ) + 1
      : 1

    // Creamos la reserva con los datos recibidos.
    // También asignamos el ID y comenzamos con una lista de servicios vacía.
    const newBooking = {
      ...bookingData,
      id: newId,
      services: []
    }

    // Añadimos la nueva reserva a la lista.
    this.bookings.push(newBooking)

    // Guardamos la nueva reserva en el archivo JSON.
    this.saveBookings()

    // Devolvemos la reserva creada.
    return newBooking
  }

  // MÉTODO 2: busca una reserva utilizando su ID.
  getBookingById(id) {

    // Buscamos una reserva cuyo ID coincida con el recibido.
    const booking = this.bookings.find(
      booking => booking.id === id
    )

    // Si existe, la devolvemos.
    // Si no existe, devolvemos null.
    return booking || null
  }

  // MÉTODO 3: agrega un servicio a una reserva existente.
  addServiceToBooking(bookingId, serviceId, serviceManager) {

    // Buscamos la reserva por su ID.
    const booking = this.getBookingById(bookingId)

    // Si la reserva no existe, devolvemos un error.
    if (!booking) {
      return { error: 'Reserva no encontrada' }
    }

    // Consultamos al ServiceManager para comprobar que el servicio existe.
    const service = serviceManager.getServiceById(serviceId)

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

    // Guardamos los cambios en bookings.json.
    this.saveBookings()

    // Devolvemos la reserva actualizada.
    return booking
  }
}
