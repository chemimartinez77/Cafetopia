const app = new PIXI.Application({
    width: 1600,
    height: 900,
    backgroundColor: 0x1099bb
});

document.body.appendChild(app.view);

// Conexión con Socket.IO
const socket = io();

// Array para almacenar las referencias de los textos de los jugadores
const playerTexts = [];

// Crear un botón con recuadro en PixiJS
const button = new PIXI.Container();

// Resto del código del botón...

// Escucha el evento 'player_data' enviado por el servidor
socket.on('player_data', (players) => {
    // Limpiar los textos existentes antes de actualizarlos
    playerTexts.forEach((text) => {
        app.stage.removeChild(text);
    });
    playerTexts.length = 0;

    // Recorrer los datos de los jugadores y crear los textos correspondientes
    players.forEach((player, index) => {
        const { playerId, resources } = player;

        const playerText = new PIXI.Text(`Jugador ${index + 1}:`, {
            fill: 'white',
            fontSize: 18,
        });
        playerText.position.set(10, 30 + index * 60);
        app.stage.addChild(playerText);
        playerTexts.push(playerText);

        const goldText = new PIXI.Text(`Oro: ${resources.gold}`, {
            fill: 'white',
            fontSize: 18,
        });
        goldText.position.set(10, 60 + index * 60);
        app.stage.addChild(goldText);
        playerTexts.push(goldText);

        const coffeeBeansText = new PIXI.Text(`Granos de café: ${resources.coffeeBeans}`, {
            fill: 'white',
            fontSize: 18,
        });
        coffeeBeansText.position.set(10, 90 + index * 60);
        app.stage.addChild(coffeeBeansText);
        playerTexts.push(coffeeBeansText);

        const groundCoffeeText = new PIXI.Text(`Café molido: ${resources.groundCoffee}`, {
            fill: 'white',
            fontSize: 18,
        });
        groundCoffeeText.position.set(10, 120 + index * 60);
        app.stage.addChild(groundCoffeeText);
        playerTexts.push(groundCoffeeText);
    });

    // Resto de la lógica del juego
    // ...
});
