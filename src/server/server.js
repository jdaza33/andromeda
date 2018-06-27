import express from 'express'
import nodemon from 'nodemon'
import morgan from 'morgan'

const app = express();

//Connect DB
import db from '../../config/db'

//Settings
app.set('port', process.env.PORT || 4000);
//app.set('views', `${__dirname}/views`);
//app.set('view engine', 'ejs');

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
import infopersonal from './routes/infoPersonal'
import user from './routes/user'
app.use('/infopersonal', infopersonal);
app.use('/user', user);

//Files static
//app.use(express.static(`${__dirname}/public`));



//Output
app.listen(app.get('port'), () => {
    console.log(`App start on ${app.get('port')}`);
});

