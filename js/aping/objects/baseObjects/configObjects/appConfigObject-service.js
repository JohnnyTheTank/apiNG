"use strict";

apingObjects.service('appConfigObjectService', function () {
    this.getNew = function () {

        var appConfigObject = {
            items: false,
            type: false,
            mode: "all",
            nextMode: "none",
            requestConfigObjects: [],
        };

        return appConfigObject;
    }

});