"use strict";

angular.module("jtt_aping_jsonloader")
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

                        if (request.callback) {
                            requestObject.callback = request.callback;
                        }

                        if (request.format === "jsonp" && !request.callback) {
                            requestObject.callback = 'JSON_CALLBACK';
                        }

                        if (angular.isDefined(request.items)) {
                            requestObject.count = request.items;
                        } else {
                            requestObject.count = appSettings.items;
                        }

                        if (requestObject.count === 0 || requestObject.count === '0') {
                            return false;
                        }

                        // -1 is "no explicit limit". same for NaN value
                        if (requestObject.count < 0 || isNaN(requestObject.count)) {
                            requestObject.count = undefined;
                        }

                        jsonloaderFactory.getJsonData(requestObject)
                            .then(function (_data) {

                                var resultArray = [];
                                if (_data.data) {

                                    var results = _data.data;

                                    if (angular.isDefined(request.resultProperty)) {
                                        results = _data.data[request.resultProperty];
                                    }

                                    if (_data.data.constructor !== Array) {
                                        resultArray.push(results);
                                    } else {
                                        if (request.items < 0 || angular.isUndefined(request.items)) {
                                            resultArray = results;
                                        } else {
                                            angular.forEach(results, function (value, key) {
                                                if (key < request.items) {
                                                    resultArray.push(value);
                                                }
                                            });
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
            if (angular.isDefined(_requestObject.callback)) {
                params[_requestObject.callback] = 'JSON_CALLBACK';
            }


            if (_requestObject.format === "jsonp") {

                return $http.jsonp(
                    _requestObject.path,
                    {
                        method: 'GET',
                        params: params,
                    }
                );

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