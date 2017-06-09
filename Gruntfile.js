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
      },

      usemin: {
         html: 'dist/app/views/**/*.ejs'
      },

      useminPrepare: {
         html: 'dist/app/views/**/*.ejs',
         options: {
            root: 'dist/public',
            dest: 'dist/public'
         }
      },

      ngAnnotate: {
         scripts: {
            expand: true,
            src: ['dist/public/js/**/*.js']
         }
      }

   });
   
   // 'dist' passa a ser um atalho para chamar as tarefas
   // 'clean' e 'copy' em sequência
   grunt.registerTask('dist', ['clean', 'copy']);

   // 'dist' será a tarefa chamada por padrão, se nenhuma outra
   // for passada ao grunt
   grunt.registerTask('default', ['dist', 'minifica']);

   grunt.registerTask('minifica', ['useminPrepare', 'ngAnnotate',
      'concat', 'uglify', 'cssmin', 'usemin']);
   
   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-contrib-clean');
   grunt.loadNpmTasks('grunt-contrib-concat');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-cssmin');
   grunt.loadNpmTasks('grunt-usemin');
   grunt.loadNpmTasks('grunt-ng-annotate');

}