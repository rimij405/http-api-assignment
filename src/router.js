const url = require('url');
const htmlHandler = require('./htmlResponses.js');
const styleHandler = require('./styleResponses.js');
const jsonHandler = require('./jsonResponses.js');
const xmlHandler = require('./xmlResponses.js');

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

// Check for specific set of accept headers.
const acceptsTypes = (mimetypes, request, response) => new Promise((resolve, reject) => {
  const accepts = request.headers.accept.split(',');
  if (accepts && accepts.length > 0) {
    for (let i = 0; i < accepts.length; i++) {
      for (let j = 0; j < mimetypes.length; j++) {
        if (accepts[i] === mimetypes[j]) {
          resolve(request, response);
        }
      }
    }
    reject(new Error(`Does not accept type(s): ${mimetypes.join(',')}.`));
  } else {
    reject(new Error('No accept headers provided.'));
  }
});

// Check for specific accept header.
const acceptType = (mimetype, request, response) => acceptsTypes([mimetype], request, response);

// Process handler (or return not found).
const handleRoute = (request, response, handler) => {
  if (handler) {
    handler(request, response);
  } else {
    // Otherwise, return the index by default.
    jsonHandler.getNotFound(request, response);
  }
};

// Handle input route based on the request and response.
const route = (request, response) => {
  // Parse the url.
  const path = url.parse(request.url, true).pathname;

  // If JSON or XML, check.
  acceptsTypes(['application/json', 'text/xml'], request, response).then(() => {
    console.log('accepts proper filetype request');
    acceptType('application/json', request, response).then(() => {
      console.log('accepts application/json');
      handleRoute(request, response, jsonHandler.routes[path]);
    }).catch((jsonErr) => {
      // Check for XML.
      acceptType('text/xml', request, response).then(() => {
        console.log('accepts text/xml');
        handleRoute(request, response, xmlHandler.routes[path]);
      }).catch((xmlErr) => {
        console.dir(jsonErr);
        console.dir(xmlErr);
      });
    });
  }).catch((typeErr) => {
    if (routes[path]) {
      handleRoute(request, response, routes[path]);
    } else {
      console.dir(typeErr);
    }
  });
};

module.exports = {
  route,
};
