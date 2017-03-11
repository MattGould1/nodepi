//modules 
import express from 'express'
import BodyParser from 'body-parser'
//routes
//import index from './routes/index'

import rpio from 'rpio'

var pin = 19;           /* P12/GPIO18 */
var range = 1024;       /* LEDs can quickly hit max brightness, so only use */
var max = 512;          /*   the bottom 8th of a larger scale */
var clockdiv = 64;       /* Clock divider (PWM refresh rate), 8 == 2.4MHz */
var interval = 5;       /* setInterval timer, speed of pulses */
var times = 5;          /* How many times to pulse before exiting */

/*
 * Enable PWM on the chosen pin and set the clock and range.
 */
rpio.open(pin, rpio.PWM);
rpio.pwmSetClockDivider(clockdiv);
rpio.pwmSetRange(pin, range);

/*
 * Repeatedly pulse from low to high and back again until times runs out.
 */
var direction = 1;
var data = 200;

var pulse = setInterval(function() {
	console.log('bleep');
        rpio.pwmSetData(pin, data);
        if (data === 0) {
                direction = 1;
                if (times-- === 0) {
                        clearInterval(pulse);
                        rpio.open(pin, rpio.INPUT);
                        return;
                }
        } else if (data === max) {
                direction = -1;
        }
        data += direction;
}, interval, data, direction, times);

const app = express()

app.use(BodyParser.json())

//enable cors
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/public', express.static(__dirname + '/public'))

//app.use('/', index);

app.listen(3000, function () {
	console.log('app is listening on port 3000')
})

export default app
