var spawn = require('child_process').spawn;
var chalk = require('chalk');
var server;

module.exports = function(grunt) {

  grunt.registerTask('server', 'Start the server', function() {
    var done = this.async();

    var kill = function(){
      console.log(chalk.gray('Stopping the server'));
      server.kill();
    };

    var startServer = function(restart) {
      process.on('exit', kill);
      server = spawn('node', ['service.js']);
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
          startServer(true);
        }
      });
    };

    var restartServer = function() {
      server.kill('SIGKILL');
    };

    if (server) {
      server.kill('SIGKILL');
    } else {
      startServer();
    }
  });
};
