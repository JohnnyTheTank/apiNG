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

                        if (request.callback && request.format === "jsonp") {
                            requestObject.callback = request.callback;
                        } else {
                            requestObject.callback = 'JSON_CALLBACK';
                        }

                        if(typeof request.items !== "undefined") {
                            requestObject.count = request.items;
                        } else {
                            requestObject.count = appSettings.items;
                        }

                        if(requestObject.count === 0 || requestObject.count === '0') {
                            return false;
                        }

                        // -1 is "no explicit limit". same for NaN value
                        if(requestObject.count < 0 || isNaN(requestObject.count)) {
                            requestObject.count = undefined;
                        }

                        jsonloaderFactory.getJsonData(requestObject)
                            .then(function (_data) {

                                var resultArray = [];
                                if (_data.data) {

                                    var results = _data.data;

                                    if(typeof request.resultProperty !== "undefined") {
                                        results = _data.data[request.resultProperty];
                                    }

                                    if (_data.data.constructor !== Array) {
                                        resultArray.push(results);
                                    } else {
                                        if (request.items < 0 || typeof request.items === "undefined" ) {
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
            if (_requestObject.format === "jsonp") {

                return $http.jsonp(
                    _requestObject.path,
                    {
                        method: 'GET',
                        params: {callback: _requestObject.callback},
                    }
                );

            } else {
                return $http({
                    method: 'GET',
                    url: _requestObject.path
                });
            }
        };
        return jsonloaderFactory;
    }]);