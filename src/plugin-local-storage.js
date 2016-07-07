angular.module('jtt_aping_local_storage', [])
    .directive('apingLocalStorage', ['apingUtilityHelper', 'apingLocalStorage', function (apingUtilityHelper, apingLocalStorage) {
        return {
            require: '?aping',
            restrict: 'A',
            replace: 'false',
            link: function (scope, element, attrs, apingController) {

                var appSettings = apingController.getAppSettings();
                var requests = apingUtilityHelper.parseJsonFromAttributes(attrs.apingLocalStorage, 'localStorage', appSettings);

                requests.forEach(function (request) {

                    if (request.key) {
                        if (angular.isUndefined(request.items)) {
                            request.items = appSettings.items;
                        }

                        if (request.items === 0 || request.items === '0') {
                            return false;
                        }

                        // -1 is 'no explicit limit'. same for NaN value
                        if (request.items < 0 || isNaN(request.items)) {
                            request.items = undefined;
                        }

                        if (angular.isDefined(request.orderBy) && !angular.isString(request.orderBy)) {
                            request.orderBy = undefined;
                        }

                        if (angular.isDefined(request.orderReverse) && (request.orderReverse === true || request.orderReverse === 'true')) {
                            request.orderReverse = true;
                        }
                        apingLocalStorage.get(request.key)

                            .then(function (_data) {
                                var resultArray = [];
                                if (_data) {

                                    var results = _data;

                                    if (angular.isDefined(request.resultProperty)) {
                                        //results = _data.data[request.resultProperty];
                                        results = apingUtilityHelper.getValueFromObjectByPropertyString(_data, request.resultProperty, false);
                                    }

                                    if (!angular.isArray(_data)) {
                                        resultArray.push(results);
                                    } else {
                                        resultArray = results;

                                        if (angular.isDefined(request.orderBy)) {
                                            if (request.orderBy === '$RANDOM') {
                                                resultArray = apingUtilityHelper.shuffleArray(resultArray);
                                            } else {
                                                resultArray.sort(apingUtilityHelper.sortArrayByProperty(request.orderBy));
                                            }
                                        }
                                        //order desc
                                        if (angular.isDefined(request.orderReverse) && request.orderReverse === true && request.orderBy !== '$RANDOM') {
                                            resultArray.reverse();
                                        }

                                        if (angular.isUndefined(request.items)) {
                                            resultArray = results;
                                        } else {
                                            //crop spare
                                            if (request.items > 0 && resultArray.length > request.items) {
                                                resultArray = resultArray.splice(0, request.items);
                                            }
                                        }
                                    }
                                }
                                apingController.concatToResults(resultArray);
                            });
                    }
                });
            }
        }
    }])
    .factory('apingLocalStorage', ['$window', '$q', function ($window, $q) {

        var set = function (key, value) {
            var deferred = $q.defer();

            deferred.resolve($window.localStorage && $window.localStorage.setItem(key, angular.toJson(value)));

            return deferred.promise;
        };

        var get = function (key) {
            var deferred = $q.defer();

            deferred.resolve($window.localStorage && angular.fromJson($window.localStorage.getItem(key)));

            return deferred.promise;
        };

        return {
            set: set,
            get: get
        };
    }]);