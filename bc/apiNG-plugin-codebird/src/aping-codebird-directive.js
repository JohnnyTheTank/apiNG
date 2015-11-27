"use strict";

/**
 @author Jonathan Hornung (https://github.com/JohnnyTheTank)
 @url https://github.com/JohnnyTheTank/apiNG-plugin-codebird
 @licence MIT
 */

var jjtApingCodebird = angular.module("jtt_aping_codebird", [])
    .directive('apingCodebird', ['apingApiKeys', 'apingCodebirdHelper', 'apingUtilityHelper', function (apingApiKeys, apingCodebirdHelper, apingUtilityHelper) {
        return {
            require: '?aping',
            restrict: 'A',
            replace: 'false',
            link: function (scope, element, attrs, apingController, interval) {

                var appSettings = apingController.getAppSettings();

                var requests = apingUtilityHelper.parseJsonFromAttributes(attrs.apingCodebird, apingCodebirdHelper.getThisPlattformString(), appSettings);

                var cb = new Codebird;
                cb.setBearerToken(apingApiKeys.twitter);

                requests.forEach(function (request) {

                    if(request.search) {

                        //https://dev.twitter.com/rest/reference/get/search/tweets
                        var params = {
                            q: request.search,
                            result_type: request.result_type || "mixed",
                            count:request.items || appSettings.items,
                        };

                        cb.__call(
                            "search_tweets",
                            params,
                            function (_data) {
                                apingController.concatToResults(apingCodebirdHelper.getObjectByJsonData(_data, appSettings.type));
                                apingController.apply();
                            },
                            true
                        );

                    } else if(request.user) {
                        //https://dev.twitter.com/rest/reference/get/statuses/user_timeline
                        var params = {
                            screen_name: request.user,
                            contributor_details: true,
                            count: request.items || appSettings.items
                        };
                        cb.__call(
                            "statuses_userTimeline",
                            params,
                            function (_data, rate, err) {
                                apingController.concatToResults(apingCodebirdHelper.getObjectByJsonData(_data, appSettings.type));
                                apingController.apply();
                            },
                            true
                        );
                    } else {
                        return false;
                    }

                });
            }
        }
    }]);