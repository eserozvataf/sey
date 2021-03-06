'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

class EolFix {
    onLoad(moduleManager) {
        moduleManager.addTask(this, {
            phase: 'preprocess',
            formats: '*',
            op: 'eolfix',
            weight: 0.1,
            method: 'exec'
        });
    }

    exec(value, runnerOpSet, files) {
        return _asyncToGenerator(function* () {
            for (let file of files) {
                const content = file.getContent();

                file.setContent(content.replace(/(?:\r\n|\r)/g, '\n'));
            }

            return {
                processedFiles: files
            };
        })();
    }
}

module.exports = EolFix;