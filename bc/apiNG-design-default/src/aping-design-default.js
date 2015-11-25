"use strict";

angular.module('jtt_aping_design_default', ['wu.masonry', 'linkify', 'angularMoment'])
    .run(['amMoment', function (amMoment) {
        amMoment.changeLocale('de');
    }])
    .controller('apingDefaultDesignController', ['$scope', function ($scope) {

        $scope.$on('resultMerged', function () {
            $scope.workingCopy = $scope.results;
        });

        $scope.getPlatformIcon = function (_platform) {
            switch (_platform) {
                case "youtube":
                case "twitter":
                case "instagram":
                case "facebook":
                    return "img/"+_platform+".png";
            }

            return false;
        }

    }])
    .filter('capitalize', function() {
        return function(input, all) {
            var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
            return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
        }
    });