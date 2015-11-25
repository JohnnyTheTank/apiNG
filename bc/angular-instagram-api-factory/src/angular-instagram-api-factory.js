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
        this.getApiBaseUrl = function (_params) {
            return "https://api.instagram.com/v1/";
        };

        this.fillDataInObjectByList = function(_object, _params, _list) {

            angular.forEach(_list, function (value, key) {
                if(typeof _params[value] !== "undefined") {
                    _object.object[value] = _params[value];
                }
            });

            return _object;
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
                    instagramSearchData.url = this.getApiBaseUrl()+"users/" + _params.userId;
                    break;

                case "postsFromUserById":

                    instagramSearchData.object.count = _params.count || 20;

                    instagramSearchData = this.fillDataInObjectByList(instagramSearchData, _params, [
                        'max_id', 'min_id', 'min_timestamp', 'max_timestamp'
                    ]);

                    instagramSearchData.url = this.getApiBaseUrl()+"users/" + _params.userId + "/media/recent";
                    break;

                case "postsByTag":

                    instagramSearchData.object.count = _params.count || 20;

                    instagramSearchData = this.fillDataInObjectByList(instagramSearchData, _params, [
                        'max_tag_id', 'min_tag_id', 'min_timestamp', 'max_timestamp'
                    ]);

                    instagramSearchData.url = this.getApiBaseUrl()+"tags/" + _params.tag + "/media/recent";
                    break;

            }

            return instagramSearchData;
        };
    });