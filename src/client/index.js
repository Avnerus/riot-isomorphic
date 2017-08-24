'use strict';

import { mount,mixin } from 'riot';
import '../app/components/main.tag'
import page from 'page';
import Routes from '../app/routes';
import pageExpressMapper from 'page.js-express-mapper.js';
import State from '../app/state'
import 'nodent-runtime'
import SocketUtil from '../app/util/socket'

console.log("Client loading!");

SocketUtil.initWithUrl(window.location.protocol + "//" + window.location.host);

window.page = page;

// activate express-mapper plugin
pageExpressMapper({
    renderMethod: null,
    expressAppName: 'app'
});

let state = new State();
let initialData = JSON.parse(window.initialData);

Object.keys(state).forEach((key) => {
    if (initialData[key]) {
        Object.assign(state[key], initialData[key]);
    }
});

console.log("Initial state", state);
mixin({state: state}); // Global state mixin
mount('main',state);

page('*', function(ctx,next) {
    console.log("Set state in page context");
    ctx.state = state;
    ctx.populateQueue = [];
    next();
});

Routes.runRoutingTable(window.app);

page();


/*
import socketUtil from '../app/util/socket';

import main from '../app/components/main';

import _ from 'underscore'





let rendered = false;
let waitBeforeRendering = [];
if (loadContext.waitBeforeRendering) {
    // Create a copy
    waitBeforeRendering = loadContext.waitBeforeRendering.slice();
}

console.log("Context after routing ", loadContext, waitBeforeRendering, document.querySelector('main'));

function renderTest() {
     if (!rendered && waitBeforeRendering.length == 0 && document.querySelector('main')) {
         rendered = true;
         console.log("Rendering client");
         riot.mount('main', { dispatcher: routes.browserDispather });
     }
}

// Subscribe to all events
if (loadContext.waitBeforeRendering) {
     loadContext.waitBeforeRendering.forEach((eventName) => {
         routes.browserDispather.one(eventName, () => {
            waitBeforeRendering = _.without(waitBeforeRendering, eventName);
            renderTest();
         });
    });
}

renderTest(); 
window.onload = function() {
    console.log("Page loaded!");
    renderTest();
}*/

