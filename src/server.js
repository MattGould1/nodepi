//modules 
import express from 'express'
import BodyParser from 'body-parser'
//routes
//import index from './routes/index'
import wpi from 'wiring-pi'

// GPIO pin of the led
var configPin = 7;
// Blinking interval in usec
var configTimeout = 1000;

wpi.setup('wpi');
wpi.pinMode(configPin, wpi.OUTPUT);

var isLedOn = 0;

setInterval(function() {
	isLedOn = +!isLedOn;
	//isLedOn = !isLedOn;
	wpi.digitalWrite(configPin, isLedOn );
}, configTimeout);

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
