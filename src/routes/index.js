import express from 'express'
//import wpi from 'wiring-pi'
import SerialPort from 'serialport'

const Serialport = SerialPort

// const parser = new Serialport.parsers.Readline

const serialport = new Serialport("/dev/ttyACM0", {
	baudRate: 9600,
	parser: SerialPort.parsers.readline('\n')
})

serialport.on('open', function(){
  console.log('Serial Port Opend')
  serialport.on('data', function(data){
      console.log('on data' + data)
  })
})

const router = express.Router()

const configPin = 7
var isLedOn = 0

// wpi.setup('wpi')
// wpi.pinMode(configPin, wpi.OUTPUT)

router.get('/ledon', function (req, res) {
	isLedOn = +!isLedOn
	//setInterval()
	res.send('ledon')
})

router.get('/lighton', function (req, res) {

	serialport.write(new Buffer('1'))
	res.send('lighton')
})

router.get('/lightoff', function (req, res) {

	serialport.write(new Buffer('0'))
	res.send('lightoff')
})

export default router
