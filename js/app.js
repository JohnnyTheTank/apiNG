"use strict";

var app = angular.module('app', ['events', 'aping']);

app.run(function () {
    FastClick.attach(document.body);
});

/**
 * TODO: Tutorial lesen
 * http://www.sitepoint.com/practical-guide-angularjs-directives/
 */
