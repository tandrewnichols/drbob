angular.module('app').factory('gtm', function($location) {
  var log = function(category, action, label, value, non) {
    console.log('\n');
    console.log('--GA DEBUG--');
    console.log((non ? 'Non-' : '') + 'Interactive event fired with the following params:');
    console.log('%cCategory:%c ' + category, 'color: blue', 'color: black');
    console.log('%cAction:%c ' + action, 'color: blue', 'color: black');
    console.log('%cLabel:%c ' + label, 'color: blue', 'color: black');
    console.log('%cValue:%c ' + (value || 1), 'color: blue', 'color: black');
  };

  return {
    fire: function(category, action, label, value, type) {
      dataLayer.push({
        eventData: {
          category: category,
          action: action,
          label: label,
          value: value
        },
        'event': type
      });
    },
    i: function(category, action, label, value) {
      if ($location.search().gadebug) {
        log(category, action, label, value, false);
      }
      this.fire(category, action, label, value || 1, 'interactive'); 
    },
    n: function(category, action, label, value) {
      if ($location.search().gadebug) {
        log(category, action, label, value, true);
      }
      this.fire(category, action, label, value || 1, 'non-interactive'); 
    }
  };
});
