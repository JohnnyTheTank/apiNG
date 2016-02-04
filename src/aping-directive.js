"use strict";
angular.module('jtt_aping')

    .config(['$provide', function ($provide) {

        $provide.value("apingDefaultSettings", {
            apingApiKeys: {}
        });

    }])
    .value("apingResults", {})
    .directive('aping', ['apingResults', 'apingDefaultSettings', 'apingUtilityHelper', '$templateRequest', '$compile', function (apingResults, apingDefaultSettings, apingUtilityHelper, $templateRequest, $compile) {
        return {
            restrict: 'E',
            transclude: true,
            template: '<ng-transclude></ng-transclude>',
            scope: {
                model: '@',
                getNativeData: '@',
                items: '@',
                maxItems: '@',
                orderBy: '@',
                orderReverse: '@',
                templateUrl: '@',
                payloadJson: '@',
                removeDoubles: '@',
                valueName: '@'
            },
            link: function (scope, element, attrs, controller, transcludeFn) {

                var templatePath = scope.templateUrl;

                scope.$watch('templateUrl', function () {
                    renderTemplate(scope.templateUrl);
                });

                if (angular.isUndefined(templatePath)) {
                    if (angular.isDefined(apingDefaultSettings.templateUrl)) {
                        templatePath = apingDefaultSettings.templateUrl;
                        renderTemplate(templatePath);
                    }
                }

                function renderTemplate(_templatePath) {
                    if (angular.isDefined(_templatePath) && _templatePath !== "$NONE") {
                        $templateRequest(_templatePath).then(function (html) {
                            var template = angular.element(html);
                            element.empty().append(template);
                            $compile(template)(scope);
                        });
                    } else {
                        transcludeFn(scope, function (clone, innerScope) {
                            element.append(clone);
                            $compile(clone)(innerScope);
                        });
                    }
                }

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
                    var valueName;


                    if (angular.isDefined($scope.valueName)) {
                        valueName = $scope.valueName;
                    } else {
                        valueName = undefined;
                    }

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
                        removeDoubles: removeDoubles,
                        valueName: valueName
                    };
                };

                /**
                 * merge current '$scope.results' with '_array' and sorts, limits and filters the data
                 *
                 * @param _array
                 */
                this.concatToResults = function (_array) {
                    var tempArray = $scope.results.concat(_array);

                    var appSettings = this.getAppSettings();

                    //remove doubles
                    if (appSettings.removeDoubles === true || appSettings.removeDoubles === "true") {
                        tempArray = apingUtilityHelper.removeDuplicateObjectsFromArray(tempArray, (appSettings.orderBy === false || appSettings.orderBy === "false" || appSettings.orderBy === "$NONE"));
                    }

                    //order array
                    if (angular.isDefined(appSettings.orderBy) && appSettings.orderBy !== false && appSettings.orderBy !== "false" && appSettings.orderBy !== "$NONE") {
                        //order random
                        if (appSettings.orderBy === "$RANDOM") {
                            tempArray = apingUtilityHelper.shuffleArray(tempArray);
                        }
                        //order by attribute
                        else {
                            tempArray.sort(apingUtilityHelper.sortArrayByProperty(appSettings.orderBy));
                            if (appSettings.orderReverse === true || appSettings.orderReverse === "true") {
                                //order desc
                                tempArray.reverse();
                            }
                        }
                    }
                    //crop spare
                    if (appSettings.maxItems > -1 && tempArray.length > appSettings.maxItems) {
                        tempArray = tempArray.splice(0, appSettings.maxItems);
                    }

                    if (angular.isDefined(appSettings.valueName)) {
                        apingResults[appSettings.valueName] = tempArray;
                    }

                    $scope.results = tempArray;

                    $scope.$broadcast('apiNG.resultMerged');
                };
                this.apply = function () {
                    $scope.$apply();
                };
            }]
        };
    }]);