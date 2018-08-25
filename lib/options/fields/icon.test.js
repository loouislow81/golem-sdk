'use strict';

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var _icon = require('./icon');

var _icon2 = _interopRequireDefault(_icon);

var _infer = require('./../../infer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('./../../infer/inferIcon');
jest.mock('loglevel');

var mockedResult = 'icon path';

describe('when the icon parameter is passed', function () {
  test('it should return the icon parameter', function () {
    expect(_infer.inferIcon).toHaveBeenCalledTimes(0);

    var params = { icon: './icon.png' };
    expect((0, _icon2.default)(params)).resolves.toBe(params.icon);
  });
});

describe('when the icon parameter is not passed', function () {
  test('it should call inferIcon', function () {
    _infer.inferIcon.mockImplementationOnce(function () {
      return Promise.resolve(mockedResult);
    });
    var params = { targetUrl: 'some url', platform: 'mac' };

    return (0, _icon2.default)(params).then(function (result) {
      expect(result).toBe(mockedResult);
      expect(_infer.inferIcon).toHaveBeenCalledWith(params.targetUrl, params.platform);
    });
  });

  describe('when inferIcon resolves with an error', function () {
    test('it should handle the error', function () {
      _infer.inferIcon.mockImplementationOnce(function () {
        return Promise.reject(new Error('some error'));
      });
      var params = { targetUrl: 'some url', platform: 'mac' };

      return (0, _icon2.default)(params).then(function (result) {
        expect(result).toBe(null);
        expect(_infer.inferIcon).toHaveBeenCalledWith(params.targetUrl, params.platform);
        expect(_loglevel2.default.warn).toHaveBeenCalledTimes(1);
      });
    });
  });
});
//# sourceMappingURL=icon.test.js.map
