'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const deepmerge = require('../utils/deepmerge.js');

class less {
    exec(runnerOp, files) {
        var _this = this;

        return _asyncToGenerator(function* () {
            let options = {};
            if (runnerOp.config.less !== undefined) {
                deepmerge(options, runnerOp.config.less);
            }

            for (let file of files) {
                let content = file.getContent();

                if (_this._lessLib === undefined) {
                    _this._lessLib = require('less');
                }

                options.filename = file.file.path;
                let result = _this._lessLib.parse(options, content);

                file.setContent(result.css);
            }
        })();
    }
}

module.exports = less;