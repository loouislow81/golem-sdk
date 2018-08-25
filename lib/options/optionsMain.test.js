'use strict';

var _optionsMain = require('./optionsMain');

var _optionsMain2 = _interopRequireDefault(_optionsMain);

var _asyncConfig = require('./asyncConfig');

var _asyncConfig2 = _interopRequireDefault(_asyncConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('./asyncConfig');
var mockedAsyncConfig = { some: 'options' };
_asyncConfig2.default.mockImplementation(function () {
  return Promise.resolve(mockedAsyncConfig);
});

test('it should call the async config', function () {
  var params = {
    targetUrl: 'http://example.com'
  };
  return (0, _optionsMain2.default)(params).then(function (result) {
    expect(_asyncConfig2.default).toHaveBeenCalledWith(expect.objectContaining(params));
    expect(result).toEqual(mockedAsyncConfig);
  });
});

// TODO add more tests
//# sourceMappingURL=optionsMain.test.js.map
