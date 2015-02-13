var assert = require('chai').assert;
var sinon = require('sinon');

var ngannotations = require('../lib/ngannotations.js');

describe('ngannotations preprocessor', function() {
  var createPreprocessor = ngannotations['preprocessor:ngannotations'][1];
  var loggerMock = {
    create: function() {
      return {
        debug: function() {}
      };
    }
  };

  var preprocessor, doneFn;

  beforeEach(function() {
    preprocessor = createPreprocessor(loggerMock);
    doneFn = sinon.spy();
  });

  it('ignores non-js files', function() {
    preprocessor('content', {
      originalPath: '/some/template.html'
    }, doneFn);
    sinon.assert.calledWith(doneFn, 'content');
  });

  it('transforms annotations', function() {
    preprocessor('/**\n * @module foo\n * @controller\n */\nfunction MyController() {}', {
      originalPath: '/some/file.js'
    }, doneFn);

    var matcher = /.*angular\.module\([\'"]+foo[\'"]+\)\.controller\([\'"]+MyController[\'"]+, MyController\).*/i;
    sinon.assert.calledWithMatch(doneFn, matcher);
  });
});
