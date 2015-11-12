"use strict";

angular.module('aping-deadwood', ['angularVideoBg'])
    .controller('apingDeadwoodController', ['$scope', function($scope) {

        $scope.$on('resultMerged', function () {
            $scope.workingCopy = $scope.results;
        });

    }]);

