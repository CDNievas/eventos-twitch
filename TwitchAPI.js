require("dotenv").config();
const axios = require("axios");

const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;

const PORT_WEB = process.env.PORT_WEB;
const IP_WEB = process.env.IP_WEB;

const REDIRECT_URL = "http://" + IP_WEB + ":" + PORT_WEB + "/logged";
const SCOPES = "channel:read:redemptions channel:manage:redemptions channel:read:editors channel:read:stream_key user:read:email";

const URL_LOGIN = `https://id.twitch.tv/oauth2/authorize?client_id=${TWITCH_CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code&scope=${SCOPES}`;

class TwitchAPI{

    constructor(){
        this.authCode = null;
        this.userId = null;
        this.accessToken = null;
    }

    setAuthCode(code){
        this.authCode = code;
    }

    getCredentials(){

        return this._getAccessToken(this.authCode)
            .then(this._getUserId)
            .then(x => {
                this.userId = x.userId;
                this.accessToken = x.accessToken;
                return this;
            });

    }

    setRedemptionStatus(idRedemption,idReward,status){

        let url = "https://api.twitch.tv/helix/channel_points/custom_rewards/redemptions";

        let headers = {}
        headers["Client-ID"] = TWITCH_CLIENT_ID;
        headers["Authorization"] = `Bearer ${this.accessToken}`;

        let params = {
            id: idRedemption,
            broadcaster_id: this.userId,
            reward_id: idReward
        }

        let body = {
            status: status
        }

        axios.patch(url,body,{params: params, headers:headers});
    
    }

    
    _getAccessToken(code){
    
        let urlToken = `https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${REDIRECT_URL}`
    
        return axios.post(urlToken).then(x => {
            return x.data.access_token;
        });
        
    }

    _getUserId(accessToken){

        let urlUser = "https://api.twitch.tv/helix/users";
    
        let headers = {}
        headers["Client-ID"] = TWITCH_CLIENT_ID;
        headers["Authorization"] = `Bearer ${accessToken}`;
    
        return axios.get(urlUser,{headers:headers}).then(x =>{
           
            return {userId: x.data.data[0].id, accessToken:accessToken};
    
        });
    
    }



}

const clientTwitchApi = new TwitchAPI();

module.exports = {
    TwitchAPI: clientTwitchApi,
    URL_LOGIN: URL_LOGIN
}