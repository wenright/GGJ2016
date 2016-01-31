module.exports = function(grunt) {
  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 8100
        }
      }
    },
    watch: {
      all: {
        options: {
          livereload: true
        },
        files: ['js/*.js', 'index.html', 'css/*.css'],
        tasks: [],
      }
    },
    open: {
      all: {
        path: 'http://localhost:<%= connect.server.options.port%>'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('serve', [
    'open',
    'connect:server',
    'watch',
  ]);
};
