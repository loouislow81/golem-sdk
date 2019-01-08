# golem-sdk 2.0.35

SDK for GOLEM CLI and GOLEM App Store to craft Linux desktop apps.

- [golem-cli](https://github.com/loouislow81/golem-cli) GOLEM app manager for Terminal.
- [golem-sdk](https://github.com/loouislow81/golem-sdk) SDK to build linux desktop apps.
- [golem-mock-server](https://github.com/loouislow81/golem-sdk) testing and simulate app server.
- [golem-apps](https://github.com/loouislow81/golem-apps) temporary hosted GOLEM app library.
- [golem-store](https://github.com/loouislow81/golem-store) graphical web interface for app library.

### prerequisites

we need NodeJS runtime,

```bash
$ curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
$ sudo apt install -y nodejs
$ sudo npm i -g n
$ sudo n stable
```

---

### flash Plugin

```bash
$ sudo apt install -y pepperflashplugin-nonfree browser-plugin-freshplayer-pepperflash
```

to configure the GOLEM app to use **flash** plugin, edit your created app file located in `/<app_name>/resources/app/golem.json`

Use text editor to replace or add the following line,

```json
"flashPluginDir": "/usr/lib/pepperflashplugin-nonfree/libpepflashplayer.so",
```

---

### usage

clone the repository,

```bash
$ git clone https://github.com/loouislow81/golem-sdk.git
```

set things up,

```bash
$ cd golem-sdk
$ npm i
$ npm run build
```

example of usage,

```bash
$ cd golem-sdk
$ node lib/cli.js --name duckduckgo --icon icon.png --platform linux --arch x64 --show-menu-bar --disk-cache-size 500000000 "https://duckduckgo.com"
```

to configure and run globally,

```bash
$ npm link
```

then you can use,

```bash
$ golem-sdk --name duckduckgo --icon icon.png --platform linux --arch x64 --show-menu-bar --disk-cache-size 500000000 "https://duckduckgo.com"
```

**Note:** App that created with Golem, the app settings file is located in `/<app_name>/resources/app/golem.json`. You can change any parameters in this `golem.json` file. Read below **API** and learn how to configure your app behaviour.

---


### cli

to run SDK in Terminal,

```bash
$ node lib/cli.js -h
```

```bash
golem-sdk [options] <targetURL> [dest]
```
command line options are listed below,

flags | explain
----- | -------
_targetURL_ | URL to point the application at.
_dest_| Specifies the destination directory to build the app to, defaults to the current working directory.
_-h, --help_ | Prints the usage information.
_-v, --version_ | Prints the version of your `golem-sdk` install.

### api

#### _commands

flags | explain | status
----- | ------- | ------
_-n, --name (value)_ | The name of the application, which will affect strings in titles and the icon. **For Linux Users:** Do not put spaces if you define the app name yourself with `--name`, as this will cause problems (tested on Ubuntu 14.04) when pinning a packaged app to the launcher. | OK
_-p, --platform_ (value) | Automatically determined based on the current OS. Can be overwritten by specifying either `linux`, `windows`, `osx` or `mas` for a Mac App Store specific build. The alternative values `win32` (for Windows) or `darwin`, `mac` (for macOS) can also be used. | OK
_-a, --arch (value)_ | Processor architecture, automatically determined based on the current OS. Can be overwritten by specifying either `ia32`, `x64` or `armv7l`. | OK
_--app-copyright (value)_ | The human-readable copyright line for the app. Maps to the `LegalCopyright` metadata property on Windows, and `NSHumanReadableCopyright` on OSX. | OK
_--app-version (value)_ | The release version of the application. By default the `version` property in the `package.json` is used but it can be overridden with this argument. If neither are provided, the version of Electron will be used. Maps to the `ProductVersion` metadata property on Windows, and `CFBundleShortVersionString` on OSX. | OK
_--build-version (value)_ | The build version of the application. Maps to the `FileVersion` metadata property on Windows, and `CFBundleVersion` on OS X. | OK
_-e, --electron-version (value)_ | Electron version without the `v`, see https://github.com/atom/electron/releases. | OK
_--no-overwrite_ | Specifies if the destination directory should be not overwritten, defaults to false. | OK
_-c, --conceal_ | Specifies if the source code within the Golem app should be packaged into an archive, defaults to false, [read more](http://electron.atom.io/docs/v0.36.0/tutorial/application-packaging/). | OK
_-i, --icon (path)_ | The icon parameter should be a path to a `.png` file. | OK
_--counter_ | Use a counter that persists even with window focus for the application badge for sites that use an "(X)" format counter in the page title (i.e. Gmail).  Same limitations as the badge option (above). | OK
_--bounce_ | (macOS only) When the the counter increases, the dock icon will bounce for one second. This only works if the `--counter` option is active. | OK
_--width (value)_ | Width of the packaged application, defaults to `1280px`. | OK
_--height (value)_ | Height of the packaged application, defaults to `800px`. | OK
_--min-width (value)_ | Minimum width of the packaged application, defaults to `0`. | OK
_--min-height (value)_ | Minimum height of the packaged application, defaults to `0`. | OK
_--max-width (value)_ | Maximum width of the packaged application, default is no limit. | OK
_--max-height (value)_ | Maximum height of the packaged application, default is no limit. | OK
_--x (value)_ | **X** location of the packaged application window. | OK
_--y (value)_ | **Y** location of the packaged application window. | OK
_-m, --show-menu-bar_ | Specifies if the menu bar should be shown. | OK
_-f, --fast-quit_ | (macOS only) Specifies to quit the app after closing all windows, defaults to false. | OK
_-u, --user-agent (value)_ | Set the user agent to run the created app with. | OK
_--honest_ | By default, Golem uses a preset user agent string for your OS and masquerades as a regular Google Chrome browser, so that sites like WhatsApp Web will not say that the current browser is unsupported. If this flag is passed, it will not override the user agent. | OK
_--ignore-certificate_ | Forces the packaged app to ignore certificate errors. | OK
_--disable-gpu_ | Disable hardware acceleration for the packaged application. | OK
_--ignore-gpu-blacklist_ | Passes the ignore-gpu-blacklist flag to the Chrome engine, to allow for WebGl apps to work on non supported graphics cards. | OK
_--enable-es3-apis_ | Passes the enable-es3-apis flag to the Chrome engine, to force the activation of WebGl 2.0. | OK
_--insecure_ | Forces the packaged app to ignore web security errors, such as [Mixed Content](https://developer.mozilla.org/en-US/docs/Security/Mixed_content) errors when receiving HTTP content on a HTTPS site. | OK
_--internal-urls (regex)_ | Regular expression of URLs to consider "internal"; all other URLs will be opened in an external browser. Defaults to URLs on same second-level domain as app. Example: `golem-sdk https://google.com --internal-urls ".*?\.google\.*?"` | OK
_--flash_ | If `--flash` is specified, Golem will automatically try to determine the location of your Google Chrome flash binary. Take note that the version of Chrome on your computer should be the same as the version used by the version of Electron for the Golem package. Take note that if this flag is specified, the `--insecure` flag will be added automatically, to prevent the Mixed Content errors on sites such as [Twitch.tv](https://www.twitch.tv/). | OK
_--flash-path (value)_ | You can also specify the path to the Chrome flash plugin directly with this flag. The path can be found at [chrome://plugins](chrome://plugins), under `Adobe Flash Player` > `Location`. This flag automatically enables the `--flash` flag as well. | OK
_--disk-cache-size (value)_ | Forces the maximum disk space to be used by the disk cache. Value is given in bytes. | OK
_--inject <value>_ | Allows you to inject a javascript or css file. This command can be run multiple times to inject the files. Example: `golem-sdk http://google.com --inject ./some-js-injection.js --inject ./some-css-injection.css ~/Desktop` | OK
_--full-screen_ | Makes the packaged app start in full screen. | OK
_--maximize_ | Makes the packaged app start maximized. | OK
_--hide-window-frame_ | Disable window frame and controls. | OK
_--verbose_ | Shows detailed logs in the console. | OK
_--disable-context-menu_ | Disable the context menu. | OK
_--disable-dev-tools_ | Disable the Chrome developer tools. | OK
_--crash-reporter (value)_ | Enables crash reporting and set the URL to submit crash reports to, Example: `golem-sdk http://google.com --crash-reporter https://electron-crash-reporter.appspot.com/PROJECT_ID/create/` | OK
_--zoom (value)_ | Sets a default zoom factor to be used when the app is opened, defaults to `1.0`. | OK
_--single-instance_ | Prevents application from being run multiple times. If such an attempt occurs the already running instance is brought to front. | OK
_--tray_ | Application will stay as an icon in the system tray. Prevents application from being closed from clicking the window close button. | OK
_--basic-auth-username (value) --basic-auth-password (value)_ | Set basic http(s) auth via the command line to have the app automatically log you in to a protected site. Both fields are required if one is set. | OK
_--processEnvs (json-string)_ | a JSON string of key/value pairs to be set as environment variables before any browser windows are opened. Example: `golem-sdk <your-geolocation-enabled-website> --processEnvs '{"GOOGLE_API_KEY": "<your-google-api-key>"}'` | OK
_--file-download-options (json-string)_ | a JSON string of key/value pairs to be set as file download options. See [electron-dl](https://github.com/sindresorhus/electron-dl) for available options. Example: `golem-sdk <your-website> --file-download-options '{"saveAs": true}'` | OK
_--always-on-top_ | Enable always on top for the packaged application. | OK

---

### programmatic api + golem-craft tool

You can use the GOLEM SDK programmatic API together with the dedicated `golem-craft.sh` script to built multiple apps at once.

#### _crafter

download `golem-apps`,

```bash
$ git clone https://github.com/loouislow81/golem-apps
$ cd golem-apps
$ npm i
```

### cli

flags | explain
----- | -------
_--help_ | Display this information
_--craft-all_ | Craft all: build, package, dist, clean
_--craft-select (appname)_ | Craft all: build, package, dist, clean
_--craft-list_ | Build everything from `/tasks/`
_--craft-package_ | Package with `.tar.gz` format
_--craft-dist_ | Move package to `/apps/`
_--css-inject (path)_ | Overwrite all app with CSS inject
_--js-inject (path)_ |  Overwrite all app with JS inject
_--clean_ | Clean up `/__staging/`

#### _structure

```text
.
├── applist.json (for mock)
├── apps (package here is a tar.gz format moved from staging folder)
├── golem-craft.sh
├── inject.css (put your CSS code here)
├── inject.js (put your JS code here)
├── library.json (for mock)
├── list.conf (custom list to build only selected apps)
├── node_modules (put `golem-sdk` here!)
├── notifications.json (for mock)
├── __restricted (ignore)
├── __staging (staging area after app was built)
└── tasks
```

copy `golem-sdk` folder into `golem-apps` root folder e.g. `/golem-apps/node_modules/`, you will need to manually create new folder named `node_modules` before copy `golem-sdk` into it.

alright, you have set up a dependency for `golem-apps` to work with `golem-sdk`, let's craft new app in no time that came with the task files in `tasks/` folder.

```bash
$ ./golem-craft --craft-select <appname>
```

**Note:** The availability of _<appname>_ is depend on the content in `tasks/` folder. Where you can preset your app programmatically.

#### _task

to make your app building programmatically, you need to create `task` file for each app, the `js task file` and `png app icon` file name should be the same.

example to create new task file `<appname>.js`,

```javascript
const golem = require('golem-sdk').default

homePath = '../'
taskPath = 'tasks/'
staging = homePath + '__staging'
category = 'adobe/'
appName = 'adobe-color-cc'
appDesc = 'Capture colour combinations whenever inspiration strikes with Adobe Color CC and your iPhone, iPad or Android device. Your colour themes are automatically saved to Creative Cloud Libraries for access in desktop and mobile apps or to share with your team.'

options = {
  name: appName,
  targetUrl: 'https://color.adobe.com/create/color-wheel',
  icon: category + appName + '.png',
  platform: 'linux',
  arch: 'x64',
  version: '1.0.1',
  userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36',
  asar: true,
  width: 1280,
  height: 800,
  overwrite: false,
  counter: false,
  bounce: false,
  showMenuBar: false,
  fastQuit: false,
  ignoreCertificate: false,
  ignoreGpuBlacklist: false,
  enableEs3Apis: false,
  insecure: false,
  //flashPluginDir: '/usr/lib/pepperflashplugin-nonfree/libpepflashplayer.so',
  internalUrls: null,
  diskCacheSize: '200000000',
  honest: false,
  fullScreen: false,
  maximize: false,
  zoom: 1.0,
  singleInstance: false,
  fileDownloadOptions: {
    saveAs: true
  },
  win32metadata: {
    ProductName: appName,
    InternalName: appName,
    FileDescription: appDesc
  },
  out: staging
}

golem(options, (error, appPath) => {
  if (error) {
    console.error(error)
    return
  }
  console.log(appName + ' app has moved to to >>', appPath)
})
```

