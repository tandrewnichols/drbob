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

var handler = function(req, res, next) {
  res.render('index', {
    title: 'Dr. Bob',
    // TODO: Add real description and keywords
    description: 'An awesome website!',
    keywords: ['foo', 'bar', 'baz'],
    googleMapsKey: nconf.get('GOOGLE_MAPS_KEY')
  });
};

// Routes for router
router.get('/', handler);
router.get('/info', handler);
router.get('/about', handler);
router.get('/products', handler);

router.use(errorhandler());
