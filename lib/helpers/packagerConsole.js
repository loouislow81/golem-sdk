'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// TODO: remove this file and use quiet mode of new version of electron packager
var PackagerConsole = function () {
  function PackagerConsole() {
    _classCallCheck(this, PackagerConsole);

    this.logs = [];
  }

  _createClass(PackagerConsole, [{
    key: '_log',
    value: function _log() {
      var _logs;

      (_logs = this.logs).push.apply(_logs, arguments);
    }
  }, {
    key: 'override',
    value: function override() {
      this.consoleError = console.error;

      // need to bind because somehow when _log() is called this refers to console
      // eslint-disable-next-line no-underscore-dangle
      console.error = this._log.bind(this);
    }
  }, {
    key: 'restore',
    value: function restore() {
      console.error = this.consoleError;
    }
  }, {
    key: 'playback',
    value: function playback() {
      console.log(this.logs.join(' '));
    }
  }]);

  return PackagerConsole;
}();

exports.default = PackagerConsole;
//# sourceMappingURL=packagerConsole.js.map
