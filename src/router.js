const url = require('url');
const htmlHandler = require('./htmlResponses.js');
const styleHandler = require('./styleResponses.js');
const jsonHandler = require('./jsonResponses.js');

// Routes, paired with their callback function.
const routes = {
  '/': htmlHandler.getIndex,
  '/index': htmlHandler.getIndex,
  '/style.css': styleHandler.getStyle,
  '/success': jsonHandler.getSuccess,
  '/notFound': jsonHandler.getNotFound,
  '/badRequest': jsonHandler.getBadRequest,
  '/unauthorized': jsonHandler.getUnauthorized,
  '/forbidden': jsonHandler.getForbidden,
  '/internal': jsonHandler.getInternalError,
  '/notImplemented': jsonHandler.getNotImplemented,
};

// Check for specific accept header.
const acceptsTypes = (mimetypes, request, response) => {
  return new Promise((resolve, reject) => {
    const accepts = request.headers.accept.split(',');
    for(let i = 0; i < accepts.length; i++){
      for(let j = 0; j < mimetypes.length; j++){
        if(accepts[i] === mimetypes[j]){
          resolve(request, response);
        }
      }
    }    
    reject(`Does not accept types: ${mimetypes.join(",")}.`);
  });
};

// Handle input route based on the request and response.
const route = (request, response) => {
  // Parse the url.
  const path = url.parse(request.url, true).pathname;

  // Handle the route.
  const handler = routes[path];

  acceptsTypes(['application/json', 'text/xml'], request, response).then((request, response) => {
    console.log('accepts this');
  }).catch((err) => {
    console.log(err);
  });

  if (handler) {
    // If handler is valid, process it.
    handler(request, response);
  } else {
    // Otherwise, return the index by default.
    jsonHandler.getNotFound(request, response);
  }
};

module.exports = {
  route,
};
