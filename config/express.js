var express = require('express');
//var home = require('../app/routes/home');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var methodOverride = require('method-override');
var helmet = require('helmet');

module.exports = function() {
    var app = express();
    app.set('port', 3000);
    app.use(express.static('./public'));
    app.set('view engine', 'ejs');
    app.set('views', './app/views');
    //home(app);

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(session(
        {
            // Coloque sua frase secreta abaixo
            // A minha: "só o conhecimento emancipa", em latim
            secret: 'Sola scientia emancipat',
            resave: true,
            saveUninitialized: true
        }
    ));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(helmet());
    
    //app.disable('x-powered-by');
    app.use(helmet.hidePoweredBy({setTo: 'PHP 5.5.14'}));

    // Evita que o site seja carregado dentro de um iframe
    //helmet.xframe(); // Está assim no livro, não funciona
    helmet.frameguard();

    // Impede a injeção de scripts de terceiros (cross-scripting)
    // na response
    helmet.xssFilter();

    // Impede que os navegadores tentem adivinhar e executar o
    // conteúdo de determinados arquivos
    helmet.noSniff();

    load('models', {cwd: 'app'})
        .then('controllers')
        .then('routes')
        .into(app);
    return app;
};