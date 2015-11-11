"use strict";

jjtApingYoutube.directive('yt', function (requestSettingsService, youtubeFactory, apiKeys, outputObjectYoutubeService, AppSettings) {
    return {
        require:'?aping',
        restrict: 'A',
        replace: 'false',
        //scope: true,
        link: function (scope, element, attrs, apingController) {

            //console.log(apingController.getAppSettings());

            console.log(AppSettings.type());

            var requestObjects = requestSettingsService.parseRequestConfigsFromJson(attrs.yt, "youtube");


            requestObjects.forEach(function (requestObject) {
                if (requestObject.channelId) {

                    var searchString = false;
                    if (requestObject.search) {
                        searchString = requestObject.search;
                    }

                    var youtubeSearchObject = {
                        'channelId': requestObject.channelId,
                        'searchString': searchString,
                        'key': apiKeys.youtube,
                        'maxResults': 10,
                    };


                    if (requestObject.nextPage) {
                        youtubeSearchObject.nextPageToken = requestObject.nextPage;
                    }

                    youtubeFactory.getVideosFromChannelById(youtubeSearchObject).success(function (_videosData) {
                        if (_videosData) {

                            var requestResultObject = outputObjectYoutubeService.getObjectByJsonData(_videosData, "social");

                            apingController.concatToResults(requestResultObject.outputObjects);

                            // TODO: PlatformObject klären und in auch noch zurückgeben
                            //var requestResultObject = youtubeWorkerResult.requestResultObject;
                            //platformResultObject.requestObjects.push(requestResultObject);
                        }
                    });

                }
            });



        },
        controller: function ($scope) {
        }

    }
});