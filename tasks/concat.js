module.exports = {
  dist: {
    src: [
      'node_modules/lodash/lodash.js',
      'node_modules/moment/moment.js',
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'app/js/app.js',
      'app/js/**/*.js',
      'public/js/template-cache.js'
    ],
    dest: 'public/js/app.js'
  }
};
