module.exports = {
  dist: {
    files: [
      {
        expand: true,
        cwd: "app/img",
        src: "**/*.*",
        dest: "public/img"
      }
    ]
  }
};
