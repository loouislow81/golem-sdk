import tmp from 'tmp'
import chai from 'chai'
import fs from 'fs'
import path from 'path'
import async from 'async'

import golem from './../../lib/index'

const PLATFORMS = ['darwin', 'linux']
tmp.setGracefulCleanup()
const {assert} = chai

function checkApp (appPath, inputOptions, callback) {
  try {
    let relPathToConfig

    switch (inputOptions.platform) {
      case 'darwin':
        relPathToConfig = path.join('google-test-app.app', 'Contents/Resources/app')
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

    const golemConfigPath = path.join(appPath, relPathToConfig, 'golem.json')
    const golemConfig = JSON.parse(fs.readFileSync(golemConfigPath))

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
  it('Can build an app from a target url', (done) => {
    async.eachSeries(PLATFORMS, (platform, callback) => {
      const tmpObj = tmp.dirSync({unsafeCleanup: true})

      const tmpPath = tmpObj.name
      const options = {
        name: 'google-test-app',
        targetUrl: 'http://google.com',
        out: tmpPath,
        overwrite: true,
        platform: null
      }

      options.platform = platform
      golem(options, (error, appPath) => {
        if (error) {
          callback(error)
          return
        }

        checkApp(appPath, options, (err) => {
          callback(err)
        })
      })
    }, (error) => {
      done(error)
    })
  })
})
