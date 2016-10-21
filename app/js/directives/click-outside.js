angular.module('app').directive('clickOutside', function($document, $parse) {
  return {
    link: function($scope, $element, $attributes) {
      var fn = $parse($attributes.clickOutside);

      // Setup the handler function in advance
      var clickOutside = function (event) {
        // If the clicked element is THIS element OR a CHILD of this element, do nothing
        if (!$(event.target).is($element) && !$.contains($element[0], event.target)) {
          // If we're here it means an ancestor of this element was clicked. Eval
          // the clickOutside expression and remove the click handler.
          fn($scope);
          $scope.$apply();
          $document.off('click', clickOutside);
        }
      };

      // Add the click handler
      $element.on('click', function(e) {
        $document.on('click', clickOutside);
      });

      // Just in case the menu is open when the element is destroyed,
      // remove the document-level click handler
      $element.on('$destroy', function() {
        $document.off('click', clickOutside);
      });
    }
  };
});
