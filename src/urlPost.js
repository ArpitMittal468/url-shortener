const { IncomingMessage, ServerResponse } = require('http')
const { doesItExist, createNewLink } = require('./dataBase')
/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
*/
async function urlPost(req, res) {
    let method = req.method;

    res.writeHead(200, {
        'Content-Type': 'application/json'
    })

    if (method !== 'POST') {
        res.end('{"CD": "WR", "ST" : "Wrong Method"}')
        return
    }

    let isValid, link = "", destroyed = false

    req.on('data', data => {
        link += data
        if (link.length >= 5000) {
            destroyed = true;
            res.end('{"CD": "WR", "ST" : "Url To Long To Process"}')
        }
    })
    req.on('end', async () => {
        // console.log([link])
        if (destroyed)
            return
        link = link.trim()
        try { new URL(link) }
        catch (_) {
            res.end('{"CD": "WR", "ST" : "Invalid URL Formating"}')
            return
        }
        
        let hs = await doesItExist(link)
        if (hs) {
            res.end(`{"CD": "AC", "ST" : "${hs}"}`)
            return
        }
        hs = await createNewLink(link)
        res.end(`{"CD": "AC", "ST" : "${hs}"}`)
    })
}

module.exports = { urlPost }