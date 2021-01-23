require("dotenv").config();

const PORT_WEB = process.env.PORT_WEB
const IP_WEB = process.env.IP_WEB

const x = require("./TwitchIO");

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));

const router = require("./router");
app.use('/', router);

app.listen(PORT_WEB, () => {
    console.log(`Web corriendo en http://${IP_WEB}:${PORT_WEB}`)
});
