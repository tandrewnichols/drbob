angular.module('app').directive('surrogate', function() {
  return {
    link: function($scope, $element, $attributes) {
      var surrogate = $attributes.surrogate;
      var evt = $attributes.surrogateEvent || 'click';
      var trigger = $attributes.surrogateTrigger || 'click';
      $element.on(evt, function() {
        $(surrogate)[trigger]();
      });
    }
  };
});
