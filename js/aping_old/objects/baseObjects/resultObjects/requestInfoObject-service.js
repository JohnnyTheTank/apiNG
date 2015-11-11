"use strict";

apingObjects.service('requestInfoObjectService', function () {
    this.getNew = function () {
        var infoObject = {
            nextPage: false,
        };

        return infoObject;
    }
});