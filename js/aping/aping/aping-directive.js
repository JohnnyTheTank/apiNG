"use strict";

apingApp.directive('aping', function ($sce,
                                      appSettingsService,
                                      requestSettingsService,
                                      appConfigObjectService,
                                      appResultObjectService,
                                      platformResultObjectService,
                                      outputObjectYoutubeService,
                                      socialObjectService,
                                      youtubeFactory) {
        return {
            restrict: 'E',
            replace: 'true',
            scope: {
                type: '@',
                items: '@',
                maxItems: '@',
                mode: '@',
                yt: '@',
                ig: '@',
            },
            link: function (scope, element, attrs) {

                if (!scope.results) {
                    scope.results = [];
                }

                if (!scope.appResult) {
                    scope.appResult = {};
                }

                var appConfig = appConfigObjectService.getNew();

                appConfig.items = appSettingsService.getItems(scope.items);
                appConfig.interval = appSettingsService.getInterval(scope.interval);
                appConfig.maxItems = appSettingsService.getMaxItems(scope.maxItems);
                appConfig.type = appSettingsService.getType(scope.type);
                appConfig.apiKeys = appSettingsService.getApiKeys();
                appConfig.mode = appSettingsService.getMode(scope.mode);




                //first run
                if (appConfig.requestConfigObjects.length <= 0) {
                    var requestConfigObjects = [];
                    if (scope.yt) {
                        requestConfigObjects = requestConfigObjects.concat(requestSettingsService.parseRequestConfigsFromJson(scope.yt, "youtube"));
                    }

                    // hier kommen weitere aufrufe für z.b. instagram hin

                    appConfig.requestConfigObjects = requestConfigObjects;
                }


                scope.appResult = run(appConfig);

                scope.isMaxItemsLimitReached = function (_maxItems) {

                    while (scope.results.length > _maxItems) {
                        scope.results.pop();
                    }

                    if(scope.results.length >= _maxItems) {
                        return true;
                    }

                    return false;
                };

                function run(_appConfig) {

                    var runAppResultObject = appResultObjectService.getNew();
                    runAppResultObject.appConfig = _appConfig;
                    runAppResultObject.appConfig.nextMode = appSettingsService.setNextMode("none");

                    if (!(runAppResultObject.appConfig.apiKeys)) {
                        // TODO Error Handling
                        return false;
                    }

                    // TODO: PlatformObject klären
                    //var platformResultObject = platformResultObjectService.getNew();

                    runAppResultObject.appConfig.requestConfigObjects.forEach(function (requestObject) {

                        switch (requestObject.platform) {

                            case "youtube":

                                if (!requestObject.nextPage) {
                                    if (appSettingsService.getMode(runAppResultObject.appConfig.mode) == "next") {
                                        return false;
                                    }
                                }

                                if(appSettingsService.getMode(runAppResultObject.appConfig.mode) == "none") {
                                    return false;
                                }

                                if (!(runAppResultObject.appConfig.apiKeys.youtube)) {
                                    // TODO Error Handling
                                    return false;
                                }

                                var searchString = false;
                                if (requestObject.search) {
                                    searchString = requestObject.search;
                                }

                                if (requestObject.channelId) {
                                    var youtubeSearchObject = {
                                        'channelId': requestObject.channelId,
                                        'searchString': searchString,
                                        'key': runAppResultObject.appConfig.apiKeys.youtube,
                                        'maxResults': runAppResultObject.appConfig.items,
                                    };

                                    if (requestObject.nextPage) {
                                        youtubeSearchObject.nextPageToken = requestObject.nextPage;
                                    }

                                    youtubeFactory.getVideosFromChannelById(youtubeSearchObject).success(function (_videosData) {
                                        if (_videosData) {

                                            var requestResultObject = outputObjectYoutubeService.getObjectByJsonData(_videosData, runAppResultObject.appConfig.type);
                                            scope.results = scope.results.concat(requestResultObject.outputObjects);

                                            if(scope.isMaxItemsLimitReached(runAppResultObject.appConfig.maxItems)) {
                                                runAppResultObject.appConfig.mode = appSettingsService.getMode("none");
                                                runAppResultObject.appConfig.nextMode = appSettingsService.setNextMode("none");
                                                return false;
                                            }


                                            if (requestResultObject.infoObject.nextPage) {
                                                requestObject.nextPage = requestResultObject.infoObject.nextPage;
                                                if (runAppResultObject.appConfig.mode == "all" || runAppResultObject.appConfig.mode == "next") {
                                                    runAppResultObject.appConfig.nextMode = appSettingsService.setNextMode("next");
                                                }
                                            } else {
                                                requestObject.nextPage = false;
                                            }

                                            // TODO: PlatformObject klären
                                            //platformResultObject.requestObjects.push(requestResultObject);
                                        }
                                    });

                                }
                                break;
                        }

                    });


                    var apingRunInterval = setInterval(function(){ apingRunTimer() }, appConfig.interval);

                    var counter = 0;

                    function apingRunTimer() {

                        runAppResultObject.appConfig.mode = appSettingsService.setNextMode(runAppResultObject.appConfig.nextMode);

                        if (runAppResultObject.appConfig.mode != "none") {
                            clearInterval(apingRunInterval);
                            run(runAppResultObject.appConfig);
                        } else {
                            counter++;
                        }

                        if (counter >= 3000/appConfig.interval) {
                            clearInterval(apingRunInterval);
                        }


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
 * TODO: TweeCool (twitter api) http://tweecool.com/
 * TODO: Twitter https://github.com/jublonet/codebird-js
 * TODO: Youtube Fullscreen Angular Tool: https://github.com/kanzelm3/angular-video-bg
 */