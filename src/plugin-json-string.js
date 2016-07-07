'use strict';

angular.module('jtt_aping_json_string', [])
    .directive('apingJsonString', ['apingUtilityHelper', function (apingUtilityHelper) {
        return {
            require: '?aping',
            restrict: 'A',
            replace: 'false',
            link: function (scope, element, attrs, apingController) {

                var appSettings = apingController.getAppSettings();
                var request = apingUtilityHelper.parseJsonFromAttributes(attrs.apingJsonString, 'apingJsonString', appSettings);

                var resultArray = [];

                if (request) {
                    if (request.constructor === Array) {
                        resultArray = request;
                    } else {
                        resultArray.push(request);
                    }
                    if (resultArray.length > 0) {
                        apingController.concatToResults(resultArray);
                    }
                }
            }
        }
    }]);