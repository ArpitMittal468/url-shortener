const {IncomingMessage, ServerResponse} = require('http')
const fs = require('fs');

let indexHTML = fs.readFileSync('src/index.html')

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
*/
function listner(req, res){
    res.writeHead(200, {"Content-Type":"text/html"})
    res.end(indexHTML)
}

module.exports = {
    listner
}