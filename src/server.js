
/*
  Importamos nuestra aplicación Express.
*/
import app from './app.js';

/*
  Importamos la configuración del puerto.
*/
import { env } from './config/env.config.js';

/*
  Importamos la conexión con MongoDB.
*/
import connectDB from './config/db.config.js';

/*
  Importamos las herramientas para crear el servidor HTTP.
*/
import { createServer } from 'node:http';

/*
  Importamos Socket.io.
*/
import { Server } from 'socket.io';

/*
  Creamos el servidor HTTP utilizando Express.
*/
const httpServer = createServer(app);

/*
  Configuramos Socket.io sobre el servidor HTTP.
*/
const io = new Server(httpServer);

/*
  Guardamos Socket.io para utilizarlo desde los controladores.
*/
app.set('io', io);

/*
  Escuchamos las conexiones de los navegadores.
*/
io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado mediante Socket.io');

    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');
    });
});

/*
  Iniciamos el servidor.
*/
const startServer = async () => {
    try {
        await connectDB();

        httpServer.listen(env.PORT, () => {
            console.log(`Servidor escuchando en el puerto ${env.PORT}`);
            console.log('Socket.io configurado correctamente');
        });

    } catch (error) {
        console.error('Error al iniciar el servidor:', error.message);
        process.exit(1);
    }
};

startServer();
