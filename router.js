var express = require('express');
var router = module.exports = express.Router();
var cookieParser = require('cookie-parser');
var compress = require('compression');
var errorhandler = require('errorhandler');
var bodyParser = require('body-parser');
var nconf = require('nconf');
var fm = require('file-manifest');
var middleware = express.Router.middleware = fm.generate('lib/middleware', { reduce: 'nested' });
var routes = fm.generate('routes', { reduce: 'nested' });

router.use(compress());
router.use(cookieParser());
router.use(bodyParser.json());
router.use('/assets', express.static(__dirname + '/public'));

// Routes for router
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Dr. Bob',
    description: 'An awesome website!',
    keywords: ['foo', 'bar', 'baz']
  });
});

router.use(errorhandler());
