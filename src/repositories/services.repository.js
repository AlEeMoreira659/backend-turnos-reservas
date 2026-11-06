import * as servicesDao from '../dao/services.dao.js'
// aca se estan importando funciones de  service dao


//Esta función permite obtener todos los servicios.
export const getAll = () => {
    return servicesDao.getAll ()
}

// Obtenemos un servicio por su ID.Esta función busca un servicio concreto.
export const getById = (id) => {
  return servicesDao.getById(id)
}

//creamos un servicio nuevo
export const create= (serviceData) =>{
    return servicesDao.create(serviceData)
}

// Actualizamos un servicio existente.
export const update = (id, updatedData) => {
  return servicesDao.update(id, updatedData)
}

//eliminamos un servicio 
export const deleteService=(id)=>{
    return servicesDao.delete(id)
}

