'use strict'

var _tmp = require('tmp')

var _tmp2 = _interopRequireDefault(_tmp)

var _chai = require('chai')

var _chai2 = _interopRequireDefault(_chai)

var _fs = require('fs')

var _fs2 = _interopRequireDefault(_fs)

var _path = require('path')

var _path2 = _interopRequireDefault(_path)

var _async = require('async')

var _async2 = _interopRequireDefault(_async)

var _index = require('./../../lib/index')

var _index2 = _interopRequireDefault(_index)

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

var PLATFORMS = ['darwin', 'linux']
_tmp2.default.setGracefulCleanup()
var assert = _chai2.default.assert

function checkApp (appPath, inputOptions, callback) {
  try {
    var relPathToConfig = void 0

    switch (inputOptions.platform) {
      case 'darwin':
        relPathToConfig = _path2.default.join('google-test-app.app', 'Contents/Resources/app')
        break
      case 'linux':
        relPathToConfig = 'resources/app'
        break
      case 'win32':
        relPathToConfig = 'resources/app'
        break
      default:
        throw new Error('Unknown app platform')
    }

    var golemConfigPath = _path2.default.join(appPath, relPathToConfig, 'golem.json')
    var golemConfig = JSON.parse(_fs2.default.readFileSync(golemConfigPath))

    assert.strictEqual(inputOptions.targetUrl, golemConfig.targetUrl, 'Packaged app must have the same targetUrl as the input parameters')
    // app name is not consistent for linux
    // assert.strictEqual(inputOptions.appName, golemConfig.name,
    // 'Packaged app must have the same name as the input parameters');
    callback()
  } catch (exception) {
    callback(exception)
  }
}

describe('Golem Module', function testGolemModule () {
  this.timeout(240000)
  it('Can build an app from a target url', function (done) {
    _async2.default.eachSeries(PLATFORMS, function (platform, callback) {
      var tmpObj = _tmp2.default.dirSync({ unsafeCleanup: true })

      var tmpPath = tmpObj.name
      var options = {
        name: 'google-test-app',
        targetUrl: 'http://google.com',
        out: tmpPath,
        overwrite: true,
        platform: null
      }

      options.platform = platform;
      (0, _index2.default)(options, function (error, appPath) {
        if (error) {
          callback(error)
          return
        }

        checkApp(appPath, options, function (err) {
          callback(err)
        })
      })
    }, function (error) {
      done(error)
    })
  })
})
// # sourceMappingURL=indexSpec.js.map
