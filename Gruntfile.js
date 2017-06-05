module.exports = function(grunt) {

   grunt.initConfig({

      // Tarefas
      copy: {
         project: {
            expand: true, // Desce pelos subdiretórios
            cwd: '.', // A partir do diretório atual
            // Copia tudo, exceto os arquivos marcados com !
            src: ['**', '!Gruntfile.js', '!package.json', '!bower.js'],
            dest: 'dist' // O destino será a pasta 'dist'
         }      
      },

      // Apaga o conteúdo da pasta 'dist'
      clean: {
         dist: {
            src: 'dist'
         }
      }

   });
   
   // 'dist' passa a ser um atalho para chamar as tarefas
   // 'clean' e 'copy' em sequência
   grunt.registerTask('dist', ['clean', 'copy']);

   // 'dist' será a tarefa chamada por padrão, se nenhuma outra
   // for passada ao grunt
   grunt.registerTask('default', ['dist']);
   
   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-contrib-clean');

}