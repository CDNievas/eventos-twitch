
const express = require("express");
const router = express.Router();

const {TwitchAPI, URL_LOGIN} = require("./TwitchAPI");
const TwitchWS = require("./TwitchWS");

router.get("/",(req, res ,next) => {
    res.redirect(URL_LOGIN);
});

router.get("/logged", (req, res ,next) =>{

    let code = req.query.code;

    TwitchAPI.setAuthCode(code);
    TwitchAPI.getCredentials().then(x => {

        res.send("Loggeado con Twitch correctamente uwu");
        TwitchWS.conn(x.userId,x.accessToken);

    }).catch(err => {
        console.log(err);
    });

});

module.exports = router;