const fs = require('fs');
const mimetype = require('./mimetype.js');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);

// Get the client index page.
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': mimetype.HTML });
  response.write(index);
  response.end();
};

module.exports = {
  getIndex,
};
