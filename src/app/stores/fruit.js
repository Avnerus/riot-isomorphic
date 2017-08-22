'use strict'
'use nodent';

import riot from 'riot';
import socketUtil from '../util/socket'

import Store from './store';
import FetchUtil from '../util/fetch'

export default class FruitStore extends Store {

    constructor() {
        super();
        console.log("Init FruitStore");

        this.currentFruit = null;

        this.on("set_fruit", async (fruit) => {
            console.log("Set fruit!", fruit);
            try {
                this.currentFruit = fruit;
                this.trigger("fruit_updated");

                this.fruitData = null;

                if (fruit) {
                    // Get fruit types
                    console.log("Getting info for ", fruit);
                    let response = await fetch('http://localhost:3000/fruit?name=' + fruit);
                    console.log("Response", resposne);
                    /*
                      this.fruitData = await response.json();
                      /*
                    this.fruitData = await socketUtil.rpc('fruit::get', fruit);
                    console.log("Fruit data: ",this.fruitData);
                    this.trigger("fruit_data_updated");*/
                }
            }
            catch (e) {
                console.log("Error getting fruit data ", e);                    
            }
        });
/*
        this.on("taste_fruit", async (type) => {
            try {
                let result = await socketUtil.rpc('taste::get', type);
                this.trigger('taste_result', {'type': type, 'result': result.result});
            }
            catch (error) {
                console.log("Taste fruit error ", error);
                this.trigger('taste_error', {message: error});
            }
        });*/
    }     
    test() {
        console.log("Fruit store test");
    }
    async setFruit(fruit) { 
        console.log("Set fruit!", fruit);
        try {
            this.currentFruit = fruit;
            this.trigger("fruit_updated");

            this.fruitData = null;

            if (fruit) {
                // Get fruit types
                console.log("Getting info for ", fruit);
                let response = await FetchUtil.get('http://localhost:3000/fruit?name=' + fruit);
                this.fruitData = response[0];
                console.log("Fruit data: ",this.fruitData);
                this.trigger("fruit_data_updated");
            }
        }
        catch (e) {
            console.log("Error getting fruit data ", e);                    
        }
    }
};
