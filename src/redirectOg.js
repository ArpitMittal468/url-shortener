const { IncomingMessage, ServerResponse, get } = require('http')
const { getOg } = require('./dataBase')
const { getFile } = require('./fileMap')
/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
*/
async function redirectOg(req, res) {
    let url = req.url.slice(1)
    let x = await getOg(url)

    res.writeHead(200, { "Content-Type": "text/html" })
    if (!x) {
        res.end(getFile('/public/404.html'))
        return
    }
    res.end(`<script>window.onload = ()=>{window.location.href="${x}"}</script>`)

}

module.exports = { redirectOg }