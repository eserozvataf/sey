'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const deepmerge = require('../utils/deepmerge.js');

class Sass {
    onLoad(moduleManager) {
        moduleManager.addTask(this, {
            phase: 'compile',
            formats: 'scss',
            op: 'compile',
            weight: 0.5,
            method: 'exec'
        });
    }

    exec(value, runnerOpSet, files) {
        var _this = this;

        return _asyncToGenerator(function* () {
            const options = {};

            const runnerBundle = runnerOpSet.bundle;

            if (runnerBundle.config.sass !== undefined) {
                deepmerge(options, runnerBundle.config.sass);
            }

            for (let file of files) {
                const content = file.getContent();

                if (_this._sassLib === undefined) {
                    _this._sassLib = require('node-sass');
                }

                options.data = content;

                const result = _this._sassLib.renderSync(options);

                file.setExtension('css');
                file.setContent(result.css.toString());
            }

            return {
                processedFiles: files
            };
        })();
    }
}

module.exports = Sass;