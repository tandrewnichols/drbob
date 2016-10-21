var cluster = require('cluster');
var cpus = require('os').cpus().length;

if (cluster.isMaster) {
  for (var i = 0; i < cpus; i++) {
    cluster.fork();
  }

  cluster.on('exit', function (worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died with code ' + code + ' and signal ' + signal);
    cluster.fork();
  });

  cluster.on('listening', function (worker, address) {
    console.log('worker ' + worker.process.pid + ' now listening on ' + address.address + ':' + address.port);
  });
} else {
  require('./service');
}
