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

                    if (this.getAppSettings().orderBy) {
                        $scope.results.sort(apingUtilityHelper.sortArrayByProperty(this.getAppSettings().orderBy));
                        if (this.getAppSettings().orderReverse === true || this.getAppSettings().orderReverse === "true") {
                            $scope.results.reverse();
                        }
                    }
                    if (this.getAppSettings().maxItems > -1 && $scope.results.length > this.getAppSettings().maxItems) {
                        $scope.results = $scope.results.splice(0, this.getAppSettings().maxItems);
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