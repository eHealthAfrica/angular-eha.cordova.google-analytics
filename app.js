'use strict';

angular.module('app', [
  'eha.cordova.google-analytics'
])
  .constant('config', {
    trackingID: 'UA-000000-01'
  })
  .factory('user', function($q, $timeout) {
    return function() {
      var deferred = $q.defer();
      function promise() {
        return deferred.resolve({
          id: 'tlvince'
        });
      }
      $timeout(promise, 1000);
      return deferred.promise;
    }
  })
  .config(function(ehaGoogleAnalyticsProvider, config) {
    ehaGoogleAnalyticsProvider.trackingID = config.trackingID;
  })
  .run(function(user, ehaGoogleAnalytics) {
    function setUUID(user) {
      ehaGoogleAnalytics.setUserId(user.id);
    }
    user().then(setUUID);
  })
  .controller('ctrl', function($scope, ehaGoogleAnalytics) {
    $scope.click = function() {
      ehaGoogleAnalytics.trackEvent('category', 'action', 'label');
    };
  });
