"use strict";
jjtApingSample.service('apingSampleHelper', ['apingOutputObjects', 'apingTimeHelper', 'apingUtilityHelper', function (apingOutputObjects, apingTimeHelper, apingUtilityHelper) {
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
                case "image":
                    returnObject = this.getImageItemByJsonData(_item);
                    break;
            }
        }
        return returnObject;
    };

    this.getSocialItemByJsonData = function (_item) {
        var socialObject = apingOutputObjects.getNew("social", "sample");

        //fill _item in socialObject

        return socialObject;
    };

    this.getVideoItemByJsonData = function (_item) {
        var videoObject = apingOutputObjects.getNew("video", "sample");

        //fill _item in socialObject

        return videoObject;
    };

    this.getImageItemByJsonData = function (_item) {
        var image = apingOutputObjects.getNew("video", "sample");

        //fill _item in socialObject

        return image;
    };
}]);