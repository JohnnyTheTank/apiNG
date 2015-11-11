"use strict";

apingHelpers.service('utilityHelper', function () {
    this.parseJsonFromAttributes = function (_string, _platform) {
        /* TODO check for type=string */

        var requestConfigs = [];

        if(_string) {
            requestConfigs = $.parseJSON(_string.replace(/'/g, '"'));

            angular.forEach(requestConfigs, function (value, key) {
                value.platform = _platform;
            });
        }
        return requestConfigs;
    };

    this.getYoutubeIdFromUrl = function (_url) {
        var rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
        return _url.match(rx)[1] || false;
    };

    this.getYoutubeImageFromId = function (_youtubeId, size) {
        switch (size) {
            case 'default':
            case 'maxresdefault':
            case 'mqdefault':
            case 'sddefault':
                return "https://img.youtube.com/vi/" + _youtubeId + "/" + size + ".jpg";
                break;

            case 'hqdefault':
            default:
                return "https://img.youtube.com/vi/" + _youtubeId + "/hqdefault.jpg";
                break;
        }

        return false;
    };
});