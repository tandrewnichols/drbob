module.exports = {
  options: {
    module: 'app'
  },
  dev: {
    cwd: 'app/templates',
    src: '**/*.html',
    dest: 'public/js/template-cache.js'
  },
  dist: {
    cwd: 'app/templates',
    src: '**/*.html',
    dest: 'public/js/template-cache.js',
    options: {
      htmlmin: {
        collapseWhitespace: true
      }
    }
  }
};
