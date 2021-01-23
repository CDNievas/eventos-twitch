

const {TwitchAPI} = require("../TwitchAPI");

const ID_REWARD = "a37d1761-7101-4f8b-9a24-e4199eb57efd";

socket = null

function setSocket(_socket){

    socket = _socket
    socket.on("success",successLeds);
    socket.on("error",errorLeds);

}

function handle(data){

    socket.emit("command",{
        idRedemption: data.id,
        color: data.user_input,
        user: data.user.display_name,
        idReward:ID_REWARD
    });

}

function successLeds(data){

    let idRedemption = data.idRedemption;
    let idReward = data.idReward;

    TwitchAPI.setRedemptionStatus(idRedemption,idReward,"FULFILLED");
}

function errorLeds(data){

    let idRedemption = data.idRedemption;
    let idReward = data.idReward;

    TwitchAPI.setRedemptionStatus(idRedemption,idReward,"CANCELED");

}

module.exports = {
    ID_REWARD: ID_REWARD,
    handle: handle,
    setSocket: setSocket
}