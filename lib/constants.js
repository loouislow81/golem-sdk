'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PLACEHOLDER_APP_DIR = exports.ELECTRON_VERSION = exports.DEFAULT_APP_NAME = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: update electron version if necessary
// Electron Version
var DEFAULT_APP_NAME = exports.DEFAULT_APP_NAME = 'APP'; /**
                                                          * @file: src/constants.js
                                                          * @description: default sdk settings
                                                          * @license: MIT
                                                          * @author: Loouis Low <loouis@gmail.com>
                                                          * @copyright: Loouis Low (https://github.com/loouislow81/golem-sdk)
                                                          */

var ELECTRON_VERSION = exports.ELECTRON_VERSION = '3.0.10'; // 2.0.8
var PLACEHOLDER_APP_DIR = exports.PLACEHOLDER_APP_DIR = _path2.default.join(__dirname, './../', 'app');
//# sourceMappingURL=constants.js.map
