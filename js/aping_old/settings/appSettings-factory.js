"use strict";

apingSettings.factory('AppSettings', ['apingDefaultSettings', function (apingDefaultSettings) {

    var AppSettings = function () {
        this._type = apingDefaultSettings.type || "social";
        this._items = apingDefaultSettings.items || 20;
        this._maxItems = apingDefaultSettings.maxItems || 100;
    };

    AppSettings.prototype.type = function (_type) {
        var self = this;

        if (typeof _type === "undefined") {
            return self._type;
        }

        switch (_type) {
            case "social":
            case "video":
            case "audio":
            case "event":
            case "picture":
            case "channel":
                self._type = _type;
                break;

            default:
                self._type = "social";
        }
    };

    return AppSettings;
}]);