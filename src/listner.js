const { IncomingMessage, ServerResponse } = require('http')
const { index } = require('./index')
const { urlPost } = require('./urlPost')
const { redirectOg } = require('./redirectOg');

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
*/
function listner(req, res) {
    let url = req.url;
    if (url === '/') index(req, res);
    else if (url == '/urlPost') urlPost(req, res)
    else redirectOg(req, res)
}

module.exports = {
    listner
}