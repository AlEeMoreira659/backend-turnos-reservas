import { Router } from 'express'
import { BookingManager} from '../managers/BookingManager.js'
import { ServiceManager } from '../managers/ServiceManager.js'

const router = Router()

const bookingManager = new BookingManager()
const serviceManager = new ServiceManager()

// POST /api/bookings
// Crear una reserva nueva.

router.post ('/', (req, res)=>{
    try {
        const booking = bookingManager.createBooking(req.body)
        res.status(201).json(booking)
    }catch(error){
        res.status(400).json({
            error: error.message
        })
    }
})

// GET /api/bookings/:bid
// Buscar una reserva por su ID.
router.get ('/:bid', (req, res)=>{

    const id = Number(req.params.bid)

    if (!Number.isInteger(id) || id <= 0) {

        return res.status(400).json({
            error: 'elIDdebe ser un numero positivo'
        })
    }

    const booking = bookingManager.getBookingById(id)

    if (!booking){
        return res.status(404).json({
            error:'reserva no encontrada '
        })
    }
    res.json(booking)

})
// POST /api/bookings/:bid/services/:sid
// Añadir un servicio a una reserva.

router.post ('/:bid/services/:sid',(req,res)=>{
    const bookingId=Number(req.params.bid)
    const serviceId= Number(req.params.sid)

    if(
    !Number.isInteger(bookingId)||
    bookingId<=0||
    !Number.isInteger(serviceId)||
    serviceId<=0
    ){
        return res.status(400).json({
            error:'Los IDs deben ser numeros positivos'
        })
    }
    const result = bookingManager.addServiceToBooking(
        bookingId,
        serviceId,
        serviceManager
    )
    if (result.error) {
        return res.status(404).json({
            error: result.error
        })
    }
    res.json(result)
})
export default router