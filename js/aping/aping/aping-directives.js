"use strict";

var apingApp = angular.module('jtt_aping', [])
    .directive('aping', function (apingDefaultSettings) {
        return {
            restrict: 'E',
            replace: 'false',
            scope: {
                type: '@',
                items: '@',
                maxItems: '@',
            },
            link: function (scope, element, attrs) {
            },
            controller: function ($scope) {

                $scope.results = [];

                this.concatToResults = function (_array) {
                    $scope.results = $scope.results.concat(_array);
                };

                this.getAppSettings = function () {
                    return {
                        type: $scope.type || apingDefaultSettings.type,
                        items: $scope.items || apingDefaultSettings.items,
                        maxItems: $scope.maxItems || apingDefaultSettings.maxItems,
                    };
                };
            },
            templateUrl: function (elem, attrs) {
                return attrs.templateUrl || apingDefaultSettings.templateUrl;
            }
        };
    }
);



/**
 * TODO: Twitter https://github.com/pavelk2/social-feed/
 * TODO: TweeCool (twitter api) http://tweecool.com/
 * TODO: Twitter https://github.com/jublonet/codebird-js
 * TODO: Youtube Fullscreen Angular Tool: https://github.com/kanzelm3/angular-video-bg
 * TODO: Creating a Plugin System: http://taoofcode.net/creating-a-plugin-system-with-the-compile-provider/
 * TODO: parentscope: http://stackoverflow.com/a/21454647
 */