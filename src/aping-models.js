'use strict';
angular.module('jtt_aping').service('apingModels', [function () {
    /**
     * return new clean apiNG model object by _model and _platform
     *
     * @param _model {String}
     * @param _platform {String}
     * @returns {Object}
     */
    this.getNew = function(_model, _platform) {
        //find apiNG models here: https://github.com/search?utf8=%E2%9C%93&q=apiNG-model
        var model = {
            platform : _platform,
            model: _model,
        };
        return model;
    };
}]);