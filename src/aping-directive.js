"use strict";
var apingApp = angular.module('jtt_aping', [])
    .directive('aping', ['apingDefaultSettings', 'apingUtilityHelper', function (apingDefaultSettings, apingUtilityHelper) {
        return {
            restrict: 'E',
            replace: 'false',
            scope: {
                model: '@',
                items: '@',
                maxItems: '@',
                orderBy: '@',
                orderReverse: '@',
                params: '@',
            },
            controller: ['$scope', function ($scope) {
                $scope.results = [];
                $scope.parsedParams = $scope.params ? apingUtilityHelper.replaceSingleQuotesAndParseJson($scope.params) : {};
                this.getAppSettings = function () {
                    return {
                        model: $scope.model || apingDefaultSettings.model || "custom",
                        items: $scope.items || apingDefaultSettings.items,
                        maxItems: $scope.maxItems || apingDefaultSettings.maxItems,
                        orderBy: $scope.orderBy || apingDefaultSettings.orderBy,
                        orderReverse: $scope.orderReverse || apingDefaultSettings.orderReverse,
                    };
                };
                this.concatToResults = function (_array) {
                    $scope.results = $scope.results.concat(_array);

                    var appSettings = this.getAppSettings();

                    if(appSettings.orderBy && appSettings.orderBy != "$NONE") {
                        if(appSettings.orderBy == "$RANDOM") {
                            $scope.results = apingUtilityHelper.shuffleArray($scope.results);
                        } else {
                            $scope.results.sort(apingUtilityHelper.sortArrayByProperty(appSettings.orderBy));
                            if(appSettings.orderReverse === true || appSettings.orderReverse === "true") {
                                $scope.results.reverse();
                            }
                        }
                    }
                    if(appSettings.maxItems > -1 && $scope.results.length > appSettings.maxItems) {
                        $scope.results = $scope.results.splice(0,appSettings.maxItems);
                    }
                    $scope.$broadcast('apiNG.resultMerged');
                };
                this.apply = function () {
                    $scope.$apply();
                };
            }],
            templateUrl: function (elem, attrs) {
                return attrs.templateUrl || apingDefaultSettings.templateUrl;
            }
        };
    }
    ]);