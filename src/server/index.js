'use strict';

import riot from 'riot';
import passport from 'passport'

import feathers from 'feathers';
import feathersPassport from 'feathers-passport';
import hooks from 'feathers-hooks';

import bodyParser from 'body-parser';
import session from 'express-session';

import Q from 'q';
import FS from 'fs';
import _ from 'underscore'


import main from '../app/components/main';
import routes from '../app/routes';

import services from './services';
import stores from '../app/stores';

import RiotControl from 'riotcontrol';

let app = feathers();

let publicFiles = [];

// Escape the SystemJS dir
app.use(feathers.static(process.env.APP_BASE_PATH + "/public"));

// Riot app template engine
app.engine('html', function (filePath, options, callback) { 
    async function render() {
        try {
            let view = riot.render(options.mainTag, options.tagOpts);
            let regex = new RegExp('<' + options.mainTag + '.*<\/' + options.mainTag + '>');
            // Loading HTML file
            let content = await Q.denodeify(FS.readFile)(filePath);
            let rendered = content.toString().replace(regex, view);
            return callback(null, rendered);
        }
        catch (e) {
            console.log("App engine error: ", e, " Filepath: ", filePath, " Callback: ", callback);
            return;
        }
    }

    render();
})

app.set('views', './build/'); // specify the views directory
app.set('view engine', 'html'); // register the template engine

app.use(function (req, res, next) {
    next(); // Process routes
    // don't render view for file requests or services

    if(!req.path.match(/^.*\.[\w]+$/) && !req.path.match(/^\/service.*$/)) {
        let rendered = false;
        let waitBeforeRendering = [];
        if (req.waitBeforeRendering) {
            // Create a copy
            waitBeforeRendering = req.waitBeforeRendering.slice();
        }

       function renderTest() {
            if (!rendered && waitBeforeRendering.length == 0) {
                rendered = true;
                stores.server.off('*');
                res.render('index', {mainTag: 'main', tagOpts: {'stores': stores}});
            }
        }
        // Subscribe to all events
        if (req.waitBeforeRendering) {
            req.waitBeforeRendering.forEach((eventName) => {
                stores.server.on(eventName, () => {
                    waitBeforeRendering = _.without(waitBeforeRendering, eventName);
                    renderTest();
                });
            });
        }
        renderTest(); 
    }
});

// Client routes
routes.runRoutingTable(app);

console.log("Starting server");

// Server routes
let server = 
    app.configure(
        feathers.rest()
    )
    .configure(feathers.primus({
        transformer: 'websockets'

    }, function(primus) {
    }))
    .configure(hooks())
    .use(bodyParser.json())
    .configure(feathersPassport({
        secret: 'eat-your-fruits',
        // In production use RedisStore
        store: new session.MemoryStore(),
        resave: true,
        saveUninitialized: true
    }))
    .use('/service/fruit', services.fruit)
    .use('/service/taste', services.taste)
    .use('/service/users', services.users)
    .listen(3000, () => {

    let host = server.address().address
    let port = server.address().port

    console.log('Node/Feathers app listening at http://%s:%s', host, port);
});


// Insert service hooks
services.users.insertHooks(app.service('service/users'));
