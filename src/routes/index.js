import express from 'express'
import wpi from 'wiring-pi'

const router = express.Router()

const configPin = 7;
var isLedOn = 0;

wpi.setup('wpi')
wpi.pinMode(configPin, wpi.OUTPUT)

router.get('/ledon', function (req, res) {
	isLedOn = +!isLedOn

	wpi.digitalWrite(configPin, isLedOn)
	res.send('ledon')
})

export default router
