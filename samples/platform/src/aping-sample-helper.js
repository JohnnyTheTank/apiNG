"use strict";

/**
 @author Jonathan Hornung (https://github.com/JohnnyTheTank)
 @url https://github.com/JohnnyTheTank/apiNG-sample-plugin
 @licence MIT
 */

jjtApingSample.service('apingSampleHelper', ['apingModels', 'apingTimeHelper', 'apingUtilityHelper', function (apingModels, apingTimeHelper, apingUtilityHelper) {
    this.getObjectByJsonData = function (_data, _type) {
        var requestResults = [];
        if (_data) {
            var _this = this;

            //replace '_data.items'
            if (_data.items) {

                //replace '_data.items'
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
        var socialModel = apingModels.getNew("social", "sample");

        //fill _item in socialObject

        return socialModel;
    };

    this.getVideoItemByJsonData = function (_item) {
        var videoModel = apingModels.getNew("video", "sample");

        //fill _item in videoObject

        return videoModel;
    };

    this.getImageItemByJsonData = function (_item) {
        var imageModel = apingModels.getNew("video", "sample");

        //fill _item in imageObject

        return imageModel;
    };
}]);