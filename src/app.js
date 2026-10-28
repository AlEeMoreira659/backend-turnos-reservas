
/*
  Importamos Express para crear nuestra aplicación.
*/
import express from 'express'

/*
  Importamos las rutas de los servicios.
*/
import serviceRouter from './routes/services.router.js'

import bookingRouter from './routes/bookings.router.js'

/*
  Creamos la aplicación.
*/
const app = express()

/*
  Permitimos recibir datos en formato JSON.
*/
app.use(express.json())

/*
  Conectamos las rutas de los servicios.
*/
app.use('/api/services', serviceRouter)

app.use('/api/bookings', bookingRouter)

/*
  Exportamos la aplicación para utilizarla en server.js.
*/
export default app
