require("dotenv").config();

const io = require('socket.io')();
const LedsRewards = require("./Rewards/Leds");

io.listen(process.env.PORT_IO);

io.on('connection', (socket) => {
    
    socket.emit("handshake","");

    socket.on('handshake', function (message) {
        if(message == "leds"){
            LedsRewards.setSocket(socket);
        }
    });

});