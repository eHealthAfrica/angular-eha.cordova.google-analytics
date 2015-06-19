'use strict';
(function() {

  /**
   * @ngdoc provider
   * @name ehaGoogleAnalytics
   * @module eha.cordova.google-analytics
   */
  var ngModule = angular
                  .module('eha.cordova.google-analytics.provider', []);

  function ehaGoogleAnalytics() {
    var self = this;

    this.uuid = '';
    this.trackingID = '';

    this.$get = function($log, $window, $rootScope) {
      function GoogleAnalytics(trackingID, uuid) {
        function registerListeners() {
          function trackView(event, state) {
            $window.analytics.trackView(state.name);
          }
          function trackStateNotFound(event, unfoundState, fromState) {
            $window.analytics.trackEvent(
              'stateNotFound', unfoundState.to, fromState
            );
          }
          $rootScope.$on('$stateChangeSuccess', trackView);
          $rootScope.$on('$stateNotFound', trackStateNotFound);
        }

        this.trackEvent = angular.noop;

        if ($window.analytics) {
          $window.analytics.startTrackerWithId(trackingID);
          $window.analytics.setUserId(uuid);
          registerListeners();
          this.trackEvent = $window.analytics.trackEvent;
        }
      }

      return new GoogleAnalytics(self.trackingID, self.uuid);
    };
  }

  ngModule.provider('ehaGoogleAnalytics', ehaGoogleAnalytics);

  // Check for and export to commonjs environment
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ngModule;
  }
}());
