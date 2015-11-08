apingObjects.service('requestResultObjectService', function () {
    this.getNew = function () {
        var requestResultObject = {
            errorObject: {},
            infoObject: {},
            outputObject: {},
        };

        return requestResultObject;
    }
});