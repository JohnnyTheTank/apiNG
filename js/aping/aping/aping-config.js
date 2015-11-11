"use strict";

apingApp.config(function ($provide) {

    $provide.constant("apingApiKeys", {
        youtube : "AIzaSyAoZx2uwqnQ7WALp6lOuvWkBM6CfxCEJeA",
        instagram: "1414718379.a14e354.cff5dfd9d6224f62901835f0a50b1b1a",
        instagramClientId: "a14e354a00e7425eb2667f54ab86c136",
    });

    $provide.constant("apingDefaultSettings", {
        templateUrl : 'js/aping/templates/default/aping-default-template.html',
        items : 20,
        maxItems: 100,
        type: "social",
    });

});