'use strict';

angular.module('jtt_aping').service('apingInputObjects', ['apingDefaultSettings', function (apingDefaultSettings) {

    /**
     * * return new clean apiNG input object by _type and _params
     *
     * @param _type {String}
     * @param _params {Object}
     * @returns {Object}
     */
    this.getNew = function (_type, _params) {

        var inputObject = {};

        switch (_type) {
            case 'request':
                inputObject = angular.extend({
                    model: apingDefaultSettings.model
                }, _params);
                break;

            default:
                break;
        }

        return inputObject;
    }
}]);