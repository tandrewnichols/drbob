var taskMaster = require('task-master');
module.exports = function(grunt) {
  taskMaster(grunt);
  grunt.task.run('notify_hooks');
};
