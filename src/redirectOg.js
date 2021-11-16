const { IncomingMessage, ServerResponse, get } = require('http')
const { getOg } = require('./dataBase')

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
*/
async function redirectOg(req, res) {
    let url = req.url.slice(1)
    let x = await getOg(url)
    
    res.writeHead(200, { "Content-Type": "text/html" })
    if (!x) {
        res.end('<h1>404 Resources not found</h1>')
        return
    }
    res.end(`<script>window.onload = ()=>{window.location.href="${x}"}</script>`)

}

module.exports = { redirectOg }