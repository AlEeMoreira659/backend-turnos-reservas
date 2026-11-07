
/*
  Importamos Express para crear nuestra aplicación.
*/
import express from 'express';

/*
  Importamos engine para configurar Handlebars.
*/
import { engine } from 'express-handlebars';

/*
  Importamos herramientas para gestionar las rutas de carpetas.
*/
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/*
  Importamos las rutas de la API REST.
*/
import serviceRouter from './routes/services.router.js';
import bookingRouter from './routes/bookings.router.js';

/*
  Importamos las rutas de las vistas.
*/
import viewsRouter from './routes/views.router.js';

/*
  Calculamos la ubicación de la carpeta src.
*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
  Creamos la aplicación Express.
*/
const app = express();

/*
  Configuramos Handlebars como motor de vistas.
*/
app.engine('handlebars', engine());

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

/*
  Configuramos la carpeta de archivos públicos.
*/
app.use(express.static(path.join(__dirname, 'public')));

/*
  Permitimos recibir datos en formato JSON.
*/
app.use(express.json());

/*
  Conectamos las rutas de la API REST.
*/
app.use('/api/services', serviceRouter);
app.use('/api/bookings', bookingRouter);

/*
  Conectamos las rutas de las vistas Handlebars.
*/
app.use('/views', viewsRouter);

/*
  Exportamos la aplicación para utilizarla en server.js.
*/
export default app;
