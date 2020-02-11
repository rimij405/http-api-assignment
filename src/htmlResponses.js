const fs = require('fs');
const mimetype = require('./mimetype.js');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);

// Get particular response.
const sendResponse = (request, response, statusCode, contentType, content) => {
  response.writeHead(statusCode, { 'Content-Type': contentType });
  response.write(content);
  response.end();
};

// Get the client index page.
const getIndex = (request, response) => sendResponse(request, response, 200, mimetype.HTML, index);

module.exports = {
  sendResponse,
  getIndex,
};
