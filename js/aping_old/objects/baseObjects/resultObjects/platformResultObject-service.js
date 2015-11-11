"use strict";

apingObjects.service('platformResultObjectService', function () {
    this.getNew = function () {
        var platformResultObject = {
            requestObjects: []
        };

        return platformResultObject;
    }
});