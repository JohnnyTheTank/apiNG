"use strict";

angular.module("jtt_youtube", [])
    .factory('youtubeFactory', ['$http', 'youtubeSearchData',  function ($http, youtubeSearchData) {

        /**
         * Youtube JSON API
         *
         * Doku:                https://developers.google.com/youtube/v3/docs/
         * Api Explorer:        https://developers.google.com/apis-explorer/#p/youtube/v3/
         * Username Converter:  http://kid.yt.j.pfweb.eu/
         */

        var youtubeService = {};

        youtubeService.getVideosFromChannelById = function (_params) {

            var youtubeSearchData = youtubeSearchData.getNew("videosFromChannelById", _params);

            return $http({
                method: 'GET',
                url: youtubeSearchData.url,
                params: youtubeSearchData.object,
            });
        };

        youtubeService.getVideosFromSearchByString = function (_params) {

            var youtubeSearchData = youtubeSearchData.getNew("videosFromSearchByString", _params);

            return $http({
                method: 'GET',
                url: youtubeSearchData.url,
                params: youtubeSearchData.object,
            });
        };

        youtubeService.getVideosFromPlaylistById = function (_params) {

            var youtubeSearchData = youtubeSearchData.getNew("videosFromPlaylistById", _params);

            return $http({
                method: 'GET',
                url: youtubeSearchData.url,
                params: youtubeSearchData.object,
            });
        };

        youtubeService.getChannelById = function (_params) {
            var youtubeSearchData = youtubeSearchData.getNew("channelById", _params);

            return $http({
                method: 'GET',
                url: youtubeSearchData.url,
                params: youtubeSearchData.object,
            });
        };

        return youtubeService;
    }])

    .service('youtubeSearchData', function (_type, _params) {
        this.getNew = function(_object) {

            var youtubeSearchData = {
                object : {},
                url : "",
            };

            switch(_type) {
                case "videosFromChannelById":
                    youtubeSearchData.object = {
                        part: "id,snippet",
                        type: "video",
                        channelId: _params.channelId,
                        order: "date",
                        key: _params.key,
                        maxResults: _params.maxResults,
                    };

                    if (_params.searchString) {
                        youtubeSearchData.object.q = _params.searchString;
                    }

                    if (_params.pageToken) {
                        youtubeSearchData.object.pakeToken = _params.pageToken;
                    }

                    youtubeSearchData.url = "https://content.googleapis.com/youtube/v3/search?";
                    break;

                case "videosFromSearchByString":
                    youtubeSearchData.object = {
                        part: "id,snippet",
                        type: "video",
                        q: _params.searchString,
                        order: "date",
                        key: _params.key,
                        maxResults: _params.maxResults,
                    };

                    if (_params.pageToken) {
                        youtubeSearchData.object.pakeToken = _params.pageToken;
                    }

                    youtubeSearchData.url = "https://content.googleapis.com/youtube/v3/search?";
                    break;

                case "videosFromPlaylistById":
                    youtubeSearchData.object = {
                        art: "id,snippet",
                        type: "video",
                        playlistId: _params.playlistId,
                        key: _params.key,
                        maxResults: _params.maxResults,
                    };

                    if (_params.pageToken) {
                        youtubeSearchData.object.pakeToken = _params.pageToken;
                    }

                    youtubeSearchData.url = "https://content.googleapis.com/youtube/v3/playlistItems?";
                    break;

                case "channelById":
                    youtubeSearchData.object = {
                        part: "id,snippet",
                        type: "channel",
                        channelId: _params.channelId,
                        key: _params.key,
                        maxResults: _params.maxResults,
                    };

                    youtubeSearchData.url = "https://content.googleapis.com/youtube/v3/search?";
                    break;
            }


            return youtubeSearchObject;
        };
    });