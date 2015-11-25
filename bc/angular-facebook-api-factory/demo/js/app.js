var app = angular.module("app", ['jtt_facebook']);
app.controller('controller', ['$scope', 'facebookFactory', function($scope, facebookFactory) {

    var _acces_token = "<YOUR_FACEBOOK_ACCESS_TOKEN>"

    facebookFactory.getPostsFromPageById({
        page:"147615681968982",
        limit:20,
        access_token:_acces_token,
    }).success(function(_data){
        console.log("posts");
        console.log(_data);
    });

    facebookFactory.getPhotosFromPageById({
        page:"147615681968982",
        limit:20,
        access_token:_acces_token,
    }).success(function(_data){
        console.log("photos");
        console.log(_data);
    });

    facebookFactory.getVideosFromPageById({
        page:"147615681968982",
        limit:20,
        access_token:_acces_token,
    }).success(function(_data){
        console.log("videos");
        console.log(_data);
    });

    facebookFactory.getEventsFromPageById({
        page:"147615681968982",
        limit:20,
        access_token:_acces_token,
    }).success(function(_data){
        console.log("events");
        console.log(_data);
    });

    facebookFactory.getPageById({
        page:"147615681968982",
        access_token:_acces_token,
    }).success(function(_data){
        console.log("page");
        console.log(_data);
    });

}]);
