/**
* The style implementations below are based on what ng-style does.
* See: https://github.com/angular/angular.js/blob/master/src/ng/directive/ngStyle.js
*
* They work exactly like ng-style but are tied to device sizes (by
* consulting the Screen service).
*
* Positives:
*   style-xs, style-sm, style-md, style-lg, style-mobile, style-desktop
*
* Negatives:
*   style-not-xs, style-not-sm, style-not-md, style-not-lg, style-not-mobile, style-not-desktop
*
* The class implementations simple add and remove classes based on device size.
*
* Positives:
*   class-xs, class-sm, class-md, class-lg, class-mobile, class-desktop
*
* Negatives:
*   class-not-xs, class-not-sm, class-not-md, class-not-lg, class-not-mobile, class-not-desktop
*/
(function() {
  var makeStyleDirective = function (size) {
    var directive = 'style' + size;
    var isCorrectSize = 'is' + size;

    // Using annotated syntax here because ng-annotate doesn't pick up strange uses like this
    return ['Screen', 'Color', function(Screen, Color) {
      return {
        link: function($scope, $element, $attributes) {
          // Watch a custom function
          $scope.$watch(function() {
            // If we're on the correct viewport, $eval the style object.
            // Otherwise, do nothing (which results in "undefined" being
            // passed as "newStyles" below).
            if (Screen[isCorrectSize]) {
              return $scope.$eval($attributes[directive]);
            }
          }, function(newStyles, oldStyles) {
            // There's not a great way to detect which styles need to go away. It's
            // easier to just blow away ALL the oldStyles and redo them
            if (oldStyles && (oldStyles !== newStyles)) {
              _.each(oldStyles, function(style, name) {
                // Only remove the style if its value matches the old value. This is
                // necessary because having multiple style-size directives on an element
                // is possible and they execute in order, so sometimes a style has already
                // been changed by another style directive and in that case, we don't
                // want to blow it away. This does also mean, that you should NOT
                // specify the same style for multiple sizes, e.g. style-md="{ width: '100%' }"
                // and style-lg="{ width: '100%' }", as that width will be blown away
                // when switching from md to lg. Instead, use style-desktop, or, in the
                // case you have 3 that need the same declaration, style-not-[size].
                var current = $element.css(name);
                if (current === style || (Color.isHex(style) && Color.isRgbMatch(current, style))) {
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
    }];
  };

  angular.module('app')
    .directive('styleXs', makeStyleDirective('Xs'))
    .directive('styleSm', makeStyleDirective('Sm'))
    .directive('styleMd', makeStyleDirective('Md'))
    .directive('styleLg', makeStyleDirective('Lg'))
    .directive('styleMobile', makeStyleDirective('Mobile'))
    .directive('styleDesktop', makeStyleDirective('Desktop'))
    .directive('styleNotXs', makeStyleDirective('NotXs'))
    .directive('styleNotSm', makeStyleDirective('NotSm'))
    .directive('styleNotMd', makeStyleDirective('NotMd'))
    .directive('styleNotLg', makeStyleDirective('NotLg'))
    .directive('styleNotMobile', makeStyleDirective('NotMobile'))
    .directive('styleNotDesktop', makeStyleDirective('NotDesktop'));

  var makeClassDirective = function(size) {
    var directive = 'class' + size;
    var isCorrectSize = 'is' + size;

    return ['Screen', function(Screen) {
      return {
        link: function($scope, $element, $attributes) {
          $scope.$watch(function() {
            // Return whether we're on the correct viewport
            return Screen[isCorrectSize];
          }, function(current, previous) {
            // We WERE on the correct size and just changed.
            // Remove styles of this size.
            if (!current && previous) {
              $element.removeClass($attributes[directive]);
            }
            // We were NOT on the correct size.
            // Add styles of this size.
            if (current) {
              $element.addClass($attributes[directive]);
            }
          });
        }
      };
    }];
  };

  angular.module('app')
    .directive('classXs', makeClassDirective('Xs'))
    .directive('classSm', makeClassDirective('Sm'))
    .directive('classMd', makeClassDirective('Md'))
    .directive('classLg', makeClassDirective('Lg'))
    .directive('classMobile', makeClassDirective('Mobile'))
    .directive('classDesktop', makeClassDirective('Desktop'))
    .directive('classNotXs', makeClassDirective('NotXs'))
    .directive('classNotSm', makeClassDirective('NotSm'))
    .directive('classNotMd', makeClassDirective('NotMd'))
    .directive('classNotLg', makeClassDirective('NotLg'))
    .directive('classNotMobile', makeClassDirective('NotMobile'))
    .directive('classNotDesktop', makeClassDirective('NotDesktop'));
})();
