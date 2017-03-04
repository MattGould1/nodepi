//modules 
import express from 'express'

//routes
import index from './routes/index'

const app = express()

app.use('/public', express.static(__dirname + '/public'))

app.use('/', index);

app.listen(3000, function () {
	console.log('app is listening on port 3000')
})

export default app
