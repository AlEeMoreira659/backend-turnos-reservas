
// Importamos Mongoose para trabajar con MongoDB.
import mongoose from 'mongoose';

// Importamos las herramientas para leer archivos.
import fs from 'node:fs';

// Importamos las herramientas para construir rutas.
import path from 'node:path';

// Importamos la herramienta para obtener la ubicación del archivo.
import { fileURLToPath } from 'node:url';

// Importamos la conexión con MongoDB.
import connectDB from './config/db.config.js';

// Importamos el modelo de servicios.
import Service from './models/service.model.js';

// Averiguamos dónde está ubicado este archivo.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construimos la ruta del archivo antiguo services.json.
const filePath = path.join(__dirname, 'data', 'services.json');

// Creamos la función que realizará la migración.
const migrateServices = async () => {
    try {
        // Primero nos conectamos a MongoDB Atlas.
        await connectDB();

        // Leemos el contenido del archivo services.json.
        const data = fs.readFileSync(filePath, 'utf-8');

        // Convertimos el texto JSON en una lista de servicios.
        const services = JSON.parse(data);

        // Comprobamos si ya existen servicios en MongoDB.
        const existingServices = await Service.countDocuments();

        if (existingServices > 0) {
            console.log('Ya existen servicios en MongoDB. No se han añadido duplicados.');
            return;
        }

        // Eliminamos el ID antiguo porque MongoDB generará uno nuevo.
        const servicesToInsert = services.map(({ id, ...service }) => service);

        // Guardamos todos los servicios en MongoDB.
        await Service.insertMany(servicesToInsert);

        // Mostramos cuántos servicios se han trasladado.
        console.log(`${servicesToInsert.length} servicios migrados correctamente.`);

    } catch (error) {
        // Si algo falla, mostramos el error.
        console.error('Error durante la migración:', error.message);

    } finally {
        // Cerramos la conexión con MongoDB.
        await mongoose.connection.close();
        console.log('Conexión con MongoDB cerrada.');
    }
};

// Ejecutamos el programa de migración.
migrateServices();
