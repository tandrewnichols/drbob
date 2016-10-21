module.exports = {
  server: {
    files: ['lib/**/*.js', 'routes/**/*.js', 'config/**/*.json', 'app.js', 'server.js', 'service.js', 'common/**/*.js'],
    tasks: ['server'],
    options: {
      spawn: false
    }
  }
};
