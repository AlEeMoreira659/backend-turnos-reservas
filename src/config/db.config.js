// Importamos Mongoose.
// Es el intermediario que comunica nuestro backend
// con el archivador de MongoDB.
import mongoose from 'mongoose';

// Importamos la configuración de las variables de entorno.
import { env } from './env.config.js';

// Creamos la función que abre la conexión con MongoDB.
// async permite esperar operaciones que tardan un tiempo.
const connectDB = async () => {
    try {
        // Intentamos conectarnos con MongoDB Atlas.
        // await espera hasta que termine la conexión.
        // process.env.MONGO_URI busca la dirección privada
        // que guardamos en nuestro archivo .env.
        await mongoose.connect(env.MONGO_URI);

        // Si la conexión funciona, mostramos este mensaje.
        console.log('MongoDB conectado correctamente');

    } catch (error) {
        // Si la conexión falla, capturamos el error.
        console.error('Error al conectar con MongoDB:', error.message);

        // Detenemos el programa para no arrancar
        // el servidor sin conexión a la base de datos.
        process.exit(1);
    }
};

// Exportamos la función para que server.js pueda utilizarla.
export default connectDB;