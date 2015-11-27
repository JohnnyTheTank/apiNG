"use strict";

/**
 @author Jonathan Hornung (https://github.com/JohnnyTheTank)
 @url https://github.com/JohnnyTheTank/apiNG-instagram-plugin
 @licence MIT
 */

jjtApingInstagram.service('apingInstagramHelper', ['apingModels', 'apingTimeHelper', 'apingUtilityHelper', function (apingModels, apingTimeHelper, apingUtilityHelper) {
    this.getThisPlattformString = function () {
        return "instagram";
    };

    this.getThisPlattformLink = function () {
        return "https://instagram.com/";
    };

    this.getObjectByJsonData = function (_data, _type) {
        var requestResults = [];
        if (_data) {
            var _this = this;
            if (_data.data) {
                angular.forEach(_data.data, function (value, key) {

                    var item = _this.getItemByJsonData(value, _type);
                    if(item) {
                        requestResults.push(item);
                    }
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
                case "image":
                    returnObject = this.getImageItemByJsonData(_item);
                    break;
            }
        }
        return returnObject;
    };

    this.getSocialItemByJsonData = function (_item) {
        var socialObject = apingModels.getNew("social", this.getThisPlattformString());

        $.extend(true, socialObject, {
            blog_name: _item.user.full_name || "@" + _item.user.username,
            blog_id: "@" + _item.user.username,
            blog_link: this.getThisPlattformLink() + _item.user.username,
            intern_type: _item.type,
            timestamp: parseInt(_item.created_time) * 1000,
            post_url: _item.link,
            intern_id: _item.id,
            text: _item.caption ? _item.caption.text : false,
            tags: _item.tags,
            date: apingTimeHelper.getConvertedTimestamp(_item.created_time),
            likes: _item.likes ? _item.likes.count : false,
            comments: _item.comments ? _item.likes.comments : false,
        });

        socialObject.text = this.replaceHashtagWithoutSpaces(socialObject.text);

        switch (_item.type) {
            case "image":
                socialObject.type = "image";
                break;

            case "video":
                socialObject.type = "video";
                socialObject.source = _item.videos.standard_resolution.url;
                break;

            default:
                break;
        }

        socialObject.img_url = _item.images.standard_resolution.url;

        return socialObject;
    };

    this.getVideoItemByJsonData = function (_item) {

        if(_item.type != "video") {
            return false;
        }

        var videoObject = apingModels.getNew("video", this.getThisPlattformString());

        $.extend(true, videoObject, {
            blog_name: _item.user.full_name || "@" + _item.user.username,
            blog_id: "@" + _item.user.username,
            blog_link: this.getThisPlattformLink() + _item.user.username,
            intern_type: _item.type,
            timestamp: parseInt(_item.created_time) * 1000,
            post_url: _item.link,
            intern_id: _item.id,
            text: _item.caption ? _item.caption.text : false,
            tags: _item.tags,
            date: apingTimeHelper.getConvertedTimestamp(_item.created_time),
            likes: _item.likes ? _item.likes.count : false,
            comments: _item.comments ? _item.likes.comments : false,
            type: "video",
            source: _item.videos.standard_resolution ? _item.videos.standard_resolution.url : false,
        });

        videoObject.text = this.replaceHashtagWithoutSpaces(videoObject.text);

        videoObject.img_url = _item.images.standard_resolution.url;

        return videoObject;
    };

    this.getImageItemByJsonData = function (_item) {
        if(_item.type != "image") {
            return false;
        }

        var imageObject = apingModels.getNew("image", this.getThisPlattformString());
        $.extend(true, imageObject, {
            blog_name: _item.user.full_name || "@" + _item.user.username,
            blog_id: "@" + _item.user.username,
            blog_link: this.getThisPlattformLink() + _item.user.username,
            intern_type: _item.type,
            timestamp: parseInt(_item.created_time) * 1000,
            post_url: _item.link,
            intern_id: _item.id,
            text: _item.caption ? _item.caption.text : false,
            tags: _item.tags,
            date: apingTimeHelper.getConvertedTimestamp(_item.created_time),
            likes: _item.likes ? _item.likes.count : false,
            comments: _item.comments ? _item.likes.comments : false,
            type: "image",
        });

        imageObject.text = this.replaceHashtagWithoutSpaces(imageObject.text);
        imageObject.img_url = _item.images.standard_resolution.url;
        return imageObject;
    };

    this.replaceHashtagWithoutSpaces = function(_string) {
        if(_string && $.type(_string) === "string") {
            _string = _string.replace(/#/g, " #");
            _string = _string.replace(/  #/g, " #");
        }
        return _string;
    }
}]);