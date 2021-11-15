const http = require('http')
const socketIo = require('socket.io')
const { listner } = require('./listner')

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

let sock = socketIo(server)

sock.on('connection', function(socket){
   console.log('A user connected');
   
   //Whenever someone disconnects this piece of code executed
   socket.on('disconnect', function () {
      console.log('A user disconnected');
   });
   socket.on('kuchToh', (x)=>{
       console.log(x)
       socket.emit('return',{
           "from" : "backend"
       })
   })
});