"use strict";
var apingApp = angular.module('jtt_aping', ['jtt_aping_jsonloader', 'jtt_aping_ng_array'])

    .config(['$provide', function ($provide) {

        $provide.value("apingDefaultSettings", {
            apingApiKeys: {}
        });


    }])
    .directive('aping', ['apingDefaultSettings', 'apingUtilityHelper', function (apingDefaultSettings, apingUtilityHelper) {
        return {
            restrict: 'E',
            replace: 'false',
            scope: {
                model: '@',
                getNativeData: '@',
                items: '@',
                maxItems: '@',
                orderBy: '@',
                orderReverse: '@',
                templateUrl: '@',
                payloadJson: '@',
                removeDoubles: '@'
            },
            controller: ['$scope', function ($scope) {
                $scope.results = [];
                $scope.payload = $scope.payloadJson ? apingUtilityHelper.replaceSingleQuotesAndParseJson($scope.payloadJson) : {};

                /**
                 * return current appSettings by merging 'apingDefaultSettings' and '$scope params'
                 * @returns {Object}
                 */
                this.getAppSettings = function () {

                    var items;
                    var maxItems;
                    var getNativeData;
                    var orderReverse;
                    var orderBy;
                    var removeDoubles;

                    if (typeof $scope.items !== "undefined") {
                        items = $scope.items;
                    } else if (typeof apingDefaultSettings.items !== "undefined") {
                        items = apingDefaultSettings.items;
                    } else {
                        items = undefined;
                    }

                    if (typeof $scope.maxItems !== "undefined") {
                        maxItems = $scope.maxItems;
                    } else if (typeof apingDefaultSettings.maxItems !== "undefined") {
                        maxItems = apingDefaultSettings.maxItems;
                    } else {
                        maxItems = undefined;
                    }

                    if (typeof $scope.getNativeData !== "undefined") {
                        getNativeData = $scope.getNativeData;
                    } else if (typeof apingDefaultSettings.getNativeData !== "undefined") {
                        getNativeData = apingDefaultSettings.getNativeData;
                    } else {
                        getNativeData = false;
                    }

                    if (typeof $scope.maxItems !== "undefined") {
                        maxItems = $scope.maxItems;
                    } else if (typeof apingDefaultSettings.maxItems !== "undefined") {
                        maxItems = apingDefaultSettings.maxItems;
                    } else {
                        maxItems = undefined;
                    }

                    if (typeof $scope.orderBy !== "undefined") {
                        orderBy = $scope.orderBy;
                    } else if (typeof apingDefaultSettings.orderBy !== "undefined") {
                        orderBy = apingDefaultSettings.orderBy;
                    } else {
                        orderBy = "undefined";
                    }

                    if (typeof $scope.orderReverse !== "undefined") {
                        orderReverse = $scope.orderReverse;
                    } else if (typeof apingDefaultSettings.orderReverse !== "undefined") {
                        orderReverse = apingDefaultSettings.orderReverse;
                    } else {
                        orderReverse = false;
                    }

                    if (typeof $scope.removeDoubles !== "undefined") {
                        removeDoubles = $scope.removeDoubles;
                    } else if (typeof apingDefaultSettings.removeDoubles !== "undefined") {
                        removeDoubles = apingDefaultSettings.removeDoubles;
                    } else {
                        removeDoubles = false;
                    }

                    return {
                        model: $scope.model || apingDefaultSettings.model || "native",
                        getNativeData: getNativeData,
                        items: items,
                        maxItems: maxItems,
                        orderBy: orderBy,
                        orderReverse: orderReverse,
                        removeDoubles: removeDoubles
                    };
                };

                /**
                 * merge current '$scope.results' with '_array' and do some operations
                 *
                 * @param _array
                 */
                this.concatToResults = function (_array) {
                    $scope.results = $scope.results.concat(_array);

                    var appSettings = this.getAppSettings();

                    if (appSettings.removeDoubles === true || appSettings.removeDoubles === "true") {
                        $scope.results = apingUtilityHelper.removeDuplicateObjectsFromArray($scope.results, (appSettings.orderBy === false || appSettings.orderBy === "false" || appSettings.orderBy === "$NONE"));
                    }

                    if (appSettings.orderBy !== "undefined" && appSettings.orderBy !== false && appSettings.orderBy !== "false" && appSettings.orderBy !== "$NONE") {
                        if (appSettings.orderBy === "$RANDOM") {
                            $scope.results = apingUtilityHelper.shuffleArray($scope.results);
                        } else {
                            $scope.results.sort(apingUtilityHelper.sortArrayByProperty(appSettings.orderBy));
                            if (appSettings.orderReverse === true || appSettings.orderReverse === "true") {
                                $scope.results.reverse();
                            }
                        }
                    }
                    if (appSettings.maxItems > -1 && $scope.results.length > appSettings.maxItems) {
                        $scope.results = $scope.results.splice(0, appSettings.maxItems);
                    }
                    $scope.$broadcast('apiNG.resultMerged');
                };
                this.apply = function () {
                    $scope.$apply();
                };
            }],
            templateUrl: function (elem, scope) {
                return scope.templateUrl || apingDefaultSettings.templateUrl;
            }
        };
    }]);

