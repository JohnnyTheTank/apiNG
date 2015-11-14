"use strict";
apingApp.config(['$provide', function ($provide) {

    $provide.constant("apingApiKeys", {
        youtube : "<YOUR_YOUTUBE_API_KEY>",
        instagram: "<YOUR_INSTAGRAM_API_KEY>",
        instagramClientId: "<YOUR_INSTAGRAM_CLIENT_ID>",
    });

    $provide.constant("apingDefaultSettings", {
        templateUrl : "<PATH_TO_YOUR_DEFAULT_DESIGN>",
        items : 20, //items per request
        maxItems: 100, //max items per aping
        orderBy : "timestamp",
        orderReverse : "true",
        type: "social",
    });

}]);