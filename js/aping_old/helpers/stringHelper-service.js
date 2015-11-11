"use strict";

apingHelpers.service('stringHelper', function () {
    this.replaceHashtagWithoutSpaces = function (_string) {
        if(_string && $.type(_string) === "string") {
            _string = _string.replace(/#/g, " #");
            _string = _string.replace(/  /g, " ");
        }
        return _string;
    };
});