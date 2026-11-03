// Importamos Router desde Express.
// Router nos permite crear rutas independientes de la aplicación principal.

import {Router} from 'express'

// Importamos las tres funciones del controlador de reservas.
// Estas funciones contienen la lógica para crear, consultar
// y agregar servicios a una reserva.
import {
    createBooking,
    getBookingById,
    addServiceToBooking
} from '../controllers/bookings.controller.js'

// Creamos una instancia del router.
// Aquí vamos a definir las direcciones de nuestra API.
const router = Router()

// POST '/' permite crear una nueva reserva.
// Cuando llega una petición POST, ejecuta createBooking.
router.post('/', createBooking)

// GET '/:bid' permite buscar una reserva por su identificador.
// :bid es un parámetro variable que contiene el ID de la reserva.
// La función getBookingById se encarga de buscarla.
router.get('/:bid', getBookingById)


// POST '/:bid/services/:sid' permite agregar un servicio a una reserva.
// :bid representa el ID de la reserva.
// :sid representa el ID del servicio que queremos agregar.
// La función addServiceToBooking realiza la operación.
router.post('/:bid/services/:sid', addServiceToBooking)



// Exportamos el router para que app.js pueda utilizarlo.
// Así las rutas quedan disponibles en nuestra aplicación.
export default router