'use strict';

angular.module('jtt_aping_ng_array', [])
    .directive('apingNgArray', ['apingUtilityHelper', function (apingUtilityHelper) {
        return {
            require: '?aping',
            restrict: 'A',
            replace: 'false',
            link: function (scope, element, attrs, apingController) {

                var appSettings = apingController.getAppSettings();
                var requests = apingUtilityHelper.parseJsonFromAttributes(attrs.apingNgArray, 'ngArray', appSettings);

                requests.forEach(function (request) {

                    if (request.name && scope[request.name]) {

                        if (angular.isUndefined(request.items)) {
                            request.items = appSettings.items;
                        }
                        if (request.items === 0 || request.items === '0') {
                            return false;
                        }

                        // -1 is 'no explicit limit'. same for NaN value
                        if (request.items < 0 || isNaN(request.items)) {
                            request.items = undefined;
                        }

                        var resultArray = [];

                        if (scope[request.name].constructor === Array) {
                            resultArray = scope[request.name];
                            if (angular.isDefined(request.orderBy)) {
                                if (request.orderBy === '$RANDOM') {
                                    resultArray = apingUtilityHelper.shuffleArray(resultArray);
                                } else {
                                    resultArray.sort(apingUtilityHelper.sortArrayByProperty(request.orderBy));
                                }
                            }
                            //order desc
                            if (angular.isDefined(request.orderReverse) && request.orderReverse === true && request.orderBy !== '$RANDOM') {
                                resultArray.reverse();
                            }

                            if (angular.isDefined(request.items)) {
                                //crop spare
                                if (request.items > 0 && resultArray.length > request.items) {
                                    resultArray = resultArray.splice(0, request.items);
                                }
                            }

                        } else if (typeof scope[request.name] === 'object' && scope[request.name] !== null) {
                            resultArray.push(scope[request.name]);
                        }

                        if (resultArray.length > 0) {
                            apingController.concatToResults(resultArray);
                        }
                    }
                });
            }
        }
    }]);