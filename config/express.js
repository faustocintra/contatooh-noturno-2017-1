var express = require('express');
//var home = require('../app/routes/home');
var load = require('express-load');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

module.exports = function() {
    var app = express();
    app.set('port', 3003);
    app.use(express.static('./public'));
    app.set('view engine', 'ejs');
    app.set('views', './app/views');
    //home(app);

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(methodOverride());

    load('models', {cwd: 'app'})
        .then('controllers')
        .then('routes')
        .into(app);
    return app;
};