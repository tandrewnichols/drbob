(function() {
  var link = function($scope, $element, $attributes, gtm, $parse) {
    // Generic function to call the right gtm function with the right things
    var call = function(type, attrs) {
      gtm[type](attrs.category, attrs.action, attrs.label, attrs.value);
    };

    // Iterate over the element's properties
    _.each($attributes, function(val, key) {
      // If the key starts with "ga" and isn't JUST "ga"
      if (_.startsWith(key, 'ga') && key !== 'ga' && !_.endsWith(key, '-when')) {
        var fn = $parse(val);
        // Get the event name (e.g. turn "gaClick" into "click")
        var evt = $attributes.$attr[key].replace('ga-', '');
        // Register the event handler
        $element.on(evt, function() {
          // If this event has a when (e.g. ga-click-when), fire this event
          // only if that expression evaluates to true. Otherwise (no when)
          // just fire it all the time.
          var when = $attributes[key + 'When'];
          if (!when || $scope.$eval(when)) {
            // Parse the val in case it has angular expressions
            var attrs = fn($scope);
            // Pass the right type and the properties to call
            var method = attrs.nonInteractive ? 'n' : 'i';
            call(method, attrs);
          }
        });
      }
    });

    // On load, handle any ga properties.
    if ($attributes.ga) {
      // Special case: ga-when="visible"
      // Use the value of ng-show or ng-hide to determine whether to fire this
      if ($attributes.gaWhen === 'visible') {
        if ($attributes.ngShow) {
          // Check for ng-show first, as we use that more often
          $scope.$watch($attributes.ngShow, function(show, old) {
            // If the thing is visible and the previous state was not visible
            if (show && !old) { 
              // fire the event
              call('nonInteractive', $scope.$eval($attributes.ga));
            }
          });
        } else if ($attributes.ngHide) {
          // Then check for ng-hide
          $scope.$watch($attributes.ngHide, function(hide, old) {
            // If the thing is not hidden or the previous state was hidden
            if (!hide || old) { 
              call('nonInteractive', $scope.$eval($attributes.ga));
            }
          });
        }
      } else if ($attributes.gaWhen) {
        // Finally, if ga-when is not "visible," just treat it as an angular expression.
        $scope.$watch($attributes.gaWhen, function(when, old) {
          // If the when is true and the previous state was false
          if (when && !old) {
            call('nonInteractive', $scope.$eval($attributes.ga));
          }
        });
      } else {
        // If no ga-when, just trigger immediately
        call('nonInteractive', $scope.$eval($attributes.ga));
      }
    }
  };

  var app = angular.module('app');
  
  // Register the ga directive
  app.directive('ga', function(gtm, $parse) {
    return {
      link: function($scope, $element, $attributes) {
        link($scope, $element, $attributes, gtm, $parse);
      }
    };
  });

  // Register the ga-click directive
  app.directive('gaClick', function(gtm, $parse) {
    return {
      link: function($scope, $element, $attributes) {
        // But do nothing if this element also has a "ga" property,
        // as that would cause events to be fired twice.
        if (!$attributes.ga) {
          link($scope, $element, $attributes, gtm, $parse);
        }
      }
    };
  });
})();
