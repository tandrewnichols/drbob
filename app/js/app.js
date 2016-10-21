angular.module('app', ['ngAnimate','ngRoute','ngResource','ngSanitize','ui.router','frapontillo.bootstrap-switch','ui.bootstrap']).run(function($rootScope, $timeout, $window, config, $state) {
  // Set cookie defaults so we don't have to do this in every controller
  Cookies.defaults = { path: '/', domain: config.cookieDomain };
  $rootScope.state = $state;

  $rootScope.log = function() {
    console.log.apply(console, arguments);
  };

  $rootScope.alert = function(thing) {
    alert(thing);
  };

  $rootScope.encode = function(url) {
    return encodeURIComponent(decodeURIComponent(url));
  };

  $rootScope.reloadPage = function() {
    window.location.reload();
  };

  $rootScope.open = function() {
    window.open.apply(null, arguments);
  };

  $rootScope.navigate = function(where) {
    window.location.href = where;
  };

  $rootScope.getNavigateFn = function(url) {
    return function() {
      $rootScope.navigate(url);
    };
  };

  // Run a function after this digest cycle completes
  $rootScope.afterDigest = function(deferred) {
    $timeout(deferred, 0); 
  };

  $rootScope.patterns = {
    email: /^([a-zA-Z0-9_\.\-+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,50})$/,
    url: /^(https?:\/\/)?[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+([a-zA-Z0-9_\.\/-?=&%#+-]+)?$/,
    phone: /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([0-9]{3})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/,
    phoneNoExt: /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([0-9]{3})\s*(?:[.-]\s*)?([0-9]{4})$/,
    password: /.{6,}/,
    zip: /[0-9]{5,5}/,
    time: /^[0-9]{2,2}:[0-9]{2,2}:[0-9]{2,2}$/,
    currency: /^[1-9][0-9]*(\.[0-9]{2})?$/,
    poBox: /^((?!p[\.\s]*o[\.\s]*[\s]*box).)*$/i,
    names: /^[A-Za-z- ]+$/
  };
});
