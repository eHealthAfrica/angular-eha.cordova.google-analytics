'use strict';

describe('eha.cordova.google-analytics', function() {
  it('should be configurable', function() {
    var $window;
    var trackingID = 'dooper';

    module(function($provide) {
      $window = {
        analytics: {
          startTrackerWithId: angular.noop
        }
      };

      spyOn($window.analytics, 'startTrackerWithId');

      $provide.value('$window', $window);
    });

    module('eha.cordova.google-analytics', function(ehaGoogleAnalyticsProvider) {
      ehaGoogleAnalyticsProvider.trackingID = trackingID;
    });

    inject(function(ehaGoogleAnalytics) {
      expect(ehaGoogleAnalytics.trackEvent).toBeUndefined();

      expect($window.analytics.startTrackerWithId)
        .toHaveBeenCalledWith(trackingID);
    });
  });
});
