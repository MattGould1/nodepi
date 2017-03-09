import express from 'express'
//import wpi from 'wiring-pi'
import SerialPort from 'serialport'

const Serialport = SerialPort
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

router.post('/lights', function (req, res) {
	const light = (req.body.light) ? '0' : '1'

	serialport.write(new Buffer(light))

	res.json(true)
})

router.post('/colourChange', function (req, res) {
	const colour = req.body.colour
	console.log(colour);
	serialport.write(new Buffer(colour))

	res.json(colour)
})

export default router
