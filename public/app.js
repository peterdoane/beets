(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = null;
    hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("components/App.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DrumMachine = require('components/DrumMachine');

var _DrumMachine2 = _interopRequireDefault(_DrumMachine);

var _Header = require('components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Grid = require('components/Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _reactTapEventPlugin = require('react-tap-event-plugin');

var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactTapEventPlugin2.default)();

var App = _react2.default.createClass({
  displayName: 'App',
  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          null,
          'Musical Chairs'
        ),
        this.props.children
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Header2.default, null)
      )
    );
  }
});

exports.default = (0, _reactRouter.withRouter)(App);
});

require.register("components/Beets.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Beets = _react2.default.createClass({
  displayName: 'Beets',
  getInitialState: function getInitialState() {
    return {
      beets: []
    };
  },
  componentWillMount: function componentWillMount() {
    var _this = this;

    var beets = void 0;

    _axios2.default.get('/api/beets').then(function (res) {
      beets = res.data;

      var promises = beets.map(function (beet, index) {
        return _axios2.default.get('/api/beets_users/beet_id/' + beet.id);
      });
      return _axios2.default.all(promises);
    }).then(function (res) {
      for (var i = 0; i < beets.length; i++) {
        beets[i].collaborators = res[i].data;
      }

      _this.setState({ beets: beets });
    }).catch(function (err) {
      console.error(err);
    });
  },
  render: function render() {
    var beets = this.state.beets;

    return _react2.default.createElement(
      'div',
      { className: 'card beets' },
      _react2.default.createElement(
        'div',
        { className: 'card-content' },
        _react2.default.createElement(
          'span',
          { className: 'card-title' },
          'Recent Beets'
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          beets.map(function (beet, index) {
            return _react2.default.createElement(
              'div',
              { key: index, className: 'card horizontal' },
              _react2.default.createElement(
                'div',
                { className: 'card-image' },
                _react2.default.createElement('img', { className: 'album', src: beet.image_url })
              ),
              _react2.default.createElement(
                'div',
                { className: 'card-stacked' },
                _react2.default.createElement(
                  'div',
                  { className: 'card-content' },
                  _react2.default.createElement(
                    'span',
                    { className: 'card-title' },
                    beet.title
                  ),
                  _react2.default.createElement(
                    'p',
                    null,
                    'by ',
                    beet.collaborators.map(function (collab) {
                      return collab.username;
                    }).join(', '),
                    ' '
                  )
                ),
                _react2.default.createElement(
                  'a',
                  { className: 'waves-effect waves-light btn' },
                  _react2.default.createElement(
                    'i',
                    { className: 'material-icons' },
                    'play_arrow / pause'
                  )
                )
              )
            );
          })
        )
      )
    );
  }
});

exports.default = Beets;
});

require.register("components/Blackbird.jsx", function(exports, require, module) {
// import React from 'react';
//
// const Blackbird(){
//
// }
//
// export default Blackbird;
"use strict";
});

require.register("components/Btn.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Btn = _react2.default.createClass({
  displayName: 'Btn',
  getInitialState: function getInitialState() {
    return { isBtnActive: false };
  },
  handleClick: function handleClick() {
    this.props.btnClicked(this.props.pattern, this.props.row, this.props.step);
    this.setState({ isBtnActive: !this.state.isBtnActive });
    // console.log(this.state.isBtnActive);
    // console.log('step value:', this.props.step, 'activeStep: ', this.props.activeStep);
    // console.log('pattern: ', this.props.pattern, 'activePattern: ', this.props.activePattern);
  },
  isActive: function isActive() {
    return this.props.step === this.props.activeStep && this.props.pattern === this.props.activePattern;
  },
  render: function render() {
    var _props = this.props;
    var step = _props.step;
    var btnState = _props.btnState;

    var height = 40;
    var width = 40;
    var active = this.isActive();
    var buttonClassName = function buttonClassName() {
      if (step <= 3) {
        return 'drum-button-orange ' + (btnState ? 'pressed' : '') + ' ' + (active ? 'active' : '');
      } else if (step <= 7) {
        return 'drum-button-yellow ' + (btnState ? 'pressed' : '') + ' ' + (active ? 'active' : '');
      } else if (step <= 11) {
        return 'drum-button-white ' + (btnState ? 'pressed' : '') + ' ' + (active ? 'active' : '');
      } else {
        return 'drum-button-red ' + (btnState ? 'pressed' : '') + ' ' + (active ? 'active' : '');
      }
    };
    var style = {
      // background: this.props.btnState ? (active ? 'green': 'black') : 'white',
      // border: active ? '1px solid red' : '1px solid black',
      // boxSizing: 'unset',
      // height: '5%',
      // width: '5%',
      // margin:'.125%'

      // left: `${this.props.step * width}px`,
      // top: `${this.props.row * height}px`,
    };
    var fill = this.state.isBtnActive ? '#fff' : '#000';
    return _react2.default.createElement(
      'div',
      {
        onClick: this.handleClick,
        style: style,
        className: buttonClassName() },
      _react2.default.createElement(
        'svg',
        { width: '15px', height: '26px', viewBox: '484 417 15 26' },
        _react2.default.createElement(
          'defs',
          null,
          _react2.default.createElement('rect', { id: 'path-1', x: '0', y: '0', width: '13', height: '26' }),
          _react2.default.createElement(
            'mask',
            { id: 'mask-2', maskContentUnits: 'userSpaceOnUse', maskUnits: 'objectBoundingBox', x: '0', y: '0', width: '13', height: '26', fill: 'white' },
            _react2.default.createElement('use', { href: '#path-1' })
          )
        ),
        _react2.default.createElement(
          'g',
          { id: 'Group-5', stroke: 'none', strokeWidth: '1', fill: 'none', fillRule: 'evenodd', transform: 'translate(485.000000, 417.000000)' },
          _react2.default.createElement('use', { id: 'Rectangle-2', stroke: '#FFFFFF', mask: 'url(#mask-2)', strokeWidth: '2', fill: '#FFFFFF', href: '#path-1' }),
          _react2.default.createElement('path', { d: 'M0.158536585,6.9875 L12.8414634,6.9875', id: 'Line', stroke: '#979797', strokeLinecap: 'square', opacity: '0.316056437' }),
          _react2.default.createElement('ellipse', { id: 'Oval-2', stroke: '#000000', fill: fill, cx: '6.5', cy: '3.4125', rx: '1.74390244', ry: '1.7875' })
        )
      )
    );
  }
});

exports.default = Btn;
});

require.register("components/Chat.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Chat = _react2.default.createClass({
  displayName: 'Chat',
  getInitialState: function getInitialState() {
    return {
      message: '',
      messages: []
    };
  },
  componentWillMount: function componentWillMount() {
    var _this = this;

    // when the server emits the 'chat message' event back here, the user and message are appended to the #messages <ul> in the DOM
    this.props.socket.on('post message', function (data) {
      _this.setState({
        messages: _this.state.messages.concat(_react2.default.createElement(
          'li',
          { key: _this.state.messages.length },
          data.username + ': ' + data.message
        ))
      });
    });
  },
  handleChange: function handleChange(event) {
    this.setState(_defineProperty({}, event.target.name, event.target.value));
  },
  handleSubmitSend: function handleSubmitSend(event) {
    event.preventDefault();
    this.props.socket.emit('chat message', {
      studio: this.props.studio,
      message: this.state.message,
      username: this.props.username
    });
    this.setState({ message: '' });
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { id: 'chat-container' },
      _react2.default.createElement(
        'div',
        { id: 'message-container' },
        _react2.default.createElement(
          'ul',
          { id: "messages" },
          this.state.messages
        )
      ),
      _react2.default.createElement(
        'div',
        { id: "container" },
        _react2.default.createElement(
          'form',
          { id: "send", onSubmit: this.handleSubmitSend },
          _react2.default.createElement('input', { id: "m", autoComplete: "off", name: 'message', onChange: this.handleChange, value: this.state.message }),
          _react2.default.createElement(
            'button',
            null,
            'Send'
          )
        )
      )
    );
  }
});

exports.default = Chat;
});

require.register("components/DrumMachine.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Grid = require('components/Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var context = new AudioContext();

var Drum = function () {
  function Drum(context, buffer) {
    _classCallCheck(this, Drum);

    this.context = context;
    this.buffer = buffer;
  }

  _createClass(Drum, [{
    key: 'setup',
    value: function setup() {
      this.source = this.context.createBufferSource();
      this.source.buffer = this.buffer;
      this.source.connect(this.context.destination);
    }
  }, {
    key: 'trigger',
    value: function trigger(time) {
      this.setup();
      this.source.start(time);
    }
  }]);

  return Drum;
}();

// axios.all([]).then(responses => {
//
// });

//
/*
see if axios has a method to resolve all the requests ...
axios parallel api (later optimizations)
const files = ['f1', 'f2', 'f3'];
q.all(files.map(f => {
return axios.get(f, { responseType: 'arraybuffer'})
})).then(allRawData => {
// another one to returna list of buffers ...
  const drums = allBuffer.map(b => {return new Drum (context, b)})
}).catch(e => {
});
*/


var drums = [];

var filenames = ['/api/samples/bd/bd2510.mp3', '/api/samples/SD/SD0010.mp3', '/api/samples/LT/LT50.WAV', '/api/samples/MT/MT75.WAV', '/api/samples/HT/HT75.mp3', '/api/samples/RS/RS.WAV', '/api/samples/CP/CP.WAV', '/api/samples/CB/CB.mp3', '/api/samples/CY/CY1000.mp3', '/api/samples/OH/OH25.WAV', '/api/samples/CH/CH.WAV'];

var _loop = function _loop(i) {
  _axios2.default.get(filenames[i], { responseType: 'arraybuffer' }).then(function (response) {
    context.decodeAudioData(response.data, function (buffer) {
      drums[i] = new Drum(context, buffer);
    });
  });
};

for (var i = 0; i < filenames.length; ++i) {
  _loop(i);
}

var DrumMachine = _react2.default.createClass({
  displayName: 'DrumMachine',
  getInitialState: function getInitialState() {
    return {
      activePattern: 0,
      activeStep: -1,
      bpm: 120,
      interval: null,
      isTicking: false,
      sequence: [[[], [], [], [], [], [], [], [], [], [], [], [], []], [[], [], [], [], [], [], [], [], [], [], [], [], []]]
    };
  },
  btnClicked: function btnClicked(pattern, row, step) {
    this.state.sequence[pattern][row][step] = !this.state.sequence[pattern][row][step];
    this.setState({ sequence: this.state.sequence });
    this.props.buttonClick(pattern, row, step);
  },
  handleChangeBpm: function handleChangeBpm(event) {
    this.setState({ bpm: event.target.value });
    this.props.bpmChanged(event.target.value);
  },
  handleChangePattern: function handleChangePattern(event) {
    this.setState({ activePattern: +event.target.value });
  },
  handleClickStartStop: function handleClickStartStop() {
    if (this.state.isTicking) {
      clearTimeout(this.state.interval);
      this.setState({
        activeStep: -1,
        isTicking: false
      });
    } else {
      this.setState({
        isTicking: true
      });
      this.tick();
    }
  },
  tick: function tick() {
    var nextActiveStep = (this.state.activeStep + 1) % 16;
    var activeSequence = this.state.sequence[this.state.activePattern];

    for (var _i = 0; _i < activeSequence.length; ++_i) {
      if (activeSequence[_i][nextActiveStep]) {
        drums[_i].trigger(context.currentTime);
      }
    }
    this.setState({
      activeStep: nextActiveStep,
      interval: setTimeout(this.tick, 60000 / this.state.bpm / 4)
    });
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'drum-machine' },
      _react2.default.createElement(
        'div',
        { className: 'sequencer-controls' },
        _react2.default.createElement(
          'a',
          {
            className: 'btn-floating btn-large waves-effect waves-light red',
            onClick: this.handleClickStartStop },
          this.state.isTicking ? '⬛' : '▶︎'
        ),
        _react2.default.createElement('input', { className: 'tempo', onChange: this.handleChangeBpm, type: 'number', value: this.state.bpm }),
        _react2.default.createElement(
          'select',
          { className: 'drum-pattern', onChange: this.handleChangePattern, value: this.state.activePattern },
          _react2.default.createElement(
            'option',
            { value: 0 },
            '0'
          ),
          _react2.default.createElement(
            'option',
            { value: 1 },
            '1'
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'drum-machines' },
        _react2.default.createElement(_Grid2.default, {
          activeStep: this.state.activeStep,
          activePattern: this.state.activePattern,
          btnClicked: this.btnClicked,
          className: 'machine-left',
          pattern: 0,
          sequence: this.state.sequence[0],
          drums: drums
        }),
        _react2.default.createElement(_Grid2.default, {
          activeStep: this.state.activeStep,
          activePattern: this.state.activePattern,
          btnClicked: this.btnClicked,
          className: 'machine-right',
          pattern: 1,
          sequence: this.state.sequence[1],
          drums: drums
        })
      )
    );
  }
});

exports.default = DrumMachine;
});

require.register("components/Grid.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _Btn = require('components/Btn');

var _Btn2 = _interopRequireDefault(_Btn);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Grid = _react2.default.createClass({
  displayName: 'Grid',
  renderRow: function renderRow(row) {
    var _props$drums = this.props.drums;
    var drums = _props$drums === undefined ? [] : _props$drums;

    var btnRow = [];
    var drumName = [{
      short: 'BD',
      long: 'Bass Drum'
    }, {
      short: 'SD',
      long: 'Snare Drum'
    }, {
      short: 'LT',
      long: 'Low-Tom'
    }, {
      short: 'MT',
      long: 'Mid-Tom '
    }, {
      short: 'HT',
      long: 'High-Tom'
    }, {
      short: 'RS',
      long: 'Rim-Shot'
    }, {
      short: 'CP',
      long: 'HandClap'
    }, {
      short: 'CB',
      long: 'CowBell'
    }, {
      short: 'CY',
      long: 'Cymbal'
    }, {
      short: 'OH',
      long: 'Open Hi-Hat'
    }, {
      short: 'CH',
      long: 'Closed Hi-Hat'
    }];
    var handleTriggers = drums.map(function (drum) {
      return (typeof drum === 'undefined' ? 'undefined' : _typeof(drum)) === 'object' ? function () {
        return drum.trigger(0);
      } : null;
    });

    btnRow.push(_react2.default.createElement(
      'button',
      {
        className: 'grid-row-caption',
        key: drumName[row].short,
        onClick: handleTriggers[row],
        title: drumName[row].long
      },
      drumName[row].short
    ));

    for (var step = 0; step < 16; ++step) {
      btnRow.push(_react2.default.createElement(_Btn2.default, {
        activePattern: this.props.activePattern,
        activeStep: this.props.activeStep,
        btnClicked: this.props.btnClicked,
        btnState: this.props.sequence[row][step],
        key: step,
        pattern: this.props.pattern,
        row: row,
        step: step
      }));
    }

    return btnRow;
  },
  renderRows: function renderRows() {
    var btns = [];

    for (var row = 0; row < 11; ++row) {
      btns.push(_react2.default.createElement(
        'div',
        {
          className: 'button-row',
          key: row
        },
        this.renderRow(row)
      ));
    }

    return btns;
  },
  render: function render() {
    var style = {
      border: '1px solid green'
    };

    return _react2.default.createElement(
      'div',
      { className: 'button-wrapper ' + this.props.className, style: style },
      this.renderRows()
    );
  }
});

exports.default = Grid;
});

require.register("components/Header.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = _react2.default.createClass({
  displayName: 'Header',
  render: function render() {
    var style = {
      background: '#F5A623',
      boxSizing: 'border-box',
      height: '200px'
    };

    return _react2.default.createElement(
      'div',
      { id: 'header', style: style },
      _react2.default.createElement(
        'h1',
        null,
        'Musical Chairs'
      )
    );
  }
});

exports.default = Header;
});

require.register("components/Knob.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Knob = _react2.default.createClass({
    displayName: "Knob",
    render: function render() {
        return _react2.default.createElement(
            "div",
            { className: "knob" },
            _react2.default.createElement(
                "svg",
                { width: "111px", height: "99px", viewBox: "708 818 111 99" },
                _react2.default.createElement(
                    "defs",
                    null,
                    _react2.default.createElement("rect", { id: "path-1", x: "57.0557483", y: "38.1262991", width: "3", height: "13.7802355", rx: "1.5" }),
                    _react2.default.createElement(
                        "mask",
                        { id: "mask-2", maskContentUnits: "userSpaceOnUse", maskUnits: "objectBoundingBox", x: "0", y: "0", width: "3", height: "13.7802355", fill: "white" },
                        _react2.default.createElement("use", { href: "#path-1" })
                    )
                ),
                _react2.default.createElement(
                    "g",
                    { id: "Group-3", stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd", transform: "translate(708.000000, 818.000000)" },
                    _react2.default.createElement(
                        "text",
                        { id: "Part-2", fontFamily: "LucidaGrande-Bold, Lucida Grande", fontSize: "8", fontWeight: "bold", fill: "#000000" },
                        _react2.default.createElement(
                            "tspan",
                            { x: "24", y: "8" },
                            "Part 2"
                        )
                    ),
                    _react2.default.createElement(
                        "text",
                        { id: "Part-1", fontFamily: "LucidaGrande-Bold, Lucida Grande", fontSize: "8", fontWeight: "bold", fill: "#000000" },
                        _react2.default.createElement(
                            "tspan",
                            { x: "0", y: "28" },
                            "Part 1"
                        )
                    ),
                    _react2.default.createElement("circle", { id: "Oval-11", stroke: "#000000", fill: "#000000", cx: "62", cy: "61", r: "37" }),
                    _react2.default.createElement("ellipse", { id: "Oval-10", stroke: "#FFFFFF", fill: "#000000", cx: "63", cy: "61.5", rx: "24", ry: "24.5" }),
                    _react2.default.createElement("use", { id: "Rectangle-4", stroke: "#FFFFFF", mask: "url(#mask-2)", strokeWidth: "2", fill: "#FFFFFF",
                        transform: "translate(58.555748, 45.016417) rotate(-18.000000) translate(-58.555748, -45.016417) ", href: "#path-1" }),
                    _react2.default.createElement("circle", { id: "Oval-9", stroke: "#000000", fill: "#000000", cx: "18", cy: "61", r: "2" }),
                    _react2.default.createElement("circle", { id: "Oval-9", stroke: "#000000", fill: "#000000", cx: "27", cy: "35", r: "2" }),
                    _react2.default.createElement("circle", { id: "Oval-9", stroke: "#000000", fill: "#000000", cx: "49", cy: "19", r: "2" }),
                    _react2.default.createElement("circle", { id: "Oval-9", stroke: "#000000", fill: "#000000", cx: "76", cy: "18", r: "2" }),
                    _react2.default.createElement("circle", { id: "Oval-9", stroke: "#000000", fill: "#000000", cx: "99", cy: "35", r: "2" }),
                    _react2.default.createElement("circle", { id: "Oval-9", stroke: "#000000", fill: "#000000", cx: "108", cy: "61", r: "2" })
                )
            )
        );
    }
}); /* eslint-disable */
// Eslint does not like the SVG in this file 🤐

exports.default = Knob;
});

require.register("components/LoggedIn.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _reactNotifyToast = require('react-notify-toast');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoggedIn = _react2.default.createClass({
  displayName: 'LoggedIn',
  handleLogOut: function handleLogOut() {
    var _this = this;

    _axios2.default.delete('/api/token').then(function () {
      _this.props.router.push('/');
      _reactNotifyToast.notify.show('You are now logged out!', 'success', 5000);
    }).catch(function (err) {
      _reactNotifyToast.notify.show('Oops! Try again....', 'error', 5000);
      throw err;
    });
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'card logged-in' },
      _react2.default.createElement(
        'div',
        { className: 'card-content' },
        _react2.default.createElement(
          'span',
          { className: 'card-title' },
          'Welcome ',
          this.props.username,
          '!'
        ),
        _react2.default.createElement(
          'h4',
          null,
          'Your Songs'
        ),
        _react2.default.createElement(
          'button',
          { onClick: this.handleLogOut },
          'Log Out'
        )
      )
    );
  }
});

exports.default = (0, _reactRouter.withRouter)(LoggedIn);
});

require.register("components/Login.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRouter = require('react-router');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _reactNotifyToast = require('react-notify-toast');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Login = _react2.default.createClass({
  displayName: 'Login',
  getInitialState: function getInitialState() {
    return {
      username: '',
      password: ''
    };
  },
  handleUsername: function handleUsername(event) {
    var username = event.target.value;

    this.setState({
      username: username
    });
  },
  handlePassword: function handlePassword(event) {
    var password = event.target.value;

    this.setState({
      password: password
    });
  },
  handleLogin: function handleLogin() {
    var _this = this;

    _axios2.default.post('/api/token', {
      username: this.state.username,
      password: this.state.password
    }).then(function () {
      _this.props.router.push('/');
      _reactNotifyToast.notify.show('You are now logged in!', 'success', 5000);
    }).catch(function (err) {
      _reactNotifyToast.notify.show('Oops! Try again....', 'error', 5000);
      throw err;
    });
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'card login' },
      _react2.default.createElement(
        'div',
        { className: 'card-content' },
        _react2.default.createElement(
          'span',
          { className: 'card-title' },
          'Log In!!!'
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('input', {
            onChange: this.handleUsername,
            placeholder: 'Username',
            type: 'text',
            value: this.state.username
          })
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('input', {
            onChange: this.handlePassword,
            placeholder: 'Password',
            type: 'password',
            value: this.state.password
          })
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'button',
            { onClick: this.handleLogin },
            'Log In'
          )
        ),
        _react2.default.createElement(
          _reactRouter.Link,
          { to: 'Signup' },
          'Need an account? Sign up here!'
        )
      )
    );
  }
});

exports.default = (0, _reactRouter.withRouter)(Login);
});

require.register("components/Main.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Beets = require('components/Beets');

var _Beets2 = _interopRequireDefault(_Beets);

var _LoggedIn = require('components/LoggedIn');

var _LoggedIn2 = _interopRequireDefault(_LoggedIn);

var _Login = require('components/Login');

var _Login2 = _interopRequireDefault(_Login);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Studios = require('components/Studios');

var _Studios2 = _interopRequireDefault(_Studios);

var _reactCookie = require('react-cookie');

var _reactCookie2 = _interopRequireDefault(_reactCookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Main = _react2.default.createClass({
  displayName: 'Main',
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'main' },
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'col s8' },
          _react2.default.createElement(_Beets2.default, null)
        ),
        _react2.default.createElement(
          'div',
          { className: 'col s4' },
          _reactCookie2.default.load('mc_loggedIn') ? _react2.default.createElement(_LoggedIn2.default, { username: _reactCookie2.default.load('mc_username') }) : _react2.default.createElement(_Login2.default, null)
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          null,
          _reactCookie2.default.load('mc_loggedIn') ? _react2.default.createElement(_Studios2.default, null) : null
        )
      )
    );
  }
});

exports.default = Main;
});

require.register("components/Nav.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRouter = require('react-router');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Nav = _react2.default.createClass({
  displayName: 'Nav',
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'blackbird-background' },
      _react2.default.createElement(
        'nav',
        null,
        _react2.default.createElement(
          'div',
          { className: 'nav-wrapper' },
          _react2.default.createElement(
            _reactRouter.Link,
            { className: 'brand-logo', to: '/' },
            'BEETS'
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'container' },
        this.props.children
      )
    );
  }
});

exports.default = (0, _reactRouter.withRouter)(Nav);
});

require.register("components/Routes.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRouter = require('react-router');

var _DrumMachine = require('components/DrumMachine');

var _DrumMachine2 = _interopRequireDefault(_DrumMachine);

var _Main = require('components/Main');

var _Main2 = _interopRequireDefault(_Main);

var _Nav = require('components/Nav');

var _Nav2 = _interopRequireDefault(_Nav);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Signup = require('components/Signup');

var _Signup2 = _interopRequireDefault(_Signup);

var _Studio = require('components/Studio');

var _Studio2 = _interopRequireDefault(_Studio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Routes = _react2.default.createClass({
  displayName: 'Routes',
  render: function render() {
    return _react2.default.createElement(
      _reactRouter.Router,
      { history: _reactRouter.browserHistory },
      _react2.default.createElement(
        _reactRouter.Route,
        { component: _Nav2.default, path: '/' },
        _react2.default.createElement(_reactRouter.IndexRoute, { component: _Main2.default }),
        _react2.default.createElement(_reactRouter.Route, { component: _Studio2.default, path: 'studio/:id' }),
        _react2.default.createElement(_reactRouter.Route, { component: _Signup2.default, path: 'signup' }),
        _react2.default.createElement(_reactRouter.Route, { component: _DrumMachine2.default, path: 'DrumMachine' })
      )
    );
  }
});

exports.default = Routes;
});

require.register("components/Signup.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRouter = require('react-router');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _reactNotifyToast = require('react-notify-toast');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Signup = _react2.default.createClass({
  displayName: 'Signup',
  getInitialState: function getInitialState() {
    return {
      username: '',
      password: ''
    };
  },
  handleUsername: function handleUsername(event) {
    var username = event.target.value;

    this.setState({
      username: username
    });
  },
  handlePassword: function handlePassword(event) {
    var password = event.target.value;

    this.setState({
      password: password
    });
  },
  handleRegister: function handleRegister() {
    var _this = this;

    _axios2.default.post('/api/users', {
      username: this.state.username,
      password: this.state.password
    }).then(function () {
      _this.props.router.push('/');
      _reactNotifyToast.notify.show('Signup successful! You may now log in.', 'success', 10000);
    }).catch(function (err) {
      _reactNotifyToast.notify.show('Oops! Try again....', 'error', 5000);
      throw err;
    });
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'component signup' },
      _react2.default.createElement(
        'h2',
        null,
        'Sign Up Now'
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('input', {
          onChange: this.handleUsername,
          placeholder: 'Choose username',
          type: 'text',
          value: this.state.username
        })
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('input', {
          onChange: this.handlePassword,
          placeholder: 'Choose password',
          type: 'password',
          value: this.state.password
        })
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'button',
          { onClick: this.handleRegister },
          'Register'
        )
      ),
      _react2.default.createElement(
        _reactRouter.Link,
        { to: '/' },
        'Nevermind'
      )
    );
  }
});

exports.default = (0, _reactRouter.withRouter)(Signup);
});

require.register("components/Studio.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _reactCookie = require('react-cookie');

var _reactCookie2 = _interopRequireDefault(_reactCookie);

var _Chat = require('components/Chat');

var _Chat2 = _interopRequireDefault(_Chat);

var _DrumMachine = require('components/DrumMachine');

var _DrumMachine2 = _interopRequireDefault(_DrumMachine);

var _Knob = require('components/Knob');

var _Knob2 = _interopRequireDefault(_Knob);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNotifyToast = require('react-notify-toast');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Image = require('react-image-component');
// React.renderComponent(<Image src='./photos/blackbird.jpg')
var socket = io();

var Studio = _react2.default.createClass({
  displayName: 'Studio',
  getInitialState: function getInitialState() {
    return {
      studio: this.props.params.id,
      username: _reactCookie2.default.load('mc_username'),
      collaborators: [],
      image_url: '',
      sequence: '[[],[],[],[],[],[],[],[],[],[],[],[],[]]',
      title: ''
    };
  },
  componentWillMount: function componentWillMount() {
    var _this = this;

    socket.emit('enter studio', {
      studio: this.state.studio,
      username: this.state.username
    });
    this.setState({
      collaborators: this.state.collaborators.concat({ username: this.state.username })
    });

    socket.on('success', function (data) {
      _this.setState({
        collaborators: data.usernames.map(function (name) {
          return { username: name };
        })
      });

      if (_this.state.username === data.usernames[0]) {
        var sequence = _this.refs['drumMachine'].state.sequence;

        socket.emit('sync', {
          studio: _this.props.params.id,
          username: _this.state.username,
          sequence: sequence
        });

        socket.emit('sync', {
          studio: _this.props.params.id,
          username: _this.state.username,
          bpm: _this.refs['drumMachine'].state.bpm
        });
      }
    });

    socket.on('sync', function (data) {
      var drumMachine = _this.refs['drumMachine'];
      if (data.sequence) {
        if (data.username !== _this.state.username) {
          drumMachine.setState({ sequence: data.sequence });
        }
      } else if (data.buttonClick) {
        if (data.username !== _this.state.username) {
          var sequence = drumMachine.state.sequence;
          var _data$buttonClick = data.buttonClick;
          var pattern = _data$buttonClick.pattern;
          var row = _data$buttonClick.row;
          var step = _data$buttonClick.step;

          sequence[pattern][row][step] = !sequence[pattern][row][step];
          drumMachine.setState({ sequence: sequence });
        }
      } else if (data.bpm) {
        if (data.username !== _this.state.username) {
          drumMachine.setState({ bpm: data.bpm });
        }
      }
    });
  },
  buttonClick: function buttonClick(pattern, row, step) {
    socket.emit('sync', {
      studio: this.props.params.id,
      username: this.state.username,
      buttonClick: { pattern: pattern, row: row, step: step }
    });
  },
  bpmChanged: function bpmChanged(newBpm) {
    socket.emit('sync', {
      studio: this.props.params.id,
      username: this.state.username,
      bpm: newBpm
    });
  },
  handleTitle: function handleTitle(event) {
    var title = event.target.value;

    this.setState({
      title: title
    });
  },
  handleImageUrl: function handleImageUrl(event) {
    var image_url = event.target.value;

    this.setState({
      image_url: image_url
    });
  },


  // handleSequence() {
  //
  // },

  handlePublish: function handlePublish(event) {
    var _this2 = this;

    event.preventDefault();
    _axios2.default.post('/api/beets', {
      title: this.state.title,
      image_url: this.state.image_url,
      sequence: this.state.sequence
    }).then(function (newBeet) {
      var newBeetId = newBeet.data.id;

      var promises = _this2.state.collaborators.map(function (collaborator) {
        return _axios2.default.post('/api/beets_users', { beetId: newBeetId, username: collaborator.username });
      });

      return _axios2.default.all(promises);
    }).then(function () {
      _reactNotifyToast.notify.show('Your beet is now published!', 'success', 5000);
      document.getElementById('input-title').value = '';
      document.getElementById('input-image-url').value = '';
    }).catch(function (err) {
      _reactNotifyToast.notify.show('Oops! Try again....', 'error', 5000);
      throw err;
    });
  },
  getBackgroundClass: function getBackgroundClass() {
    if (/Studio 54/i.test(this.props.params.id)) {
      return 'studio3-background';
    } else {
      return 'blackbird-background';
    }
  },
  render: function render() {
    var params = this.props.params;

    return _react2.default.createElement(
      'div',
      { className: 'studio ' + this.getBackgroundClass() },
      _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(
          'h1',
          { className: 'studio-title' },
          'You Are in ',
          params.id
        ),
        _react2.default.createElement(_Knob2.default, null),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_DrumMachine2.default, { ref: 'drumMachine', buttonClick: this.buttonClick, bpmChanged: this.bpmChanged })
        ),
        _react2.default.createElement(
          'div',
          { className: 'meta-data' },
          _react2.default.createElement(
            'div',
            { className: 'component' },
            _react2.default.createElement(
              'h2',
              null,
              'Publish Beet'
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'h3',
                null,
                'Collaborators'
              ),
              _react2.default.createElement(
                'ul',
                null,
                this.state.collaborators.map(function (elem, index) {
                  return _react2.default.createElement(
                    'li',
                    { key: index },
                    elem.username
                  );
                })
              )
            ),
            _react2.default.createElement(
              'h3',
              null,
              'Add Beet Info'
            ),
            _react2.default.createElement(
              'form',
              null,
              _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement('input', {
                  onChange: this.handleTitle,
                  placeholder: 'Title',
                  type: 'text',
                  id: 'input-title'
                })
              ),
              _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement('input', {
                  onChange: this.handleImageUrl,
                  placeholder: 'Album Image URL',
                  type: 'text',
                  id: 'input-image-url'
                })
              ),
              _react2.default.createElement(
                'button',
                { onClick: this.handlePublish },
                'Publish Beet'
              )
            )
          ),
          _react2.default.createElement(_Chat2.default, { socket: socket, studio: this.state.studio, username: this.state.username })
        )
      )
    );
  }
});

exports.default = Studio;
});

require.register("components/Studios.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRouter = require('react-router');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var studios = [{
  id: 1,
  name: 'The Red Room'
}, {
  id: 2,
  name: 'Studio 54'
}];

var Studios = _react2.default.createClass({
  displayName: 'Studios',
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'card studios' },
      _react2.default.createElement(
        'div',
        { className: 'card-content' },
        _react2.default.createElement(
          'span',
          { className: 'card-title' },
          'Enter a Studio'
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'ul',
            null,
            studios.map(function (element, index) {
              return _react2.default.createElement(
                'li',
                { key: index },
                _react2.default.createElement(
                  _reactRouter.Link,
                  { key: index, to: '/Studio/' + element.name },
                  '' + element.name
                )
              );
            })
          )
        )
      )
    );
  }
});

exports.default = Studios;
});

require.register("components/drumSoundSampler.jsx", function(exports, require, module) {
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DrumMachine = require('components/DrumMachine');

var _DrumMachine2 = _interopRequireDefault(_DrumMachine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var drumSoundSampler = _react2.default.createClass({
  displayName: 'drumSoundSampler',
  handleClick: function handleClick() {
    this.props.btnClicked(drums.trigger);
  }
});
});

require.register("index.jsx", function(exports, require, module) {
'use strict';

var _reactNotifyToast = require('react-notify-toast');

var _reactNotifyToast2 = _interopRequireDefault(_reactNotifyToast);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Routes = require('components/Routes');

var _Routes2 = _interopRequireDefault(_Routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(
  'div',
  null,
  _react2.default.createElement(_reactNotifyToast2.default, null),
  _react2.default.createElement(_Routes2.default, null)
), document.getElementById('app'));
});

require.alias("buffer/index.js", "buffer");
require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map