import fs from 'node:fs'//trabajar con archivos: leerlos, escribirlos, modificarlos, etc.
import path from 'node:path'//construir rutas de archivos y carpetas.
import { fileURLToPath } from 'node:url'//convertir una dirección de archivo en una ruta que Node.js

// Importamos las herramientas necesarias de Node.js.


// Obtenemos la ubicación actual de este archivo.
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Construimos la ruta del archivo bookings.json.
const filePath = path.join(__dirname, '../data/bookings.json')

// Leemos las reservas guardadas.
const readData = () => {
  const data = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(data)
}

// Guardamos las reservas en el archivo JSON.
const writeData = (bookings) => {
  fs.writeFileSync(
    filePath,
    JSON.stringify(bookings, null, 2),
    'utf-8'
  )
}

// Creamos una reserva nueva.
export const create = (bookingData) => {
  const bookings = readData()

  const newId = bookings.length > 0
    ? Math.max(...bookings.map(booking => booking.id)) + 1
    : 1

  const newBooking = {
    ...bookingData,
    id: newId,
    services: []
  }

  bookings.push(newBooking)
  writeData(bookings)

  return newBooking
}
export const getById = (id) => {
  const bookings = readData()
  return bookings.find(booking => booking.id === id)
}
export const update = (id, updatedData) => {
  const bookings = readData()

  const index = bookings.findIndex(booking => booking.id === id)

  if (index === -1) {
    return null
  }

  bookings[index] = {
    ...bookings[index],
    ...updatedData,
    id
  }

  writeData(bookings)

  return bookings[index]
}