const http = require('http')

const { listner } = require('./listner')
require('./dataBase')

const server = http.createServer(listner)

server.listen(
    process.env.PORT || 9999,
    "0.0.0.0",
    () => {
        console.log(
            "[Server Started]"
        )
    }
)