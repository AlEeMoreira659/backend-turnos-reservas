
// Importamos las funciones de nuestra archivista (DAO).
import * as bookingsDao from '../dao/bookings.dao.js';

// Creamos una reserva nueva.
export const create = async (bookingData) => {
    return await bookingsDao.create(bookingData);
};

// Buscamos una reserva por su identificador.
export const getById = async (id) => {
    return await bookingsDao.getById(id);
};

// Actualizamos una reserva existente.
export const update = async (id, updatedData) => {
    return await bookingsDao.update(id, updatedData);
};
