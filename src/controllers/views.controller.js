
/*
  Importamos las funciones de nuestra encargada de servicios.
*/
import * as servicesService from '../services/services.service.js';

/*
  Importamos las funciones de nuestra encargada de reservas.
*/
import * as bookingsService from '../services/bookings.service.js';

/*
  Mostramos todos los servicios de MongoDB.
*/
export const renderServices = async (req, res) => {
    try {
        // Recuperamos los servicios y los datos de paginación.
        const result = await servicesService.getServices();

        // Obtenemos la lista de servicios.
        const plainServices = result.services.map(
            service => service.toObject()
        );

        // Renderizamos la vista de servicios.
        return res.render('services', {
            title: 'Servicios de Pilates',
            services: plainServices
        });

    } catch (error) {
        console.error('Error al mostrar servicios:', error.message);
        return res.status(500).send(error.message);
    }
};

/*
  Mostramos todas las reservas de MongoDB.
*/
export const renderAvailability = async (req, res) => {
    try {
        // Recuperamos las reservas desde nuestra arquitectura en capas.
        const bookings = await bookingsService.getBookings();

        // Convertimos las reservas en objetos normales.
        const plainBookings = bookings.map(
            booking => booking.toObject()
        );

        // Renderizamos la vista de reservas.
        return res.render('availability', {
            title: 'Disponibilidad y reservas',
            bookings: plainBookings
        });

    } catch (error) {
        console.error('Error al mostrar reservas:', error.message);
        return res.status(500).send(error.message);
    }
};
