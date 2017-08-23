'use strict'
import fetchUtil from '../util/fetch';
import Store from './store';

export default class AuthStore extends Store {
    constructor() {
        super();
        console.log("Init AuthStore");
        this.user = null;
    }     

    async login(loginData) {
        try {
            loginData.strategy = "local";
            console.log("User login: ", loginData);
            let response = await fetchUtil.postJSON("http://localhost:3000/authentication", loginData);
            console.log("Login reply: ", response);
            if (response.errors) {
                this.trigger("login_error", response.message);
            } else {
                this.accessToken = response.accessToken;
                this.user = loginData;
                // Reconnect the socket to gain session auth
                //socketUtil.reconnect();
                this.trigger("login_success", response.accessToken);
            }
        }
        catch (e) {
            console.log("Error logging in", e);                    
        }
        
    }
};
