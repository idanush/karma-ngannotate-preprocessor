var path = require('path');
var ngAnnotate = require('ng-annotate');

var createPreprocesor = function(logger) {
  var log = logger.create('preprocessor.ngannotate');

  return function(content, file, done) {
    if (path.extname(file.originalPath) !== '.js') {
      return done(content);
    }

    var output;

    log.debug('Processing "%s".', file.originalPath);

    try {
      output = ngAnnotate( content, {
        add: true,
        'single_quotes': true
      });
      done(output.src);
    } catch (e) {
      done(output.errors);
    }

  };
};

createPreprocesor.$inject = ['logger'];

// PUBLISH DI MODULE
module.exports = {
  'preprocessor:ngannotate': ['factory', createPreprocesor]
};
