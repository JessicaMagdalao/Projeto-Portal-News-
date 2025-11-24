const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const app = express();
const expressValidator = require('express-validator');
const expressSession = require('express-session');
const multer = require('multer');
var configMulter = multer({
    storage: multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, './app/public/uploads');
        },
        filename: function(req, file, callback) {
            callback(null, Date.now() + '-' + file.originalname);
        }
    })
});
app.upload = configMulter;
app.set('view engine', 'ejs');
app.set('views','./app/views');
app.use(express.static('./app/public'));
app.use(expressValidator());
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSession({
    secret: "#JBDKJ@%DNÇ9357oknbjhh245b",
    resave: false,
    saveUninitialized: false
}));
consign()
    .include('app/routes')
    .then('config/dbConnection.js')
    .then('app/models')
    .then('app/controllers')
    .into(app);
module.exports = app;
