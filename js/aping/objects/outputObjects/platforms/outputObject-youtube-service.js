"use strict";

apingObjects.service('outputObjectYoutubeService', function (socialObjectService, requestResultObjectService, requestInfoObjectService, timeHelper) {

    this.getObjectByJsonData = function (_data, _type) {

        var requestResultObject = requestResultObjectService.getNew();

        if (_data) {

            requestResultObject.errorObject = this.getErrorsByJsonData(_data);
            requestResultObject.infoObject = this.getInfoByJsonData(_data);

            var _this = this;

            if(_data.items) {
                angular.forEach(_data.items, function (yt, i) {
                    requestResultObject.outputObjects.push(_this.getItemByJsonData(yt, _type));
                });
            }
        }

        return requestResultObject;
    };

    this.getErrorsByJsonData = function (_data) {
        /* TODO errorobject */
    };

    this.getInfoByJsonData = function(_data) {

        var infoObject = requestInfoObjectService.getNew();

        if(_data.nextPageToken) {
            infoObject.nextPage = _data.nextPageToken;
        }

        return infoObject;
    };

    this.getItemByJsonData = function(_item, _type) {

        var returnObject = {};

        if(_item && _type) {
            switch(_type) {
                case "social":
                    returnObject = this.getSocialItemByJsonData(_item);
                    break;
            }
        }

        return returnObject;
    };

    this.getSocialItemByJsonData = function(_item) {
        var socialObject = socialObjectService.getNew();


        $.extend(true, socialObject, {
            blog_name : _item.snippet.channelTitle || _item.snippet.channelId || false,
            blog_id: _item.snippet.channelId || false,
            blog_link: "https://www.youtube.com/channel/" + _item.snippet.channelId,
            intern_type: _item.id.kind,
            date: _item.snippet.publishedAt,
            intern_id: _item.id.videoId || _item.snippet.resourceId.videoId,
            timestamp: timeHelper.getTimestampFromDateString(_item.snippet.publishedAt, 1000, 7200),
        });

        if(_item.snippet.title !== "" && _item.snippet.description !== "") {
            socialObject.caption = _item.snippet.title;
            socialObject.text = _item.snippet.description;
        } else {
            if(_item.snippet.title !== "") {
                socialObject.caption = _item.snippet.title;
            } else {
                socialObject.caption = _item.snippet.description;
            }
        }

        /*

         if(yt.id.kind == "youtube#video") {
         postObject.type = "video";
         } else if(yt.kind == "youtube#playlistItem" && yt.snippet.resourceId && yt.snippet.resourceId.kind == "youtube#video") {
         postObject.type = "video";
         }

         postObject.img_url = apingService.getYoutubeImageFromId(postObject.intern_id);
         postObject.post_url = "https://www.youtube.com/watch?v="+postObject.intern_id;


         _resultObject.entries.push(postObject);
         });
         */

        return socialObject;
    }

});