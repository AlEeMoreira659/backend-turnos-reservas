// Importamos Mongoose para crear nuestro modelo.
import mongoose from 'mongoose';

// Creamos el esquema que define cómo será cada servicio.
const serviceSchema = new mongoose.Schema({

    // Nombre del servicio. Es obligatorio.
    name: {
        type: String,
        required: true
    },

    // Descripción del servicio. Es obligatoria.
    description: {
        type: String,
        required: true
    },

    // Duración de la clase en minutos. Es obligatoria.
    duration: {
        type: Number,
        required: true
    },

    // Precio del servicio. Es obligatorio.
    price: {
        type: Number,
        required: true
    },

    // Categoría a la que pertenece el servicio.
    category: {
        type: String,
        required: true
    },

    // Indica si el servicio está disponible.
    available: {
        type: Boolean,
        default: true
    }

});

// Creamos y exportamos el modelo Service.
const Service = mongoose.model('Service', serviceSchema);

export default Service;