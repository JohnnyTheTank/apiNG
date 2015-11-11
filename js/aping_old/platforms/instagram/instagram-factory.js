"use strict";

jttInstagram.factory('instagramFactory', ['$http', 'apiKeys', 'apingService', 'defaultSettings', function ($http, apiKeys, apingService, defaultSettings) {

    /**
     * Instagram JSON API
     *
     * NOTE: only JSONP for our project possible
     *
     * Doku:                https://instagram.com/developer/endpoints/
     * Api Console:         https://apigee.com/console/instagram
     * Username Converter:  http://jelled.com/instagram/lookup-user-id
     */

    var instagramService = {};

    instagramService.getPostsFromUserById = function (_params) {

        var instagramRequestData = {
            access_token: apiKeys.instagram,
            client_id: apiKeys.instagramClientId,
            count: defaultSettings.items,
            callback: "JSON_CALLBACK"
        };

        var url = "https://api.instagram.com/v1/users/" + _params.userId + "/media/recent";

        return $http.jsonp(
            url,
            {
                method: 'GET',
                params: instagramRequestData,
            }
        );
    };

    instagramService.getVideoFeedObjectByJsonData = function (_data, _platformObject) {

        var _resultObject = {
            platform: false,
            entries: [],
        };


        angular.forEach(_data.data, function (ig, i) {
            var postObject = new feedEntry(_platformObject.name, _platformObject.uniqueId);


            /*
             this.blog_id = false;
             this.blog_link = false;
             this.intern_type = false;
             this.type = false;
             this.date = false;
             this.timestamp = false;
             this.post_url = false;
             this.intern_id = false;
             this.text = false;
             this.caption = false;
             this.content = false;
             this.content_url = false;
             this.img_url = false;
             this.img_isSmall = false;
             this.source = false;
             this.tags = false;
             this.tag = false;
             */

            $.extend( true, postObject, {
                blog_name : ig.user.full_name ? ig.user.full_name+ " (@"+ ig.user.username +")" : "@"+ig.user.username,
                blog_id : "@"+ig.user.username,
                blog_link : "https://instagram.com/"+ig.user.username,
                intern_type : ig.type,
                timestamp : parseInt(ig.created_time)*1000,
                post_url : ig.link,
                intern_id : ig.id,
                text : ig.caption ? ig.caption.text : false,
                tags : ig.tags,
                date: apingService.getConvertedTimestamp(ig.created_time),
            });

            if(postObject.text) {
                 postObject.text = apingService.replaceHashtagWithoutSpaces(postObject.text);
            }

            switch (ig.type) {
                case "image":
                    postObject.type = "image";
                    break;

                case "video":
                    postObject.type = "video";
                    postObject.source = ig.videos;
                    break;

                default:
                    break;
            }

            postObject.img_url = ig.images.standard_resolution.url;

            _resultObject.entries.push(postObject);
        });

        if(_data && _data.data) {
            if(_data.pagination && _data.pagination.next_url) {
                _platformObject.loadMore = _data.pagination.next_url;
            }
        }


        return _resultObject;
    };

    return instagramService;

}]);