"use strict";

/**
 @author Jonathan Hornung (https://github.com/JohnnyTheTank)
 @url https://github.com/JohnnyTheTank/apiNG-plugin-facebook
 @licence MIT
 */

var jjtApingFacebook = angular.module("jtt_aping_facebook", ['jtt_facebook'])
    .directive('apingFacebook', ['apingApiKeys', 'apingFacebookHelper', 'apingUtilityHelper', 'facebookFactory', function (apingApiKeys, apingFacebookHelper, apingUtilityHelper, facebookFactory) {
        return {
            require: '?aping',
            restrict: 'A',
            replace: 'false',
            link: function (scope, element, attrs, apingController) {

                var platform = "facebook";

                var appSettings = apingController.getAppSettings();

                var requests = apingUtilityHelper.parseJsonFromAttributes(attrs.apingFacebook, apingFacebookHelper.getThisPlattformString(), appSettings);

                requests.forEach(function (request) {

                    var facebookSearchObject = {
                        'page': request.page,
                        'limit': request.items || appSettings.items,
                        'access_token': apingApiKeys.facebook,
                    };

                    if (request.page) { //search for page id

                        switch(appSettings.type) {
                            case "social":
                                facebookFactory.getPostsFromPageById(facebookSearchObject)
                                    .success(function (_data) {
                                        if (_data) {
                                            apingController.concatToResults(apingFacebookHelper.getObjectByJsonData(_data, appSettings.type));
                                        }
                                    });
                                break;

                            case "video":
                                facebookFactory.getVideosFromPageById(facebookSearchObject)
                                    .success(function (_data) {
                                        if (_data) {
                                            apingController.concatToResults(apingFacebookHelper.getObjectByJsonData(_data, appSettings.type));
                                        }
                                    });
                                break;

                            case "image":
                                facebookFactory.getPhotosFromPageById(facebookSearchObject)
                                    .success(function (_data) {
                                        if (_data) {
                                            apingController.concatToResults(apingFacebookHelper.getObjectByJsonData(_data, appSettings.type));
                                        }
                                    });
                                break;

                            case "event":
                                facebookFactory.getEventsFromPageById(facebookSearchObject)
                                    .success(function (_data) {
                                        if (_data) {
                                            apingController.concatToResults(apingFacebookHelper.getObjectByJsonData(_data, appSettings.type));
                                        }
                                    });
                                break;
                        }

                    }

                });
            }
        }
    }]);