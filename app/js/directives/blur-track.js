angular.module('app').directive('blurTrack', function() {
  return {
    link: function($scope, $element, $attributes) {
      var form = $attributes.name;
      $element.find('input[ng-model], textarea[ng-model]').each(function(index, input) {
        var $input = angular.element(input);
        var name = $input.attr('name');
        $input.on('focus', function(event) {
          $scope[form][name].$blurred = false;
          $scope.$apply();
        });
        $input.on('blur', function(event) {
          $scope[form][name].$blurred = true;
          $scope.$apply();
        });
      });
    }
  };
});
