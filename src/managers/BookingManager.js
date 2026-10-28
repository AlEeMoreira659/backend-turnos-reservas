import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

//localizamos el archivo booking.json.

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const bookingsFilePath = path.join(
    __dirname,
    '../data/bookings.json'
)

export class BookingManager {
    // leemos las reservas guardadas al inciar 

    constructor (){
        const fileContent = fs.readFileSync(
            bookingsFilePath,
            'utf-8'
        )
        this.bookings =JSON.parse(fileContent)
    }
    // guardamos las reservas en bookings.json
    saveBookings(){
        fs.writeFileSync(
            bookingsFilePath,
            JSON.stringify(this.bookings, null, 2),
            'utf-8'
        )


    }
    //creamos una nueva reserva
    createBooking(bookingData){
        const requiredFields= [
            'clientName',
            'clientEmail',
            'date',
            'time',
            'status'

        ]
        for (const field of requiredFields) {
            if(
                bookingData[field]===undefined||
                bookingData[field]===null||
                bookingData[field]===''

            ){
                throw new Error (
                   `Falta el campo obligatorio: ${field}`
                )
            }
        }
        //calculamos un ID nuevo 
        const newId = this.bookings.length>0
        ? Math.max(
            ...this.bookings.map(booking => booking.id)
        )+1
        :1

        //creamos la reserva y comenzamos con servicios vacios 
        const newBooking = {
    ...bookingData,
    id: newId,
    services: []
}
        this.bookings.push(newBooking)
        this.saveBookings()

        return newBooking

    }
    // buscamos una reserva por su ID

    getBookingById(id) {
        const booking = this.bookings.find(
            booking => booking.id === id
        )

     return booking || null
    }
    //anadimos un servicio a una reserva existente 
  addServiceToBooking(bookingId, serviceId, serviceManager) {
    const booking = this.getBookingById(bookingId)

    if (!booking) {
        return { error: 'Reserva no encontrada' }
    }

    const service = serviceManager.getServiceById(serviceId)

    if (!service) {
        return { error: 'Servicio no encontrado' }
    }

    const existingItem = booking.services.find(
        item => item.service === serviceId
    )

    if (existingItem) {
        existingItem.quantity += 1
    } else {
        booking.services.push({
            service: serviceId,
            quantity: 1
        })
    }

    this.saveBookings()

    return booking
}
}