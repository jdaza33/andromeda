import express from 'express'
import nodemon from 'nodemon'
import morgan from 'morgan'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import cors from 'cors'


const app = express();

//Connect DB
import db from './config/db'

//Passport
require('./config/passport')(passport);

//Settings
app.set('port', process.env.PORT || 4000);
//app.set('views', `${__dirname}/views`);
//app.set('view engine', 'ejs');

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());
app.use(cors());


//Routes
import infopersonal from './routes/infoPersonal'
import user from './routes/user'
import auth from './routes/auth'
import others from './routes/others'

//app.use('/infopersonal', infopersonal);
app.use('/infopersonal', passport.authenticate('jwt', { session: false }), infopersonal);
//app.use('/user', user);
app.use('/user', passport.authenticate('jwt', { session: false }), user);
app.use('/auth', auth);
app.use('/others', others);

//Logout Passport
app.get('/logout', function (req, res) {
    req.logout();
    res.json({
        res: true
    })
});


//Files static
//app.use(express.static(`../../public/`));



//Output
app.listen(app.get('port'), () => {
    console.log(`App start on ${app.get('port')}`);
});

