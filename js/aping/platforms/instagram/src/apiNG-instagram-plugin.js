"use strict";

/**
 @author Jonathan Hornung (https://github.com/JohnnyTheTank)
 @url https://github.com/JohnnyTheTank/apiNG-instagram-plugin
 @licence MIT
 */

var jjtApingInstagram = angular.module("jtt_aping_instagram", ['jtt_instagram'])
    .directive('apingInstagram', ['instagramFactory', 'apingApiKeys', 'apingInstagramHelper', 'apingUtilityHelper', function (instagramFactory, apingApiKeys, apingInstagramHelper, apingUtilityHelper) {
        return {
            require: '?aping',
            restrict: 'A',
            replace: 'false',
            link: function (scope, element, attrs, apingController) {

                var platform = "instagram";

                var appSettings = apingController.getAppSettings();

                var requests = apingUtilityHelper.parseJsonFromAttributes(attrs.apingInstagram, platform);

                requests.forEach(function (request) {

                    var instagramSearchObject = {
                        access_token: apingApiKeys.instagram,
                        client_id: apingApiKeys.instagramClientId,
                        count: request.items || appSettings.items,
                    };

                    if (request.userId) { //search for userId
                        instagramSearchObject.userId = request.userId;

                        instagramFactory.getPostsFromUserById(instagramSearchObject).success(function (_data) {
                            apingController.concatToResults(apingInstagramHelper.getObjectByJsonData(_data, appSettings.type));
                        }).error(function (_data) {
                            //on error
                        });


                    } else if (request.tag) { //search for searchterm

                        instagramSearchObject.tag = request.tag;

                        instagramFactory.getPostsByTag(instagramSearchObject).success(function (_data) {
                            apingController.concatToResults(apingInstagramHelper.getObjectByJsonData(_data, appSettings.type));
                        }).error(function (_data) {
                            //on error
                        });
                    }

                    //get _data for each request
                        // on success:
                            //
                });
            }
        }
    }]);