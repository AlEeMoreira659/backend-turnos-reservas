/*
    Importamos la aplicación que preparamos en app.js.
*/

import app from './app.js'

/*
    Importamos el puerto configurado en nuestro archivo .env.
*/

import { env } from './config/env.config.js'

/*
    Encendemos el servidor para que reciba peticiones.
*/

app.listen(env.PORT,()=> {
console.log(`Servidor escuchando en el puerto ${env.PORT}`)

})