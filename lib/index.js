'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const path = require('path'),
      fsManager = require('./utils/fsManager.js'),
      config = require('./config.js'),
      tasks = require('./tasks.js'),
      runner = require('./runner.js');

class sey {
    static preload() {
        this.config = config;

        this.tasks = new tasks();
        this.tasks.load();

        this.workingPath = path.join(process.cwd(), '.sey');
    }

    static initFile(file) {
        const content = fsManager.readFile(__dirname + '/../seyfile.sample.js');
        fsManager.writeFile(file, content);
    }

    static clean() {
        fsManager.rmdir(this.workingPath);
    }

    static selfCheck() {
        return [];
    }

    static run(configInstance) {
        return _asyncToGenerator(function* () {
            let currentConfig;

            if (configInstance instanceof config) {
                currentConfig = configInstance;
            } else {
                currentConfig = new config(configInstance);
            }

            const currentRunner = new runner(currentConfig);
            yield currentRunner.run();

            return true;
        })();
    }
}

sey.preload();

module.exports = sey;