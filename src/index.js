const { IncomingMessage, ServerResponse, get } = require('http')
const { getFile } = require('./fileMap')

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {String} url
*/
async function index(req, res, url) {
    let file = getFile(url)

    if (file === undefined) {
        res.end(getFile('/public/404.html'))
        return
    }
    if (url.endsWith('.svg'))
        res.writeHead(200, { 'Content-Type': "image/svg+xml" })
    
    res.end(file)
}

module.exports = { index }