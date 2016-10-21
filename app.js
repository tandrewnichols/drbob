var nconf = require('./lib/nconf').init();
var _ = require('./lib/lodash').init();
var express = require('express');
var app = module.exports = express();
var router = require('./router');
var swig = require('swig');

app.set('port', nconf.get('PORT'));
app.engine('html', require('swig').renderFile);
app.set('view engine', 'html');
swig.setDefaults({
  loader: swig.loaders.fs(__dirname + '/views')
});
app.set('views', __dirname + '/views');
app.set('layout', 'layout');

// Using router so I can easily remount on a different path if necessary
app.use('/', router);
