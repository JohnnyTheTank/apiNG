"use strict";

apingApp.directive('aping', function ($sce,
                                      appSettingsService,
                                      requestSettingsService,
                                      appConfigObjectService,
                                      appResultObjectService,
                                      platformResultObjectService,
                                      outputObjectYoutubeService,
                                      socialObjectService,
                                      utilityHelper,
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


                scope.isMaxItemsLimitReached = function (_maxItems) {

                    while (scope.results.length > _maxItems) {
                        scope.results.pop();
                    }

                    if (scope.results.length >= _maxItems) {
                        return true;
                    }

                    return false;
                };

                scope.youtubeObjectWorker = function (_videosData, _runAppResultObject, _requestObject) {

                    var requestResultObject = outputObjectYoutubeService.getObjectByJsonData(_videosData, _runAppResultObject.appConfig.type);
                    scope.results = scope.results.concat(requestResultObject.outputObjects);

                    if (scope.isMaxItemsLimitReached(_runAppResultObject.appConfig.maxItems)) {
                        _runAppResultObject.appConfig.mode = appSettingsService.getMode("none");
                        _runAppResultObject.appConfig.nextMode = appSettingsService.setNextMode("none");
                        _requestObject.done = true;
                    }

                    if (requestResultObject.infoObject.nextPage) {
                        _requestObject.nextPage = requestResultObject.infoObject.nextPage;
                        if (_runAppResultObject.appConfig.mode == "all" || _runAppResultObject.appConfig.mode == "next") {
                            _runAppResultObject.appConfig.nextMode = appSettingsService.setNextMode("next");
                        }
                    } else {
                        _requestObject.nextPage = false;
                        _requestObject.done = true;
                    }

                    return {
                        runAppResultObject: _runAppResultObject,
                        requestObject: _requestObject,
                        requestResultObject: requestResultObject,
                    };

                };


                scope.run = function (_appConfig) {

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

                        if (!requestObject.nextPage) {
                            if (appSettingsService.getMode(runAppResultObject.appConfig.mode) == "next") {
                                return false;
                            }
                        }

                        if (appSettingsService.getMode(runAppResultObject.appConfig.mode) == "none") {
                            return false;
                        }

                        if (requestObject.done) {
                            return false;
                        }

                        switch (requestObject.platform) {

                            case "youtube":

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

                                            var youtubeWorkerResult = scope.youtubeObjectWorker(_videosData, runAppResultObject, requestObject);

                                            runAppResultObject = youtubeWorkerResult.runAppResultObject;
                                            requestObject = youtubeWorkerResult.requestObject;

                                            // TODO: PlatformObject klären und in auch noch zurückgeben
                                            //var requestResultObject = youtubeWorkerResult.requestResultObject;
                                            //platformResultObject.requestObjects.push(requestResultObject);
                                        }
                                    });

                                } else if (requestObject.playlistId) {

                                    var youtubeSearchObject = {
                                        'playlistId': requestObject.playlistId,
                                        'key': runAppResultObject.appConfig.apiKeys.youtube,
                                        'maxResults': runAppResultObject.appConfig.items,
                                    };

                                    if (requestObject.nextPage) {
                                        youtubeSearchObject.nextPageToken = requestObject.nextPage;
                                    }

                                    youtubeFactory.getVideosFromPlaylistById(youtubeSearchObject).success(function (_videosData) {
                                        if (_videosData) {
                                            var youtubeWorkerResult = scope.youtubeObjectWorker(_videosData, runAppResultObject, requestObject);

                                            runAppResultObject = youtubeWorkerResult.runAppResultObject;
                                            requestObject = youtubeWorkerResult.requestObject;

                                            // TODO: PlatformObject klären und in auch noch zurückgeben
                                            //var requestResultObject = youtubeWorkerResult.requestResultObject;
                                            //platformResultObject.requestObjects.push(requestResultObject);
                                        }
                                    });

                                } else if (requestObject.searchString) {
                                    var youtubeSearchObject = {
                                        'searchString': requestObject.searchString,
                                        'key': runAppResultObject.appConfig.apiKeys.youtube,
                                        'maxResults': runAppResultObject.appConfig.items,
                                    };

                                    if (requestObject.nextPage) {
                                        youtubeSearchObject.nextPageToken = requestObject.nextPage;
                                    }

                                    youtubeFactory.getVideosFromSearchByString(youtubeSearchObject).success(function (_videosData) {
                                        if (_videosData) {
                                            var youtubeWorkerResult = scope.youtubeObjectWorker(_videosData, runAppResultObject, requestObject);

                                            runAppResultObject = youtubeWorkerResult.runAppResultObject;
                                            requestObject = youtubeWorkerResult.requestObject;

                                            // TODO: PlatformObject klären und in auch noch zurückgeben
                                            //var requestResultObject = youtubeWorkerResult.requestResultObject;
                                            //platformResultObject.requestObjects.push(requestResultObject);
                                        }
                                    });
                                }
                                break;
                        }

                    });


                    var apingRunInterval = setInterval(function () {
                        apingRunTimer()
                    }, appConfig.interval);

                    var counter = 0;

                    function apingRunTimer() {

                        runAppResultObject.appConfig.mode = appSettingsService.setNextMode(runAppResultObject.appConfig.nextMode);

                        if (runAppResultObject.appConfig.mode != "none") {
                            clearInterval(apingRunInterval);
                            scope.run(runAppResultObject.appConfig);
                        } else {
                            counter++;
                        }

                        if (counter >= 3000 / appConfig.interval) {
                            clearInterval(apingRunInterval);
                        }


                    }


                    return runAppResultObject;
                };

                scope.loadMore = function () {
                    scope.appResult.appConfig.mode = "this";
                    scope.appResult = scope.run(scope.appResult.appConfig);
                };

                scope.appResult = scope.run(appConfig);

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