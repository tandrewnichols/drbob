angular.module('app').directive('hoverToggle', function() {
  return {
    link: function($scope, $element, $attributes) {
      $element.on('mouseenter', function() {
        _.set($scope, 'state.hover.' + $attributes.hoverToggle, true);
        $scope.$apply();
      }).on('mouseleave', function() {
        _.set($scope, 'state.hover.' + $attributes.hoverToggle, false);
        $scope.$apply();
      });
    }
  };
});
