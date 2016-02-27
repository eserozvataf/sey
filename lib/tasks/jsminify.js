'use strict';

const deepmerge = require('../utils/deepmerge.js');

class cssminify {
    exec(runnerOp, files) {
        return new Promise((resolve, reject) => {
            let options = {
                fromString: true
            };
            if (runnerOp.config.cleancss !== undefined) {
                deepmerge(options, runnerOp.config.cleancss);
            }

            for (let file of files) {
                const content = file.getContent();

                if (this._cleancssLib === undefined) {
                    const cleancss = require('clean-css');
                    this._cleancssLib = new cleancss();
                }

                this._cleancssLib.minify(content, options, function (err, result) {
                    if (err) {
                        reject(err);
                        return;
                    }

                    file.setContent(result.styles);
                    resolve();
                });
            }
        });
    }
}

module.exports = cssminify;