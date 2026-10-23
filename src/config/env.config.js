
/*
  Importamos dotenv/config para cargar las variables
  de entorno que están guardadas en el archivo .env.
*/
import 'dotenv/config'

/*
  Creamos una lista con las variables de entorno
  que nuestro proyecto necesita obligatoriamente.
*/
const requiredEnvVars = ['PORT', 'NODE_ENV']

/*
  Recorremos la lista para comprobar cada variable.
  "variable" representa cada nombre en cada vuelta.
*/
for (const variable of requiredEnvVars) {

    /*
      Comprobamos que la variable exista y no esté vacía.
    */
    if (!process.env[variable]) {
        throw new Error(`Falta la variable de entorno ${variable}`)
    }
}

/*
  Exportamos la configuración para utilizarla en app.js.
*/
export const env = {
    PORT: Number(process.env.PORT),
    NODE_ENV: process.env.NODE_ENV
}
