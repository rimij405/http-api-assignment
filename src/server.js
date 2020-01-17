const http = require('http');
const { route } = require('./router.js');

// Port.
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// On request to the server, process the route.
const onRequest = (request, response) => {
    route(request, response);
};

// Server.
http.createServer(onRequest).listen(port);

console.log(`Listening to server at 127.0.0.1:${port}`);