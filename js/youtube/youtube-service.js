"use strict";

tapirYoutube.factory('youtubeService', ['$http', 'apiKeys', 'apingService', 'defaultSettings', function ($http, apiKeys, apingService, defaultSettings) {

    var youtubeService = {};

    youtubeService.getVideosFromChannelById = function (_channelId, _searchString) {

        //http://kid.yt.j.pfweb.eu/

        var youtubeSearchObject = {
            part: "id,snippet",
            type: "video",
            channelId: _channelId,
            order: "date",
            key: apiKeys.youtube,
            maxResults: defaultSettings.items,
        };

        if(_searchString) {
            youtubeSearchObject.q = _searchString;
        }

        return $http({
            method: 'GET',
            url: "https://content.googleapis.com/youtube/v3/search?",
            params: youtubeSearchObject,
        });
    };

    youtubeService.getVideosFromSearchByString = function (_searchString) {
        var youtubeSearchObject = {
            part: "id,snippet",
            type: "video",
            q: _searchString,
            order: "date",
            key: apiKeys.youtube,
            maxResults: defaultSettings.items,
        };

        return $http({
            method: 'GET',
            url: "https://content.googleapis.com/youtube/v3/search?",
            params: youtubeSearchObject,
        });
    };

    youtubeService.getVideosFromPlaylistById = function(_playlistId) {


        var youtubeSearchObject = {
            part: "id,snippet",
            type: "video",
            playlistId: _playlistId,
            key: apiKeys.youtube,
            maxResults: defaultSettings.items,
        };

        return $http({
            method: 'GET',
            url: "https://content.googleapis.com/youtube/v3/playlistItems?",
            params: youtubeSearchObject,
        });
    };

    youtubeService.getChannelById = function (_channelId) {
        var youtubeSearchObject = {
            part: "id,snippet",
            type: "channel",
            channelId: _channelId,
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

        var plattformObject = new plattformEntry("youtube", apingService.generateUniqueId());

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

            $.extend(true, plattformObject, {
                intern_id: channel.id.channelId,
                type: "channel",
                intern_type: channel.id.kind,
                avatar_url: channel.snippet.thumbnails.high.url || false,
                title: channel.snippet.title || channel.snippet.channelTitle || false,
                url:  "https://www.youtube.com/channel/" + channel.id.channelId,
            });


        }
        return plattformObject;
    };

    youtubeService.getVideoFeedObjectByJsonData = function (_data, _plattformObject) {

        //var plattformObject = new plattformEntry("youtube", apingService.generateUniqueId());

        var _resultObject = [];

        if (_data && _data.items) {


            angular.forEach(_data.items, function (yt, i) {
                var postObject = new feedEntry(_plattformObject.name, _plattformObject.uniqueId);

                $.extend(true, postObject, {
                    blog_name : _plattformObject.title || yt.snippet.channelTitle || yt.snippet.channelId || false,
                    blog_id: _plattformObject.intern_id || yt.snippet.channelId || false,
                    blog_link: _plattformObject.url || "https://www.youtube.com/channel/" + yt.snippet.channelId,
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


                _resultObject.push(postObject);
            });

        }

        return _resultObject;
    };


    return youtubeService;
}]);