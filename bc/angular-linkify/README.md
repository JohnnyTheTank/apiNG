# angular-linkify

Angular filter, directive, and service to linkify text. As of **v0.3.0**, angular-linkify works for twitter/github mentions, twitter hashtags, and basic urls.

## Install

```
bower install angular-linkify --save
```

## Usage

Inject module into your application

```javascript
angular.module('YourApp', ['linkify']);
```

Use as a [AngularJS Directive](http://docs.angularjs.org/guide/directive)

```html
<!-- As a directive, no twitter -->
<div ng-bind="someModel" linkify></div>

<!-- As a directive, with twitter parsing -->
<div ng-bind="someModel" linkify="twitter"></div>
```

Inject as a [AngularJS Service](http://docs.angularjs.org/guide/dev_guide.services)

```javascript
// Injected into controller
angular.module('someModule').controller('SomeCtrl', function ($scope, linkify, $sce) {
  var text = "@scottcorgan and http://github.com";
  
  // Twitter
  // Must use $sce.trustAsHtml() as of Angular 1.2.x
  $scope.text = $sce.trustAsHtml(linkify.twitter(text));
  // outputs: <a href="https://twitter.com/scottcorgan" target="_blank">scottcorgan</a> and <a href="http://github.com" target="_blank">http://github.com</a>
  
  // Github
  // Must use $sce.trustAsHtml() as of Angular 1.2.x
  $scope.text = $sce.trustAsHtml(linkify.github(text));
  // outputs: <a href="https://github.com/scottcorgan" target="_blank">scottcorgan</a> and <a href="http://github.com" target="_blank">http://github.com</a>
  
});

```

## Build

```
grunt
```
