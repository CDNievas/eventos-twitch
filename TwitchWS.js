
const URL = "wss://pubsub-edge.twitch.tv"

const WebSocket = require('ws');
const LedsRewards = require("./Rewards/Leds");

var ws = null

function conn(_userId,_accessToken){
    
    ws = new WebSocket(URL);

    ws.on("message",(x) =>{
        
        x = JSON.parse(x);

        if(x.type === "MESSAGE"){
            data = x.data;
            data.message = JSON.parse(data.message);
            
            if(data.message.type === "reward-redeemed"){
                if(data.message.data.redemption.reward.id === LedsRewards.ID_REWARD){
                    LedsRewards.handle(data.message.data.redemption);
                }
            }
        
        }

    });

    ws.on("open", () => {

        let topics = [`channel-points-channel-v1.${_userId}`];
    
        ws.send(JSON.stringify({
            type:"LISTEN",
            data:{
                topics:topics,
                auth_token:_accessToken
            }
        }));
    
        console.log("Conectado a Eventos de Twitch por WS");
        _ping();
    
    });

}

module.exports = {
    conn: conn
}

function _ping(){
    ws.send(JSON.stringify({type:"PING"}));
    setInterval(_ping,60*1000);
}