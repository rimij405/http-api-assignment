const url = require('url');
const mimetype = require('./mimetype.js');
const status = require('./status.js');

// Get the pre-configured StatusJSON repsonse.
const getStatusJSON = (code) => (status[`${code}`] ? status[`${code}`] : status['404']);

// Create a custom StatusJSON object. Supply message to overwrite the default.
const createStatusJSON = (message = null) => {
  const statusJSON = getStatusJSON(200);
  statusJSON.message = (message) || statusJSON.message;
  return statusJSON;
};

// Send JSON response.
const sendResponse = (request, response, code, content) => {
  response.writeHead(code, {
    'Content-Type': mimetype.JSON,
  });
  response.write(content);
  response.end();
};

// Generic get status.
const sendResponseJSON = (request, response, code, json) => {
  const body = JSON.stringify(json);
  sendResponse(request, response, code, body);
};

// Code 200
const getSuccess = (request, response) => {
  const code = 200;
  sendResponseJSON(request, response, code, getStatusJSON(code));
};

// Error 400 when valid != true
const getBadRequest = (request, response) => {
  const code = 400;
  const params = url.parse(request.url, true).query;
  if (params.valid === 'true') {
    sendResponseJSON(request, response, code, createStatusJSON('This request has the required parameters.'));
  } else {
    sendResponseJSON(request, response, code, getStatusJSON(code));
  }
};

// Error 401
const getUnauthorized = (request, response) => {
  const code = 401;
  const params = url.parse(request.url, true).query;
  if (params.loggedIn === 'yes') {
    sendResponseJSON(request, response, code, createStatusJSON('You have successfully viewed the content.'));
  } else {
    sendResponseJSON(request, response, code, getStatusJSON(code));
  }
};

// Error 403
const getForbidden = (request, response) => {
  const code = 403;
  sendResponseJSON(request, response, code, getStatusJSON(code));
};

// Error 500
const getInternalError = (request, response) => {
  const code = 500;
  sendResponseJSON(request, response, code, getStatusJSON(code));
};

// Error 501
const getNotImplemented = (request, response) => {
  const code = 501;
  sendResponseJSON(request, response, code, getStatusJSON(code));
};

// Error 404
const getNotFound = (request, response) => {
  const code = 404;
  sendResponseJSON(request, response, code, getStatusJSON(code));
};

// Routes to use for JSON responses.
const routes = {
  '/success': getSuccess,
  '/notFound': getNotFound,
  '/badRequest': getBadRequest,
  '/unauthorized': getUnauthorized,
  '/forbidden': getForbidden,
  '/internal': getInternalError,
  '/notImplemented': getNotImplemented,
};

// Exports of JSON handlers.
module.exports = {
  routes,
  getSuccess,
  getNotFound,
  getBadRequest,
  getForbidden,
  getUnauthorized,
  getNotImplemented,
  getInternalError,
};
