angular.module('app').factory('Screen', function($rootScope) {
  var isVisible = function(cls) {
    // Create a span with the "visible-??" class
    var span = $('<span/>', { id: 'screen-checker', 'class': cls });
    // Add it at the bottom of the page
    $('body').append(span);
    // See if it's visible
    var visible = $('#screen-checker').is(':visible');
    // Remove it
    $('#screen-checker').remove();
    // Return the visiblity
    return visible;
  };


  var calculateSizes = function() {
    // Set as properties rather than an object, so we can keep
    // the same reference so it continues working everywhere.
    sizes.isXs = isVisible('visible-xs');
    sizes.isSm = isVisible('visible-sm');
    sizes.isMd = isVisible('visible-md');
    sizes.isLg = isVisible('visible-lg');
    sizes.isMobile = Boolean(sizes.isXs || sizes.isSm);
    sizes.isDesktop = Boolean(sizes.isMd || sizes.isLg);
    sizes.isNotXs = Boolean(!sizes.isXs);
    sizes.isNotSm = Boolean(!sizes.isSm);
    sizes.isNotMd = Boolean(!sizes.isMd);
    sizes.isNotLg = Boolean(!sizes.isLg);
    // Just for completeness, even though they're somewhat redundant
    sizes.isNotMobile = sizes.isDesktop;
    sizes.isNotDesktop = sizes.isMobile;
  };

  // Create the sizes object once
  var sizes = {
    calculateSizes: calculateSizes,
    isVisible: isVisible
  };

  // On resize, recalculate. Things that have injected Screen
  // should pick up the changes, since it's still the same object.
  $(window).on('resize', _.throttle(function() {
    sizes.calculateSizes();
    $rootScope.$apply();
  }, 500, true));

  // Calculate on initialization and return
  calculateSizes();
  return sizes;
});
