const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Configurar la carpeta de archivos estáticos
const publicPath = path.join(__dirname, '/');
app.use(express.static(publicPath));

const port = 3000;
server.listen(port, () => {
    console.log(`Servidor en funcionamiento en el puerto ${port}`);
});

const players = []; // Array para almacenar la información de los jugadores conectados

io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');

    // Asignar un número de jugador y recursos iniciales al cliente conectado
    const playerId = players.length + 1; // Número de jugador basado en la cantidad de jugadores conectados
    const initialResources = {
        gold: 5,
        coffeeBeans: 2,
        groundCoffee: 0
    };

    // Agregar la información del jugador conectado al array de jugadores
    players.push({
        playerId,
        resources: initialResources
    });

    // Enviar la información de todos los jugadores a cada cliente
    socket.emit('player_data', players);

    socket.on('turn_ended', (message) => {
        console.log('El jugador ha finalizado su turno:', message);
        // Otra lógica relacionada con el evento
        // ...
        io.emit('turn_ended', message);
    });

    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');
        // Eliminar la información del jugador desconectado del array de jugadores
        const playerIndex = players.findIndex((player) => player.playerId === playerId);
        if (playerIndex !== -1) {
            players.splice(playerIndex, 1);
        }
        // Lógica relacionada con la desconexión del jugador
        // ...
    });
});
