"use strict";

tapirInstagram.factory('instagramService', ['$http', 'apiKeys', 'apingService', 'defaultSettings', function ($http, apiKeys, apingService, defaultSettings) {

    /**
     * Instagram JSON API
     *
     * NOTE: only JSONP for our project possible
     *
     * Doku:                https://instagram.com/developer/endpoints/
     * Api Console:         https://apigee.com/console/instagram
     * Username Converter:  http://jelled.com/instagram/lookup-user-id
     */

    var instagramService = {};

    instagramService.getPostsFromUserById = function (_userId) {



        var instagramRequestData = {
            access_token: apiKeys.instagram,
            client_id: apiKeys.instagramClientId,
            count: defaultSettings.items,
            callback: "JSON_CALLBACK"
        };

        var url = "https://api.instagram.com/v1/users/" + _userId + "/media/recent";

        return $http.jsonp(
            url,
            {
                method: 'GET',
                params: instagramRequestData,
            }
        );
    };

    return instagramService;

}]);