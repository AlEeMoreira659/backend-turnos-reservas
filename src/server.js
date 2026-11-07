/*
    Importamos la aplicación que preparamos en app.js.
*/
import app from './app.js';

/*
    Importamos el puerto configurado en nuestro archivo .env.
*/
import { env } from './config/env.config.js';

/*
    Importamos la función que conecta nuestro backend
    con MongoDB Atlas.
*/
import connectDB from './config/db.config.js';

/*
    Creamos una función para iniciar nuestro servidor.
*/
const startServer = async () => {
    try {
        /*
            Primero conectamos con MongoDB.
            Esperamos a que la conexión termine correctamente.
        */
        await connectDB();

        /*
            Una vez conectados a MongoDB,
            encendemos el servidor para recibir peticiones.
        */
        app.listen(env.PORT, () => {
            console.log(`Servidor escuchando en el puerto ${env.PORT}`);
        });

    } catch (error) {
        /*
            Si ocurre un error al iniciar el servidor,
            mostramos el mensaje correspondiente.
        */
        console.error('Error al iniciar el servidor:', error.message);
    }
};

/*
    Ejecutamos la función que inicia nuestro servidor.
*/
startServer();