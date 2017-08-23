'use strict'
'use nodent';

import Store from './store';
import FetchUtil from '../util/fetch'

export default class FruitStore extends Store {

    constructor(state) {
        super(state);
        console.log("Init FruitStore");

        this.currentFruit = null;
        this.data = {};
    }     
    test() {
        console.log("Fruit store test");
    }
    async setFruit(fruit) { 
        try {
            if (this.currentFruit != fruit) {
                console.log("Setting fruit", fruit);
                this.currentFruit = fruit;
                this.trigger("fruit_updated", fruit);

                this.data = {};

                if (fruit) {
                    // Get fruit types
                    console.log("Getting info for ", fruit);
                    let response = await FetchUtil.get('http://localhost:3000/fruit?name=' + fruit);
                    this.data = response[0];
                    console.log("Fruit data: ",this.data);
                    this.trigger("fruit_data_updated");
                }
            }
        }
        catch (e) {
            console.log("Error getting fruit data ", e);                    
        }
    }
};
