var nconf = require('./lib/nconf').init();
var _ = require('./lib/lodash').init();
var express = require('express');
var hbs = require('express-handlebars');
var app = module.exports = express();
var router = require('./router');

app.set('port', nconf.get('PORT'));
app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: 'layout'}));
app.set('view engine', '.hbs');

// Using router so I can easily remount on a different path if necessary
app.use('/', router);
