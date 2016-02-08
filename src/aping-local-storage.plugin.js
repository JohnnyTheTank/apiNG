angular.module('jtt_aping_local_storage', [])
    .factory('localStorage', function ($window) {
        return {
            set: function (key, value) {
                $window.localStorage && $window.localStorage.setItem(key, value);
                return this;
            },
            get: function (key) {
                return $window.localStorage && $window.localStorage.getItem(key);
            }
        };
    });