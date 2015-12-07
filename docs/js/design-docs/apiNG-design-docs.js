"use strict";

angular.module('jtt_aping_design_docs', [])
    .controller('apingDocsDesignController', ['$scope', function ($scope) {

        $scope.$on('apiNG.resultMerged', function () {
            $scope.workingCopy = $scope.results;
        });

    }]);