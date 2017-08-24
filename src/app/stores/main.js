import Store from './store';

export default class MainStore extends Store {
    constructor() {
        super();
        console.log("Init MainStore");
        this.view="mall";
    }     

    mall() {
        if (this.view != 'mall') {
            this.view = 'mall';
            this.trigger("main_state_updated", "mall");
        }
    }

    login() {
        this.view = 'login';
        this.trigger("main_state_updated", "login");
    }
};

