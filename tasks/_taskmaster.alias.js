module.exports = {
  'default': ['copy', /*'ngtemplates:dev',*/ 'concat', 'less', 'server', 'notify:server', 'open', 'watch'],
  build: ['copy', 'concat', 'ngAnnotate', 'uglify', 'less']
};
