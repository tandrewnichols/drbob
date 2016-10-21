angular.module('app').directive('when', function() {
  return {
    link: function($scope, $element, $attributes) {
      var element = ($attributes.on && !$attributes.thenTrigger) ? angular.element($attributes.on) : $element;
      element.on($attributes.when, function() {
        if ($attributes.then) {
          $scope.$eval($attributes.then);
          $scope.$apply();
        } else if ($attributes.thenTrigger) {
          angular.element($attributes.on).trigger($attributes.thenTrigger);
          $scope.$apply();
        }
      });
    }
  };
});
