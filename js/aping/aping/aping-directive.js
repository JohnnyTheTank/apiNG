"use strict";

apingApp.directive('aping', function (
    $sce,
    appSettingsService,
    appConfigObjectService,
    appResultObjectService,
    platformResultObjectService,
    outputObjectYoutubeService,
    socialObjectService,
    youtubeFactory
    ) {
        return {
            restrict: 'E',
            replace: 'true',
            scope: {
                type: '@',
                items: '@',
                yt: '@',
                ig: '@',
            },
            link: function (scope, element, attrs) {

                if (!scope.results) {
                    scope.results = [];
                }

                var appConfig = appConfigObjectService.getNew();

                appConfig.items = appSettingsService.getItems(scope.items);
                appConfig.type = appSettingsService.getType(scope.type);
                appConfig.apiKeys = appSettingsService.getApiKeys();

                appConfig.yt = appSettingsService.getYoutube(scope.yt);


                var appResult = run(appConfig);

                function run(_appConfig) {

                    var runAppResultObject = appResultObjectService.getNew();
                    runAppResultObject.appConfig = _appConfig;


                    if (runAppResultObject.appConfig.yt.length > 0) {

                        if(! (runAppResultObject.appConfig.apiKeys || runAppResultObject.appConfig.apiKeys.youtube)) {
                            /* TODO Error Handling */
                            return false;
                        }

                        var platformResultObject = platformResultObjectService.getNew();

                        runAppResultObject.appConfig.yt.forEach(function (ytObject) {

                            var searchString = false;
                            if (ytObject.search) {
                                searchString = ytObject.search;
                            }

                            if (ytObject.channelId) {

                                youtubeFactory.getChannelById({
                                    'channelId': ytObject.channelId,
                                    'key': runAppResultObject.appConfig.apiKeys.youtube,
                                }).success(function (_channelData) {
                                    if (_channelData) {

                                        var youtubeSearchObject = {
                                            'channelId': ytObject.channelId,
                                            'searchString': searchString,
                                            'key': runAppResultObject.appConfig.apiKeys.youtube,
                                        };
                                        if(ytObject.nextPageToken) {
                                            youtubeSearchObject.nextPageToken = ytObject.nextPageToken;
                                        }

                                        youtubeFactory.getVideosFromChannelById(youtubeSearchObject).success(function (_videosData) {
                                            if (_videosData) {

                                                var requestResultObject = outputObjectYoutubeService.getObjectByJsonData(_videosData, runAppResultObject.appConfig.type);
                                                console.log(scope.results);
                                                scope.results = scope.results.concat(requestResultObject.outputObjects);
                                                console.log(scope.results);
                                                platformResultObject.requestObjects.push(requestResultObject);
                                            }
                                        });
                                    }
                                });

                            }

                        });

                        runAppResultObject.platforms.push(platformResultObject);
                        /* TODO: Hier sollte man eher mergen, statt zu pushen */

                    }

                    return runAppResultObject;
                }
            }
            ,
            templateUrl: function (elem, attrs) {
                return attrs.templateUrl || appSettingsService.getTemplateUrl();
            }
        };
    }
);

/**
 * TODO: Twitter https://github.com/pavelk2/social-feed/
 * TODO: Twitter https://github.com/jublonet/codebird-js
 * TODO: Youtube Fullscreen Angular Tool: https://github.com/kanzelm3/angular-video-bg
 */