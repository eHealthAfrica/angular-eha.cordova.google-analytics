'use strict';

describe('eha.cordova.google-analytics', function() {
  it('should be configurable', function() {
    var $window;
    var uuid = 'super';
    var trackingID = 'dooper';

    module(function($provide) {
      $window = {
        analytics: {
          startTrackerWithId: angular.noop,
          setUserId: angular.noop
        }
      };

      spyOn($window.analytics, 'startTrackerWithId');
      spyOn($window.analytics, 'setUserId');

      $provide.value('$window', $window);
    });

    module('eha.cordova.google-analytics', function(ehaGoogleAnalyticsProvider) {
      ehaGoogleAnalyticsProvider.uuid = uuid;
      ehaGoogleAnalyticsProvider.trackingID = trackingID;
    });

    inject(function(ehaGoogleAnalytics) {
      expect(ehaGoogleAnalytics.trackEvent).toBeUndefined();

      expect($window.analytics.startTrackerWithId)
        .toHaveBeenCalledWith(trackingID);

      expect($window.analytics.setUserId)
        .toHaveBeenCalledWith(uuid);
    });
  });
});
