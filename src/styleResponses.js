const fs = require('fs');
const mimetype = require('./mimetype.js');

const stylesheet = fs.readFileSync(`${__dirname}/../client/style.css`);

// Get the CSS.
const getStyle = (request, response) => {
    response.writeHead(200, {
        'Content-Type': mimetype.CSS
    });
    response.write(stylesheet);
    response.end();
};

modules.exports = {
    getStyle
}