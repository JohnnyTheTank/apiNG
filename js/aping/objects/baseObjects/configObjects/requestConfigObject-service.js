"use strict";

apingObjects.service('requestConfigObjectService', function () {
    this.getNew = function () {

        var requestConfigObject = {
            done: false,
            //items: false,
            //nextPage: false,
        };

        return requestConfigObject;
    }

});