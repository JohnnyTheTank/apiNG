"use strict";

var apingApp = angular.module(
    'jtt_aping',
    [
        'jtt_aping_settings',
        'jtt_aping_objects',
        'yaru22.angular-timeago',
        'linkify'
    ]);

/*
 function feedEntry(_platform, _platform_id) {
 this.platform = _platform || false;
 this.platform_id = _platform_id || false;
 this.blog_name = false;
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
 }

 function platformEntry(_name, _id) {
 this.name = _name || false;
 this.uniqueId = _id;
 this.intern_id = false;
 this.type = false;
 this.intern_type = false;
 this.ready = false;
 this.avatar_url = false;
 this.feed = false;
 this.title = false;
 this.url = false;
 this.error = false;
 this.configError = false;
 this.noEntries = false;
 this.errorMessage = false;
 this.loadMore = false;
 }

 function configObject() {
 //this.feedType = false; //'social', 'video', 'picture, 'event', ...

 this.feedType = function(_feedType) {
 var defaultFeedType = "social";
 if(_feedType && typeof _feedType === 'string') {
 _feedType = _feedType.toLowerCase();
 switch (_feedType) {
 case "social":
 case "video":
 case "picture":
 case "event":
 return _feedType;
 break;
 }
 }
 return defaultFeedType;
 };

 var templateUrl = false;
 var platforms = false;

 };



 function socialMediaObject() {

 }
 */