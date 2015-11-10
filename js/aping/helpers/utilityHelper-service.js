"use strict";

apingHelpers.service('utilityHelper', function () {
    this.generateUniqueId = function (_separator) {

        var delim = _separator || "-";

        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        return (S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4());
    };

});