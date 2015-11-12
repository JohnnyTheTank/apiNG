"use strict";
var apingApp = angular.module('jtt_aping', [])
    .directive('aping', function (apingDefaultSettings, apingUtilityHelper) {
        return {
            restrict: 'E',
            replace: 'false',
            scope: {
                type: '@',
                items: '@',
                maxItems: '@',
                orderBy: '@',
                orderReverse: '@',
            },
            controller: function ($scope) {
                $scope.results = [];
                this.getAppSettings = function () {
                    return {
                        type: $scope.type || apingDefaultSettings.type,
                        items: $scope.items || apingDefaultSettings.items,
                        maxItems: $scope.maxItems || apingDefaultSettings.maxItems,
                        orderBy: $scope.orderBy || apingDefaultSettings.orderBy,
                        orderReverse: $scope.orderReverse || apingDefaultSettings.orderReverse,
                    };
                };
                this.concatToResults = function (_array) {
                    $scope.results = $scope.results.concat(_array);
                    if(this.getAppSettings().orderBy) {
                        $scope.results.sort(apingUtilityHelper.sortArrayByProperty(this.getAppSettings().orderBy));
                        if(this.getAppSettings().orderReverse === true || this.getAppSettings().orderReverse == "true") {
                            $scope.results.reverse();
                        }
                    }
                    if(this.getAppSettings().maxItems > 0 && $scope.results.length > this.getAppSettings().maxItems) {
                        $scope.results = $scope.results.splice(0,this.getAppSettings().maxItems);
                    }
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
 */