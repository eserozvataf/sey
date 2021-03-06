'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const deepmerge = require('../utils/deepmerge.js'),
      RunnerSourceFile = require('../runner/SourceFile.js');

class Concat {
    onLoad(moduleManager) {
        moduleManager.addTask(this, {
            phase: 'bundling',
            formats: '*',
            op: 'concat',
            weight: 0.5,
            method: 'exec'
        });
    }

    exec(value, runnerOpSet, files) {
        return _asyncToGenerator(function* () {
            const newLines = value === undefined || value.newline !== false,
                  newFile = new RunnerSourceFile({
                path: `/${ value }`,
                fullpath: `./${ value }`
            });

            let content = '';

            for (let file of files) {
                newFile.addHash(file.getHash());
                content += file.getContent();
                if (newLines && content.substr(content.length - 1) !== '\n') {
                    content += '\n';
                }
            }

            newFile.setContent(content);
            runnerOpSet.opSetFiles = [newFile];

            return {
                processedFiles: runnerOpSet.opSetFiles
            };
        })();
    }
}

module.exports = Concat;