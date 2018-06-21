import express from 'express'
import nodemon from 'nodemon'
import morgan from 'morgan'
import mongoose from 'mongoose'

const app = express();

//Connect DB
mongoose.connect('mongodb://localhost/andromeda')
    .then(db => console.log('Database connect'))
    .catch(err => console.error(err));

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
import infopersonal from './routes/infoPersonal'
import user from './routes/user'
app.use('/infopersonal', infopersonal)
app.use('/user', user)

//Output
app.listen(app.get('port'), () => {
    console.log(`App start on ${app.get('port')}`);
});

