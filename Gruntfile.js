module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
        cssmin: {
          target: {
            files: [{
              expand: true,
              cwd: 'public/dist/',
              src: ['*.css'],
              dest: 'public/dist/',
              ext: '.min.css'
            }]
          }
        },
       concat: {
         
          dist: {
            src: ['public/stylesheet/*.css'],
            dest: 'public/dist/materialize.css',
          },
      },
       sass: {                              
        dist: {                            
          options: {                       
            style: 'expanded'
          },
          files: [{
            expand: true,
            cwd: 'public/sass/',
            src: ['*.scss'],
            dest: 'public/stylesheet/',
            ext: '.css'
      }]
        }
      },
      uglify: {
        my_target: {
          files: [{
              expand: true,
              cwd: 'public/js',
              src: '**/*.js',
              dest: 'public/dest/js'
          }]
        }
      }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  grunt.registerTask('default', ['sass','concat','cssmin','uglify']);

};