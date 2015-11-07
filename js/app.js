"use strict";

var app = angular.module('app', ['events', 'jtt_aping']);

app.run(function () {
    FastClick.attach(document.body);
});

/**
 * TODO: Tutorial lesen http://www.sitepoint.com/practical-guide-angularjs-directives/
 * TODO: Jedes Modul soll seine eigene Abhängigkeiten verwalten
 */
