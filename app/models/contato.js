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
      }
   });

   return mongoose.model('Contato', schema);

}