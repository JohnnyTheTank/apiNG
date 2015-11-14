"use strict";

angular.module('aping-deadwood', ['angularVideoBg', 'yaru22.angular-timeago', 'linkify'])
    .controller('apingDeadwoodController', ['$scope', function($scope) {

        $scope.$on('resultMerged', function () {
            $scope.workingCopy = $scope.results;
        });

    }]);

