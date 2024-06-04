const passport = require('passport')
const User = require('../models/user')

// Requerimientos para passport:
const localStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
// Requerimientos para desp verificar el token:
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

// Middlewares de autenticación para registrarse:
passport.use('signup', new localStrategy({
    passReqToCallback: true,
    usernameField: 'email',
    passwordField: 'password'
}, async (req, email, password, done) => {
    const { nombre, apellido, edad, telefono } = req.body;

    try {
        const nuevoUsuario = new User({
            nombre,
            apellido,
            email,
            edad,
            telefono,
            password
        });

        await nuevoUsuario.save();
        return done(null, nuevoUsuario);
    } catch (e) {
        return done(e);
    }
}))

// Middleware de autenticación para el login:
passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return done(null, false, { message: 'Usuario no encontrado' })
        }

        const validate = await user.isValidPassword(password)

        if (!validate) {
            return done(null, false, { message: 'Usuario o contraseña incorrecta' })
        }

        return done(null, user, { message: 'Ingresaste correctamente a tu OfiFlex!' })
    } catch (e) {
        return done(e)
    }
}))

// Middleware para comprobar el token:

passport.use(new JWTStrategy({
    secretOrKey: 'top-secret',
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
    try {
        return done(null, token.user)
    } catch (e) {
        done(e)
    }
}
))

// Estrategia de Google
passport.use(new GoogleStrategy({
    clientID: 'GOOGLE_CLIENT_ID',
    clientSecret: 'GOOGLE_CLIENT_SECRET',
    callbackURL: 'http://localhost:3000/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await User.findOne({ googleId: profile.id });

        if (user) {
            return done(null, user);
        }

        const newUser = new User({
            googleId: profile.id,
            nombre: profile.displayName,
            email: profile.emails[0].value
        });

        await newUser.save();
        done(null, newUser);
    } catch (error) {
        done(error);
    }
}));

// Estrategia de Facebook
passport.use(new FacebookStrategy({
    clientID: 'FACEBOOK_APP_ID',
    clientSecret: 'FACEBOOK_APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await User.findOne({ facebookId: profile.id });

        if (user) {
            return done(null, user);
        }

        const newUser = new User({
            facebookId: profile.id,
            nombre: profile.displayName,
            email: profile.emails[0].value
        });

        await newUser.save();
        done(null, newUser);
    } catch (error) {
        done(error);
    }
}));

module.exports = passport;