// Application routes - shared by client and server
import miscUtil from './util/misc'

class Routes {
    constructor() {
        this.populateQueue = [];
    }
    go(next, req) {
        req.handledRoute = true;
        if (next) {
            next();
        }
    }

    runRoutingTable(app,appState) {
        app.route('/').get((req, res, next) => {
            console.log("Default route!")
            req.appState.main.mall();
            req.appState.fruit.clearFruit();
            this.go(next, req);
        });

        app.route('/apple').get((req, res, next) => {
            console.log("Apple route!", req.appState.fruit);
            req.appState.main.mall();
            req.populateQueue.push(
                req.appState.fruit.setFruit("apple")
            );
            this.go(next, req);
        });

        app.route('/banana').get( (req, res, next) => {
            console.log("Banana route!", req.appState.fruit);
            req.appState.main.mall();
            req.populateQueue.push(
                req.appState.fruit.setFruit("banana")
            );
            this.go(next, req);
        });

        app.route('/login').get((req, res, next) => {
            req.appState.main.login();
            this.go(next, req);
        });
        /*

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


