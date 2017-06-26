var mongoose = require('mongoose');

module.exports = function() {

   var schema = mongoose.Schema({
      
      numTelefone: {
         type: String,
         required: true
      },
      tipoTelefone: {
         type: String,
         default: 'celular'
      },
      contato: {
         type: mongoose.Schema.ObjectId,
         ref: 'Contato'
      }


   });

   return mongoose.model('Telefone', schema);

}