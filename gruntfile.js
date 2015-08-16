module.exports = function (grunt) {

  grunt.initConfig({
    browserify: {
      app: {
        options: {
          transform: [['babelify'], ['sassify', {'auto-inject': true}]]
        },
        files: {
          './dist/build.js': ['./app/build.js']
        }
      }
    },
    watch: {
      js: {
        files: ['app/modules/**/*.js', 'app/build.js', 'app/modules/**/*.scss'],
        tasks: ['browserify'],
        options: {livereload: true}
      }
    },
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          nodeArgs: ['--debug'],
          ignore: ['app/**', 'node_modules/**'],
          watch: ['server.js', 'gruntfile.js'],
          env: {PORT: '3000'}
        }
      }
    },
    concurrent: {
      app: {
        tasks: ['nodemon:dev', 'watch'],
        options: {logConcurrentOutput: true}
      }
    },
  });

  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('app', ['browserify', 'concurrent:app']);
};