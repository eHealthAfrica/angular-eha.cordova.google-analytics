'use strict';
(function() {

  /**
   * @ngdoc decorator
   * @name ehaGaDecorator
   * @module eha.cordova.google-analytics
   */
  var ngModule = angular
                  .module('eha.cordova.google-analytics.decorator', [
                    'eha.cordova.google-analytics.provider'
                  ]);

  ngModule.config(function($provide) {
    $provide.decorator('$exceptionHandler', function($delegate, $injector) {
      var ehaGoogleAnalytics;

      return function(exception, cause) {
        $delegate(exception, cause);
        if (!(exception.message && exception.stack)) {
          return;
        }
        ehaGoogleAnalytics = ehaGoogleAnalytics ||
          $injector.get('ehaGoogleAnalytics');
        ehaGoogleAnalytics.trackEvent(
          'Exception', exception.message, exception.stack
        );
      };
    });
  });

  // Check for and export to commonjs environment
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ngModule;
  }
}());
