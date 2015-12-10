"use strict";
apingApp.service('apingModels', [function () {
    this.getNew = function(_model, _platform) {
        var model = {};
        switch(_model) {
            case "social":
                model = {
                    platform : _platform, //NAME of platform ( "youtube" / "facebook", "instagram" , ...)
                    blog_name : false, //NAME of blog (channel / youtube uploader / facebook page, instagram account, ..)
                    blog_id : false, //ID of channel / page / account, ...
                    blog_link : false, //link to channel / uploader / page / account, ...
                    type : false, //"video", "image", "post", "audio", "link", "event", ...
                    timestamp : false,
                    date_time: false,
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
                    date_time: false,
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
                    date_time: false,
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
                    start_date_time: false,
                    end_timestamp: false,
                    end_date_time: false,
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

            case "repo":
                model = {
                    platform : _platform, //NAME of platform ( "youtube" / "facebook", "instagram" , ...)
                    owner_name : false,
                    owner_id : false,
                    owner_link : false,
                    owner_img_url : false,
                    name : false,
                    id: false,
                    fullname: false,
                    description : false,
                    url : false,
                    homepage : false,
                    language : false,
                    clone_url : false,
                    git_url : false,
                    ssh_url : false,
                    svn_url : false,
                    isFork : false,
                    openIssues : false,
                    watchers : false,
                    stargazers : false,
                    forks : false,
                    created_timestamp : false,
                    created_date_time: false,
                    updated_timestamp: false,
                    updated_date_time: false,
                    pushed_timestamp: false,
                    pushed_date_time: false,
                };
                break;

            case "activity":
                model = {
                    platform : _platform, //NAME of platform ( "youtube" / "facebook", "instagram" , ...)

                    body : false,

                    actor_name : false, //who?
                    actor_id : false,
                    actor_url : false,
                    actor_img_url : false,
                    actor_type: false,

                    action_name : false, //what?
                    action_id : false,
                    action_url : false,
                    action_img : false,
                    action_type: false,

                    object_name : false,
                    object_id : false,
                    object_img : false,
                    object_url : false,
                    object_type: false,

                    context : false,
                    timestamp : false,
                    date_time: false,

                };
                break;

            default:
                break;
        }
        return model;
    }
}]);
