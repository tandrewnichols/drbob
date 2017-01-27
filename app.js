var nconf = require('./lib/nconf').init();
var _ = require('./lib/lodash').init();
var express = require('express');
var expressHbs = require('express-handlebars');
var app = module.exports = express();
var router = require('./router');
var hbs = expressHbs.create({
  extname: '.hbs',
  defaultLayout: 'layout',
  helpers: require('./lib/handlebar-helpers')
});

app.set('port', nconf.get('PORT'));
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

// Using router so I can easily remount on a different path if necessary
app.use('/', router);
