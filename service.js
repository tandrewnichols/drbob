var app = require('./app');
var http = require('http');
var server = http.createServer(app);

server.listen(app.get('port'), function() {
  console.log('App listening on port', app.get('port'));
});

process.on('uncaughtException', function(err) {
  console.log(err);
  console.log(err.stack);
});
