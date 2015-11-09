"use strict";

apingSettings.service('appSettingsService', function (apingDefaultSettings, apiKeys) {
    this.getTemplateUrl = function() {
        return apingDefaultSettings.templateUrl;
    };

    this.getItems = function () {
        return apingDefaultSettings.items || 30;
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
    }

    this.setMode = function (_mode) {
        switch (_mode) {
            case "all":
            case "next":
            case "new":
            case "none":
                return _mode;
                break;
        }
        return "next";
    }

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