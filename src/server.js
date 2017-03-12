// modules 
import express from 'express'
import BodyParser from 'body-parser'
import http from 'http'
// routes
// import index from './routes/index'

import rpio from 'rpio'


// open gpio pins
rpio.open(12, rpio.OUTPUT, rpio.LOW)
rpio.open(18, rpio.OUTPUT, rpio.LOW)

// sockets
import socketio from 'socket.io'

const app = express()

app.use(BodyParser.json())

//enable cors
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.use('/public', express.static(__dirname + '/public'))

// app.use('/', index);

//setup io
var server = http.createServer(app)

var sio = socketio(server)

// io.on('connection', socketioJwt.authorize({
// 	secret: db.secret,
// 	handshae: true
// }))
sio.on('connection', function (socket) {
	/*
		data:
			direction (left, right, up, down)
			speed (1, 0)
	 */
	socket.on('drive', function (data) {
		const speed = (data['speed']) ? rpio.HIGH : rpio.LOW;
		switch(data[0]) {
			case "right": {
				rpio.write(18, speed)
				break
			}
			case "left": {
				rpio.write(12, speed)
				break
			}
		}
	});

	setInterval(function () {
		socket.emit('helloworld', 'hello world')
	}, 2000)
})

server.listen(3000, function () {
	console.log('app is listening on port 3000')
})

export default app
