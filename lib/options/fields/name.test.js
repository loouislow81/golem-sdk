'use strict';

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var _name = require('./name');

var _name2 = _interopRequireDefault(_name);

var _constants = require('./../../constants');

var _infer = require('./../../infer');

var _utils = require('./../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('./../../infer/inferTitle');
jest.mock('./../../utils/sanitizeFilename');
jest.mock('loglevel');

_utils.sanitizeFilename.mockImplementation(function (_, filename) {
  return filename;
});

var mockedResult = 'mock name';

describe('well formed name parameters', function () {
  var params = { name: 'appname', platform: 'something' };
  test('it should not call inferTitle', function () {
    return (0, _name2.default)(params).then(function (result) {
      expect(_infer.inferTitle).toHaveBeenCalledTimes(0);
      expect(result).toBe(params.name);
    });
  });

  test('it should call sanitize filename', function () {
    return (0, _name2.default)(params).then(function (result) {
      expect(_utils.sanitizeFilename).toHaveBeenCalledWith(params.platform, result);
    });
  });
});

describe('bad name parameters', function () {
  beforeEach(function () {
    _infer.inferTitle.mockImplementationOnce(function () {
      return Promise.resolve(mockedResult);
    });
  });

  var params = { targetUrl: 'some url' };
  describe('when the name is undefined', function () {
    test('it should call inferTitle', function () {
      return (0, _name2.default)(params).then(function () {
        expect(_infer.inferTitle).toHaveBeenCalledWith(params.targetUrl);
      });
    });
  });

  describe('when the name is an empty string', function () {
    test('it should call inferTitle', function () {
      var testParams = Object.assign({}, params, { name: '' });

      return (0, _name2.default)(testParams).then(function () {
        expect(_infer.inferTitle).toHaveBeenCalledWith(params.targetUrl);
      });
    });
  });

  test('it should call sanitize filename', function () {
    return (0, _name2.default)(params).then(function (result) {
      expect(_utils.sanitizeFilename).toHaveBeenCalledWith(params.platform, result);
    });
  });
});

describe('handling inferTitle results', function () {
  var params = { targetUrl: 'some url', name: '', platform: 'something' };
  test('it should return the result from inferTitle', function () {
    _infer.inferTitle.mockImplementationOnce(function () {
      return Promise.resolve(mockedResult);
    });

    return (0, _name2.default)(params).then(function (result) {
      expect(result).toBe(mockedResult);
      expect(_infer.inferTitle).toHaveBeenCalledWith(params.targetUrl);
    });
  });

  describe('when the returned pageTitle is falsey', function () {
    test('it should return the default app name', function () {
      _infer.inferTitle.mockImplementationOnce(function () {
        return Promise.resolve(null);
      });

      return (0, _name2.default)(params).then(function (result) {
        expect(result).toBe(_constants.DEFAULT_APP_NAME);
        expect(_infer.inferTitle).toHaveBeenCalledWith(params.targetUrl);
      });
    });
  });

  describe('when inferTitle resolves with an error', function () {
    test('it should return the default app name', function () {
      _infer.inferTitle.mockImplementationOnce(function () {
        return Promise.reject(new Error('some error'));
      });

      return (0, _name2.default)(params).then(function (result) {
        expect(result).toBe(_constants.DEFAULT_APP_NAME);
        expect(_infer.inferTitle).toHaveBeenCalledWith(params.targetUrl);
        expect(_loglevel2.default.warn).toHaveBeenCalledTimes(1);
      });
    });
  });
});
//# sourceMappingURL=name.test.js.map
