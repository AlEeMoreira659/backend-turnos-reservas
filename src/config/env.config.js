// Importamos dotenv para leer las variables guardadas en .env.
import 'dotenv/config'

// Variables de entorno obligatorias.
const requiredEnvVars = ['PORT', 'NODE_ENV', 'MONGO_URI']

// Comprobamos que todas existan.
for (const variable of requiredEnvVars) {
  if (!process.env[variable]) {
    throw new Error(`Falta la variable de entorno ${variable}`)
  }
}

// Convertimos el puerto a número.
const port = Number(process.env.PORT)

if (!Number.isInteger(port) || port <= 0) {
  throw new Error('La variable PORT debe ser un número entero positivo')
}

// Exportamos la configuración.
export const env = {
  PORT: port,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI
}