"use strict";

apingApp
    .service('apingTimeHelper', function () {
        this.getTimestampFromDateString = function (_string, _multiplier, _add) {
            if (!_multiplier || isNaN(_multiplier)) {
                _multiplier = 1;
            }

            if (!_add || isNaN(_add)) {
                _add = 0;
            }

            if (_string) {
                var a = _string.split(/[^0-9]/);
                try {
                    return parseInt(Math.round(new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]) / 1000 * _multiplier) + _add);
                } catch (e) {
                }
            }
            return false;
        };
    })
    .service('apingUtilityHelper', ['apingInputObjects', 'apingApiKeys', function (apingInputObjects, apingApiKeys) {
        this.getApiCredentials = function (_platform, _keyName) {

            if(apingApiKeys) {
                if(apingApiKeys[_platform] && apingApiKeys[_platform][_keyName]) {
                    //return apingApiKeys[_platform][Math.floor(Math.random()*apingApiKeys[_platform].length)][_keyName];
                    return apingApiKeys[_platform][0][_keyName];
                }
            }
            return false;
        };


        this.parseJsonFromAttributes = function (_string, _platform, _appSettings) {

            if (!(typeof _string === "string" && _string)) {
                return [];
            }

            var requests = [];

            var tempArray = this.replaceSingleQuotesAndParseJson(_string);

            angular.forEach(tempArray, function (value, key) {

                value.platform = _platform;

                if (_appSettings) {
                    if (typeof value.items == "undefined" && typeof _appSettings.items != "undefined") {
                        value.items = _appSettings.items;
                    }
                    if (typeof value.model == "undefined" && typeof _appSettings.model != "undefined") {
                        value.model = _appSettings.model;
                    }
                }

                var request = apingInputObjects.getNew("request", value);
                requests.push(request);

            });

            return requests;
        };

        this.replaceSingleQuotesAndParseJson = function (_string) {
            return $.parseJSON(_string.replace(/'/g, '"'));
        };

        this.sortArrayByProperty = function (_property) {
            var sortOrder = 1;
            if (_property[0] === "-") {
                sortOrder = -1;
                _property = _property.substr(1);
            }
            return function (a, b) {
                var result = (a[_property] < b[_property]) ? -1 : (a[_property] > b[_property]) ? 1 : 0;
                return result * sortOrder;
            }
        };

    }]);