"use strict";

angular.module('docs_models', ['docs_model',])
    .controller('docsModelsController', ['$scope', function ($scope) {

        $scope.$on('apiNG.resultMerged', function () {
            $scope.workingCopy = $scope.results;
        });

    }]);