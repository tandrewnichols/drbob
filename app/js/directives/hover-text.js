angular.module('app').directive('hoverText', function($interpolate) {
  return {
    link: function($scope, $element, $attributes) {
      var getText = function(el) {
        var text = el.attr('hover');
        return $interpolate(text)($scope);
      };

      $scope._hover = $scope._hover || {};
      $element.find('[hover]').mouseenter(function() {
        $scope._hover[ $attributes.hoverText ] = getText($(this));
        $scope.$apply();
      }).mouseleave(function() {
        if (getText($(this)) === $scope._hover[ $attributes.hoverText ]) {
          delete $scope._hover[ $attributes.hoverText ];
          $scope.$apply();
        }
      });
    }
  };
});
