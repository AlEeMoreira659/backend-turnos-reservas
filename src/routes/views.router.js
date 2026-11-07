
/*
  Importamos Router desde Express.
*/
import { Router } from 'express';

/*
  Importamos las funciones del controlador de vistas.
*/
import {
    renderServices,
    renderAvailability
} from '../controllers/views.controller.js';

/*
  Creamos el router.
*/
const router = Router();

/*
  GET '/' muestra todos los servicios.
*/
router.get('/services', renderServices);

/*
  GET '/availability' muestra las reservas.
*/
router.get('/availability', renderAvailability);

/*
  Exportamos las rutas.
*/
export default router;
