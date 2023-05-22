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
