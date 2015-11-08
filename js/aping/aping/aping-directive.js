"use strict";

apingApp.directive('aping', function ($sce, apingDefaultSettings) {
    return {
        restrict: 'E',
        replace: 'true',
        scope: {
            yt: '@',
            ig: '@',
        },
        link: function (scope, element, attrs) {

            if (!scope.results) {
                scope.results = [];
            }

            if (!scope.platforms) {
                scope.platforms = [];
            }




            parseJsonAndGetData();

            function parseJsonAndGetData() {
                if (scope.yt) {

                    var ytSettings = $.parseJSON(scope.yt.replace(/'/g, '"'));

                    ytSettings.forEach(function (ytObject) {

                        /*

                        var searchString = false;
                        if (ytObject.search) {
                            searchString = ytObject.search;
                        }

                        if (ytObject.channelId) {

                            youtubeFactory.getChannelById({'channelId': ytObject.channelId})
                                .success(function (_channelData) {
                                    if (_channelData) {
                                        youtubeFactory.getVideosFromChannelById({
                                                'channelId': ytObject.channelId,
                                                'searchString': searchString
                                            })
                                            .success(function (_videosData) {
                                                if (_videosData) {
                                                    var resultObject = youtubeFactory.getVideoFeedObjectByJsonData(
                                                        _videosData,
                                                        apingService.getBlankChannelObject("jtt_youtube")
                                                    );

                                                    scope.results = scope.results.concat(resultObject.entries);
                                                    scope.platforms.push(resultObject.platform);
                                                }
                                            });
                                    }
                                });
                        } else if (searchString) {
                            youtubeFactory.getVideosFromSearchByString({'searchString': searchString})
                                .success(function (_videosData) {
                                    if (_videosData) {

                                        var resultObject = youtubeFactory.getVideoFeedObjectByJsonData(
                                            _videosData,
                                            apingService.getBlankChannelObject("jtt_youtube")
                                        );

                                        scope.results = scope.results.concat(resultObject.entries);
                                        scope.platforms.push(resultObject.platform);
                                    }
                                });
                        } else if (ytObject.playlistId) {


                            youtubeFactory.getVideosFromPlaylistById({'playlistId': ytObject.playlistId})
                                .success(function (_videosData) {
                                    if (_videosData) {
                                        var resultObject = youtubeFactory.getVideoFeedObjectByJsonData(
                                            _videosData,
                                            apingService.getBlankChannelObject("jtt_youtube")
                                        );

                                        scope.results = scope.results.concat(resultObject.entries);
                                        scope.platforms.push(resultObject.platform);

                                    }
                                });
                        }
                        */
                    });


                }
                /*

                if (scope.ig) {
                    var igSettings = $.parseJSON(scope.ig.replace(/'/g, '"'));


                    igSettings.forEach(function (igObject) {
                        if (igObject.userId) {
                            instagramFactory.getPostsFromUserById({'userId':igObject.userId})
                                .success(function (_data) {

                                    var resultObject = instagramFactory.getVideoFeedObjectByJsonData(
                                        _data,
                                        apingService.getBlankChannelObject("jtt_instagram")
                                    );

                                    scope.results = scope.results.concat(resultObject.entries);
                                    scope.platforms.push(resultObject.platform);

                                })
                                .error(function (_error) {
                                    console.info("Es gab ein problem", _error);
                                })
                        }
                    });
                }
                */
            }

        },
        templateUrl: function (elem, attrs) {
            return attrs.templateUrl || apingDefaultSettings.template;
        }
    };
});

/**
 * TODO: Twitter https://github.com/pavelk2/social-feed/
 * TODO: Twitter https://github.com/jublonet/codebird-js
 * TODO: Youtube Fullscreen Angular Tool: https://github.com/kanzelm3/angular-video-bg
 */