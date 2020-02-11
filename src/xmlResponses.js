const url = require('url');
const xml = require('./xml.js');
const mimetype = require('./mimetype.js');
const status = require('./status.js');

// Get the pre-configured StatusJSON repsonse.
const getStatusXML = (code) => {
  // Get the preparatory information.
  const content = status[`${code}`] ? status[`${code}`] : status['404'];
  const xmlRootTag = 'response';

  // Create the XMLDocument.
  const xmlDoc = xml.createXMLDocument(xmlRootTag);

  // Get the formatted XMLNodes.
  const xmlElements = {
    root: xmlDoc.getElementsByTagName(xmlRootTag)[0],
    id: (content.id) ? xml.createXMLElement(xmlDoc, 'id', content.id) : undefined,
    message: (content.message) ? xml.createXMLElement(xmlDoc, 'message', content.message) : undefined,
  };

  // Add elements if they exist.
  if (content.id) {
    xml.appendXMLElement(xmlDoc, xmlRootTag, xmlElements.id);
  }

  if (content.message) {
    xml.appendXMLElement(xmlDoc, xmlRootTag, xmlElements.message);
  }

  // Return the XMLDocument.
  return xmlDoc;
};

// Create a custom StatusXML object. Supply message to overwrite the default.
const createStatusXML = (message = null) => {
  const statusXML = createStatusXML(200);
  const messageXMLElement = statusXML.getElementsByTagName('message')[0];
  if (message) {
    messageXMLElement.childNodes[0].nodeValue = message;
  }
  return statusXML;
};

// Send XML response.
const sendResponse = (request, response, code, content) => {
  response.writeHead(code, {
    'Content-Type': mimetype.XML,
  });
  response.write(content);
  response.end();
};

// Generic get status.
const sendResponseXML = (request, response, code, xmlDoc) => {
  const body = xml.stringify(xmlDoc);
  sendResponse(request, response, code, body);
};

// Code 200
const getSuccess = (request, response) => {
  const code = 200;
  sendResponseXML(request, response, code, getStatusXML(code));
};

// Error 400 when valid != true
const getBadRequest = (request, response) => {
  const code = 400;
  const params = url.parse(request.url, true).query;
  if (params.valid === 'true') {
    sendResponseXML(request, response, code, createStatusXML('This request has the required parameters.'));
  } else {
    sendResponseXML(request, response, code, getStatusXML(code));
  }
};

// Error 401
const getUnauthorized = (request, response) => {
  const code = 401;
  const params = url.parse(request.url, true).query;
  if (params.loggedIn === 'yes') {
    sendResponseXML(request, response, code, createStatusXML('You have successfully viewed the content.'));
  } else {
    sendResponseXML(request, response, code, getStatusXML(code));
  }
};

// Error 403
const getForbidden = (request, response) => {
  const code = 403;
  sendResponseXML(request, response, code, getStatusXML(code));
};

// Error 500
const getInternalError = (request, response) => {
  const code = 500;
  sendResponseXML(request, response, code, getStatusXML(code));
};

// Error 501
const getNotImplemented = (request, response) => {
  const code = 501;
  sendResponseXML(request, response, code, getStatusXML(code));
};

// Error 404
const getNotFound = (request, response) => {
  const code = 404;
  sendResponseXML(request, response, code, getStatusXML(code));
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
