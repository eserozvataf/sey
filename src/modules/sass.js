'use strict';

const deepmerge = require('../utils/deepmerge.js');

class sass {
    onLoad(registry) {
        registry.addTask(this, {
            phase: 'compile',
            formats: 'scss',
            op: 'transpile',
            weight: 0.5,
            method: 'exec'
        });
    }

    async exec(value, runnerOpSet, files) {
        let options = {};
        if (runnerOpSet.config.sass !== undefined) {
            deepmerge(options, runnerOpSet.config.sass);
        }

        for (let file of files) {
            let content = file.getContent();

            if (this._sassLib === undefined) {
                this._sassLib = require('node-sass');
            }

            options.data = content;
            let result = this._sassLib.renderSync(options);

            file.setExtension('css');
            file.setContent(result.css.toString());
        }
    }
}

module.exports = sass;