"use strict";

var jjtApingYoutube = angular.module("jtt_aping_youtube", ['jtt_youtube'])
    .directive('apingYoutube', function (youtubeFactory, apingApiKeys, apingYoutubeHelper, apingUtilityHelper) {
        return {
            require: '?aping',
            restrict: 'A',
            replace: 'false',
            link: function (scope, element, attrs, apingController) {

                var platform = "youtube";

                var appSettings = apingController.getAppSettings();
                console.log();

                var requests = apingUtilityHelper.parseJsonFromAttributes(attrs.apingYoutube, platform);

                requests.forEach(function (request) {

                    var youtubeSearchObject = {};


                    if (request.channelId) { //search for channelID (and optional searchterm)
                        youtubeSearchObject = {
                            'channelId': request.channelId,
                            'searchString': request.search || false,
                            'key': apingApiKeys.youtube,
                            'maxResults': appSettings.items || request.items,
                        };

                        youtubeFactory.getVideosFromChannelById(youtubeSearchObject)
                            .success(function (_videosData) {
                                if (_videosData) {
                                    apingController.concatToResults(apingYoutubeHelper.getObjectByJsonData(_videosData, request.type));
                                }
                            });

                    } else if (request.search) { //search for searchterm
                        youtubeSearchObject = {
                            'searchString': request.search,
                            'key': apingApiKeys.youtube,
                            'maxResults': appSettings.items || request.items,
                        };

                        youtubeFactory.getVideosFromSearchByString(youtubeSearchObject)
                            .success(function (_videosData) {
                                if (_videosData) {
                                    apingController.concatToResults(apingYoutubeHelper.getObjectByJsonData(_videosData, request.type));
                                }
                            });
                    } else if (request.playlistId) { //search for playlistId
                        youtubeSearchObject = {
                            'playlistId': request.playlistId,
                            'key': apingApiKeys.youtube,
                            'maxResults': appSettings.items || request.items,
                        };

                        youtubeFactory.getVideosFromPlaylistById(youtubeSearchObject)
                            .success(function (_videosData) {
                                if (_videosData) {
                                    apingController.concatToResults(apingYoutubeHelper.getObjectByJsonData(_videosData, request.type));
                                }
                            });
                    }
                });
            }
        }
    });