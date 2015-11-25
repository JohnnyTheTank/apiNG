"use strict";

/**
 @author Jonathan Hornung (https://github.com/JohnnyTheTank)
 @url https://github.com/JohnnyTheTank/angular-youtube-api-factory
 @licence MIT
 */

angular.module("jtt_youtube", [])
    .factory('youtubeFactory', ['$http', 'youtubeSearchDataService', function ($http, youtubeSearchDataService) {

        var youtubeFactory = {};

        youtubeFactory.getVideosFromChannelById = function (_params) {

            var youtubeSearchData = youtubeSearchDataService.getNew("videosFromChannelById", _params);

            return $http({
                method: 'GET',
                url: youtubeSearchData.url,
                params: youtubeSearchData.object,
            });
        };

        youtubeFactory.getVideosFromSearchByString = function (_params) {

            var youtubeSearchData = youtubeSearchDataService.getNew("videosFromSearchByString", _params);

            return $http({
                method: 'GET',
                url: youtubeSearchData.url,
                params: youtubeSearchData.object,
            });
        };

        youtubeFactory.getVideosFromPlaylistById = function (_params) {

            var youtubeSearchData = youtubeSearchDataService.getNew("videosFromPlaylistById", _params);

            return $http({
                method: 'GET',
                url: youtubeSearchData.url,
                params: youtubeSearchData.object,
            });
        };

        youtubeFactory.getChannelById = function (_params) {

            var youtubeSearchData = youtubeSearchDataService.getNew("channelById", _params);

            return $http({
                method: 'GET',
                url: youtubeSearchData.url,
                params: youtubeSearchData.object,
            });
        };

        return youtubeFactory;
    }])
    .service('youtubeSearchDataService', function () {
        this.getApiBaseUrl = function (_params) {
            return "https://content.googleapis.com/youtube/v3/";
        };

        this.getNew = function (_type, _params) {

            var youtubeSearchData = {
                object: {},
                url: "",
            };

            switch (_type) {
                case "videosFromChannelById":
                    youtubeSearchData.object = {
                        part: "id,snippet",
                        type: "video",
                        channelId: _params.channelId,
                        order: _params.order || "date",
                        key: _params.key,
                        maxResults: _params.maxResults || 20,
                    };

                    if (_params.q) {
                        youtubeSearchData.object.q = _params.q;
                    }

                    youtubeSearchData.url = this.getApiBaseUrl()+"search?";

                    if (_params.nextPageToken) {
                        youtubeSearchData.url += "pageToken="+_params.nextPageToken+"&";
                    }
                    break;

                case "videosFromSearchByString":
                    youtubeSearchData.object = {
                        part: "id,snippet",
                        type: "video",
                        q: _params.q,
                        order: _params.order || "date",
                        key: _params.key,
                        maxResults: _params.maxResults || 20,
                    };

                    youtubeSearchData.url = this.getApiBaseUrl()+"search?";
                    if (_params.nextPageToken) {
                        youtubeSearchData.url += "pageToken="+_params.nextPageToken+"&";
                    }
                    break;

                case "videosFromPlaylistById":
                    youtubeSearchData.object = {
                        part: "id,snippet",
                        type: "video",
                        playlistId: _params.playlistId,
                        key: _params.key,
                        maxResults: _params.maxResults || 20,
                    };

                    youtubeSearchData.url = this.getApiBaseUrl()+"playlistItems?";
                    if (_params.nextPageToken) {
                        youtubeSearchData.url += "pageToken="+_params.nextPageToken+"&";
                    }
                    break;

                case "channelById":
                    youtubeSearchData.object = {
                        part: "id,snippet",
                        type: "channel",
                        channelId: _params.channelId,
                        key: _params.key,
                        maxResults: _params.maxResults || 1,
                    };

                    youtubeSearchData.url = this.getApiBaseUrl()+"search?";
                    if (_params.nextPageToken) {
                        youtubeSearchData.url += "pageToken="+_params.nextPageToken+"&";
                    }
                    break;
            }

            return youtubeSearchData;
        };
    });