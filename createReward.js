const axios = require("axios");

let url = 'https://api.twitch.tv/helix/channel_points/custom_rewards?broadcaster_id=USER_ID'

let headers = {}
headers["Client-ID"] = "CLIENT-ID";
headers["Authorization"] = "Bearer ACCESS-TOKEN";

let body = {
    title:"Cambiar color de leds",
    prompt:"Colores disponibles: rojo, naranja, amarillo, rosa, verde, azul, celeste y violeta. Escribir uno en el mensaje.",
    cost:50,
    background_color:"#392e5c",
    is_user_input_required:true
}

axios.post(url,body,{headers:headers}).then(x => console.log(x)).catch(err => console.log(err));