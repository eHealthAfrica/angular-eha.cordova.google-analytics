'use strict';
(function() {

  var ngModule = angular.module('eha.cordova.google-analytics', [
    'eha.cordova.google-analytics.provider',
    'eha.cordova.google-analytics.directive'
  ]);

  // Check for and export to commonjs environment
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ngModule;
  }

}());
