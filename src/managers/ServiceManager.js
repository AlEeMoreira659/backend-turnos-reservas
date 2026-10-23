
/*
    Importamos los servicios desde services.json.
    Estos son los datos iniciales de nuestras clases.
*/
import servicesData from '../data/services.json' with { type: 'json' }

/*
    La clase ServiceManager administra los servicios
    de Pilates y postparto.
*/
export class ServiceManager {

    /*
        El constructor se ejecuta cuando creamos
        un nuevo objeto ServiceManager.

        [...servicesData] crea una copia de la lista.
    */
    constructor() {
        this.services = [...servicesData]
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

        // Devolvemos la clase eliminada.
        return deletedServices[0]
    }
}

