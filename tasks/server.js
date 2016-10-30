var spawn = require('child_process').spawn;
var chalk = require('chalk');
var grunt = require('grunt');
var once = grunt.util._.once;
grunt.util._.once = function(fn) { return fn; };
var server;

module.exports = function(grunt) {
  grunt.registerTask('server', 'Start the server', function() {
    var done = this.async();

    var kill = function(){
      console.log(chalk.gray('Stopping the server'));
      server.kill();
    };

    var startServer = function() {
      process.on('exit', kill);
      server = grunt.util.spawn({
        cmd: 'node',
        args: ['service.js'],
        env: process.env
      }, function(err, code) {
        if (code && code > 0) {
          grunt.log.writeln(err, results, code);
        }
      });
      server.stdout.on('data', function(data) {
        data = data.toString();
        if (data.indexOf('listening on port') > -1) {
          done();
        }
        process.stdout.write(chalk.cyan('[ DEV ]') + '  ' + data);
      });
      var error = function(data) {
        console.log(chalk.red('>>'), data.toString());
      };
      server.stderr.on('data', error);
      server.stdout.on('error', error);
      server.on('close', function(code, signal) {
        if (signal === 'SIGKILL') {
          process.removeListener('exit', kill);
          startServer();
        }
      });
    };

    var restartServer = function() {
      server.kill('SIGKILL');
    };

    if (server) {
      restartServer();
    } else {
      startServer();
    }
  });
};
