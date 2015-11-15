"use strict";
apingApp.service('apingOutputObjects', [function () {
    this.getNew = function(_type, _platform) {
        var outputObject = {};
        switch(_type) {
            case "social":
                outputObject = {
                    platform : _platform, //NAME of platform ( "youtube" / "facebook", "instagram" , ...)
                    blog_name : false, //NAME of blog (channel / youtube uploader / facebook page, instagram account, ..)
                    blog_id : false, //ID of channel / page / account, ...
                    blog_link : false, //link to channel / uploader / page / account, ...
                    type : false, //"video", "image", "post", "audio", "link", "event", ...
                    timestamp : false,
                    post_url : false, //URL to the post / video / tweet ...
                    intern_id : false, // INTERN ID of post / video / tweet / ... (facebook id, youtube id, ...)
                    text : false,
                    caption : false,
                    img_url : false,
                    img_isSmall : false, //TRUE if image is small (like facebook 150px)
                    source : false, //
                    likes: false,
                    shares: false,
                    comments: false,
                    position: false,
                };
                break;

            case "video":
                outputObject = {
                    platform : _platform, //NAME of platform ( "youtube" / "facebook", "instagram" , ...)
                    blog_name : false, //NAME of blog (channel / youtube uploader / facebook page, instagram account, ..)
                    blog_id : false, //ID of channel / page / account, ...
                    blog_link : false, //link to channel / uploader / page / account, ...
                    timestamp : false,
                    post_url : false, //URL to the post / video / tweet ...
                    intern_id : false, // INTERN ID of video (facebook id, youtube id, ...)
                    text : false,
                    caption : false,
                    img_url : false,
                    img_isSmall : false, //TRUE if image is small (like facebook 150px)
                    source : false, //
                    markup: false,
                    likes: false,
                    shares: false,
                    comments: false,
                    position: false,
                };
                break;

            case "image":
                outputObject = {
                    platform : _platform, //NAME of platform ( "youtube" / "facebook", "instagram" , ...)
                    blog_name : false, //NAME of blog (channel / youtube uploader / facebook page, instagram account, ..)
                    blog_id : false, //ID of channel / page / account, ...
                    blog_link : false, //link to channel / uploader / page / account, ...
                    timestamp : false,
                    post_url : false, //URL to the post / video / tweet ...
                    intern_id : false, // INTERN ID of image (facebook id, instagram id, ...)
                    text : false,
                    caption : false,
                    img_url : false,
                    img_isSmall : false, //TRUE if image is small (like facebook 150px)
                    source : false, //
                    likes: false,
                    shares: false,
                    comments: false,
                    position: false,
                };
                break;

            default:
                break;
        }
        return outputObject;
    }
}]);