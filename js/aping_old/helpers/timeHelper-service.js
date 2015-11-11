"use strict";
apingHelpers.service('timeHelper', function () {
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
});