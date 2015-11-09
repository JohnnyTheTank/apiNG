"use strict";

apingObjects.service('appConfigObjectService', function () {
    this.getNew = function () {

        var appConfigObject = {
            items: false,
            type: false,
            requestConfigObjects: [],
        };

        return appConfigObject;
    }

});