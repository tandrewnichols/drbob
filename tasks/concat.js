module.exports = {
  dist: {
    src: [
      'node_modules/lodash/lodash.js',
      'node_modules/moment/moment.js',
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/angular-route/angular-route.js',
      'app/js/app.js',
      'app/js/router.js',
      'app/js/controllers/home.js'
      //'public/js/template-cache.js'
    ],
    dest: 'public/js/app.js'
  }
};
