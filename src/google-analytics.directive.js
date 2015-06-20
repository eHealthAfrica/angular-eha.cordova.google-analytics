'use strict';
(function() {

  /**
   * @ngdoc directive
   * @name ehaGaClick
   * @module eha.cordova.google-analytics
   */
  var ngModule = angular
                  .module('eha.cordova.google-analytics.directive', [
                    'eha.cordova.google-analytics.provider'
                  ]);

  ngModule.directive('ehaGaClick', function(ehaGoogleAnalytics) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        function trackClick() {
          ehaGoogleAnalytics.trackEvent(
            'Click', element.text().trim(), attrs.ehaGaClick.trim()
          );
        }
        element.on('click', trackClick);
      }
    };
  });

  // Check for and export to commonjs environment
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ngModule;
  }
}());
