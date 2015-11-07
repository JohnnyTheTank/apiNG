"use strict";

jttYoutube.factory('youtubeFactory', ['$http', 'apiKeys', 'apingService', 'defaultSettings', function ($http, apiKeys, apingService, defaultSettings) {

    /**
     * Youtube JSON API
     *
     * Doku:                https://developers.google.com/youtube/v3/docs/
     * Api Explorer:        https://developers.google.com/apis-explorer/#p/youtube/v3/
     * Username Converter:  http://kid.yt.j.pfweb.eu/
     */

    var youtubeService = {};

    youtubeService.getVideosFromChannelById = function (_params) {

        var youtubeSearchObject = {
            part: "id,snippet",
            type: "video",
            channelId: _params.channelId,
            order: "date",
            key: apiKeys.youtube,
            maxResults: defaultSettings.items,
        };


        if(_params.searchString) {
            youtubeSearchObject.q = _params.searchString;
        }

        if(_params.pageToken) {
            youtubeSearchObject.pakeToken = _params.pageToken;
        }

        return $http({
            method: 'GET',
            url: "https://content.googleapis.com/youtube/v3/search?",
            params: youtubeSearchObject,
        });
    };

    youtubeService.getVideosFromSearchByString = function (_params) {
        var youtubeSearchObject = {
            part: "id,snippet",
            type: "video",
            q: _params.searchString,
            order: "date",
            key: apiKeys.youtube,
            maxResults: defaultSettings.items,
        };

        if(_params.pageToken) {
            youtubeSearchObject.pakeToken = _params.pageToken;
        }

        return $http({
            method: 'GET',
            url: "https://content.googleapis.com/youtube/v3/search?",
            params: youtubeSearchObject,
        });
    };

    youtubeService.getVideosFromPlaylistById = function(_params) {


        var youtubeSearchObject = {
            part: "id,snippet",
            type: "video",
            playlistId: _params.playlistId,
            key: apiKeys.youtube,
            maxResults: defaultSettings.items,
        };

        if(_params.pageToken) {
            youtubeSearchObject.pakeToken = _params.pageToken;
        }

        return $http({
            method: 'GET',
            url: "https://content.googleapis.com/youtube/v3/playlistItems?",
            params: youtubeSearchObject,
        });
    };

    youtubeService.getChannelById = function (_params) {
        var youtubeSearchObject = {
            part: "id,snippet",
            type: "channel",
            channelId: _params.channelId,
            key: apiKeys.youtube,
            maxResults: 1,
        };

        return $http({
            method: 'GET',
            url: "https://content.googleapis.com/youtube/v3/search?",
            params: youtubeSearchObject,
        });
    };

    youtubeService.getChannelObjectByJsonData = function (_data) {

        var platformObject = new platformEntry("jtt_youtube", apingService.generateUniqueId());

        if(_data && _data.items && _data.items[0] && _data.items[0].snippet){
            var channel = _data.items[0];

            /*
             this.ready = false;
             this.feed = false;
             this.error = false;
             this.configError = false;
             this.noEntries = false;
             this.errorMessage = false;
             */

            $.extend(true, platformObject, {
                intern_id: channel.id.channelId,
                type: "channel",
                intern_type: channel.id.kind,
                avatar_url: channel.snippet.thumbnails.high.url || false,
                title: channel.snippet.title || channel.snippet.channelTitle || false,
                url:  "https://www.youtube.com/channel/" + channel.id.channelId,
            });


        }
        return platformObject;
    };

    youtubeService.getVideoFeedObjectByJsonData = function (_data, _platformObject) {

        var _resultObject = {
            platform: false,
            entries: [],
        };

        if (_data && _data.items) {

            if(_data.nextPageToken) {
                _platformObject.loadMore = _data.nextPageToken;
            }

            angular.forEach(_data.items, function (yt, i) {
                var postObject = new feedEntry(_platformObject.name, _platformObject.uniqueId);

                $.extend(true, postObject, {
                    blog_name : _platformObject.title || yt.snippet.channelTitle || yt.snippet.channelId || false,
                    blog_id: _platformObject.intern_id || yt.snippet.channelId || false,
                    blog_link: _platformObject.url || "https://www.youtube.com/channel/" + yt.snippet.channelId,
                    intern_type: yt.id.kind,
                    date: yt.snippet.publishedAt,
                    intern_id: yt.id.videoId || yt.snippet.resourceId.videoId,
                    timestamp: apingService.getTimestampFromDateString(yt.snippet.publishedAt, 1000, 7200),
                });

                if(yt.snippet.title !== "" && yt.snippet.description !== "") {
                    postObject.caption = yt.snippet.title;
                    postObject.text = yt.snippet.description;
                } else {
                    if(yt.snippet.title !== "") {
                        postObject.caption = yt.snippet.title;
                    } else {
                        postObject.caption = yt.snippet.description;
                    }
                }

                if(yt.id.kind == "youtube#video") {
                    postObject.type = "video";
                } else if(yt.kind == "youtube#playlistItem" && yt.snippet.resourceId && yt.snippet.resourceId.kind == "youtube#video") {
                    postObject.type = "video";
                }

                postObject.img_url = apingService.getYoutubeImageFromId(postObject.intern_id);
                postObject.post_url = "https://www.youtube.com/watch?v="+postObject.intern_id;


                _resultObject.entries.push(postObject);
            });

        }

        _resultObject.platform = _platformObject;

        return _resultObject;
    };


    return youtubeService;
}]);