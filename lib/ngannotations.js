var path = require('path');
var annotations = require('angular-di-annotations').Runner;

var createPreprocesor = function(logger) {
  var log = logger.create('preprocessor.ngannotations');

  return function(content, file, done) {
    if (path.extname(file.originalPath) !== '.js') {
      return done(content);
    }

    var output;

    log.debug('Processing "%s".', file.originalPath);

    try {
      output = annotations.runOnString(content);
      done(output);
    } catch (e) {
      done(output);
    }

  };
};

createPreprocesor.$inject = ['logger'];

// PUBLISH DI MODULE
module.exports = {
  'preprocessor:ngannotations': ['factory', createPreprocesor]
};
