"use strict";

apingApp.directive('aping', function (
    $sce,
    appSettingsService,
    requestSettingsService,
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


                //first run
                if(appConfig.requestConfigObjects.length <= 0) {
                    var requestConfigObjects = [];
                    if(scope.yt) {
                        requestConfigObjects = requestConfigObjects.concat(requestSettingsService.parseRequestConfigsFromJson(scope.yt, "youtube"));
                    }

                    // hier kommen weitere aufrufe für z.b. instagram hin

                    appConfig.requestConfigObjects = requestConfigObjects;
                }



                var appResult = run(appConfig);

                function run(_appConfig) {

                    var runAppResultObject = appResultObjectService.getNew();
                    runAppResultObject.appConfig = _appConfig;
                    runAppResultObject.appConfig.nextMode = appSettingsService.setNextMode("none");

                    if(! (runAppResultObject.appConfig.apiKeys)) {
                        // TODO Error Handling
                        return false;
                    }

                    // TODO: PlatformObject klären
                    //var platformResultObject = platformResultObjectService.getNew();

                    _appConfig.requestConfigObjects.forEach(function (requestObject) {

                        switch (requestObject.platform) {

                            case "youtube":

                                if(!(runAppResultObject.appConfig.apiKeys.youtube)) {
                                    // TODO Error Handling
                                    return false;
                                }

                                var searchString = false;
                                if (requestObject.search) {
                                    searchString = requestObject.search;
                                }

                                if(!requestObject.nextPage) {
                                    if(appSettingsService.setMode(_appConfig.mode) == "next") {
                                        console.log("es geht nicht mehr weiter");
                                        return false;
                                    }
                                }

                                if (requestObject.channelId) {

                                    youtubeFactory.getChannelById({
                                        'channelId': requestObject.channelId,
                                        'key': runAppResultObject.appConfig.apiKeys.youtube,
                                    }).success(function (_channelData) {
                                        if (_channelData) {

                                            var youtubeSearchObject = {
                                                'channelId': requestObject.channelId,
                                                'searchString': searchString,
                                                'key': runAppResultObject.appConfig.apiKeys.youtube,
                                                'maxResults': runAppResultObject.appConfig.items,
                                            };

                                            if(requestObject.nextPage) {
                                                youtubeSearchObject.nextPageToken = requestObject.nextPage;
                                            }

                                            youtubeFactory.getVideosFromChannelById(youtubeSearchObject).success(function (_videosData) {
                                                if (_videosData) {

                                                    var requestResultObject = outputObjectYoutubeService.getObjectByJsonData(_videosData, runAppResultObject.appConfig.type);
                                                    scope.results = scope.results.concat(requestResultObject.outputObjects);

                                                    if(requestResultObject.infoObject.nextPage) {
                                                        requestObject.nextPage = requestResultObject.infoObject.nextPage;
                                                        runAppResultObject.appConfig.nextMode = appSettingsService.setNextMode("next");
                                                    } else {
                                                        requestObject.nextPage = false;
                                                    }

                                                    // TODO: PlatformObject klären
                                                    //platformResultObject.requestObjects.push(requestResultObject);
                                                }
                                            });
                                        }
                                    });

                                };
                                break;

                        }

                    });




                    var apingRunInterval = setInterval(function(){ apingRunTimer() }, 1000);

                    var counter = 0;

                    function apingRunTimer() {
                        runAppResultObject.appConfig.mode = appSettingsService.setNextMode(runAppResultObject.appConfig.nextMode);
                        console.log(runAppResultObject.appConfig.nextMode);

                        if(runAppResultObject.appConfig.mode != "none") {
                            clearInterval(apingRunInterval);
                            run(runAppResultObject.appConfig);
                        } else {
                            counter++;
                        }

                        if(counter >= 3) {
                            clearInterval(apingRunInterval);
                        }


                    }


                    //return runAppResultObject;
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
 * TODO: TweeCool (twitter api) http://tweecool.com/
 * TODO: Twitter https://github.com/jublonet/codebird-js
 * TODO: Youtube Fullscreen Angular Tool: https://github.com/kanzelm3/angular-video-bg
 */