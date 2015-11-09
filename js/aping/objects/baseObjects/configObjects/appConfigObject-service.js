"use strict";

apingObjects.service('appConfigObjectService', function () {
    this.getNew = function () {

        var appConfigObject = {
            items: false,
            maxItems: false,
            type: false,
            mode: false,
            interval: false,
            nextMode: "none",
            requestConfigObjects: [],
        };

        return appConfigObject;
    }

});