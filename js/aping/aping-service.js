"use strict";

apingApp.service('apingService', function () {
    this.getTimestampFromDateString = function (_string, _multiplier, _add) {

        if (!_multiplier || isNaN(_multiplier)) {
            _multiplier = 1;
        }

        if (!_add || isNaN(_add)) {
            _add = 0;
        }

        if (_string) {
            var a = _string.split(/[^0-9]/);
            try {
                return parseInt(Math.round(new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]) / 1000 * _multiplier) + _add);
            } catch (e) {
            }
        }
        return false;
    };

    this.getConvertedTimestamp = function (_timestamp) {
        var d = new Date(_timestamp * 1000),	// Convert the passed timestamp to milliseconds
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
            dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh == 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };

    this.generateUniqueId = function (_separator) {

        var delim = _separator || "-";

        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        return (S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4());
    };

    this.getYoutubeIdFromUrl = function (_url) {
        var rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
        return _url.match(rx)[1] || false;
    }

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
    }

    this.getBlankChannelObject = function (_name) {

        var plattformObject = new plattformEntry(_name, this.generateUniqueId());

        return plattformObject;
    };
});