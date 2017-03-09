//modules 
import express from 'express'
import BodyParser from 'body-parser'
//routes
import index from './routes/index'

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

app.use('/', index);

app.listen(3000, function () {
	console.log('app is listening on port 3000')
})

export default app
