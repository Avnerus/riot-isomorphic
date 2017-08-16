// Application routes - shared by client and server
import riot from 'riot';
import miscUtil from './util/misc'

class Routes {
    constructor() {
        console.log("Routes class constructed!");
        // Load Page.js on the client side
        if (miscUtil.isBrowser()) {
            this.page = require('page');
        } 
    }
    go(next, req) {
        req.handledRoute = true;
        if (next) {
            next();
        }
    }
    runRoutingTable(app) {
        app.route('/').get((req, res, next) => {
            console.log("Default route!")
            /*
            let dispatcher = this.getDispatcher(req);
            dispatcher.trigger("fruit_swap", null); */

            this.go(next, req);
        });

        app.route('/apple').get((req, res, next) => {
            /*
            this.waitBeforeRendering(req, ["fruit_data_updated"]);

            let dispatcher = this.getDispatcher(req);
            dispatcher.trigger("fruit_swap", "apple");

            this.go(next, req);*/
        });

        app.route('/banana').get((req, res, next) => {
            console.log("Banana route!");
            /*
            this.waitBeforeRendering(req, ["fruit_data_updated"]);

            console.log("Triggering banana fruit_swap")
            let dispatcher = this.getDispatcher(req);
            dispatcher.trigger("fruit_swap", "banana");

            this.go(next, req);*/
        });
/*
        app.route('/login').get((req, res, next) => {
            let dispatcher = this.getDispatcher(req);
            dispatcher.trigger("login_pressed");

            this.go(next, req);
        });

        app.route('*').get((req, res, next) => {
            if (!req.handledRoute) {
                res.status(404).send('Nothing to see here!');
            } else {
                this.go(next, req);
            }
        }); */
    }
};

// Singleton
let instance = new Routes();
export default instance;


