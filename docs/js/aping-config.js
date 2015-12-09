"use strict";

apingApp.config(['$provide', function ($provide) {

    $provide.constant("apingApiKeys", {});

    $provide.constant("apingDefaultSettings", {
        templateUrl : "js/design-docs/docs-template.html",
        items : 100, //items per request
        maxItems: -1, //max items per aping
        orderBy : false,
        model: "custom",
    });

}]);