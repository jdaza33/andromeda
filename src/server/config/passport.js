import UserModel from '../model/user'
import InfoPersonalModel from '../model/infoPersonal'

import passportJWT from 'passport-jwt'

const localStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

module.exports = (passport) => {

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    /*passport.use('signup', new localStrategy({
        usernameField: 'username',
        passwordField: 'password',
        name: 'name',
        nit: 'nit',
        email: 'email'
    }, async (username, password, name, nit, email, done) => {
        try {
            const personal = await InfoPersonalModel.create({ name, nit, email });
            const user = await UserModel.create({
                id_infopersonal: personal._id,
                username,
                password,
                ref: personal.nit
            });
            return done(null, user);
        } catch (error) {
            done(error);
        }
    }));*/


    passport.use('login', new localStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, async (username, password, done) => {
        try {
            const user = await UserModel.findOne({ username });
            if (!user) {
                return done(null, false, { message: 'User not found' });
            }
            const validate = await user.isValidPassword(password);
            if (!validate) {
                return done(null, false, { message: 'Wrong Password' });
            }
            return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
            return done(error);
        }
    }));

    passport.use(new JWTStrategy({
        secretOrKey: 'blackencio',
        jwtFromRequest: ExtractJWT.fromUrlQueryParameter('tkn')
    }, async (token, done) => {
        try {
            //Pass the user details to the next middleware
            return done(null, token.user);
        } catch (error) {
            done(error);
        }
    }));

}

