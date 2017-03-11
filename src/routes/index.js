import express from 'express'
//import SerialPort from 'serialport'
import rpio from 'rpio'
/*
 * Set the initial state to low.  The state is set prior to the pin becoming
 * active, so is safe for devices which require a stable setup.
 */
rpio.open(12, rpio.OUTPUT, rpio.LOW)
rpio.open(18, rpio.OUTPUT, rpio.LOW)

/*
 * The sleep functions block, but rarely in these simple programs does one care
 * about that.  Use a setInterval()/setTimeout() loop instead if it matters.
 */
// for (var i = 0; i < 5; i++) {
//         /* On for 1 second */
//         rpio.write(12, rpio.HIGH);
//         rpio.sleep(1);

//         /* Off for half a second (500ms) */
//         rpio.write(12, rpio.LOW);
//         rpio.msleep(500);
// }
// const Serialport = SerialPort
// const serialport = new Serialport("/dev/ttyACM0", {
// 	baudRate: 9600,
// 	parser: SerialPort.parsers.readline('\n')
// })

// serialport.on('open', function(){
//   console.log('Serial Port Opend')
//   serialport.on('data', function(data){
//       console.log('on data' + data)
//   })
// })

const router = express.Router()

router.get('/left', function (req, res) {
	rpio.write(12, rpio.HIGH)

	setTimeout(function () {
		rpio.write(12, rpio.LOW)
		res.json(true)
	}, 2000)
})

router.get('/right', function (req, res) {
	rpio.write(18, rpio.HIGH)

	setTimeout(function () {
		rpio.write(18, rpio.LOW)
		res.json(true)
	}, 2000)
})

router.post('/lights', function (req, res) {
	const light = (req.body.light) ? '0' : '1'

	// serialport.write(new Buffer(light))

	res.json(true)
})

router.post('/colourChange', function (req, res) {
	const colour = req.body.colour
	console.log(colour);
	// serialport.write(new Buffer(colour))

	res.json(colour)
})

export default router
