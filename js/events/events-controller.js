"use strict";

eventsApp.controller('eventsController', function ($scope, $sce) {

    $scope.events = [
        {
            date: new Date("2015-10-19"),
            city: "München",
            location: "Ampere",
            link: "http://blabla"
        },
        {
            date: new Date("2015-10-20"),
            city: "Berlin",
            location: "Olympiastadion",
            link: "http://blabla"
        },
        {
            date: new Date("2015-10-23"),
            city: "Köln",
            location: "Galleria Arena",
            link: "http://blabla"
        },
    ];

    $scope.testHtmlString = "<b>test</b>";

    $scope.getHtml = function (string) {
        if(string) {
            return $sce.trustAsHtml(string);
        }
    }

});