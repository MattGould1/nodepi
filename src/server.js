// modules 
import express from 'express'
import BodyParser from 'body-parser'
import http from 'http'
import _ from 'underscore'

// routes
// import index from './routes/index'

import rpio from 'rpio'

const pins = {
	'drive': {
		'forward': 11,
		'backward': 13,
		'left': 12,
		'right': 18
	}
}

// set gpio pins as output
// left/right
rpio.open(12, rpio.OUTPUT, rpio.LOW)
rpio.open(18, rpio.OUTPUT, rpio.LOW)

// forward/backward
rpio.open(11, rpio.OUTPUT, rpio.LOW)
rpio.open(13, rpio.OUTPUT, rpio.LOW)

rpio.open(7, rpio.OUTPUT, rpio.HIGH)
rpio.open(11, rpio.OUTPUT, rpio.HIGH)
rpio.open(13, rpio.OUTPUT, rpio.LOW)
rpio.open(15, rpio.OUTPUT, rpio.LOW)

setInterval(function () {
	var $swap = 0;

	if ($swap == 0) {
		rpio.write(13, rpio.HIGH)
		rpio.write(15, rpio.LOW)
		$swap++
	} else {
		rpio.write(13, rpio.LOW)
		rpio.write(15, rpio.HIGH)
		$swap = 0
	}

}, 2000)


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
			direction (up, down, left, right)
			speed (1, 0)
	 */
	socket.on('drive', function (data) {
		if (!process.env.production) {
			console.log(data)
		}
		const speed = (data['speed']) ? rpio.HIGH : rpio.LOW
		const pin = pins.drive[data['direction']]

		console.log(pin);
		console.log(speed);

		rpio.write(pin, speed)
	})

	setInterval(function () {
		socket.emit('helloworld', 'hello world')
	}, 2000)
})

server.listen(3000, function () {
	console.log('app is listening on port 3000')
})

export default app
