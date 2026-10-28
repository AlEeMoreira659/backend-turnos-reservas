
/*
    Importamos los servicios desde services.json.
    Estos son los datos iniciales de nuestras clases.
*/

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
/*
    La clase ServiceManager administra los servicios
    de Pilates y postparto.
*/

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const servicesFilePath = path.join(
    __dirname,
    '../data/services.json'
)


export class ServiceManager {

    /*
        El constructor se ejecuta cuando creamos
        un nuevo objeto ServiceManager.

        [...servicesData] crea una copia de la lista.
    */
    constructor() {
        //leemos los servicios guardados en el archivo
        const fileContent = fs.readFileSync(
            servicesFilePath,
            'utf-8'
        )
        this.services =JSON.parse(fileContent)
    }
// guarda la lista actual en el services.json
 saveServices() {
   fs.writeFileSync(
    servicesFilePath,
    JSON.stringify(this.services,null , 2),
    'utf-8'
   )
 }


    /*
        MÉTODO 1: getServices()

        Devuelve todas las clases disponibles en la lista.
    */
  getServices() {
    
    return this.services
}
    /*
        MÉTODO 2: getServiceById(id)

        Busca una clase utilizando su identificador.
        Si no la encuentra, devuelve null.
    */
    getServiceById(id) {
        const service = this.services.find(
            service => service.id === id
        )

        return service || null
    }

    /*
        MÉTODO 3: addService(serviceData)

        Añade una clase nueva a la lista.
        El ID lo genera el programa, no quien añade la clase.
    */
    addService(serviceData) {

        // Campos obligatorios de cada clase.
        const requiredFields = [
            'name',
            'description',
            'duration',
            'price',
            'category',
            'available'
        ]

        // Comprobamos que no falte ningún campo.
        for (const field of requiredFields) {
            if (
                serviceData[field] === undefined ||/*[]Para acceder a una propiedad usando una variable Busca dentro de serviceData la propiedad cuyo nombre está guardado en la variable field».
                Por ejemplo, si field contiene 'name'*/
                serviceData[field] === null ||
                serviceData[field] === ''
            ) {
                throw new Error(
                    `Falta el campo obligatorio: ${field}`
                )
            }
        }

        // Calculamos el siguiente ID disponible.
        const newId = this.services.length > 0
            ? Math.max(
                ...this.services.map(service => service.id)
            ) + 1
            : 1

        // Creamos la nueva clase con su ID generado.
        const newService = {
            ...serviceData,/*... se usa para copiar elementos de una lista o propiedades de un objeto  */
            id: newId
        }

        // Añadimos la nueva clase a la lista.
        this.services.push(newService)/*De todas mis clases (services), encuentra una (service) cuyo ID coincida con el que necesito */
        this.saveServices()// NUEVO: guardamos el servicio en el archivo.

        // Devolvemos la clase que acabamos de crear.
        return newService
    }

    /*
        MÉTODO 4: updateService(id, updatedData)

        Busca una clase y actualiza sus datos.
        Conserva siempre el ID original.
    */
    updateService(id, updatedData) {

        // Buscamos la posición de la clase en la lista.
        const index = this.services.findIndex(
            service => service.id === id
        )

        // Si no existe, devolvemos null.
        if (index === -1) {
            return null
        }

        // Actualizamos los datos sin cambiar el ID.
        this.services[index] = {
            ...this.services[index],/* [] usando principalmente para crear listas y acceder a datos. */
            ...updatedData,
            id: this.services[index].id
        }

        this.saveServices() //  guardamos los cambios.

        // Devolvemos la clase actualizada.
        return this.services[index]
    }

    /*
        MÉTODO 5: deleteService(id)

        Elimina una clase utilizando su ID.
        Si no existe, devuelve null.
    */
    deleteService(id) {

        // Buscamos la posición de la clase.
        const index = this.services.findIndex(
            service => service.id === id
        )

        // Si no la encontramos, no hay nada que eliminar.
        if (index === -1) {
            return null
        }

        // Eliminamos un elemento de la lista.
        const deletedServices = this.services.splice(index, 1)


       this.saveServices()// NUEVO: guardamos la eliminación.

        // Devolvemos la clase eliminada.
        return deletedServices[0]
    }
}

