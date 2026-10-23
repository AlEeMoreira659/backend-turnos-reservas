/*
    Importamos la configuración del proyecto.
    Aquí comprobamos las variables PORT y NODE_ENV.
*/
import {env} from './config/env.config.js'

/*
    Importamos nuestra clase administradora de servicios.
*/
import  {ServiceManager} from './managers/ServiceManager.js'


/*
    Creamos un administrador de servicios.
    Cargará las clases iniciales desde services.json.
*/

const serviceManager = new ServiceManager()
/*ServiceManager empieza con mayúscula Es el nombre de la clase que creamos en el archivo ServiceManager.js.

Una clase es como un molde para crear objetos.

Imagina que ServiceManager es el molde de una caja que sabe administrar las clases de Pilates: buscar, añadir, actualizar y eliminar servicios.

En JavaScript, por convención, los nombres de las clases empiezan con mayúscula. */

/*serviceManager empieza con minúscula Es el nombre de la variable donde guardamos el objeto que creamos con ese molde.

En otras palabras, usamos new ServiceManager() para crear un objeto y lo guardamos en la variable serviceManager.*/


/*Mira la diferencia
Mayúscula
ServiceManager
Es el molde, la clase que hemos definido.

Minúscula
serviceManager
Es la variable que guarda el objeto creado a partir de ese molde. */


// Mostramos qué petición hemos recibido.

/*
    Mostramos la configuración del proyecto.
*/

console.log('Entorno:', env.NODE_ENV)
console.log('Puerto' , env.PORT)

/*
    Mostramos todas nuestras clases.
*/

console.log('todas las clases:')
console.log(serviceManager.getServices())

/*
    Buscamos la clase que tiene el ID 2.
*/

console.log('Clase con ID 2')
console.log(serviceManager.getServiceById(2))

/*
    PRUEBA 1: addService()

    Creamos una nueva clase de Pilates
    para comprobar que el método funciona.
*/
const nuevaClase = serviceManager.addService({

name:'Pilates para principiantes',
description:'Clase de iniciación al Pilates',
duration:45,
price:16,
category:'Pilates',
available:true

})
// Mostramos la clase que acabamos de añadir.
console.log('Nueva clase creada:')
console.log(nuevaClase)


/*
    PRUEBA 2: updateService()

    Cambiamos el precio de la clase con ID 5
    de 16 € a 19 €.
*/

const claseActualizada = serviceManager.updateService(5,{

    price: 19
})
// Mostramos la clase después de actualizarla.

console.log('Clase actualizada')
console.log(claseActualizada)

/*
    PRUEBA 3: deleteService()

    Eliminamos la clase de prueba con ID 5.
*/

const claseEliminada = serviceManager.deleteService(5)

// Mostramos la clase que hemos eliminado.

console.log('Clase eliminada')
console.log(claseEliminada)
// Comprobamos si la clase sigue existiendo.

console.log('¿sigue existiendo la clase 5?')
console.log(serviceManager.getServiceById(5))