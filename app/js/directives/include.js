angular.module('app').directive('include', function($templateCache, $compile) {
  return {
    link: function($scope, $element, $attributes) {
      // Watch for changes, in case "include" is a variable or expression
      $scope.$watch($attributes.include, function(newVal, oldVal) {
        if (newVal) {
          // Load the template via templateCache
          var tmpl = $templateCache.get(newVal); 
          // Replace the contents of the element with the new template
          $element.empty().append($compile(tmpl)($scope));
        }
      });
    }
  };
});
