import { observable } from 'riot';

export default class Store {
    constructor() {
        console.log("Store base class constructor");
        observable(this);
    }
}
