module.exports = function(app) {

   app.get('/', function(req, res) {
      var login = '';
      var requisicao = req;
      var resposta = res;
      console.log(requisicao);
      console.log(resposta);
      if(req.user) {
         login = req.user.login;
      }
      res.render('index', {usuarioLogado: login});
   });

};