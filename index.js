const express = require('express')
const bodyParser = require('body-parser');
const router = require('./Routes/web')
const connectDb = require('./Database/connection')
const session = require('express-session')
const MongoSession = require('connect-mongodb-session')(session)
var path = require("path");
const app = express();
const url = 'mongodb://localhost/bookshop';
connectDb(url);

const SessionStore = new MongoSession({
        uri:url,
        collection:'mysession'
})

//setting session
app.use(session({
        secret: 'yashraj1720000',
        resave: false,
        saveUninitialized: false,
        store:SessionStore,
}))

const urlEncoded = bodyParser.urlencoded({extended:false});
app.use(urlEncoded)
app.use(express.static('./images'))


app.set('view engine','pug')
app.set('views','./views')
app.use('/',router);

app.listen(8081);