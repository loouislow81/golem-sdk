'use strict';

require('source-map-support/register');

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _convertToIcns = require('./../../lib/helpers/convertToIcns');

var _convertToIcns2 = _interopRequireDefault(_convertToIcns);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// need to subtract 2 from source maps
var assert = _chai2.default.assert;

var log = require('loglevel');

// Prerequisite for test: to use OSX with sips, iconutil and imagemagick convert

function testConvertPng(pngName, done) {
  (0, _convertToIcns2.default)(_path2.default.join(__dirname, '../../', 'test-resources', pngName), function (error, icnsPath) {
    if (error) {
      done(error);
      return;
    }

    var stat = _fs2.default.statSync(icnsPath);
    assert.isTrue(stat.isFile(), 'Output icns file should be a path');
    done();
  });
}

describe('Get Icon Module', function () {
  it('Can convert icons', function () {
    if (_os2.default.platform() !== 'darwin') {
      log.warn('Skipping png conversion tests, OSX is required');
      return;
    }

    it('Can convert a rgb png to icns', function (done) {
      testConvertPng('iconSample.png', done);
    });

    it('Can convert a grey png to icns', function (done) {
      testConvertPng('iconSampleGrey.png', done);
    });
  });
});
//# sourceMappingURL=getIconSpec.js.map
