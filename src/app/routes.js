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

    runRoutingTable(app,state) {
        app.route('/').get((req, res, next) => {
            console.log("Default route!")
            req.state.main.mall();
            this.go(next, req);
        });

        app.route('/apple').get((req, res, next) => {
            console.log("Apple route!", req.state.fruit);
            req.populateQueue.push(
                req.state.fruit.setFruit("apple")
            );
            this.go(next, req);
        });

        app.route('/banana').get( (req, res, next) => {
            console.log("Banana route!", req.state.fruit);
            req.populateQueue.push(
                req.state.fruit.setFruit("banana")
            );
            this.go(next, req);
        });

        app.route('/login').get((req, res, next) => {
            req.state.main.login();
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


