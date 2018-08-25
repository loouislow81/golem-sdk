#!/usr/bin/env nodejs

/**
 * @file:
 * @description:
 * @version:
 * @author:
 * @license:
 * @copyright:
 */

const golem = require('./golem').default

// possible options, defaults unless specified otherwise
var options = {
  name: 'DuckDuckGo', // will be inferred if not specified
  targetUrl: 'https://duckduckgo.com', // required
  platform: 'linux', // defaults to the current system
  arch: 'x64', // defaults to the current system
  version: '0.36.4',
  out: '.',
  overwrite: false,
  asar: false, // see conceal
  icon: 'icon.png',
  counter: false,
  bounce: false,
  width: 1280,
  height: 800,
  showMenuBar: false,
  fastQuit: false,
  userAgent: 'Mozilla ...', // will infer a default for your current system
  ignoreCertificate: false,
  ignoreGpuBlacklist: false,
  enableEs3Apis: false,
  insecure: false,
  honest: false,
  zoom: 1.0,
  singleInstance: false,
  fileDownloadOptions: {
    saveAs: true // always show "Save As" dialog
  },
  processEnvs: {
    'GOOGLE_API_KEY': '<your-google-api-key>'
  }
}

golem(options, function (error, appPath) {
  if (error) {
    console.error(error)
    return
  }
  console.log('App has been golemified to', appPath)
})
