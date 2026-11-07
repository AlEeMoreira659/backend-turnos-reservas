// Importamos Mongoose para crear nuestro modelo.
import mongoose from 'mongoose';

// Creamos el esquema que define cómo será cada mensaje.
const messageSchema = new mongoose.Schema({

    // Contenido del mensaje enviado por la clienta.
    content: {
        type: String,
        required: true
    }

}, {
    // Mongoose guarda automáticamente la fecha de creación
    // y la fecha de actualización de cada mensaje.
    timestamps: true
});

// Creamos el modelo Message.
const Message = mongoose.model('Message', messageSchema);

// Exportamos el modelo para que otros archivos puedan utilizarlo.
export default Message;