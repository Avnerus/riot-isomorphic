import { observable } from 'riot';

export default class Store {
    constructor(state) {
        console.log("Store base class constructor");
        observable(this);
    }
}
