"use strict";

apingApp.service('apingInputObjects', ['apingDefaultSettings', function (apingDefaultSettings) {

    /**
     * * return new clean apiNG input object by _model and _params
     *
     * @param _model {String}
     * @param _params {Object}
     * @returns {Object}
     */
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