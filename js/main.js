import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x1099bb
});

document.body.appendChild(app.view);

// Conexión con Socket.IO
const socket = io();

// Escucha el evento click del botón "Fin de turno"
const endTurnButton = document.getElementById('endTurnButton');
endTurnButton.addEventListener('click', () => {
    const message = 'El jugador ha finalizado su turno';
    // Emitir el evento al servidor
    socket.emit('turn_ended', message);
});

// Tu código de juego aquí
