# angular-eha.cordova.google-analytics

[![Build Status][travis-image]][travis-url]

> Cordova-backed Google Analytics services

Provides Angular services and directives to interact with the Cordova
[google-analytics-plugin][].

[travis-image]: https://img.shields.io/travis/eHealthAfrica/angular-eha.cordova.google-analytics.svg
[travis-url]: https://travis-ci.org/eHealthAfrica/angular-eha.cordova.google-analytics
[google-analytics-plugin]: https://github.com/danwilson/google-analytics-plugin

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
      .config('ehaGoogleAnalyticsProvider', function() {
        ehaGoogleAnalyticsProvider.trackingID = 'UA-000000-01';
      });
    ```

[installed]: https://github.com/danwilson/google-analytics-plugin#installing

## Directives

### `ehaGaClick`

Add the `ehaGaClick` attribute to an element to track click events.

```html
<a eha-ga-click="label">Action</a>
```

Events are reported under `Click` category, with the element's text used as the
action. Optionally, pass a value to the directive to report as the event's
label.

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
