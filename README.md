# Isomorphic Riot
An attempt for an isomorphic appliction using RiotJS 3.  and more. Includes:
+ ES6 code base using **rollup & buble** With ES7 async/await by **nodent**
+ One directional data flux, single state object - Inspired by [riot-app-example](https://github.com/GianlucaGuarini/riot-app-example/), [Redux](http://redux.js.org/)
+ Shared routing code between client and server using [Page.js](https://visionmedia.github.io/page.js/) and [Page.JS-Express-Mapper](https://github.com/kethinov/page.js-express-mapper.js).
+ Riot rendering on the server side using riot.render(). Waits for state to populate before rendering.
+ Server services powered by [Feathers.js](http://feathersjs.com/) with Realtime WebSocket communication using **Socket.IO/uWS**.
+ Local User authentication
+ Gulp tasks extract css from javascript tags, concatinate them and run postprocessing.

Install
```
npm install -g gulp
npm install
```
Run:
```
gulp
```
Then browse to http://localhost:3000
