module.exports = {
  dist: {
    files: [
      {
        expand: true,
        cwd: "app/img",
        src: "**/*.*",
        dest: "public/img"
      },
      {
        expand: true,
        cwd: 'bower_components/bootstrap/fonts',
        src: '*.*',
        dest: 'public/fonts'
      },
      {
        expand: true,
        cwd: 'bower_components/font-awesome/fonts',
        src: '*.*',
        dest: 'public/fonts'
      }
    ]
  }
};
