
const express = require('express')
const nodemon = require('nodemon')

const app = express()

//Settings
app.set('port', process.env.PORT || 3000);


//Output
app.listen(app.get('port'), () => {
    console.log(`App start on ${app.get('port')}`)
})