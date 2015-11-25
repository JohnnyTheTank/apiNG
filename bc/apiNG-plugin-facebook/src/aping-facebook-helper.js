"use strict";

/**
 @author Jonathan Hornung (https://github.com/JohnnyTheTank)
 @url https://github.com/JohnnyTheTank/apiNG-plugin-facebok
 @licence MIT
 */

jjtApingFacebook.service('apingFacebookHelper', ['apingModels', 'apingTimeHelper', 'apingUtilityHelper', function (apingModels, apingTimeHelper, apingUtilityHelper) {
    this.getThisPlattformString = function () {
        return "facebook";
    };

    this.getThisPlattformLink = function () {
        return "https://facebook.com/";
    };
    this.getObjectByJsonData = function (_data, _type) {
        var requestResults = [];
        if (_data) {
            var _this = this;

            if (_data.data) {

                angular.forEach(_data.data, function (value, key) {
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
                case "image":
                    returnObject = this.getImageItemByJsonData(_item);
                    break;
                case "event":
                    returnObject = this.getEventItemByJsonData(_item);
                    break;
            }
        }
        return returnObject;
    };

    this.getSocialItemByJsonData = function (_item) {
        var socialObject = apingModels.getNew("social", this.getThisPlattformString());

        $.extend(true, socialObject, {
            blog_name: _item.from.name,
            blog_id: _item.from.id,
            blog_link: this.getThisPlattformLink() + _item.from.id + "/",
            intern_type: _item.type,
            intern_id: _item.id,
            img_url: _item.full_picture,
            timestamp: apingTimeHelper.getTimestampFromDateString(_item.created_time, 1000, 3600*1000)
        });


        switch (_item.type) {
            case 'photo':
                socialObject.type = "image";
                socialObject.post_url = _item.link;
                socialObject.text = _item.message;
                break;

            case 'status':
                socialObject.type = "post";
                break;

            case 'link':
                socialObject.type = "link";
                socialObject.post_url = this.getThisPlattformLink() + _item.id + "/";
                socialObject.content_url = _item.link;
                socialObject.caption = _item.name;
                break;

            case 'video':
                socialObject.type = "video";
                if (_item.name) {
                    socialObject.caption = _item.name;
                }
                break;

            case 'event':
                socialObject.type = "event";
                socialObject.text = _item.description;
                socialObject.caption = _item.caption || _item.name || false;
                break;
        }

        if (!socialObject.text) {
            socialObject.text = _item.message;
        }

        if (!socialObject.text) {
            socialObject.text = _item.name;
        }


        if (!socialObject.post_url) {
            if (!_item.id) {
                socialObject.post_url = _item.link;
            } else {
                socialObject.post_url = this.getThisPlattformLink() + _item.id + "/";
            }
        }


        return socialObject;
    };

    this.getVideoItemByJsonData = function (_item) {
        var videoObject = apingModels.getNew("video", this.getThisPlattformString());

        $.extend(true, videoObject, {
            blog_name: _item.from.name,
            blog_id: _item.from.id,
            blog_link: this.getThisPlattformLink() + _item.from.id + "/",
            intern_id: _item.id,
            post_url: _item.permalink_url,
            timestamp: apingTimeHelper.getTimestampFromDateString(_item.created_time, 1000, 3600*1000),
            text: _item.description,
            markup: _item.embed_html || false,
            source: _item.source || false,
        });


        if (_item.format.length > 0) {

            if (_item.format.length >= 3) {
                videoObject.img_url = _item.format[2].picture;
            } else {
                videoObject.img_url = _item.format[_item.format.length - 1].picture;
            }
        }

        return videoObject;
    };

    this.getImageItemByJsonData = function (_item) {
        var imageObject = apingModels.getNew("image", this.getThisPlattformString());


        $.extend(true, imageObject, {
            blog_name: _item.from.name,
            blog_id: _item.from.id,
            blog_link: this.getThisPlattformLink() + _item.from.id + "/",
            intern_id: _item.id,
            post_url: _item.link,
            timestamp: apingTimeHelper.getTimestampFromDateString(_item.created_time, 1000, 3600*1000),
            text: _item.name || false,
            source: _item.images || false,
        });

        if (_item.images.length > 0) {
            if (_item.images.length >= 7) {
                imageObject.img_url = _item.images[2].source;
            } else {
                imageObject.img_url = _item.images[0].source;
            }
        }

        return imageObject;
    };

    this.getEventItemByJsonData = function (_item) {
        var eventObject = apingModels.getNew("event", this.getThisPlattformString());

        $.extend(true, eventObject, {
            blog_name: _item.owner.name,
            blog_id: _item.owner.id,
            blog_link: this.getThisPlattformLink() + _item.owner.id + "/",
            intern_id: _item.id,
            event_url: this.getThisPlattformLink() + _item.owner.id + "_" + _item.id + "/",
            ticket_url: _item.ticket_uri || false,
            start_timestamp: apingTimeHelper.getTimestampFromDateString(_item.start_time, 1000, 3600*1000),
            end_timestamp: _item.end_time ? apingTimeHelper.getTimestampFromDateString(_item.end_time, 1000, 3600*1000) : false,
            caption: _item.name || false,
            text: _item.description || false,
            img_url: _item.cover ? _item.cover.source : false,
        });

        if (_item.place) {
            eventObject.place_name = _item.place.name || false;
            if (_item.place.location) {
                eventObject.city = _item.place.location.city || false;
                eventObject.country = _item.place.location.country || false;
                eventObject.latitude = _item.place.location.latitude || false;
                eventObject.longitude = _item.place.location.longitude || false;
                eventObject.street = _item.place.location.street || false;
                eventObject.zip = _item.place.location.zip || false;
            }
        }

        return eventObject;
    };
}]);