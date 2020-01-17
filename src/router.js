const htmlHandler = require('./htmlResponses.js');
const styleHandler = require('./styleResponses.js');

// Routes, paired with their callback function.
const routes = {
    "/": htmlHandler.getIndex,
    "/index": htmlHandler.getIndex,
    "/style.css": styleHandler.getStyle,
};

// Handle input route based on the request and response.
const route = (request, response) => {

    // Handle the route.
    let handler = routes[request.url];

    if (handler) {        
        // If handler is valid, process it.
        handler(request, response);
    } else {
        // Otherwise, return the index by default.
        htmlHandler.getIndex(request, response);
    }

}

module.exports = {
    route
}