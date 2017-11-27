let webpackConfig = require('./webpack.config');

module.exports = function karmaConfig(config) {
  config.set({
    frameworks: [
      'jasmine'
    ],
    reporters: [
      'spec',
      'coverage'
    ],
    files: [
      'src/tests.webpack.js'
    ],
    preprocessors: {
      'src/tests.webpack.js': ['webpack', 'sourcemap']
    },
    browsers: [
      'PhantomJS'
    ],
    singleRun: true,
    coverageReporter: {
      dir: 'www/coverage/',
      type: 'html'
    },
    webpack: webpackConfig
  });
};
