angular.module('app').controller('HomeController', function($scope, $location, $interval) {
  $scope.slides = [
    {
      image: 'front',
      caption: 'View from the Road'
    },
    {
      image: 'outside',
      caption: 'Entry Way'
    },
    {
      image: 'waiting-room',
      caption: 'Waiting Room'
    },
    {
      image: 'products-shelf',
      caption: 'Nutritional Products'
    },
    {
      image: 'room-red',
      caption: 'Patient Room 1'
    },
    {
      image: 'room-blue',
      caption: 'Patient Room 2'
    },
    {
      image: 'room-white',
      caption: "You don't want to have to need this room"
    },
    {
      image: 'xray',
      caption: 'X-ray Machine'
    },
    {
      image: 'degrees',
      caption: 'Credentials'
    }
  ];

  $scope.family = [
    {
      image: 'wife',
      caption: 'Melanie'
    },
    {
      image: 'son',
      caption: 'Jim'
    },
    {
      image: 'grandkids1',
      caption: 'Natalie'
    },
    {
      image: 'grandkids2',
      caption: 'Natalie and Asher'
    },
    {
      image: 'grandkids3',
      caption: 'Asher'
    },
    {
      image: 'grandkids4',
      caption: 'Natalie and Jack'
    },
    {
      image: 'grandkids5',
      caption: 'Clara'
    }
  ];

  $scope.init = function() {
    var path = $location.path();
    $scope.view = path === '/' ? 'home' : path.substring(1);
    if ($scope.view === 'info') {
      $scope.checkIsOpen();
      $scope.initMap();
    }
  };

  $scope.setView = function(view) {
    $scope.view = view;
  };

  $scope.checkIsOpen = function() {
    // Only do these calculations the first time
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
    // Only load the map the first time
    if ($scope._mapInited) return;

    // If the google script has already loaded, create the map now.
    if (window.google && window.google.maps) {
      $scope.createMap();
    } else {
      // Otherwise, poll for it to be done and then create the map.
      var interval = $interval(function() {
        if (window.google && window.google.maps) {
          $scope.createMap();
          $interval.cancel(interval);
        }
      }, 50);
    }
  };

  $scope.createMap = function() {
    var latlng = {
      lat: 40.758951,
      lng: -82.480885
    };
    [].forEach.call(document.getElementsByClassName('google-map'), function(element) {
      var map = new google.maps.Map(element, {
        zoom: 15,
        center: latlng
      });
      var marker = new google.maps.Marker({
        position: latlng,
        map: map
      });
    });
    $scope._mapInited = true;
  };
});
