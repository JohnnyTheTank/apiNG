"use strict";

angular.module("jtt_aping_ng_array", [])
    .directive('apingNgArray', ['apingUtilityHelper', function (apingUtilityHelper) {
        return {
            require: '?aping',
            restrict: 'A',
            replace: 'false',
            link: function (scope, element, attrs, apingController) {

                var appSettings = apingController.getAppSettings();
                var requests = apingUtilityHelper.parseJsonFromAttributes(attrs.apingNgArray, "ngArray", appSettings);

                requests.forEach(function (request) {

                    if (request.name && scope[request.name]) {

                        var requestObject = {};

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

                        var resultArray = [];

                        if (scope[request.name].constructor === Array) {
                            if (requestObject.items < 0 || typeof requestObject.items === "undefined") {
                                resultArray = scope[request.name];
                            } else {
                                angular.forEach(scope[request.name], function (value, key) {
                                    if (key < request.items) {
                                        resultArray.push(value);
                                    }
                                });
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