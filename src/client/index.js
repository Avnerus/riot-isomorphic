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
    ctx.appState = state;
    ctx.populateQueue = [];
    next();
});

Routes.runRoutingTable(window.app);

page();
