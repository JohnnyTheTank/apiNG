"use strict";

apingSettings.service('requestSettingsService', function () {
    this.parseRequestConfigsFromJson = function (_string, _platform) {
        /* TODO check for type=string */

        var requestConfigs = [];

        if(_string) {
            requestConfigs = $.parseJSON(_string.replace(/'/g, '"'));

            angular.forEach(requestConfigs, function (value, key) {
                value.platform = _platform;
            });
        }
        return requestConfigs;
    };
});