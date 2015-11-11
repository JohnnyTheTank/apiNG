"use strict";

var jjtApingYoutube = angular.module("jtt_aping_youtube", ['jtt_youtube'])
    .directive('apingYoutube', function (youtubeFactory, apingApiKeys) {
        return {
            require: '?aping',
            restrict: 'A',
            replace: 'false',
            //scope: true,
            link: function (scope, element, attrs, apingController) {

                var requestObjects = requestSettingsService.parseRequestConfigsFromJson(attrs.apingYoutube, "youtube");


                requestObjects.forEach(function (requestObject) {
                    if (requestObject.channelId) {

                        var searchString = false;
                        if (requestObject.search) {
                            searchString = requestObject.search;
                        }

                        var youtubeSearchObject = {
                            'channelId': requestObject.channelId,
                            'searchString': searchString,
                            'key': apingApiKeys.youtube,
                            'maxResults': 10,
                        };

                        youtubeFactory.getVideosFromChannelById(youtubeSearchObject).success(function (_videosData) {
                            if (_videosData) {

                                var requestResultObject = outputObjectYoutubeService.getObjectByJsonData(_videosData, "social");

                                apingController.concatToResults(requestResultObject.outputObjects);

                            }
                        });

                    }
                });


            },
            controller: function ($scope) {
            }

        }
    });