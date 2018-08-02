const express = require('express');
const multer = require('multer')

const port = process.env.PORT || 8080;

const app = express();

//Static
app.use(express.static(__dirname + '/dist/'));

//Output
app.listen(port);

console.log('Server Vue iniciado');
