"use strict";

apingApp.service('apingInputObjects', ['apingDefaultSettings', function (apingDefaultSettings) {

    this.getNew = function (_model, _params) {

        var inputObject = {};

        switch (_model) {
            case "request":
                inputObject = $.extend(true, {
                    model: apingDefaultSettings.model,
                    items: apingDefaultSettings.items,
                }, _params);
                break;

            default:
                break;
        }

        return inputObject;
    }
}]);