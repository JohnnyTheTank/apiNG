"use strict";
apingApp.service('apingModels', [function () {
    this.getNew = function(_type, _platform) {
        var model = {};
        switch(_type) {
            case "social":
                model = {
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
                    source : false, //
                    likes: false,
                    shares: false,
                    comments: false,
                    position: false,
                };
                break;

            case "video":
                model = {
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
                    source : false, //
                    markup: false,
                    likes: false,
                    shares: false,
                    comments: false,
                    position: false,
                };
                break;

            case "image":
                model = {
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
                    source : false, //
                    likes: false,
                    shares: false,
                    comments: false,
                    position: false,
                };
                break;

            case "event":
                model = {
                    platform : _platform, //NAME of platform ( "youtube" / "facebook", "instagram" , ...)
                    blog_name : false, //NAME of blog (channel / facebook page, instagram account, ..)
                    blog_id : false, //ID of channel / page / account, ...
                    blog_link : false, //link to channel / uploader / page / account, ...
                    start_timestamp : false,
                    end_timestamp: false,
                    event_url : false, //URL to the event
                    ticket_url : false, //URL to the ticket
                    intern_id : false, // INTERN ID of event (facebook id, instagram id, ...)
                    text : false,
                    caption : false,
                    img_url : false,
                    place_name : false,
                    city: false,
                    country: false,
                    latitude: false,
                    longitude : false,
                    street: false,
                    zip : false,
                    source : false,
                };
                break;

            default:
                break;
        }
        return model;
    }
}]);
