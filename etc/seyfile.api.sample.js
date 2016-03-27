'use strict';

let config = new sey.config();

config.bundle('global')
    .set({
        babel: {
        },

        eslint: {
        },

        less: {
        },

        eser: true
    });

config.bundle('main')
    .setTarget('node')
    .setStandard(2016)
    .set({
        banner: [
            '/**',
            ' * my package',
            ' *',
            ' * @version v1.0.0',
            ' * @link https://...',
            ' * @license Apache-2.0',
            ' */',
            ''
        ].join('\n'),

        preprocessVars: {
            BUNDLE: 'main'
        },

        clean: {
            before: ['./dist/*'],
            after: []
        }
    });

config.bundle('main')
    .src(['./src/**/*.js', './src/**/*.ts', './src/**/*.jsx'])
    .addheader()
    .compile()
    .commonjs({ name: 'browserified.js', entry: './index.js' })
    .eolfix()
    .lint()
    .optimize()
    .preprocess()
    .transpile()
    .dest('./dist/scripts/')
    .exec();

config.bundle('main')
    .src(['./src/**/*.css', './src/**/*.less', './src/**/*.scss'])
    .addheader()
    .compile()
    .concat('style.css')
    .eolfix()
    .lint()
    .minify()
    .optimize()
    .preprocess()
    .dest('./dist/styles/')
    .exec();

config.bundle('main')
    .src('./test/*.js')
    .test()
    .exec();

sey.run(config);
