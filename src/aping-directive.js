"use strict";
var apingApp = angular.module('jtt_aping', [])
    .directive('aping', ['apingDefaultSettings', 'apingUtilityHelper', function (apingDefaultSettings, apingUtilityHelper) {
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
            controller: ['$scope', function ($scope) {
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
                    $scope.$broadcast('resultMerged');
                };
                this.apply = function () {
                    $scope.$apply();
                };

                $scope.$on('apiNG.load.more', function(ev, args){
                    console.log('apiNG.load.more fired');
                    console.log(ev);
                    console.log(args);
                });

            }],
            templateUrl: function (elem, attrs) {
                return attrs.templateUrl || apingDefaultSettings.templateUrl;
            }
        };
    }
    ]);