"use strict";

/**
 @author Jonathan Hornung (https://github.com/JohnnyTheTank)
 @url https://github.com/JohnnyTheTank/apiNG-youtube-plugin
 @licence MIT
 */

jjtApingYoutube.service('apingYoutubeHelper', ['apingModels', 'apingTimeHelper', 'apingUtilityHelper', function (apingModels, apingTimeHelper, apingUtilityHelper) {
    this.getThisPlattformString = function () {
        return "youtube";
    };

    this.getThisPlattformLink = function () {
        return "https://www.youtube.com/";
    };

    this.getObjectByJsonData = function (_data, _type) {
        var requestResults = [];
        if (_data) {
            var _this = this;
            if (_data.items) {
                angular.forEach(_data.items, function (value, key) {
                    requestResults.push(_this.getItemByJsonData(value, _type));
                });
            }
        }
        return requestResults;
    };

    this.getItemByJsonData = function (_item, _type) {
        var returnObject = {};
        if (_item && _type) {
            switch (_type) {
                case "social":
                    returnObject = this.getSocialItemByJsonData(_item);
                    break;
                case "video":
                    returnObject = this.getVideoItemByJsonData(_item);
                    break;
            }
        }
        return returnObject;
    };

    this.getSocialItemByJsonData = function (_item) {
        var socialObject = apingModels.getNew("social", "youtube");
        $.extend(true, socialObject, {
            blog_name: _item.snippet.channelTitle || false,
            blog_id: _item.snippet.channelId || false,
            blog_link: this.getThisPlattformLink()+"channel/" + _item.snippet.channelId,
            intern_type: _item.id.kind,
            date: _item.snippet.publishedAt,
            intern_id: _item.id.videoId || _item.snippet.resourceId.videoId,
            timestamp: apingTimeHelper.getTimestampFromDateString(_item.snippet.publishedAt, 1000, 7200),
        });
        if (_item.snippet.title !== "" && _item.snippet.description !== "") {
            socialObject.caption = _item.snippet.title;
            socialObject.text = _item.snippet.description;
        } else {
            if (_item.snippet.title !== "") {
                socialObject.caption = _item.snippet.title;
            } else {
                socialObject.caption = _item.snippet.description;
            }
        }
        if (_item.id.kind == "youtube#video") {
            socialObject.type = "video";
        } else if (_item.kind == "youtube#playlistItem" && _item.snippet.resourceId && _item.snippet.resourceId.kind == "youtube#video") {
            socialObject.type = "video";
            socialObject.position = _item.snippet.position;
        }
        socialObject.img_url = apingUtilityHelper.getYoutubeImageFromId(socialObject.intern_id);
        socialObject.post_url = this.getThisPlattformLink()+"watch?v=" + socialObject.intern_id;
        return socialObject;
    };

    this.getVideoItemByJsonData = function (_item) {
        var videoObject = apingModels.getNew("video", "youtube");
        $.extend(true, videoObject, {
            blog_name: _item.snippet.channelTitle || false,
            blog_id: _item.snippet.channelId || false,
            blog_link: this.getThisPlattformLink()+"channel/" + _item.snippet.channelId,
            intern_type: _item.id.kind,
            date: _item.snippet.publishedAt,
            intern_id: _item.id.videoId || _item.snippet.resourceId.videoId,
            timestamp: apingTimeHelper.getTimestampFromDateString(_item.snippet.publishedAt, 1000, 7200),
        });
        if (_item.snippet.title !== "" && _item.snippet.description !== "") {
            videoObject.caption = _item.snippet.title;
            videoObject.text = _item.snippet.description;
        } else {
            if (_item.snippet.title !== "") {
                videoObject.caption = _item.snippet.title;
            } else {
                videoObject.caption = _item.snippet.description;
            }
        }
        videoObject.img_url = apingUtilityHelper.getYoutubeImageFromId(videoObject.intern_id);
        videoObject.post_url = this.getThisPlattformLink()+"watch?v=" + videoObject.intern_id;
        videoObject.position = _item.snippet.position;
        videoObject.markup = '<iframe width="1280" height="720" src="https://www.youtube.com/embed/'+videoObject.intern_id+'?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>';

        return videoObject;
    };
}]);