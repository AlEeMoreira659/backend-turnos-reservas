//bookings.repository.js se comunicará con bookings.dao.js, y este último será quien lea y escriba en bookings.json.
import * as bookingsDao from '../dao/bookings.dao.js'

// creamos la reserva 
export const create =(bookingsData)=>{
    return bookingsDao.create(bookingsData)
}

// buscar una nueva reserva 
export const getById =(id)=>{
    return bookingsDao.getById(id)
}

// Actualizamos una reserva existente.
export const update = (id, updatedData) => {
  return bookingsDao.update(id, updatedData)
}