"use strict";

/**
 @author Jonathan Hornung (https://github.com/JohnnyTheTank)
 @url https://github.com/JohnnyTheTank/angular-instagram-api-factory
 @licence MIT
 */

angular.module("jtt_instagram", [])
    .factory('instagramFactory', ['$http', 'instagramSearchDataService', function ($http, instagramSearchDataService) {

        var instagramFactory = {};

        instagramFactory.getPostsFromUserById = function (_params) {

            var instagramSearchData = instagramSearchDataService.getNew("postsFromUserById", _params);

            return $http.jsonp(
                url,
                {
                    method: 'GET',
                    params: instagramSearchData,
                }
            );
        };

        return instagramFactory;
    }])
    .service('instagramSearchDataService', function () {
        this.getInstagramApiBaseUrl = function (_params) {
            return "https://api.instagram.com/v1/";
        };


        this.getNew = function (_type, _params) {

            var instagramSearchData = {
                object: {},
                url: "",
            };

            instagramSearchData.object = {
                access_token: _params.access_token,
                client_id: _params.client_id,
                callback: "JSON_CALLBACK"
            };

            switch (_type) {
                case "postsFromUserById":

                    instagramSearchData.object.count = _params.client_id;

                    if (typeof _params.max_id != 'undefined') {
                        instagramSearchData.object.max_id = _params.max_id;
                    }

                    if (typeof _params.min_id != 'undefined') {
                        instagramSearchData.object.min_id = _params.min_id;
                    }

                    if (typeof _params.min_timestamp != 'undefined') {
                        instagramSearchData.object.min_timestamp = _params.min_timestamp;
                    }

                    if (typeof _params.max_timestamp != 'undefined') {
                        instagramSearchData.object.max_timestamp = _params.max_timestamp;
                    }

                    var url = this.getInstagramApiBaseUrl()+"users/" + _params.userId + "/media/recent";

                    break;

            }

            return instagramSearchData;
        };
    });