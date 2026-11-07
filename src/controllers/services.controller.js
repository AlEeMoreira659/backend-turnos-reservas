
// Importamos las funciones de nuestra encargada (Service).
import * as servicesService from '../services/services.service.js';

// Obtenemos todos los servicios y permitimos filtrarlos.
export const getServices = async (req, res) => {
  try {
    const { category, available } = req.query;

    // Esperamos a que la encargada nos entregue los servicios.
    const services = await servicesService.getServices({
      category,
      available
    });

    return res.status(200).json(services);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Buscamos un servicio por su identificador.
export const getServiceById = async (req, res) => {
  try {
    // El identificador ahora es un ObjectId, no un número.
    const id = req.params.sid;

    const service = await servicesService.getServiceById(id);

    if (!service) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    return res.status(200).json(service);

  } catch (error) {
    return res.status(400).json({ error: 'Identificador de servicio inválido' });
  }
};

// Creamos un servicio nuevo.
export const createService = async (req, res) => {
  try {
    const newService = await servicesService.createService(req.body);

    return res.status(201).json(newService);

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Modificamos un servicio existente.
export const updateService = async (req, res) => {
  try {
    const id = req.params.sid;

    const updatedService = await servicesService.updateService(id, req.body);

    if (!updatedService) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    return res.status(200).json(updatedService);

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Eliminamos un servicio.
export const deleteService = async (req, res) => {
  try {
    const id = req.params.sid;

    const deletedService = await servicesService.deleteService(id);

    if (!deletedService) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    return res.status(200).json(deletedService);

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
