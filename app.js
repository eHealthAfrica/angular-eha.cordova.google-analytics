'use strict';

// Stub `window.analytics` for the purposes of this demo. Usually, you'd be
// running `eha.google.google-analytics` in a Cordova environment via:
// https://github.com/danwilson/google-analytics-plugin
window.analytics = {
  startTrackerWithId: console.log.bind(console, 'tracker ID:'),
  trackEvent: console.log.bind(console, 'event:'),
  setUserId: console.log.bind(console, 'user ID:')
};

angular.module('app', [
  'eha.cordova.google-analytics'
])
  .constant('config', {
    // Your Google Analytics tracking ID, see:
    // https://support.google.com/analytics/answer/1032385?hl=en
    trackingID: 'UA-000000-01'
  })
  .service('user', function($q, $timeout) {
    this.id = function() {
      var deferred = $q.defer();
      function promise() {
        return deferred.resolve({
          id: 'tlvince'
        });
      }
      $timeout(promise, 1000);
      return deferred.promise;
    };
    this.login = function() {
      throw new Error('method unimplemented');
    };
  })
  .config(function(ehaGoogleAnalyticsProvider, config) {
    ehaGoogleAnalyticsProvider.trackingID = config.trackingID;
  })
  .run(function(user, ehaGoogleAnalytics) {
    function setUUID(user) {
      ehaGoogleAnalytics.setUserId(user.id);
    }
    user.id().then(setUUID);
  })
  .controller('ctrl', function($scope, ehaGoogleAnalytics, user) {
    $scope.trackEvent = function() {
      ehaGoogleAnalytics.trackEvent('category', 'action', 'label');
    };
    $scope.trackException = function() {
      user.login();
    };
  });
