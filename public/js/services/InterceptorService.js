angular.module('contatooh').factory('meuInterceptor',
   function($location, $q) {

      var interceptor = {
         responseError: function(resposta) {
            if(resposta.status == 401) { // Não autorizado
               $location.path('/auth');
            }
            return $q.reject(resposta);
         }
      };

      return interceptor;
   }
);