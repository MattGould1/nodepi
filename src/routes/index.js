import express from 'express'
//import SerialPort from 'serialport'
import rpio from 'rpio'
/*
 * Set the initial state to low.  The state is set prior to the pin becoming
 * active, so is safe for devices which require a stable setup.
 */
rpio.open(12, rpio.OUTPUT, rpio.LOW)
rpio.open(18, rpio.OUTPUT, rpio.LOW)

// var pin = 12;           /* P12/GPIO18 */
// var range = 256;       /* LEDs can quickly hit max brightness, so only use */
// var max = 128;          /*   the bottom 8th of a larger scale */
// var clockdiv = 1024;       /* Clock divider (PWM refresh rate), 8 == 2.4MHz */
// var interval = 10000;       /* setInterval timer, speed of pulses */
// var times = 2;          /* How many times to pulse before exiting */

// /*
//  * Enable PWM on the chosen pin and set the clock and range.
//  */
// rpio.open(pin, rpio.PWM);
// rpio.pwmSetClockDivider(clockdiv);
// rpio.pwmSetRange(pin, range);


//  * Repeatedly pulse from low to high and back again until times runs out.
 
// var direction = 1;
// var data = 120;

// var pulse = setInterval(function() {
// 	console.log('bleep');
//         rpio.pwmSetData(pin, data);
//         if (data === 0) {
//                 direction = 1;
//                 if (times-- === 0) {
//                         clearInterval(pulse);
//                         rpio.open(pin, rpio.INPUT);
//                         return;
//                 }
//         } else if (data === max) {
//                 direction = -1;
//         }
//         data += direction;
// }, interval, data, direction, times);

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
	}, 250)
})

router.get('/right', function (req, res) {
	rpio.write(18, rpio.HIGH)

	setTimeout(function () {
		rpio.write(18, rpio.LOW)
		res.json(true)
	}, 250)
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
