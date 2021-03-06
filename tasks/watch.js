module.exports = {
  server: {
    files: ['lib/**/*.js', 'routes/**/*.js', 'config/**/*.json', 'router.js', 'app.js', 'server.js', 'service.js', 'common/**/*.js', 'views/**/*.hbs'],
    tasks: ['server', 'notify:server'],
    options: {
      nospawn: true
    }
  },
  less: {
    files: ['app/css/**/*.less'],
    tasks: ['less', 'notify:less']
  },
  js: {
    files: ['app/js/**/*.js'],
    tasks: ['concat', 'notify:js']
  },
  templates: {
    files: ['app/templates/**/*.html'],
    tasks: ['ngtemplates:dev', 'concat', 'notify:js']
  }
};
