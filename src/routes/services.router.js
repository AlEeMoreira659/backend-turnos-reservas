

// Importamos Router desde Express.
// Nos permite crear y organizar las rutas de servicios.
import { Router } from 'express'

// Importamos las funciones del controlador de servicios.
// Cada función se encarga de una operación diferente.
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} from '../controllers/services.controller.js'

// Creamos una instancia del router.
const router = Router()

// GET '/' obtiene todos los servicios.
// También permite aplicar filtros mediante parámetros de consulta.
router.get('/', getServices)

// GET '/:sid' busca un servicio por su identificador.
// :sid representa el ID del servicio.
router.get('/:sid', getServiceById)

// POST '/' permite crear un nuevo servicio.
router.post('/', createService)

// PUT '/:sid' permite modificar un servicio existente.
// :sid indica qué servicio queremos modificar.
router.put('/:sid', updateService)

// DELETE '/:sid' permite eliminar un servicio.
// :sid indica qué servicio queremos eliminar.
router.delete('/:sid', deleteService)

// Exportamos el router para utilizarlo en app.js.
export default router
