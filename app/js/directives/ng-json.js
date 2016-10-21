angular.module('app').directive('ngJson', function() {
  return {
    templateUrl: 'ng-json.html',
    scope: {
      ngJson: '=ngJson',
      padding: '=',
      classes: '='
    },
    link: function($scope, $element, $attributes) {
      $scope.$element = $element;

      var stringify = function() {
        if (typeof $scope.ngJson === 'object') {
          $scope.stringify = JSON.stringify($scope.ngJson, null, '\t');
        } else {
          try {
            // Get the right spacing this way
            $scope.stringify = JSON.stringify(JSON.parse($scope.ngJson), null, '\t');
          } catch (e) {
            $scope.stringify = $scope.ngJson;
          }
        }
      };

      stringify();
      var unregister = $scope.$watch('ngJson', function() {
        stringify();
        $scope.json = $scope.stringify
          .replace(/"(.+?)":/g, '$1:')
          .replace(/"([^"]+?)"/g, '"<span class="text-info">$1</span>"')
          .replace(/(null)(?!["<])/g, '<span class="text-muted">null</span>')
          .replace(/(true|false)(?!["<])/g, '<span class="text-danger">$1</span>')
          .replace(/(\d+)(?!["<\w])/g, '<span class="text-warning">$1</span>')
          .replace(/\n/g, '<br>')
          .replace(/\t/g, '<span class="mlm"></span>');
      });

      $element.on('$destroy', function() {
        unregister();
        $element.off('$destroy');
        $scope.$destroy();
      });
    }
  };
});
