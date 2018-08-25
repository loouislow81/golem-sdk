'use strict';

var _userAgent = require('./userAgent');

var _userAgent2 = _interopRequireDefault(_userAgent);

var _infer = require('./../../infer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('./../../infer/inferUserAgent');

test('when a userAgent parameter is passed', function () {
  expect(_infer.inferUserAgent).toHaveBeenCalledTimes(0);

  var params = { userAgent: 'valid user agent' };
  expect((0, _userAgent2.default)(params)).resolves.toBe(params.userAgent);
});

test('no userAgent parameter is passed', function () {
  var params = { electronVersion: '123', platform: 'mac' };
  (0, _userAgent2.default)(params);
  expect(_infer.inferUserAgent).toHaveBeenCalledWith(params.electronVersion, params.platform);
});
//# sourceMappingURL=userAgent.test.js.map
