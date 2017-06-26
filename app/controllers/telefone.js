var sanitize = require('mongo-sanitize');

module.exports = function(app) {
   
	var Telefone = app.models.telefone;
	
	var controller = {};
   
   controller.listaTelefones = function(req, res) {
   
      Telefone.find().populate('contato').exec().then(
         function(telefones) {
            res.json(telefones);
         },
         function(erro) {
            res.status(500).json(erro);
         }
      );

   };
   
   controller.obtemTelefone = function(req, res) {

      Telefone.findById(req.params.id).exec().then(
         function(telefone) {
            if(!telefone) { // Se o resultado vier vazio
               throw new Error('Telefone não encontrado');
            }
            res.json(contato);
         },
         function(erro) {
            console.log(erro);
            res.status(404).json(erro);
         }
      ); 

   };
   
   controller.removeTelefone = function(req, res) {
      // Remove eventuais operadores do MongoDB contidos
      // dentro do valor do id, evitando danos ao banco de dados
      var id = sanitize(req.params._id);
      Telefone.remove({_id: id}).exec().then(
         function() {
            // 204: OK, sem conteúdo em seguida
            res.status(204).end();
         },
         function(erro) {
            return console.error(erro);
         }
      );

   };

   controller.salvaTelefone = function(req, res) {
   
      // Determinando explicitamente o que será gravado
      var dados = {
         numTelefone: req.body.numTelefone,
         tipoTelefone: req.body.tipoTelefone,
         contato: req.body.contato
      };

      if(req.body._id) { // Telefone já existente

         Telefone.findByIdAndUpdate(req.body._id, dados).exec().then(
            function(telefone) {
               res.json(telefone);
            },
            function(erro) {
               console.error(erro);
               res.status(500).json(erro);
            }
         );

      }
      else { // Telefone novo

         Telefone.create(dados).then(
            function(telefone) {
               // HTTP 201: novo recurso criado
               res.status(201).json(telefone);
            },
            function(erro) {
               console.log(erro);
               // HTTP 500: erro interno do servidor
               res.status(500).json(erro);
            }
         );

      }

   };

   return controller;
};