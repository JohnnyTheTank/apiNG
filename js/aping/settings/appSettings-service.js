"use strict";

apingSettings.service('appSettingsService', function (apingDefaultSettings) {
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

});