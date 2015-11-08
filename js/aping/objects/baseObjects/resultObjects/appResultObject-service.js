"use strict";

apingObjects.service('appResultObjectService', function () {
    this.getNew = function () {
        var appResultObject = {
            appConfig: {},
            platforms: [],
        };

        return appResultObject;
    };
});