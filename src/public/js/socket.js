
/*
  Nos conectamos al servidor mediante Socket.io.
*/
const socket = io();

/*
  Comprobamos la conexión con el servidor.
*/
socket.on('connect', () => {
    console.log('CONECTADO A SOCKET.IO:', socket.id);
});

socket.on('connect_error', (error) => {
    console.error('ERROR DE SOCKET.IO:', error.message);
});

/*
  Escuchamos cuando se crea un servicio nuevo.
*/
socket.on('serviceCreated', (service) => {
    console.log('EVENTO RECIBIDO:', service);

    const servicesList = document.getElementById('services-list');

    if (!servicesList) return;

    const card = document.createElement('article');
    card.classList.add('service-card');

    const name = document.createElement('h3');
    name.textContent = service.name;

    const description = document.createElement('p');
    description.textContent = service.description;

    const duration = document.createElement('p');
    duration.textContent = `Duración: ${service.duration} minutos`;

    const price = document.createElement('p');
    price.textContent = `Precio: ${service.price} €`;

    const category = document.createElement('p');
    category.textContent = `Categoría: ${service.category}`;

    const availability = document.createElement('p');
    availability.textContent = service.available
        ? 'Disponible'
        : 'No disponible';

    card.append(name, description, duration, price, category, availability);

    servicesList.prepend(card);

    console.log('SERVICIO AÑADIDO SIN RECARGAR LA PÁGINA');
});
