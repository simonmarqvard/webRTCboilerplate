let https = require('https');
let http = require('http');
let express = require('express');
var socket = require('socket.io');
let fs = require('fs');


//NOTE: This must be activated when posting on online server!
var privateKey = fs.readFileSync('my-key.pem');
var certificate = fs.readFileSync('my-cert.pem');

var credentials = {
  key: privateKey,
  cert: certificate
};
var app = express();

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);


httpServer.listen(8080, () => {
  console.log("App (HTTP) listening on port 8080")
})

//NOTE: This must be activated when posting on online server!
httpsServer.listen(8443, () => {
  console.log("Secure App (HTTPS) is listening on port 8443 ")
})


app.use(express.static('public'));

//NOTE: This must be changed to httpsServer when posting on online server!
var io = socket(httpsServer);

io.sockets.on('connection', (socket) => {
  console.log("socket connection, new user:" + socket.id)

  socket.on('data', (message) => {
    console.log(message)
    io.sockets.emit('returnData', {
      x: message.x,
      y: message.y
    })
  })

  socket.on('disconnect', () => {
    console.log('Client has disconnected')
  })

})
