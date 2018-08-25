'use strict';

var _asyncConfig = require('./asyncConfig');

var _asyncConfig2 = _interopRequireDefault(_asyncConfig);

var _fields = require('./fields');

var _fields2 = _interopRequireDefault(_fields);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('./fields');

_fields2.default.mockImplementation(function () {
  return [Promise.resolve({
    someField: 'newValue'
  })];
});

test('it should merge the result of the promise', function () {
  var param = { another: 'field', someField: 'oldValue' };
  var expected = { another: 'field', someField: 'newValue' };

  return (0, _asyncConfig2.default)(param).then(function (result) {
    expect(result).toEqual(expected);
  });
});
//# sourceMappingURL=asyncConfig.test.js.map
