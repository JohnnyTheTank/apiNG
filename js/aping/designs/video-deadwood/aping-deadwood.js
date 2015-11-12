"use strict";

angular.module('aping-deadwood', ['angularVideoBg'])
    .controller('apingDeadwoodController', ['$scope', function($scope) {
        $scope.test = 'Hola!';

        $scope.malSehen = function () {
            console.log($scope.results);
        }
    }]);

