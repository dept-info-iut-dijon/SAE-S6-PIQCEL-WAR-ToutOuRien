const { SocketHandler } = require("../App/Controllers/socketHandler");
const { Server } = require('socket.io');

module.exports = function (server) {
    const io = new Server(server);
    const handler = new SocketHandler();
    handler.initGrid();

    console.log('Liaison entre le serveur Web et le serveur de WebSocket ...');

    io.on('connection', async (socket) => {
        console.log('a user connected');
        let grid = await handler.getAllPixels();
        socket.emit('initGrid', grid);
        
        // Place events here
        // Example:
        // 'pixelChange' is the name of the event
        // 'msg' is the message sent by the client, for example, coordinates like msg = { xCoordinate: x, yCoordinate: y, pixelColor: color, userTarget: user }
        socket.on('pixelChange', (msg) => {
            console.log(`Pixel change at [ ${msg.xCoordinate} ; ${msg.yCoordinate} ]`)
            io.emit('pixelChange', msg);
            handler.changePixel(msg.xCoordinate, msg.yCoordinate, msg.pixelColor, msg.userTarget);
        });
        
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });

};
