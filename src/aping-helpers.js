'use strict';
angular.module('jtt_aping')
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
            if (angular.isUndefined(_multiplier) || isNaN(_multiplier)) {
                _multiplier = 1;
            }
            if (angular.isUndefined(_add) || isNaN(_add)) {
                _add = 0;
            }
            if (typeof _string === 'string') {
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
    .service('apingUtilityHelper', ['apingInputObjects', 'apingDefaultSettings', function (apingInputObjects, apingDefaultSettings) {

        /**
         * return random matching API Key from apingDefaultSettings property 'apingApiKeys'. If there is no matching API Key, the function returns 'false'
         *
         * @param _platform {String}
         * @param _keyName {String}
         * @returns {String}
         */
        this.getApiCredentials = function (_platform, _keyName) {

            if (apingDefaultSettings.apingApiKeys) {
                if (apingDefaultSettings.apingApiKeys[_platform]) {
                    return apingDefaultSettings.apingApiKeys[_platform][Math.floor(Math.random() * apingDefaultSettings.apingApiKeys[_platform].length)][_keyName];
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
         * returns the difference between two integers
         *
         * @param _int1 {number}
         * @param _int2 {number}
         * @returns {number}
         */
        this.getDifference = function (_int1, _int2) {
            if (_int1 > _int2) {
                return _int1 - _int2;
            } else {
                return _int2 - _int1;
            }
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
            if (!(typeof _string === 'string' && _string)) {
                return [];
            }
            var requests = [];
            var tempArray = this.replaceSingleQuotesAndParseJson(_string);
            if (tempArray.constructor === Array) {
                angular.forEach(tempArray, function (value) {
                    value.platform = _platform;
                    if (_appSettings) {
                        if (angular.isUndefined(value.items) && angular.isDefined(_appSettings.items)) {
                            value.items = _appSettings.items;
                        }
                        if (angular.isUndefined(value.model) && angular.isDefined(_appSettings.model)) {
                            value.model = _appSettings.model;
                        }
                    }
                    var request = apingInputObjects.getNew('request', value);
                    requests.push(request);
                });
            } else {
                requests.push(tempArray);
            }
            return requests;
        };

        /**
         * replace single quotes in string and parse JSON
         *
         * @param _string {String}
         * @returns {Array/Object}
         */
        this.replaceSingleQuotesAndParseJson = function (_string) {
            return angular.fromJson(_string.replace(/'/g, '"'));
        };

        /**
         * filter function to sort an array by a property
         *
         * @param _property {Function}
         * @returns {Function}
         */
        this.sortArrayByProperty = function (_property) {
            var sortOrder = 1;
            if (_property[0] === '-') {
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
        this.removeNullIn = function (prop, obj) {
            var pr = obj[prop];
            if (pr === null || pr === undefined) delete obj[prop];
            else if (typeof pr === 'object') for (var i in pr) this.removeNullIn(i, pr);
        };
        this.removeNull = function (obj) {
            for (var i in obj) {
                this.removeNullIn(i, obj);
            }
        };

        /**
         * remove double objects from array
         *
         * @param _array {Array}
         * @param _keepOrder {Boolean}
         * @param _useApingId {Boolean}
         * @returns {Array}
         */
        this.removeDuplicateObjectsFromArray = function (_array, _keepOrder, _useApingId) {
            var sortedArray = [];
            var propertyName;
            if (_useApingId) {
                propertyName = 'aping_id'
            } else {
                propertyName = 'apingStringified';
            }
            var orderPropertyName = 'apingTempOrder';
            if (_array.length === 1) {
                return _array;
            }
            angular.forEach(_array, function (firstValue, firstIndex) {
                if (!_useApingId) {
                    firstValue['$$hashKey'] = undefined;
                    firstValue[propertyName] = JSON.stringify(firstValue);
                }
                if (_keepOrder === true) {
                    firstValue[orderPropertyName] = firstIndex;
                }
                sortedArray.push(firstValue);
            });
            sortedArray.sort(this.sortArrayByProperty(propertyName));
            var lastValue;
            var reducedArray = [];
            angular.forEach(sortedArray, function (secondValue) {
                if (angular.isDefined(lastValue)) {
                    if (angular.isDefined(secondValue[propertyName]) && secondValue[propertyName] !== lastValue) {
                        reducedArray.push(secondValue);
                    }
                } else {
                    reducedArray.push(secondValue);
                }
                lastValue = secondValue[propertyName];
                if (!_useApingId) {
                    secondValue[propertyName] = undefined;
                }
            });
            if (_keepOrder === true) {
                reducedArray.sort(this.sortArrayByProperty(orderPropertyName));
                angular.forEach(reducedArray, function (thirdValue) {
                    thirdValue[orderPropertyName] = undefined;
                });
            }
            return reducedArray;
        };


        /**
         * merge duplicate objects from array
         *
         * @param _array {Array}
         * @param _keepOrder {Boolean}
         * @returns {Array}
         */
        this.mergeDuplicateObjectsFromArray = function (_array, _keepOrder) {
            var that = this;
            var sortedArray = [];
            var propertyName = 'aping_id';
            var orderPropertyName = 'apingTempOrder';
            if (_array.length === 1) {
                return _array;
            }
            angular.forEach(_array, function (firstValue, firstIndex) {
                if (_keepOrder === true) {
                    firstValue[orderPropertyName] = firstIndex;
                }
                sortedArray.push(firstValue);
            });
            sortedArray.sort(this.sortArrayByProperty(propertyName));
            var lastValue;
            var mergedArray = [];
            angular.forEach(sortedArray, function (secondValue) {
                that.removeNull(secondValue);
                if (angular.isDefined(lastValue)) {
                    if (angular.isDefined(secondValue[propertyName]) && secondValue[propertyName] !== lastValue) {
                        mergedArray.push(secondValue);
                    } else {
                        mergedArray[mergedArray.length - 1] = angular.merge(mergedArray[mergedArray.length - 1], mergedArray[mergedArray.length - 1], secondValue);
                    }
                } else {
                    mergedArray.push(secondValue);
                }
                lastValue = secondValue[propertyName];
            });
            if (_keepOrder === true) {
                mergedArray.sort(this.sortArrayByProperty(orderPropertyName));
                angular.forEach(mergedArray, function (thirdValue) {
                    thirdValue[orderPropertyName] = undefined;
                });
            }
            return mergedArray;
        };

        /**
         * Transforms html string to plain text
         *
         * @param _string {String}
         * @returns {String}
         */
        this.getTextFromHtml = function (_string) {
            _string = _string.replace(/&lt;br ?\/\>|&lt;br ?\/&rt;|\<br ?\/\>/g, ' ');
            _string = _string.replace(/<(?:.|\n)*?>/gm, '');
            return _string;
        };

        /**
         * Parses first image from html string
         *
         * @param _string
         * @returns {Array}
         */
        this.getFirstImageFromHtml = function (_string) {
            var re = /<img[^>]+src="([^">]+)/g;
            return re.exec(_string);
        };

        /**
         * Parses URL Parameters from URL (string)
         *
         * @param _string {String}
         * @returns {Object}
         */
        this.parseParametersFromUrl = function (_string) {
            var result = {};
            if (typeof _string === 'string') {
                result = JSON.parse('{"' + decodeURI(_string.replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + '"}');
            }
            return result;
        };

        /**
         * Create ID property for each item in array by properties
         *
         * @param _array {Array}
         * @param _propertiesString {String}
         * @param _idString {String}
         * @returns {Array}
         */
        this.createIdByPropertiesForArray = function (_array, _propertiesString, _idString) {
            var that = this;
            if (angular.isUndefined(_idString) || !angular.isString(_idString)) {
                _idString = 'aping_id';
            }
            if (angular.isDefined(_array) && angular.isArray(_array)) {
                angular.forEach(_array, function (value) {
                    value[_idString] = that.getIdByPropertiesForObject(value, _propertiesString);
                });
            }
            return _array;
        };

        /**
         * Get ID by properties (for object)
         *
         * @param _object {Object}
         * @param _propertiesString {String}
         * @returns {String}
         */
        this.getIdByPropertiesForObject = function (_object, _propertiesString) {
            var that = this;
            var idString = '';
            if (angular.isDefined(_object) && angular.isObject(_object)) {
                var properties = [];
                if (_propertiesString.substr(0, 1) === '[') {
                    properties = this.replaceSingleQuotesAndParseJson(_propertiesString);
                } else {
                    properties.push(_propertiesString)
                }
                angular.forEach(properties, function (value) {
                    idString += that.getValueFromObjectByPropertyString(_object, value);
                });
            }
            return idString;
        };

        /**
         * Get value from object by property by string
         *
         * @param _object {Object}
         * @param _propertyString {String}
         * @param _resultObjectToString {String}
         * @returns {String}
         */
        this.getValueFromObjectByPropertyString = function (_object, _propertyString, _resultObjectToString) {
            var _value = '';
            if (angular.isDefined(_object) && angular.isObject(_object)) {
                var parts = _propertyString.split('.');
                var object = _object;
                angular.forEach(parts, function (value) {
                    if (angular.isDefined(object[value])) {
                        object = object[value];
                    }
                });
                if (angular.isDefined(object)) {
                    if (_resultObjectToString && angular.isObject(object)) {
                        _value = JSON.stringify(object);
                    } else {
                        _value = object;
                    }
                }
            }
            return _value;
        };

    }]);