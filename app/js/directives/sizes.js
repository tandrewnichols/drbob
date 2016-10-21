/**
* These implementations are based on what ng-style does to set styles.
* See: https://github.com/angular/angular.js/blob/master/src/ng/directive/ngStyle.js
*
* These directives work exactly like ng-style but are tied to device sizes (by
* consulting the Screen service).
*
* Positives:
*   style-xs, style-sm, style-md, style-lg, style-mobile, style-desktop
*
* Negatives:
*   style-not-xs, style-not-sm, style-not-md, style-not-lg, style-not-mobile, style-not-desktop
*/
(function() {
  // Get a single reference to the app.
  var app = angular.module('app');

  // Iterate over the sizes
  _.each(['xs', 'sm', 'md', 'lg', 'mobile', 'desktop'], function(size) {
    var cap = _.capitalize(size);

    // Construct the directive name and Screen property upfront
    var positive = {
      style: {
        directive: 'style' + cap,
        isCorrectSize: 'is' + cap
      }
    };

    var negative = {
      style: {
        directive: 'styleNot' + cap,
        isCorrectSize: 'isNot' + cap
      }
    };

    // Wrapper function to declare the directive. Called "makeStyleDirective" in case we add
    // other size wrappers in the future. (Like "class-xs", e.g.)
    var makeStyleDirective = function(obj) {
      // Using annotated syntax here because ng-annotate doesn't pick up strange uses like this
      app.directive(obj.directive, ['Screen', function(Screen) {
        return {
          link: function($scope, $element, $attributes) {
            // Watch a custom function
            $scope.$watch(function() {
              // If we're on the correct viewport, $eval the style object.
              // Otherwise, do nothing (which results in "undefined" being
              // passed as "newStyles" below.
              if (Screen[obj.isCorrectSize]) {
                return $scope.$eval($attributes[obj.directive]);
              }
            }, function(newStyles, oldStyles) {
              // There's not a great way to detect which styles need to go away. It's
              // easier to just blow away ALL the oldStyles and redo them
              if (oldStyles && (oldStyles !== newStyles)) {
                _.each(oldStyles, function(style, name) {
                  // Only remove the style if it's value matches the old value. This is
                  // necessary because having multiple style-size directives on an element
                  // is possible and they execute in order, so sometimes a style has already
                  // been changed by another style directive and in that case, we don't
                  // want to blow it away. This does also mean, that you should NOT
                  // specify the same style for multiple sizes, e.g. style-md="{ width: '100%' }"
                  // and style-lg="{ width: '100%' }", as that width will be blown away
                  // when switching from md to lg. Instead, use style-desktop, or, in the
                  // case you have 3 that need the same declaration, style-not-[size].
                  if ($element.css(name) === style) {
                    $element.css(name, '');
                  }
                });
              }

              // If there are new styles, set them here
              if (newStyles) {
                $element.css(newStyles);
              }
            }, true);
          }
        };
      }]);
    };

    // Create the positive and negative style directives
    makeStyleDirective(positive.style);
    makeStyleDirective(negative.style);
  });
})();
