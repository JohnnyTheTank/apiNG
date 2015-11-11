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
            replace: 'false',
            //scope: true,

            scope: {
                type: '@',
                items: '@',
                maxItems: '@',
                mode: '@',
            },
            link: function (scope, element, attrs) {
            },
            controller: function ($scope) {

                $scope.results = [];

                this.concatToResults = function (_item) {
                    $scope.results = $scope.results.concat(_item);
                };

                this.getAppSettings = function () {
                    return {
                        type: $scope.type || false,
                        items: $scope.items || false,
                        maxItems: $scope.maxItems || false,
                        mode: $scope.mode || false,
                    };
                };
            },
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
 * TODO: Creating a Plugin System: http://taoofcode.net/creating-a-plugin-system-with-the-compile-provider/
 * TODO: parentscope: http://stackoverflow.com/a/21454647
 */