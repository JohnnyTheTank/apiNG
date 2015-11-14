"use strict";

/**
 @author Jonathan Hornung (https://github.com/JohnnyTheTank)
 @url https://github.com/JohnnyTheTank/apiNG-sample-plugin
 @licence MIT
 */

var jjtApingSample = angular.module("jtt_aping_sample", [])
    .directive('apingSample', ['apingApiKeys', 'apingSampleHelper', 'apingUtilityHelper', function (apingApiKeys, apingSampleHelper, apingUtilityHelper) {
        return {
            require: '?aping',
            restrict: 'A',
            replace: 'false',
            link: function (scope, element, attrs, apingController) {

                var platform = "sample";

                var appSettings = apingController.getAppSettings();

                var requests = apingUtilityHelper.parseJsonFromAttributes(attrs.apingSample, platform);

                requests.forEach(function (request) {

                    //get _data for each request
                        // on success:
                            // apingController.concatToResults(apingSampleHelper.getObjectByJsonData(_data, request.type));
                });
            }
        }
    }]);