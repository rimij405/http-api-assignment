const url = require('url');
const mimetype = require('./mimetype.js');
const {
  json,
} = require('./status.js');

// Generic get status.
const getStatus = (code, request, response) => {
  const statusJSON = json[`${code}`] ? json[`${code}`] : json['404'];

  const body = JSON.stringify(statusJSON);

  response.writeHead(code, {
    'Content-Type': mimetype.JSON,
  });
  response.write(body);
  response.end();
};

// Code 200
const getSuccess = (request, response) => {
  getStatus(200, request, response);
};

// Error 400 when valid != true
const getBadRequest = (request, response) => {
  const params = url.parse(request.url, true).query;
  if (params.valid === 'true') {
    const body = JSON.stringify({
      message: 'This request has the required parameters.',
    });

    response.writeHead(200, { 'Content-Type': mimetype.JSON });
    response.write(body);
    response.end();
  } else {
    getStatus(400, request, response);
  }
};

// Error 401
const getUnauthorized = (request, response) => {
  const params = url.parse(request.url, true).query;
  if (params.loggedIn === 'yes') {
    const body = JSON.stringify({
      message: 'You have successfully viewed the content.',
    });

    response.writeHead(200, { 'Content-Type': mimetype.JSON });
    response.write(body);
    response.end();
  } else {
    getStatus(401, request, response);
  }
};

// Error 403
const getForbidden = (request, response) => {
  getStatus(403, request, response);
};

// Error 500
const getInternalError = (request, response) => {
  getStatus(500, request, response);
};

// Error 501
const getNotImplemented = (request, response) => {
  getStatus(501, request, response);
};

// Error 404
const getNotFound = (request, response) => {
  getStatus(404, request, response);
};

// Exports of JSON handlers.
module.exports = {
  getSuccess,
  getNotFound,
  getBadRequest,
  getForbidden,
  getUnauthorized,
  getNotImplemented,
  getInternalError,
};
