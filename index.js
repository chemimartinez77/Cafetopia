const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = 3000;
http.listen(port, () => {
    console.log(`Servidor en funcionamiento en el puerto ${port}`);
});

io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');

    socket.on('turn_ended', (message) => {
        console.log('El jugador ha finalizado su turno:', message);
        // Otra lógica relacionada con el evento
        // ...
        io.emit('turn_ended', message);
    });

    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');
        // Lógica relacionada con la desconexión del jugador
        // ...
    });
});
