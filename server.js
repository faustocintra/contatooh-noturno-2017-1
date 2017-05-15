var http = require('http');
var app = require('./config/express')(); // Cuidado: tem dois 
                                         // parênteses vazios aqui

require('./config/passport')(); // Dois parênteses vazios aqui tb                                         

// Conectando ao MongoDb via Mongoose
var conn = require('./config/database.js');
//conn('mongodb://localhost/contatooh');                                         

http
    .createServer(app)
    .listen(app.get('port'), function() {
        console.log('Express escutando na porta ' + app.get('port'));
    });                                         

