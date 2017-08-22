import feathers from 'feathers';
import rest from 'feathers-rest';
import Routes from '../app/routes';
import State from '../app/state';

import { render,mixin } from 'riot';
import '../app/components/main.tag'

//import feathersPassport from 'feathers-passport';
//import hooks from 'feathers-hooks';
import bodyParser from 'body-parser';
import session from 'express-session';
import compress from 'compression'
import cors from 'cors'
import FS from 'fs';

import fruitService from './services/fruit'


const app = feathers()
.set('views', process.env.APP_BASE_PATH + "/src/server/views")
.set('view engine', 'ejs')
.use(compress())
.options('*', cors())
.use(cors())
.use(feathers.static(process.env.APP_BASE_PATH + "/public"))
.use(bodyParser.json())
.use(bodyParser.urlencoded({ extended: true  }))
.configure(rest())

// Services
.use('/fruit', fruitService);

//.use('/taste', services.taste)

//.use('/users', services.users); 
//
/*
.configure(feathers.primus({
    transformer: 'websockets'

}, function(primus) {
})*/
//.configure(hooks())
/*
.configure(feathersPassport({
    secret: 'eat-your-fruits',
    // In production use RedisStore
    store: new session.MemoryStore(),
    resave: true,
    saveUninitialized: true
}))*/

// Client routes
Routes.runRoutingTable(app);
/*
// Authentication setup
let userService = app.service('users');

services.users.insertHooks(userService);
services.users.createTestUser(userService);
services.users.setupPassport(userService, app); */

app.use(function (req, res, next) {
    console.log("Render riot");
    let state = new State();
    mixin({state: state}); // Global state mixin
    res.render('index', {
      initialData: JSON.stringify(state),
      body: render('main', state)
    })
});


// Fixtures
const fruits = app.service('/fruit');

Promise.all([
    fruits.create({ name: 'apple',
                types: ["Pink Lady", "Gala", "Fuji","Granny Smith"]
    }),
    fruits.create({ name: 'banana',
                types: ["Cavendish", "Lady Finger", "Pisang Raja", "Williams"]
    })
])
.catch(err => console.log('Error occurred while creating fruit:', err));

console.log("Starting server");

// Server routes
let server = 
    app.listen(3000, () => {

    let host = server.address().address
    let port = server.address().port

    console.log('Node/Feathers app listening at http://%s:%s', host, port);


    // Init the loopback socket connection
    // socketUtil.initWithUrl('http://localhost:3000');
});
