'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _inferUserAgent = require('./../../lib/infer/inferUserAgent');

var _inferUserAgent2 = _interopRequireDefault(_inferUserAgent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = _chai2.default.assert;


var TEST_RESULT = {
  darwin: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.75 Safari/537.36',
  mas: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.75 Safari/537.36',
  win32: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.75 Safari/537.36',
  linux: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.75 Safari/537.36'
};

function testPlatform(platform) {
  return (0, _inferUserAgent2.default)('0.37.1', platform).then(function (userAgent) {
    assert.equal(userAgent, TEST_RESULT[platform], 'Correct user agent should be inferred');
  });
}

describe('Infer User Agent', function testInferUserAgent() {
  this.timeout(15000);
  it('Can infer userAgent for all platforms', function (done) {
    var testPromises = _lodash2.default.keys(TEST_RESULT).map(function (platform) {
      return testPlatform(platform);
    });
    Promise.all(testPromises).then(function () {
      done();
    }).catch(function (error) {
      done(error);
    });
  });

  it('Connection error will still get a user agent', function (done) {
    var TIMEOUT_URL = 'http://www.google.com:81/';
    (0, _inferUserAgent2.default)('1.6.7', 'darwin', TIMEOUT_URL).then(function (userAgent) {
      assert.equal(userAgent, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36', 'Expect default user agent on connection error');
      done();
    }).catch(done);
  });
});
//# sourceMappingURL=inferUserAgentSpec.js.map
