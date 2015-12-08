"use strict";

angular.module('docs_model', [])
    .controller('docsModelController', ['$scope', function ($scope) {

        $scope.$on('apiNG.resultMerged', function () {
            $scope.workingCopy = $scope.results;
        });

    }]);