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

            if (scope.yt) {

                var ytSettings = $.parseJSON(scope.yt.replace(/'/g, '"'));

                ytSettings.forEach(function (ytObject) {

                    var searchString = false;
                    if (ytObject.search) {
                        searchString = ytObject.search;
                    }

                    if (ytObject.channelId) {

                        youtubeService.getChannelById(ytObject.channelId)
                            .success(function (_channelData) {
                                if (_channelData) {
                                    youtubeService.getVideosFromChannelById(ytObject.channelId, searchString)
                                        .success(function (_videosData) {
                                            if (_videosData) {
                                                scope.results = scope.results.concat(
                                                    youtubeService.getVideoFeedObjectByJsonData(
                                                        _videosData,
                                                        youtubeService.getChannelObjectByJsonData(_channelData)
                                                    )
                                                );
                                            }
                                        });
                                }
                            });
                    } else if (searchString) {
                        youtubeService.getVideosFromSearchByString(searchString)
                            .success(function (_videosData) {
                                if (_videosData) {
                                    scope.results = scope.results.concat(
                                        youtubeService.getVideoFeedObjectByJsonData(
                                            _videosData,
                                            apingService.getBlankChannelObject("youtube")
                                        )
                                    );
                                }
                            });
                    } else if (ytObject.playlistId) {

                        youtubeService.getVideosFromPlaylistById(ytObject.playlistId)
                            .success(function (_videosData) {
                                if (_videosData) {
                                    scope.results = scope.results.concat(
                                        youtubeService.getVideoFeedObjectByJsonData(
                                            _videosData,
                                            apingService.getBlankChannelObject("youtube")
                                        )
                                    );
                                }
                            });
                    }
                });

            }

            if(scope.ig) {
                var igSettings = $.parseJSON(scope.ig.replace(/'/g, '"'));


                igSettings.forEach(function (igObject) {
                    if(igObject.userId) {
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
        },
        templateUrl: function (elem, attrs) {
            return attrs.templateUrl || defaultSettings.template;
        }
    };
});

/**
 *
 */