// Importamos Mongoose para crear nuestro modelo.
import mongoose from 'mongoose';

// Creamos el esquema que define cómo será cada reserva.
const bookingSchema = new mongoose.Schema({

    // Nombre de la clienta. Es obligatorio.
    clientName: {
        type: String,
        required: true
    },

    // Correo electrónico de la clienta. Es obligatorio.
    clientEmail: {
        type: String,
        required: true
    },

    // Fecha de la reserva. Es obligatoria.
    date: {
        type: String,
        required: true
    },

    // Hora de la reserva. Es obligatoria.
    time: {
        type: String,
        required: true
    },

    // Estado de la reserva. Es obligatorio.
    status: {
        type: String,
        required: true
    },

    // Servicios que ha contratado la clienta.
    services: [
        {
            // Guardamos el identificador del servicio de Pilates.
            // ObjectId permite relacionar la reserva con el modelo Service.
            service: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Service',
                required: true
            },

            // Cantidad de veces que ha contratado ese servicio.
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ]

});

// Creamos el modelo Booking.
const Booking = mongoose.model('Booking', bookingSchema);

// Exportamos el modelo para que otros archivos puedan utilizarlo.
export default Booking;