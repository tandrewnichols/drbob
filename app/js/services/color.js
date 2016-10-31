angular.module('app').factory('Color', function() {
  var service = {
    getRgb: function(code) {
      var red = code.slice(1, 3);
      var green = code.slice(3, 5);
      var blue = code.slice(5, 7);
      // Returns something like 187,85,92
      return [ parseInt(red, 16), parseInt(green, 16), parseInt(blue, 16) ].join(',');
    },

    isRgbMatch: function(rgb, code) {
      var converted = service.getRgb(code);
      return 'rgb(' + converted + ')' === rgb || 'rgb(' + converted.replace(/,/g, ', ') + ')' === rgb;
    },

    isHex: function(code) {
      return /^#[0-9a-f]{6}$/.test(code);
    },

    isRgb: function(rgb) {
      return /^rgb\(\d{1,3},\s?\d{1,3},\s?\d{1,3}\)$/.test(rgb);
    },

    isRgba: function(rgba) {
      return /^rgba\(\d{1,3},\s?\d{1,3},\s?\d{1,3},\s?\d\.?\d?\)$/.test(rgba);
    },

    green: '#7ca950',
    success: '#7ca950',
    yellow: '#dab132',
    warning: '#dab132',
    red: '#bb4924',
    brand: '#bb4924',
    blue: '#516d85',
    info: '#516d85',
    primary: '#252525',
    danger: '#a95056',
    gray: '#909090',
    grayLight: '#e0e0e0'
  };

  return service;
});
