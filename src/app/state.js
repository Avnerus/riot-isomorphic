import FruitStore from './stores/fruit';
import AuthStore from './stores/auth';
import MainStore from './stores/main';

import {observable} from 'riot'

export default class State {
    constructor() {
        observable(this);

        this.fruit = new FruitStore();
        this.auth = new AuthStore();
        this.main = new MainStore();
        console.log("State Initialized");
    }
};
