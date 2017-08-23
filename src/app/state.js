import FruitStore from './stores/fruit';
import MainStore from './stores/main';
import AuthStore from './stores/auth';

import {observable} from 'riot'

export default class State {
    constructor() {
        observable(this);

        this.fruit = new FruitStore();
        this.main = new MainStore();
        this.auth = new AuthStore();

        console.log("State Initialized");
    }
};
