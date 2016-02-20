"use strict";
angular.module('jtt_aping').service('apingModels', [function () {
    /**
     * return new clean apiNG model object by _model and _platform
     *
     * @param _model {String}
     * @param _platform {String}
     * @returns {Object}
     */
    this.getNew = function(_model, _platform) {
        var model = {};
        switch(_model) { 
            case "social":
                model = {
                    platform : _platform, //NAME of platform ( "youtube" / "facebook", "instagram" , ...)
                    /*
                    blog_name : undefined, //NAME of blog (channel / youtube uploader / facebook page, instagram account, ..)
                    blog_id : undefined, //ID of channel / page / account, ...
                    blog_link : undefined, //link to channel / uploader / page / account, ...
                    type : undefined, //"video", "image", "post", "audio", "link", "event", ...
                    timestamp : undefined,
                    date_time: undefined,
                    post_url : undefined, //URL to the post / video / tweet ...
                    intern_id : undefined, // INTERN ID of post / video / tweet / ... (facebook id, youtube id, ...)
                    text : undefined,
                    caption : undefined,
                    img_url : undefined, // preview image url (best case 700px)
                    thumb_url : undefined, // best case 200px (min)
                    native_url: undefined, // native image url
                    source : undefined, //
                    likes: undefined,
                    shares: undefined,
                    comments: undefined,
                    position: undefined
                    */
                };
                break;

            case "video":
                model = {
                    platform : _platform, //NAME of platform ( "youtube" / "facebook", "instagram" , ...)
                    /*
                    blog_name : undefined, //NAME of blog (channel / page / instagram account / ..)
                    blog_id : undefined, //ID of channel / page / account, ...
                    blog_link : undefined, //link to channel / uploader / page / account, ...
                    timestamp : undefined, //timestamp of created_at
                    date_time: undefined, //datetime of created_at
                    post_url : undefined, //URL to the post / video / tweet ...
                    intern_id : undefined, // INTERN ID of video (facebook id, youtube id, ...)
                    caption : undefined, // video title
                    text : undefined, // video description
                    img_url : undefined, // preview image url (best case 700px)
                    thumb_url : undefined, // best case 200px (min)
                    native_url: undefined, // native image url
                    source : undefined, // url to .mp4 file
                    markup: undefined, // markup to embed video
                    duration: undefined, // in seconds
                    width: undefined, // width in pixels
                    height: undefined, // height in pixels
                    comments: undefined, // comments_count
                    likes: undefined, // likes_count
                    shares: undefined, // shares_count
                    position: undefined // position in playlist
                    */
                };
                break;

            case "image":
                model = {
                    platform : _platform, //NAME of platform ( "youtube" / "facebook", "instagram" , ...)
                    /*
                    blog_name : undefined, //NAME of blog (channel / youtube uploader / facebook page, instagram account, ..)
                    blog_id : undefined, //ID of channel / page / account, ...
                    blog_link : undefined, //link to channel / uploader / page / account, ...
                    timestamp : undefined,
                    date_time: undefined,
                    post_url : undefined, //URL to the post / video / tweet ...
                    intern_id : undefined, // INTERN ID of image (facebook id, instagram id, ...)
                    text : undefined,
                    caption : undefined,
                    thumb_url : undefined, // best case 200px (min)
                    thumb_width: undefined,
                    thumb_height: undefined,
                    img_url : undefined, // best case 700px
                    img_width: undefined,
                    img_height: undefined,
                    native_url: undefined,
                    native_width: undefined,
                    native_height: undefined,
                    source : undefined, //
                    likes: undefined,
                    shares: undefined,
                    comments: undefined,
                    position: undefined
                    */
                };
                break;

            case "event":
                model = {
                    platform : _platform, //NAME of platform ( "facebook", "bandsintown" , ...)
                    /*
                    artist_name : undefined,
                    artist_id : undefined,
                    artist_link : undefined,
                    start_timestamp : undefined,
                    start_date_time: undefined,
                    end_timestamp: undefined,
                    end_date_time: undefined,
                    event_url : undefined, //URL to the event
                    ticket_url : undefined, //URL to the ticket
                    sold_out : undefined,
                    intern_id : undefined, // INTERN ID of event (facebook id, instagram id, ...)
                    text : undefined,
                    caption : undefined,
                    img_url : undefined,
                    place_name : undefined,
                    city: undefined,
                    country: undefined,
                    latitude: undefined,
                    longitude : undefined,
                    street: undefined,
                    zip : undefined,
                    source : undefined
                    */
                };
                break;

            case "repo":
                model = {
                    platform : _platform, //NAME of platform ( "youtube" / "facebook", "instagram" , ...)
                    /*
                    owner_name : undefined,
                    owner_id : undefined,
                    owner_link : undefined,
                    owner_img_url : undefined,
                    name : undefined,
                    id: undefined,
                    fullname: undefined,
                    description : undefined,
                    url : undefined,
                    homepage : undefined,
                    language : undefined,
                    clone_url : undefined,
                    git_url : undefined,
                    ssh_url : undefined,
                    svn_url : undefined,
                    isFork : undefined,
                    openIssues : undefined,
                    watchers : undefined,
                    stargazers : undefined,
                    forks : undefined,
                    created_timestamp : undefined,
                    created_date_time: undefined,
                    updated_timestamp: undefined,
                    updated_date_time: undefined,
                    pushed_timestamp: undefined,
                    pushed_date_time: undefined
                    */
                };
                break;

            case "weather":
                model = {
                    platform : _platform, //NAME of platform ( "youtube" / "facebook", "instagram" , ...)
                    /*
                    weather_code: undefined,
                    weather_caption: undefined, //rain
                    weather_text : undefined, //light rain
                    weather_icon_name: undefined,
                    weather_icon_url: undefined,

                    temp: undefined,
                    pressure: undefined,
                    humidity: undefined,
                    temp_min: undefined,
                    temp_max: undefined,
                    sea_level: undefined,
                    grnd_level: undefined,
                    wind_speed: undefined,
                    wind_deg: undefined,
                    rain_duration: undefined,
                    rain_volume: undefined,
                    clouds: undefined,

                    timestamp: undefined,
                    date_time: undefined,

                    sunrise_timestamp : undefined,
                    sunrise_date_time : undefined,
                    sunset_timestamp : undefined,
                    sunset_date_time : undefined,

                    loc_city : undefined,
                    loc_city_id: undefined,
                    loc_country : undefined,
                    loc_lat : undefined,
                    loc_lng : undefined,
                    loc_zip : undefined
                    */
                };
                break;
        }
        return model;
    };
}]);