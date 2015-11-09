"use strict";

apingSettings.service('appSettingsService', function (apingDefaultSettings, apiKeys) {
    this.getTemplateUrl = function() {
        return apingDefaultSettings.templateUrl;
    };

    this.getItems = function (_items) {
        var items = 20;

        if(!isNaN(_items) && _items >= 1) {
            items = _items;
        } else {
            items = apingDefaultSettings.items || items
        }

        return items;
    };

    this.getMaxItems = function (_maxItems) {
        var maxItems = 100;

        if(!isNaN(_maxItems) && _maxItems >= 1) {
            maxItems = _maxItems;
        } else {
            maxItems = apingDefaultSettings.maxItems || maxItems
        }

        return maxItems;
    };

    this.getInterval = function (_interval) {
        var interval = 100;

        if(!isNaN(_interval) && _interval >= 1) {
            interval = _interval;
        } else {
            interval = apingDefaultSettings.interval || interval
        }

        return interval;
    };



    this.getType = function (_type) {
        switch (_type) {
            case "social":
            case "video":
            case "audio":
            case "event":
            case "picture":
            case "channel":
                return _type;
                break;
        }
        return apingDefaultSettings.type || "social";
    };


    this.getYoutube = function(_string) {
        /* TODO check for type=string */
        if(_string) {
            return $.parseJSON(_string.replace(/'/g, '"'));
        }
        return apingDefaultSettings.yt || [];
    };



    this.getApiKeys = function () {
        if(apiKeys) {
            return apiKeys;
        }
        return false;

    };

    this.getApiKey = function (_platformName) {
        var _apiKeys = this.getApiKeys();

        if(_apiKeys) {
            if(_apiKeys[_platformName]) {
                return _apiKeys[_platformName];
            }
        }
        return false;
    };

    this.getMode = function (_mode) {
        switch (_mode) {
            case "this":
            case "all":
            case "next":
            case "new":
            case "none":
                return _mode;
                break;
        }
        return "this";
    };

    this.setNextMode = function (_mode) {
        switch (_mode) {
            case "all":
            case "next":
            case "new":
            case "none":
                return _mode;
                break;
        }
        return "none";
    }

});