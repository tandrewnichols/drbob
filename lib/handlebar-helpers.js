exports.ng = function(options) {
  return '{{ ' + options.fn() + ' }}';
};
