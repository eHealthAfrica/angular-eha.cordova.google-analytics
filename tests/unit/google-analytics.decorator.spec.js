'use strict';
describe('eha.cordova.google-analytics.decorator', function() {
  it('should track exceptions', function() {
    var ehaGoogleAnalytics;

    module('eha.cordova.google-analytics.decorator');
    module(function($provide) {
      ehaGoogleAnalytics = {
        trackEvent: angular.noop
      };
      spyOn(ehaGoogleAnalytics, 'trackEvent');
      $provide.value('ehaGoogleAnalytics', ehaGoogleAnalytics);
    });
    module(function($exceptionHandlerProvider) {
      $exceptionHandlerProvider.mode('log');
    });

    inject(function($timeout) {
      function error() {
        throw new Error('eha');
      }
      $timeout(error);
      $timeout.flush();

      expect(ehaGoogleAnalytics.trackEvent).toHaveBeenCalledWith(
        'Exception', 'eha', jasmine.stringMatching(/^Error: eha/)
      );
    });
  });
});
