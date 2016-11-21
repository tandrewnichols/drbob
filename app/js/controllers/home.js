angular.module('app').controller('HomeController', function($scope, $location) {
  $scope.init = function() {
    $scope.view = $location.search().view || 'home';
    if ($scope.view === 'info') {
      $scope.checkIsOpen();
      $scope.initMap();
    }
  };

  $scope.setView = function(view) {
    $scope.view = view;
    if (view === 'home') {
      delete $location.search().view;
    } else if ($location.search().view !== view) {
      $location.search('view', view);
    }
  };

  $scope.checkIsOpen = function() {
    if ('isInOfficeDay' in $scope) return;

    var now = moment();
    $scope.isInOfficeDay = ['Monday', 'Wednesday', 'Friday'].indexOf(now.format('dddd')) > -1;
    var time9am = now.clone().hour(9);
    var noon = now.clone().hour(12);
    var time230pm = now.clone().hour(14).minutes(30);
    var time530pm = now.clone().hour(17).minutes(30);
    $scope.isInOfficeTime = now.isBetween(time9am, noon) || now.isBetween(time230pm, time530pm);
    $scope.isOpen = $scope.isInOfficeDay && $scope.isInOfficeTime;
  };

  $scope.initMap = function() {
    var latlng = {
      lat: 40.758951,
      lng: -82.480885
    };
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: latlng
    });
    var marker = new google.maps.Marker({
      position: latlng,
      map: map
    });
  };
});
