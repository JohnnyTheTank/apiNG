"use strict";

apingApp.service('apingInputObjects', ['apingDefaultSettings', function (apingDefaultSettings) {

    this.getNew = function (_type, _params) {

        var inputObject = {};

        switch (_type) {
            case "request":
                inputObject = $.extend(true, {
                    type: apingDefaultSettings.type,
                    items: apingDefaultSettings.items,
                    //maxItems: apingDefaultSettings.maxItems,
                }, _params);
                break;

            default:
                break;
        }

        return inputObject;
    }
}]);