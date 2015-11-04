"use strict";

apingApp.directive('aping', function ($sce, youtubeService, instagramService, defaultSettings, apingService) {
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

                        var searchString = false;
                        if (ytObject.search) {
                            searchString = ytObject.search;
                        }

                        if (ytObject.channelId) {

                            youtubeService.getChannelById({'channelId': ytObject.channelId})
                                .success(function (_channelData) {
                                    if (_channelData) {
                                        youtubeService.getVideosFromChannelById({
                                                'channelId': ytObject.channelId,
                                                'searchString': searchString
                                            })
                                            .success(function (_videosData) {
                                                if (_videosData) {
                                                    var resultObject = youtubeService.getVideoFeedObjectByJsonData(
                                                        _videosData,
                                                        apingService.getBlankChannelObject("youtube")
                                                    );

                                                    scope.results = scope.results.concat(resultObject.entries);
                                                    scope.platforms.push(resultObject.platform);
                                                }
                                            });
                                    }
                                });
                        } else if (searchString) {
                            youtubeService.getVideosFromSearchByString({'searchString': searchString})
                                .success(function (_videosData) {
                                    if (_videosData) {

                                        var resultObject = youtubeService.getVideoFeedObjectByJsonData(
                                            _videosData,
                                            apingService.getBlankChannelObject("youtube")
                                        );

                                        scope.results = scope.results.concat(resultObject.entries);
                                        scope.platforms.push(resultObject.platform);
                                    }
                                });
                        } else if (ytObject.playlistId) {

                            youtubeService.getVideosFromPlaylistById({'playlistId': ytObject.playlistId})
                                .success(function (_videosData) {
                                    if (_videosData) {
                                        var resultObject = youtubeService.getVideoFeedObjectByJsonData(
                                            _videosData,
                                            apingService.getBlankChannelObject("youtube")
                                        );

                                        scope.results = scope.results.concat(resultObject.entries);
                                        scope.platforms.push(resultObject.platform);
                                    }
                                });
                        }
                    });

                    setTimeout(function () {
                        if (scope.platforms[0].loadMore) {
                            //alert(scope.platforms[0].loadMore);
                        }
                    }, 2000)

                }

                if (scope.ig) {
                    var igSettings = $.parseJSON(scope.ig.replace(/'/g, '"'));


                    igSettings.forEach(function (igObject) {
                        if (igObject.userId) {
                            instagramService.getPostsFromUserById(igObject.userId)
                                .success(function (_result) {
                                    console.log(_result);
                                })
                                .error(function (_error) {
                                    console.info("Es gab ein problem", _error);
                                })
                        }
                    });
                }
            }
        },
        templateUrl: function (elem, attrs) {
            return attrs.templateUrl || defaultSettings.template;
        }
    };
});

/**
 *
 */