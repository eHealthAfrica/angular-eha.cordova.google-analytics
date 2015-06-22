# angular-eha.cordova.google-analytics

[![Build Status][travis-image]][travis-url]

> Cordova-backed Google Analytics services

Provides Angular services and directives to interact with the Cordova
[google-analytics-plugin][].

Features:

* Click tracking (via the [ehaGaClick][] directive)
* Track arbitrary events (via the [ehaGoogleAnalytics][] service)
* Exception reporting (via the [ehaGaDecorator][] decorator)
* Google Analytics [user ID][] support
* Offline support

Optional integration with [ui-router][] for zero-config page view tracking and
state change error reporting.

[travis-image]: https://img.shields.io/travis/eHealthAfrica/angular-eha.cordova.google-analytics.svg
[travis-url]: https://travis-ci.org/eHealthAfrica/angular-eha.cordova.google-analytics
[google-analytics-plugin]: https://github.com/danwilson/google-analytics-plugin
[user id]: https://support.google.com/analytics/answer/3123663
[ehaGaClick]: #ehagaclick
[ehaGoogleAnalytics]: #ehagoogleanalytics
[ehaGaDecorator]: #ehagadecorator

## Installation

Install with npm:

    npm install --save angular-eha.cordova.google-analytics

Or alternatively, with Bower:

    bower install --save angular-eha.cordova.google-analytics

## Usage

1. Ensure google-analytics-plugin is [installed][] correctly.
   `window.analytics` should be set if all's well.

2. Add `eha.cordova.google-analytics` to your app's module dependencies:

    ```js
    angular.module('app', [
      'eha.cordova.google-analytics'
    ]);
    ```

3. Pass a Google Analytics tracking ID in a `config` block:

    ```js
    angular.module('app')
      .config(function(ehaGoogleAnalyticsProvider) {
        ehaGoogleAnalyticsProvider.trackingID = 'UA-000000-01';
      });
    ```

[installed]: https://github.com/danwilson/google-analytics-plugin#installing

## Services

### `ehaGoogleAnalytics`

Exposes the `trackEvent` and `setUserId` methods from google-analytics-plugin's
[JS API][]:

* `ehaGoogleAnalytics.trackEvent('Category', 'Action', ['Label', ['Value']])`
* `ehaGoogleAnalytics.setUserId('my-user-id')`

… and adds the following event listeners:

#### `$stateChangeSuccess`

(Assumes [ui-router][] is in use).

Tracks the current screen (page view) using `state.name`.

#### `$stateNotFound`

(Assumes [ui-router][] is in use).

Tracks a `stateNotFound` event, with the action `unfoundState.to` and label
`fromState`.

[js api]: https://github.com/danwilson/google-analytics-plugin#javascript-usage
[ui-router]: http://angular-ui.github.io/ui-router/site

## Directives

### `ehaGaClick`

Add the `ehaGaClick` attribute to an element to track click events.

```html
<a eha-ga-click="label">Action</a>
```

Events are reported under `Click` category, with the element's text used as the
action. Optionally, pass a value to the directive to report as the event's
label.

## Decorators

### `ehaGaDecorator`

This decorates Angular's [$exceptionHandler][] service, reporting `Exception`
events, with the exception's message as the action and the stack trace as the event's label.

**Note**, we use a standard Google Analytics event (with the `Exception`
category) rather than the [exceptions][] method as the latter is limited to a
100 character string.

[$exceptionHandler]: https://docs.angularjs.org/api/ng/service/$exceptionHandler
[exceptions]: https://developers.google.com/analytics/devguides/collection/android/v4/exceptions

## License

Copyright 2015 Tom Vincent <git@tlvince.com>

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License.  You may obtain a copy of the
License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed
under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied.  See the License for the
specific language governing permissions and limitations under the License.
