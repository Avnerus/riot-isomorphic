import feathers from 'feathers';
import rest from 'feathers-rest';
import Routes from '../app/routes';

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
import userService from './services/users'

import TasteService from './services/taste'

import State from '../app/state';

import hooks from 'feathers-hooks'
import authentication from 'feathers-authentication'
import local from 'feathers-authentication-local'
import errorHandler from 'feathers-errors/handler';
import AuthSettings from './auth-settings'

global.fetch = require('node-fetch');

const app = feathers()
.set('views', process.env.APP_BASE_PATH + "/src/server/views")
.set('view engine', 'ejs')
.configure(rest())
.configure(hooks())
.use(compress())
.options('*', cors())
.use(cors())
.use(feathers.static(process.env.APP_BASE_PATH + "/public"))
.use(bodyParser.json())
.use(bodyParser.urlencoded({ extended: true  }))

//
// Services
.use('/fruit', fruitService)
.use('/taste', new TasteService())
.use('/users', userService); 

//Setup authentication
app.configure(authentication(AuthSettings));
app.configure(local());


// Setup a hook to only allow valid JWTs or successful 
// local auth to authenticate and get new JWT access tokens
app.service('authentication').hooks({
  before: {
    create: [
      authentication.hooks.authenticate(['local', 'jwt'])
    ]
  }
});


// Hash the user's passwrd
app.service('users').hooks({
  before: {
    create: [
      local.hooks.hashPassword()
    ]
  }
});

// Fixtures
const fruits = app.service('/fruit');
const users = app.service('/users');

Promise.all([
    fruits.create({ name: 'apple',
                types: ["Pink Lady", "Gala", "Fuji","Granny Smith"]
    }),
    fruits.create({ name: 'banana',
                types: ["cavendish", "lady finger", "pisang raja", "williams"]
    }),
    users.create({ email: 'test@fruits.com',
                   password: '1234'
    })
])
.catch(err => console.log('Error occurred while creating fruit:', err));

// Client routes
app.use(function (req, res, next) {
    console.log("Init state");
    req.state = new State();
    req.populateQueue = [];
    next();
});

Routes.runRoutingTable(app);

app.use(function (req, res, next) {
    if (!req.handledRoute) {
        res.status(404).send('Nothing to see here!');
    } else {
        Promise.all(req.populateQueue)
        .then(() => {
            console.log("Render riot");
            mixin({state: req.state}); // Global state mixin
            res.render('index', {
              initialData: JSON.stringify(req.state),
              body: render('main', req.state)
            })
        })
    }
});

app.use(errorHandler());


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
