import tmp from 'tmp';
import fs from 'fs';
import path from 'path';
import async from 'async';

import golem from '../src';

const PLATFORMS = ['darwin', 'linux'];
tmp.setGracefulCleanup();

function checkApp(appPath, inputOptions, callback) {
  try {
    let relPathToConfig;

    switch (inputOptions.platform) {
      case 'darwin':
        relPathToConfig = path.join(
          'google-test-app.app',
          'Contents/Resources/app',
        );
        break
      case 'linux':
        relPathToConfig = 'resources/app';
        break
      case 'win32':
        relPathToConfig = 'resources/app';
        break
      default:
        throw new Error('Unknown app platform');
    }

    const golemConfigPath = path.join(appPath, relPathToConfig, 'golem.json');
    const golemConfig = JSON.parse(fs.readFileSync(golemConfigPath));

    expect(inputOptions.targetUrl).toBe(golemConfig.targetUrl);
    // app name is not consistent for linux
    // assert.strictEqual(inputOptions.appName, golemConfig.name,
    // 'Packaged app must have the same name as the input parameters');
    callback();
  } catch (exception) {
    callback(exception);
  }
}

describe('Nativefier Module', () => {
  jest.setTimeout(240000);
  test('Can build an app from a target url', (done) => {
    async.eachSeries(
      PLATFORMS,
      (platform, callback) => {
        const tmpObj = tmp.dirSync({ unsafeCleanup: true });

        const tmpPath = tmpObj.name;
        const options = {
          name: 'google-test-app',
          targetUrl: 'http://google.com',
          out: tmpPath,
          overwrite: true,
          platform: null,
        };

        options.platform = platform;
        golem(options, (error, appPath) => {
          if (error) {
            callback(error);
            return
          }

          checkApp(appPath, options, (err) => {
            callback(err);
          })
        });
      },
      (error) => {
        done(error);
      },
    );
  })
});
