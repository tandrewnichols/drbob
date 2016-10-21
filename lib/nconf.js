var nconf = require('nconf');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var root = require('path').resolve(__dirname, '..');
var extend = require('config-extend');

exports.init = function() {
  nconf.argv().env();

  if (env !== 'production') {
    nconf.file(env, root + '/config/' + env + '.json');
  }

  nconf.file('production', root + '/config/production.json');

  nconf.set('env', env);

  return nconf;
};
