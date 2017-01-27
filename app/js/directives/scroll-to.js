angular.module('app').directive('scrollTo', function($timeout) {
  return {
    restrict: 'A',
    link: function($scope, $element, $attributes) {
      $element.on('click', function() {
        $($attributes.scrollTo).smoothScroll();
      });
    }
  };
});
