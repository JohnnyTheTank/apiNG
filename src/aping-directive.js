"use strict";
angular.module('jtt_aping')

    .config(['$provide', function ($provide) {

        $provide.value("apingDefaultSettings", {
            apingApiKeys: {}
        });

    }])
    .directive('aping', ['apingDefaultSettings', 'apingUtilityHelper', '$templateRequest', '$compile', function (apingDefaultSettings, apingUtilityHelper, $templateRequest, $compile) {
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
            link: function (scope, element, attrs) {
                $templateRequest(scope.templateUrl || apingDefaultSettings.templateUrl).then(function (html) {
                    var template = angular.element(html);
                    element.append(template);
                    $compile(template)(scope);
                });
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

                    if (angular.isDefined($scope.items)) {
                        items = $scope.items;
                    } else if (angular.isDefined(apingDefaultSettings.items)) {
                        items = apingDefaultSettings.items;
                    } else {
                        items = undefined;
                    }

                    if (angular.isDefined($scope.maxItems)) {
                        maxItems = $scope.maxItems;
                    } else if (angular.isDefined(apingDefaultSettings.maxItems)) {
                        maxItems = apingDefaultSettings.maxItems;
                    } else {
                        maxItems = undefined;
                    }

                    if (angular.isDefined($scope.getNativeData)) {
                        getNativeData = $scope.getNativeData;
                    } else if (angular.isDefined(apingDefaultSettings.getNativeData)) {
                        getNativeData = apingDefaultSettings.getNativeData;
                    } else {
                        getNativeData = false;
                    }

                    if (angular.isDefined($scope.maxItems)) {
                        maxItems = $scope.maxItems;
                    } else if (angular.isDefined(apingDefaultSettings.maxItems)) {
                        maxItems = apingDefaultSettings.maxItems;
                    } else {
                        maxItems = undefined;
                    }

                    if (angular.isDefined($scope.orderBy)) {
                        orderBy = $scope.orderBy;
                    } else if (angular.isDefined(apingDefaultSettings.orderBy)) {
                        orderBy = apingDefaultSettings.orderBy;
                    } else {
                        orderBy = undefined;
                    }

                    if (angular.isDefined($scope.orderReverse)) {
                        orderReverse = $scope.orderReverse;
                    } else if (angular.isDefined(apingDefaultSettings.orderReverse)) {
                        orderReverse = apingDefaultSettings.orderReverse;
                    } else {
                        orderReverse = false;
                    }

                    if (angular.isDefined($scope.removeDoubles)) {
                        removeDoubles = $scope.removeDoubles;
                    } else if (angular.isDefined(apingDefaultSettings.removeDoubles)) {
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
                 * merge current '$scope.results' with '_array' and sorts, limits and filters the data
                 *
                 * @param _array
                 */
                this.concatToResults = function (_array) {
                    $scope.results = $scope.results.concat(_array);

                    var appSettings = this.getAppSettings();

                    if (appSettings.removeDoubles === true || appSettings.removeDoubles === "true") {
                        $scope.results = apingUtilityHelper.removeDuplicateObjectsFromArray($scope.results, (appSettings.orderBy === false || appSettings.orderBy === "false" || appSettings.orderBy === "$NONE"));
                    }

                    if (angular.isDefined(appSettings.orderBy) && appSettings.orderBy !== false && appSettings.orderBy !== "false" && appSettings.orderBy !== "$NONE") {
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
            }]
        };
    }]);