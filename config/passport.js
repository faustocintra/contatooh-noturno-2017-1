var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

module.exports = function() {
   
   passport.use(new GitHubStrategy({
      clientID: '',
      clientSecret: '',
      callbackURL: 'http://localhost:3000/auth/github'
   }, function (accessToken, refreshToken, profile, done){

      Usuario.findOrCreate(
         { login: profile.username },
         { nome: profile.username },
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