var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

var mongoose = require('mongoose');

module.exports = function() {

   var Usuario = mongoose.model('Usuario');
   
   passport.use(new GitHubStrategy({
      clientID: '6ab60903e84ea3a841f3',
      clientSecret: '6b895e5b5a75a938a121b49df66c031f3875ef63',
      callbackURL: 'http://localhost:3000/auth/github/callback'
   }, function (accessToken, refreshToken, profile, done){

      Usuario.findOrCreate(
         { login: profile.username },
         { nome: profile.username },
         { ultimoLogin: Date.now },
         function(erro, usuario) {
            if(erro) {
               console.log(erro);
               return done(erro);
            }
            return done(null, usuario);
         }
      );

   }));

   // Serialização: passagem de JSON para String
   passport.serializeUser(function(usuario, done) {
      done(null, usuario._id);
   });

   // Desserialização: passagem de String para JSON
   passport.deserializeUser(function(id, done){
      Usuario.findById(id).exec().then(
         function(usuario) {
            done(null, usuario);
         }
      );
   });

}