'use strict';
describe('eha.cordova.google-analytics.directive', function() {
  it('should track click events', function() {
    var element;
    var ehaGoogleAnalytics;

    module('eha.cordova.google-analytics.directive');
    module(function($provide) {
      ehaGoogleAnalytics = {
        trackEvent: angular.noop
      };
      spyOn(ehaGoogleAnalytics, 'trackEvent');
      $provide.value('ehaGoogleAnalytics', ehaGoogleAnalytics);
    });

    inject(function($rootScope, $compile) {
      element = angular.element(
        '<a eha-ga-click="home">Navigate home</a>'
      );
      element = $compile(element)($rootScope.$new());
    });

    element.triggerHandler('click');
    expect(ehaGoogleAnalytics.trackEvent)
      .toHaveBeenCalledWith('Click', 'Navigate home', 'home');
  });
});
