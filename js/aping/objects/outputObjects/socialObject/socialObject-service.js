"use strict";

apingObjects.service('socialObjectService', function (utilityHelper) {

    this.getNew = function(_platform) {
        var socialObject = {
            platform : _platform || false,
            request_id : utilityHelper.generateUniqueId(),
            blog_name : false,
            blog_id : false,
            blog_link : false,
            type : false,
            timestamp : false,
            post_url : false,
            intern_id : false,
            text : false,
            caption : false,
            img_url : false,
            img_isSmall : false,
            source : false,
            tag : false
        };

        return socialObject;
    }

});