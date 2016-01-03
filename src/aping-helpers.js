"use strict";

apingApp
    .service('apingTimeHelper', function () {

        /**
         * parse Timestamp from DateString and do some math
         *
         * @param _string {String}
         * @param _multiplier {number}
         * @param _add {number}
         * @returns {Number}
         */
        this.getTimestampFromDateString = function (_string, _multiplier, _add) {
            if (typeof _multiplier === "undefined" || isNaN(_multiplier)) {
                _multiplier = 1;
            }

            if (typeof _add === "undefined" || isNaN(_add)) {
                _add = 0;
            }

            if (typeof _string === "string") {
                var a = _string.split(/[^0-9]/);
                try {
                    return parseInt(Math.round(new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]) / 1000 * _multiplier) + _add, 10);
                } catch (e) {
                    return 0;
                }
            }
            return 0;
        };
    })
    .service('apingUtilityHelper', ['apingInputObjects', 'apingApiKeys', function (apingInputObjects, apingApiKeys) {

        /**
         * return random matching API Key from Constant "apingApiKeys". If there is no matching API Key, the function returns 'false'
         *
         * @param _platform {String}
         * @param _keyName {String}
         * @returns {String}
         */
        this.getApiCredentials = function (_platform, _keyName) {

            if (apingApiKeys) {
                if (apingApiKeys[_platform]) {
                    return apingApiKeys[_platform][Math.floor(Math.random() * apingApiKeys[_platform].length)][_keyName];
                }
            }
            return false;
        };

        /**
         * legacy function for this.parseRequestsFromAttributes()
         *
         * @param _string {String}
         * @param _platform {String}
         * @param _appSettings {Object}
         * @returns {Array}
         */
        this.parseJsonFromAttributes = function (_string, _platform, _appSettings) {
            return this.parseRequestsFromAttributes(_string, _platform, _appSettings);
        };

        /**
         * Parse JSON from Attributes and create requests
         *
         * @param _string {String}
         * @param _platform {String}
         * @param _appSettings {Object}
         * @returns {Array}
         */
        this.parseRequestsFromAttributes = function (_string, _platform, _appSettings) {

            if (!(typeof _string === "string" && _string)) {
                return [];
            }

            var requests = [];

            var tempArray = this.replaceSingleQuotesAndParseJson(_string);

            angular.forEach(tempArray, function (value, key) {

                value.platform = _platform;

                if (_appSettings) {
                    if (typeof value.items === "undefined" && typeof _appSettings.items !== "undefined") {
                        value.items = _appSettings.items;
                    }
                    if (typeof value.model === "undefined" && typeof _appSettings.model !== "undefined") {
                        value.model = _appSettings.model;
                    }
                }

                var request = apingInputObjects.getNew("request", value);
                requests.push(request);

            });

            return requests;
        };

        /**
         * replace single quotes in string and parse JSON
         *
         * @param _string {String}
         * @returns {Array/Object}
         */
        this.replaceSingleQuotesAndParseJson = function (_string) {
            return $.parseJSON(_string.replace(/'/g, '"'));
        };

        /**
         * filter function to sort an array by a property
         *
         * @param _property {Function}
         * @returns {Function}
         */
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

        /**
         * shuffle array
         *
         * @param _array {Array}
         * @returns {Array}
         */
        this.shuffleArray = function (_array) {
            for (var i = _array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = _array[i];
                _array[i] = _array[j];
                _array[j] = temp;
            }
            return _array;
        };


        /**
         * remove double objects from array
         *
         * @param _array {Array}
         * @param _keepOrder {Boolean}
         * @returns {Array}
         */
        this.removeDuplicateObjectsFromArray = function (_array, _keepOrder) {
            var sortedArray = [];

            var stringifyPropertyName = 'apingStringified';
            var orderPropertyName = 'apingTempOrder';

            if (_array.length === 1) {
                return _array;
            }

            $.each(_array, function (firstIndex, firstValue) {
                firstValue['$$hashKey'] = undefined;
                firstValue[stringifyPropertyName] = JSON.stringify(firstValue);

                if (_keepOrder === true) {
                    firstValue[orderPropertyName] = firstIndex;
                }
                sortedArray.push(firstValue);
            });

            sortedArray.sort(this.sortArrayByProperty(stringifyPropertyName));

            var lastValue;

            var reducedArray = [];
            $.each(sortedArray, function (secondIndex, secondValue) {
                if (typeof lastValue !== "undefined") {
                    if (typeof secondValue[stringifyPropertyName] !== "undefined" && secondValue[stringifyPropertyName] !== lastValue) {
                        reducedArray.push(secondValue);
                    }
                } else {
                    reducedArray.push(secondValue);
                }
                lastValue = secondValue[stringifyPropertyName];
                secondValue[stringifyPropertyName] = undefined;
            });

            if (_keepOrder === true) {
                sortedArray.sort(this.sortArrayByProperty(orderPropertyName));

                $.each(sortedArray, function (thirdIndex, thirdValue) {
                    thirdValue[orderPropertyName] = undefined;
                });
            }

            return reducedArray;
        };

        /**
         * Transforms html string to plain text
         *
         * @param _string {String}
         * @returns {String}
         */
        this.getTextFromHtml = function(_string) {
            _string = _string.replace(/&lt;br ?\/\>|&lt;br ?\/&rt;|\<br ?\/\>/g, " ");
            _string = _string.replace(/<(?:.|\n)*?>/gm, '');
            return _string;
        };

        /**
         * Parses images from html string
         *
         * @param _string
         * @returns {Array}
         */
        this.getImagesFromHtml = function (_string) {
            var m;
            var urls = [];
            var rex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;

            while ( m = rex.exec( _string ) ) {
                urls.push( m[1] );
            }

            return urls;
        };

        /**
         * Parses URL Parameters from ULR (string)
         *
         * @param _string {String}
         * @returns {Object}
         */
        this.parseParametersFromUrl = function (_string) {

            var result = {};

            if(typeof _string === 'string') {
                result = JSON.parse('{"' + decodeURI(_string.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');
            }

            return result;
        }
    }]);