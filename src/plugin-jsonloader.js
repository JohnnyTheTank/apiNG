"use strict";

angular.module("jtt_aping_jsonloader", [])
    .directive('apingJsonloader', ['apingUtilityHelper', 'jsonloaderFactory', function (apingUtilityHelper, jsonloaderFactory) {
        return {
            require: '?aping',
            restrict: 'A',
            replace: 'false',
            link: function (scope, element, attrs, apingController) {

                var appSettings = apingController.getAppSettings();
                var requests = apingUtilityHelper.parseJsonFromAttributes(attrs.apingJsonloader, "jsonloader", appSettings);

                requests.forEach(function (request) {
                    if (request.path) {
                        //create requestObject for factory function call
                        var requestObject = {
                            path: request.path,
                        };

                        if (!request.format || request.format.toLowerCase() !== "jsonp") {
                            requestObject.format = "json";
                        } else {
                            requestObject.format = "jsonp";
                        }

                        if (angular.isUndefined(request.items)) {
                            request.items = appSettings.items;
                        }

                        if (request.items === 0 || request.items === '0') {
                            return false;
                        }

                        // -1 is "no explicit limit". same for NaN value
                        if (request.items < 0 || isNaN(request.items)) {
                            request.items = undefined;
                        }

                        if (angular.isDefined(request.orderBy) && !angular.isString(request.orderBy)) {
                            request.orderBy = undefined;
                        }

                        if (angular.isDefined(request.orderReverse) && (request.orderReverse === true || request.orderReverse === 'true')) {
                            request.orderReverse = true;
                        }
                        jsonloaderFactory.getJsonData(requestObject)
                            .then(function (_data) {
                                var resultArray = [];
                                if (_data.data) {

                                    var results = _data.data;

                                    if (angular.isDefined(request.resultProperty)) {
                                        results = apingUtilityHelper.getValueFromObjectByPropertyString(results, request.resultProperty, false);
                                    }

                                    if (results.constructor !== Array) {
                                        resultArray.push(results);
                                    } else {
                                        angular.extend(resultArray, results);

                                        if (angular.isDefined(request.orderBy)) {
                                            if (request.orderBy === "$RANDOM") {
                                                resultArray = apingUtilityHelper.shuffleArray(resultArray);
                                            } else {
                                                resultArray.sort(apingUtilityHelper.sortArrayByProperty(request.orderBy));
                                            }
                                        }
                                        //order desc
                                        if (angular.isDefined(request.orderReverse) && request.orderReverse === true && request.orderBy !== "$RANDOM") {
                                            resultArray.reverse();
                                        }

                                        if (angular.isUndefined(request.items)) {
                                            resultArray = results;
                                        } else {
                                            //crop spare
                                            if (request.items > 0 && resultArray.length > request.items) {
                                                resultArray = resultArray.splice(0, request.items);
                                            }
                                        }
                                    }
                                }
                                apingController.concatToResults(resultArray);
                            });
                    }
                });
            }
        }
    }])
    .factory('jsonloaderFactory', ['$http', function ($http) {
        var jsonloaderFactory = {};

        jsonloaderFactory.getJsonData = function (_requestObject) {
            var params = {};

            if (_requestObject.format === "jsonp") {

                return $http.jsonp(
                    _requestObject.path,
                    {
                        method: 'GET',
                        params: {callback: "JSON_CALLBACK"},
                    }
                );

                /*
                 return $http({
                 method: 'JSONP',
                 url: _requestObject.path,
                 params: {callback: "JSON_CALLBACK"'},
                 });
                 */

            } else {
                return $http({
                    method: 'GET',
                    url: _requestObject.path,
                    params: params
                });
            }
        };
        return jsonloaderFactory;
    }]);