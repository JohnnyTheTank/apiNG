/**
 * @name apiNG // api Directive for AngularJS
 * @version 0.1.0
 * @author: Hornung, Jonathan (jonathan.hornung@gmail.com)
 * @firstline : 2015/10/02
 * @lastupdate : 2015/10/03
 */

var apiNG = angular.module('apiNG', []);

apiNG.directive('aping', function() {
    return {
        restrict: 'A',
        replace: true,
        templateUrl:"templates/aping.template.html",
        scope: {
            platform: '@',
            identifier: '@',
        },
        controller: function($scope, tumblrTapir) {
            $scope.feed = [];

            var _configArray = [];
            var _configObject = {
                platform : $scope.platform,
                identifier : $scope.identifier,
                settings : {
                    items : 10
                }
            };

            _configArray.push(_configObject);

            $.each(_configArray, function( index, value ) {
                if(value.platform && value.identifier) {

                    switch (value.platform) {
                        case "tb":
                        case "tumblr":
                            return tumblrTapir.feed(value.identifier).success(function(rsp) {

                                var _feed;

                                if(rsp && rsp.response && rsp.response.posts) {
                                    _feed = rsp.response.posts;
                                }

                                return $scope.feed = _feed;
                            });
                            break;

                        // add more cases here, like tumblr and an new factory like "tumbrTapir"

                        default:
                            break;
                    }
                }
            });

        }
    };
});

apiNG.factory('tumblrTapir', function($http) {

    var params, path, _feed;
    params = function() {
        return "&callback=JSON_CALLBACK";
    };

    _feed = function(user) {
        return $http.jsonp('http://api.tumblr.com/v2/blog/'+user+'.tumblr.com/posts?filter=raw'+params());
    };

    return {
        feed: _feed,
    };

});
