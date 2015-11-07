"use strict";

apingObjects.service('socialObjectService', function () {

    this.getNewObject = function(_platform, _platform_id) {
        var socialObject = {
            platform : _platform || false,
            platform_id : _platform_id || false,
            blog_name : false,
            blog_id : false,
            blog_link : false,
            intern_type : false,
            type : false,
            date : false,
            timestamp : false,
            post_url : false,
            intern_id : false,
            text : false,
            caption : false,
            content : false,
            content_url : false,
            img_url : false,
            img_isSmall : false,
            source : false,
            tags : false,
            tag : false
        }

        return socialObject;
    }

});