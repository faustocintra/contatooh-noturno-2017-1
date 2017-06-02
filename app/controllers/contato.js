var sanitize = require('mongo-sanitize');

module.exports = function(app) {
   
	var Contato = app.models.contato;
	
	var controller = {};
   
   controller.listaContatos = function(req, res) {
   
      Contato.find().populate('emergencia').exec().then(
         function(contatos) {
            res.json(contatos);
         },
         function(erro) {
            res.status(500).json(erro);
         }
      );

   };
   
   controller.obtemContato = function(req, res) {

      Contato.findById(req.params.id).exec().then(
         function(contato) {
            if(!contato) { // Se o resultado vier vazio
               throw new Error('Contato não encontrado');
            }
            res.json(contato);
         },
         function(erro) {
            console.log(erro);
            res.status(404).json(erro);
         }
      ); 

   };
   
   controller.removeContato = function(req, res) {
      // Remove eventuais operadores do MongoDB contidos
      // dentro do valor do id, evitando danos ao banco de dados
      var id = sanitize(req.params._id);
      Contato.remove({_id: id}).exec().then(
         function() {
            // 204: OK, sem conteúdo em seguida
            res.status(204).end();
         },
         function(erro) {
            return console.error(erro);
         }
      );

   };

   controller.salvaContato = function(req, res) {
   
      // Determinando explicitamente o que será gravado
      var dados = {
         nome: req.body.nome,
         email: req.body.email,
         emergencia: req.body.emergencia
      };

      if(req.body._id) { // Contato já existente

         Contato.findByIdAndUpdate(req.body._id, dados).exec().then(
            function(contato) {
               res.json(contato);
            },
            function(erro) {
               console.error(erro);
               res.status(500).json(erro);
            }
         );

      }
      else { // Contato novo

         Contato.create(dados).then(
            function(contato) {
               // HTTP 201: novo recurso criado
               res.status(201).json(contato);
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