"use strict";

angular.module('jtt_aping_design_default', ['wu.masonry', 'linkify', 'angularMoment', 'ngSanitize', 'jtt_imagesLoaded'])
    .run(['amMoment', function (amMoment) {
        amMoment.changeLocale('en');
    }])
    .controller('apingDefaultDesignController', ['$scope', '$sce', function ($scope, $sce) {

        $scope.$on('apiNG.resultMerged', function () {
            //$scope.workingCopy = $scope.results;
        });

        $scope.getPlatformIcon = function (_platform) {
            switch (_platform) {
                case "youtube":
                case "twitter":
                case "wikipedia":
                case "vimeo":
                case "vine":
                case "facebook":
                case "flickr":
                case "dailymotion":
                case "tumblr":
                case "rss":
                case "bandsintown":
                    return "img/"+_platform+".png";
            }

            return false;
        };

        $scope.refresh = function () {
            $scope.$broadcast("masonry.reload");
        };

        $scope.$on('imagesLoaded.SUCCESS', function() {
            $scope.refresh();
        });
        $scope.$on('imagesLoaded.ALWAYS', function() {
            $scope.refresh();
        });

        $scope.getUrl = function (url) {
            if(url) {
                return $sce.trustAsResourceUrl(url);
            }
        };

        $scope.getHtml = function (string) {
            if(string) {
                return $sce.trustAsHtml(string);
            }
        };

    }]);