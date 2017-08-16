import riot from 'riot';

import Store from './store';

export default class MainStore extends Store {
    constructor() {
        super();
        console.log("Init MainStore");
        this.view="mall";

        this.on("login_pressed", (state) => {
            this.view = 'login';
            this.trigger("main_state_updated", "login");
        });

        this.on("fruit_swap", (fruit) => { 
            this.state ='mall';
            this.trigger("main_state_updated", "mall");
        });
    }     
};

