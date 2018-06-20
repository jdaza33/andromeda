
const express = require('express')
const nodemon = require('nodemon')
const morgan = require('morgan')

const app = express()

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());


//Output
app.listen(app.get('port'), () => {
    console.log(`App start on ${app.get('port')}`)
})