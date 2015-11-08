"use strict";

apingObjects.service('appConfigObjectService', function () {
    this.getNew = function () {
        return {
            items: false,
            templateUrl: false,
            type: false
        }
    }

});