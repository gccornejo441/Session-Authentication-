const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const FileStore = require('session-file-store')(session);
const MongoStore = require('connect-mongo')(session);

const app = express();

app.use(session({
    name: 'Gabe\'s Login',
    saveUninitialized: false,
    resave: false,
    secret: 'Whatever you want'
}))

function auth (req, res, next) {
    console.log(req.headers);

    if (!req.headers.authorization) {
        res.set('WWW-Authenticate', 'Basic realm="Lucid" ');
        return res.status(401).send('Authentication Required!');
    } else {
        const authHeader = req.headers.authorization;
        const auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
        const [ user, password ] = auth;
        console.log(user, password);
        if ( user == 'gabriel' && password == 'password') {
            req.session.user = user;
            next()
        } else {
            const err = new Error('You are not Authenticated!');
            err.status = 401;
            next(err);
        }
    }
}




app.use(auth);



app.listen(3002);
