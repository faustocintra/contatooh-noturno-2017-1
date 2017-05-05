angular.module('contatooh')
	.controller('ContatoController', 
	function($scope, $routeParams, $resource, Contato) {

		//var Contato = $resource('contatos/:id');

		$scope.mensagem = {};

		if($routeParams.contatoId) {
		  Contato.get({id: $routeParams.contatoId},
			 function(contato) {
				$scope.contato = contato;
			 },
			 function(erro) {
				$scope.mensagem = {
					 texto: 'Não foi possível obter o contato',
					 class: 'danger'
				};
				console.log(erro);
			 } 
		  );
		} else {
		  $scope.contato = new Contato();
		}

		$scope.salva = function() {
		  $scope.contato.$save().then(
			 function() {
				$scope.mensagem = {
				  texto: 'Contato salvo com sucesso',
				  class: 'info'
				};
				// Limpa o formulário
				$scope.contato = new Contato();
			 },
			 function(erro) {
				$scope.mensagem = {
				  texto: 'Não foi possível salvar o contato',
				  class: 'danger'
				};
			 }
		  );
		}

      // Preenche uma lista com todos os contatos cadastrados
      // para popular o combobox do contato de emergência
      Contato.query(function(contatos) {
         $scope.contatos = contatos;
      });

	});
