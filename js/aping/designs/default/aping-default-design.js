"use strict";

angular.module('aping-main-design', ['yaru22.angular-timeago', 'linkify'])
    .controller('apingDefaultDesignController', ['$scope', function($scope) {

        $scope.$on('resultMerged', function () {
            $scope.workingCopy = $scope.results;
        });

    }]);

