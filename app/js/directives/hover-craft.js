angular.module('app').directive('hoverCraft', function($timeout) {
  /**
   * hover-craft
   *
   * This directive let's you show an element on hover and then persist that element when it receives the focus
   * (sort of the reverse of hover intent - it's like hover-leave intent).
   *
   * @param {String} hoverCraft - The unique name for this hover instance
   * @param {Angular Expression} hoverEnter - Angular expression to evaluate on mouseenter
   * @param {Angular Expression} hoverLeave - Angular expression to evaluate on mouseleave
   * @param {Number} [hoverWait=100] - The amount of time to wait for evaluating hoverLeave.
   *
   * Example:
   *
   *    <!-- When the first div is hovered, the second shows up. If you move the mouse to the second div,
   *         it doesn't disappear and reappear because hover-leave is evaluated in a timeout and the timeout
   *         is cancelled upon switching elements. Note that both use the same identifier "foo." -->
   *    <div hover-craft="foo" hover-enter="fooHover = true" hover-leave="fooHover = false"></div>
   *    <div ng-show="fooHover" hover-craft="foo" hover-enter="fooHover = true" hover-leave="fooHover = false"></div>
   *
   */

  // This can't be on $scope because it has to be accessible across multiple hovercraft directives
  var hoverCache = {};
  return {
    scope: true,
    link: function($scope, $element, $attributes) {
      // Put on $scope.hovercraft to (attempt) to prevent collisions if this child scope is shared
      $scope.hovercraft = {
        mouseenter: function() {
          // If the timeout for this thing is active, cancel it
          if (hoverCache[ $attributes.hoverCraft ]) {
            $timeout.cancel(hoverCache[ $attributes.hoverCraft ]);
          }
          // Evaluate the hover-enter attribute
          $scope.$eval($attributes.hoverEnter);
          $scope.$apply();
        },
        mouseleave: function() {
          // Save the timeout id in cache so it can be cancelled if necessary
          hoverCache[ $attributes.hoverCraft ] = $timeout(function() {
            // If the timeout completes, evaluate hover-leave
            $scope.$eval($attributes.hoverLeave);
          }, Number($attributes.hoverWait) || 100);
        }
      };

      $element.on('mouseenter', $scope.hovercraft.mouseenter);
      $element.on('mouseleave', $scope.hovercraft.mouseleave);
    }
  };
});
