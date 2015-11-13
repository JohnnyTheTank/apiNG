"use strict";

/**
 @author Jonathan Hornung (https://github.com/JohnnyTheTank)
 @url https://github.com/JohnnyTheTank/angular-instagram-api-factory
 @licence MIT
 */

angular.module("jtt_instagram", [])
    .factory('instagramFactory', ['$http', 'instagramSearchDataService', function ($http, instagramSearchDataService) {

        var instagramFactory = {};

        instagramFactory.getUserById = function (_params) {

            var instagramSearchData = instagramSearchDataService.getNew("userById", _params);

            return $http.jsonp(
                instagramSearchData.url,
                {
                    method: 'GET',
                    params: instagramSearchData.object,
                }
            );
        };

        instagramFactory.getPostsFromUserById = function (_params) {

            var instagramSearchData = instagramSearchDataService.getNew("postsFromUserById", _params);

            return $http.jsonp(
                instagramSearchData.url,
                {
                    method: 'GET',
                    params: instagramSearchData.object,
                }
            );
        };

        instagramFactory.getPostsByTag = function (_params) {

            var instagramSearchData = instagramSearchDataService.getNew("postsByTag", _params);

            return $http.jsonp(
                instagramSearchData.url,
                {
                    method: 'GET',
                    params: instagramSearchData.object,
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
                case "userById":
                    instagramSearchData.url = this.getInstagramApiBaseUrl()+"users/" + _params.userId;
                    break;

                case "postsFromUserById":

                    instagramSearchData.object.count = _params.count || 20;

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

                    instagramSearchData.url = this.getInstagramApiBaseUrl()+"users/" + _params.userId + "/media/recent";
                    break;

                case "postsByTag":

                    instagramSearchData.object.count = _params.count || 20;

                    if (typeof _params.max_tag_id != 'undefined') {
                        instagramSearchData.object.max_tag_id = _params.max_tag_id;
                    }

                    if (typeof _params.min_tag_id != 'undefined') {
                        instagramSearchData.object.min_tag_id = _params.min_tag_id;
                    }

                    if (typeof _params.min_timestamp != 'undefined') {
                        instagramSearchData.object.min_timestamp = _params.min_timestamp;
                    }

                    if (typeof _params.max_timestamp != 'undefined') {
                        instagramSearchData.object.max_timestamp = _params.max_timestamp;
                    }

                    instagramSearchData.url = this.getInstagramApiBaseUrl()+"tags/" + _params.tag + "/media/recent";
                    break;

            }

            return instagramSearchData;
        };
    });