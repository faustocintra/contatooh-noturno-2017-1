var mongoose = require('mongoose');

module.exports = function() {

   var schema = mongoose.Schema({
      nome: {
         type: String,
         required: true
      },
      email: {
         type: String,
         required: true,
         // Um e-mail só poderá ser utilizado
         // por uma única pessoa
         index: {
            unique: true
         }
      },
      // emergencia é um atributo que faz referência a um outro objeto
      // deste mesmo esquema (Contato)
      emergencia: {
         type: mongoose.Schema.ObjectId,
         ref: 'Contato'
      }
   });

   return mongoose.model('Contato', schema);

}