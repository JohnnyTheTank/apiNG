"use strict";

apingObjects.service('appConfigObjectService', function () {
    this.getNew = function () {

        var appConfigObject = {
            items: false,
            templateUrl: false,
            type: false,
            requestConfigObjects: [],
        };

        return appConfigObject;
    }

});