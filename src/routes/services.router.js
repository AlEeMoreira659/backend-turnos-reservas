/*Este archivo será el encargado de recibir las peticiones relacionadas con los servicios de Pilates.magina que una clienta quiere consultar tus clases, reservar información sobre Pilates postparto o que tú necesitas modificar el precio de una clase. La aplicación necesita saber qué hacer cuando alguien solicita cada operación.*/
import {Router} from 'express'
import { ServiceManager } from '../managers/ServiceManager.js'

//creamos un router para organizar las rutas de los servicios Traemos de Express una herramienta llamada Router. Nos permite crear y organizar las direcciones de nuestra API.

const router = Router() //Creamos nuestro router. Piensa en él como una pequeña centralita que organiza las peticiones relacionadas con los servicios.

// Creamos el administrador que gestiona los servicios.
const serviceManager = new ServiceManager()

// GET: permite consultar todos los servicios 

router.get('/', (req, res) => {//Indicamos qué debe ocurrir cuando alguien hace una petición GET a la ruta principal de este router. El símbolo '/' representa la ruta raíz del router, no toda la dirección final.
//req significa request: la petición que llega.
//res significa response: la respuesta que enviamos.
     const services = serviceManager.getServices()

 res.json(services)
})
// GET: consultar un servicio por su ID.

router.get('/:id', (req , res) =>{
    const id = Number (req.params.id)
    const service = serviceManager.getServiceById(id)

if (! service){
    return res.status(404).json({
        error:'servicio no encontrado'
    })
}
 res.json(service)
})


router.post('/', (req, res) => {
    

    try {
        const newService = serviceManager.addService(req.body)

        res.status(201).json(newService)
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
})

router.put('/:id',(req, res)=>{
    const id = Number(req.params.id)

    const updatedService = serviceManager.updateService(
        id,
        req.body
    )
    if(!updatedService){
        return res.status(404).json({
            error: 'servicio no  encontrado'
        })
    }
    res.json(updatedService)
})

router.delete('/:id', (req, res)=>{
    const id = Number(req.params.id)
    const deleteService = serviceManager.deleteService(id)
    if(!deleteService){
        return res.status(404).json ({
            error: 'servicio no encontrado'
        })
    }
    res.json({
        mensaje:'Servicio eliminado correctamente ',
        servicio: deleteService
    })
})
//exportamps el router para poder utilizarlo en app.js

export default router