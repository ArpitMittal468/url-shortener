const http = require('http')

const { listner } = require('./listner')
require('./dataBase')

const server = http.createServer(listner)

server.listen(
    process.env.PORT || 8080,
    "0.0.0.0",
    () => {
        console.log(
            "[Server Started]"
        )
    }
)