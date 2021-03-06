const deepmerge = require('../utils/deepmerge.js');

class BabelJsx {
    onLoad(moduleManager) {
        moduleManager.addTask(this, {
            phase: 'compile',
            formats: 'jsx',
            op: 'compile',
            weight: 0.5,
            method: 'exec'
        });
    }

    async exec(value, runnerOpSet, files) {
        const options = {
            ast: false,
            code: true,
            sourceMaps: false,

            // presets: [],
            plugins: [
                require('babel-plugin-transform-react-jsx')
            ],
            ignore: [ 'bower_components/', 'node_modules/' ]
        };

        const runnerBundle = runnerOpSet.bundle;

        if (runnerBundle.config.babel !== undefined) {
            deepmerge(options, runnerBundle.config.babel);
        }

        for (let file of files) {
            const content = file.getContent();

            if (this._babelLib === undefined) {
                this._babelLib = require('babel-core');
            }

            options.filename = file.file.fullpath;
            // options.filenameRelative = file.file.path;
            // options.sourceFileName = file.file.path;

            const result = this._babelLib.transform(content, options);

            file.setExtension('js');
            file.setContent(result.code);
        }

        return {
            processedFiles: files
        };
    }
}

module.exports = BabelJsx;
