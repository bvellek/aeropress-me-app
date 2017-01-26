module.exports = function(grunt) {
  grunt.initConfig({
    dirs: {
      theme: './public/',
      css: './css/',
      js: './js/'
    },
    cssmin: {
      ship: {
        options: {
          report: 'gzip'
        },
        files: {
          '<%= dirs.theme %><%= dirs.css %>main.min.css': '<%= dirs.theme %><%= dirs.css %>main.css',
          '<%= dirs.theme %><%= dirs.css %>normalize.min.css': '<%= dirs.theme %><%= dirs.css %>normalize.css'
        }
      },
    },
    uglify: {
      options: {
        report: 'gzip'
      },
    my_target: {
      files: {
        '<%= dirs.theme %><%= dirs.js %>app.min.js': ['<%= dirs.theme %><%= dirs.js %>app.js']
      }
    }
  },
    growl: { /* optional growl notifications requires terminal-notifer: gem install terminal-notifier */
      css: {
          message: "CSS minified",
          title: "grunt"
      },
      watch: {
        message: "Grunt is watching",
        title: "grunt"
      }
    },
    watch: { /* trigger tasks on save */
      options: {
          livereload: true
      },
      css: {
          options: {
              livereload: false
          },
          files: '<%= dirs.theme %><%= dirs.css %>main.css',
          tasks: ['cssmin', 'growl:css']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-growl');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');


  grunt.registerTask('default',['growl:watch','watch']);
  grunt.registerTask('build',['cssmin', 'growl:css']);
};
