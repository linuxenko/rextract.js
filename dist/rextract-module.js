module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _extract = __webpack_require__(1);

	var _extract2 = _interopRequireDefault(_extract);

	var _canvas = __webpack_require__(3);

	var _canvas2 = _interopRequireDefault(_canvas);

	var _region = __webpack_require__(2);

	var _color = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Rextract = function (_Extract) {
	  _inherits(Rextract, _Extract);

	  function Rextract(element, color) {
	    _classCallCheck(this, Rextract);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Rextract).call(this));

	    _this.color = new _color.Color(color);
	    _this.screen = new _canvas2.default(element);
	    _this.canvas = _this.screen.canvas;
	    _this.ctx = _this.screen.ctx;

	    if (color) {
	      _this.screen.fix(_this.color.toHex());
	    } else {
	      _this.screen.fix('rgba(0,0,0,0)');
	    }
	    return _this;
	  }

	  _createClass(Rextract, [{
	    key: 'detectRegion',
	    value: function detectRegion(x, y) {
	      var region = this.extractRegion(x, y);

	      if (region.isValid()) {
	        return region;
	      }

	      return null;
	    }
	  }, {
	    key: 'detectAll',
	    value: function detectAll() {
	      var map = new _region.RegionMap(),
	          point = new _region.Rect(),
	          region = null;

	      for (point.x = 1; point.x < this.canvas.width - 1; point.x += 2) {
	        for (point.y = 1; point.y < this.canvas.height - 1; point.y += 2) {
	          if (map.isColllision(point)) {
	            continue;
	          }

	          if ((region = this.detectRegion(point.x, point.y)) !== null) {
	            map.add(region);
	          }
	        }
	      }

	      return map.data();
	    }
	  }]);

	  return Rextract;
	}(_extract2.default);

	exports.default = Rextract;


	if (typeof window !== 'undefined') {
	  window.Rextract = Rextract;
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _region = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Extract = function () {
	  function Extract() {
	    _classCallCheck(this, Extract);
	  }

	  _createClass(Extract, [{
	    key: 'makeMap',
	    value: function makeMap() {
	      var width = this.canvas.width;
	      var height = this.canvas.height;
	      var data = this.ctx.getImageData(0, 0, width, height).data;

	      this.colorMap = new Array(width);

	      for (var xa = 0; xa < width; xa++) {
	        this.colorMap[xa] = new Array(height);
	        for (var ya = 0; ya < height; ya++) {
	          if (this.color.t === 0) {
	            this.colorMap[xa][ya] = data[(xa + ya * width) * 4 + 3] === 0;
	          } else {
	            this.colorMap[xa][ya] = data[(xa + ya * width) * 4] === this.color.r && data[(xa + ya * width) * 4 + 1] === this.color.g && data[(xa + ya * width) * 4 + 2] === this.color.b;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'fromRegion',
	    value: function fromRegion(x, y) {
	      var w = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
	      var h = arguments.length <= 3 || arguments[3] === undefined ? 1 : arguments[3];

	      var rect = new _region.Rect(x, y, w, h).invert(),
	          offset = {};

	      if (typeof this.colorMap === 'undefined') {
	        this.makeMap();
	      }

	      while ((offset = this.regionOffset(rect)) !== true) {
	        rect.patch(offset);
	      }

	      rect = this.extractRegion(rect.x, rect.y, rect.w, rect.h);

	      if (rect.w + rect.x >= this.canvas.width && rect.y + rect.h >= this.canvas.height || rect.w < 1 || rect.h < 1) {
	        return null;
	      }

	      return rect;
	    }
	  }, {
	    key: 'regionOffset',
	    value: function regionOffset(rect) {
	      /* top , left -> right */
	      if (this.isEmptyX(rect.x, rect.x + rect.w, rect.y) === true) {
	        if (rect.y < this.canvas.height) {
	          return { y: 1, h: -1 };
	        }
	      }

	      /* left, top -> bottom */
	      if (this.isEmptyY(rect.y, rect.y + rect.h, rect.x) === true) {
	        if (rect.x < this.canvas.width) {
	          return { x: 1, w: -1 };
	        }
	      }

	      /* right, top -> bottom */
	      if (this.isEmptyY(rect.y, rect.y + rect.h, rect.x + rect.w) === true) {
	        if (rect.w > 0) {
	          return { w: -1 };
	        }
	      }

	      /* bottom, left -> right */
	      if (this.isEmptyX(rect.x, rect.x + rect.w, rect.y + rect.h) === true) {
	        if (rect.h > 0) {
	          return { h: -1 };
	        }
	      }

	      return true;
	    }
	  }, {
	    key: 'extractRegion',
	    value: function extractRegion(x, y) {
	      var w = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
	      var h = arguments.length <= 3 || arguments[3] === undefined ? 1 : arguments[3];

	      var rect = new _region.Rect(x, y, w, h),
	          offset = {};

	      if (typeof this.colorMap === 'undefined') {
	        this.makeMap();
	      }

	      while ((offset = this.rectOffset(rect)) !== true) {
	        rect.patch(offset);
	      }

	      return rect.fix(this.canvas.width, this.canvas.height);
	    }
	  }, {
	    key: 'rectOffset',
	    value: function rectOffset(rect) {
	      /* top , left -> right */
	      if (this.isEmptyX(rect.x, rect.x + rect.w, rect.y) === false) {
	        if (rect.y > 0) {
	          return { y: -1 };
	        }
	      }

	      /* left, top -> bottom */
	      if (this.isEmptyY(rect.y, rect.y + rect.h, rect.x) === false) {
	        if (rect.x > 0) {
	          return { x: -1 };
	        }
	      }

	      /* right, top -> bottom */
	      if (this.isEmptyY(rect.y, rect.y + rect.h, rect.x + rect.w) === false) {
	        if (this.canvas.width > rect.w) {
	          return { w: 1 };
	        }
	      }

	      /* bottom, left -> right */
	      if (this.isEmptyX(rect.x, rect.x + rect.w, rect.y + rect.h) === false) {
	        if (this.canvas.height > rect.h) {
	          return { h: 1 };
	        }
	      }

	      return true;
	    }
	  }, {
	    key: 'isEmptyX',
	    value: function isEmptyX(start, stop, pointY) {
	      for (var x = start; x < stop; x++) {
	        if (this.isMapEmpty(x, pointY) === false) {
	          return false;
	        }
	      }
	      return true;
	    }
	  }, {
	    key: 'isEmptyY',
	    value: function isEmptyY(start, stop, pointX) {
	      for (var y = start; y < stop; y++) {
	        if (this.isMapEmpty(pointX, y) === false) {
	          return false;
	        }
	      }
	      return true;
	    }
	  }, {
	    key: 'isMapEmpty',
	    value: function isMapEmpty(x, y) {
	      if (typeof this.colorMap[x] === 'undefined') {
	        return false;
	      }
	      return this.colorMap[x][y];
	    }
	  }]);

	  return Extract;
	}();

	exports.default = Extract;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var RegionMap = exports.RegionMap = function () {
	  function RegionMap() {
	    _classCallCheck(this, RegionMap);

	    this.map = [];
	  }

	  _createClass(RegionMap, [{
	    key: 'add',
	    value: function add(rect) {
	      this.map.push(rect);
	    }
	  }, {
	    key: 'colorFix',
	    value: function colorFix() {
	      this.map.forEach(function (i) {
	        i.colorFix();
	      });

	      return this.data();
	    }
	  }, {
	    key: 'data',
	    value: function data() {
	      return this.map;
	    }
	  }, {
	    key: 'isColllision',
	    value: function isColllision(rect) {
	      for (var i = 0; i < this.map.length; i++) {
	        if (this.map[i].isCollision(rect)) {
	          return true;
	        }
	      }
	      return false;
	    }
	  }]);

	  return RegionMap;
	}();

	var Rect = exports.Rect = function () {
	  function Rect(x, y, w, h) {
	    _classCallCheck(this, Rect);

	    this.x = x || 0;
	    this.y = y || 0;
	    this.w = w || 1;
	    this.h = h || 1;
	    this.selected = false;
	    this.key = null;
	    this.name = null;
	  }

	  _createClass(Rect, [{
	    key: 'patch',
	    value: function patch(offset) {
	      if (typeof offset.x === 'number') {
	        this.x += offset.x;
	      }

	      if (typeof offset.y === 'number') {
	        this.y += offset.y;
	      }

	      if (typeof offset.w === 'number') {
	        this.w += offset.w;
	      }

	      if (typeof offset.h === 'number') {
	        this.h += offset.h;
	      }

	      return this;
	    }
	  }, {
	    key: 'invert',
	    value: function invert() {
	      if (this.w < 1) {
	        var x = this.x + this.w;
	        this.x = x;
	        this.w = this.w * -1;
	      }

	      if (this.h < 1) {
	        var y = this.y + this.h;
	        this.y = y;
	        this.h = this.h * -1;
	      }
	      return this;
	    }
	  }, {
	    key: 'fix',
	    value: function fix(w, h) {
	      if (this.x < 0) {
	        this.x = 0;
	      }

	      if (this.y < 0) {
	        this.y = 0;
	      }

	      if (this.w > w) {
	        this.w = w;
	      }

	      if (this.h > h) {
	        this.h = h;
	      }

	      return this;
	    }
	  }, {
	    key: 'colorFix',
	    value: function colorFix() {

	      if (this.x > 0) {
	        this.x += 1;
	      }

	      if (this.y > 0) {
	        this.y += 1;
	      }
	      this.w += 1;
	      this.h += 1;

	      return this;
	    }
	  }, {
	    key: 'toArgs',
	    value: function toArgs() {
	      return [this.x, this.y, this.w, this.h];
	    }
	  }, {
	    key: 'isValid',
	    value: function isValid() {
	      return this.w > 1 && this.h > 1;
	    }
	  }, {
	    key: 'isCollision',
	    value: function isCollision(rect) {
	      return !(this.y + this.h < rect.y || this.y > rect.y + rect.h || this.x + this.w < rect.x || this.x > rect.x + rect.w);
	    }
	  }]);

	  return Rect;
	}();

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Canvas = function () {
	  function Canvas(element) {
	    _classCallCheck(this, Canvas);

	    this.fixed = false;
	    this.canvas = document.createElement('canvas');
	    this.ctx = this.canvas.getContext('2d');

	    this.canvas.width = element.width;
	    this.canvas.height = element.height;

	    this.ctx.drawImage(element, 0, 0);
	  }

	  _createClass(Canvas, [{
	    key: 'fix',
	    value: function fix(color) {
	      var image = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

	      this.fixed = true;

	      this.canvas.width = this.canvas.width + 2;
	      this.canvas.height = this.canvas.height + 2;

	      this.ctx.save();
	      this.ctx.putImageData(image, 1, 1);
	      this.ctx.strokeStyle = color;
	      this.ctx.lineWidth = 2;
	      this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
	      this.ctx.stroke();
	      this.ctx.restore();
	    }
	  }]);

	  return Canvas;
	}();

	exports.default = Canvas;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Color = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _hexAndRgba = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Color = exports.Color = function () {
	  function Color(color) {
	    _classCallCheck(this, Color);

	    if (typeof color === 'undefined') {
	      this.r = 0;
	      this.g = 0;
	      this.b = 0;
	      this.t = 0;
	    } else {
	      this.parse(color);
	    }
	  }

	  _createClass(Color, [{
	    key: 'toHex',
	    value: function toHex() {
	      return (0, _hexAndRgba.rgbaToHex)(this.r, this.g, this.b);
	    }
	  }, {
	    key: 'parse',
	    value: function parse(color) {
	      if (typeof color === 'string') {
	        var rgbt = (0, _hexAndRgba.hexToRgba)(color);
	        this.r = rgbt[0];
	        this.g = rgbt[1];
	        this.b = rgbt[2];
	        this.t = 255;
	      } else if ((typeof color === 'undefined' ? 'undefined' : _typeof(color)) === 'object') {
	        this.r = color[0];
	        this.g = color[1];
	        this.b = color[2];
	        this.t = color[3];
	      }
	    }
	  }]);

	  return Color;
	}();

/***/ },
/* 5 */
/***/ function(module, exports) {

	//REQ: io.js

	'use strict';


	module.exports.rgbaToHex = function rgbaToHex(rgba_params_here)
	{
	    var arraytoHex = function(args) {
	        return args.map(function(e){ var r = (+e).toString(16); r.length==1 && (r='0'+r); return r; }).join('');
	    }

	    var args = Array.prototype.slice.call(arguments);       // Arguments to Array conversion
	    
	    if (args.length == 4)                                   // is with alpha
	        args[3] = Math.floor(255 * args[3]);                // opacity float to 255-based value

	    return '#' + arraytoHex(args);
	}


	module.exports.hexToRgba = function hexToRgba(hex)
	{
	    var valid = new RegExp(/^#([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3})$/i);

	    if (! valid.test(hex) )
	        return false;

	    var code = hex.match( valid )[1];

	    if (code.length == 3)                                   // fix 3 letter codes
	        code = code.match(/./g).map( function(e) { return e+e; });

	    var codePairs = code.match(/.{1,2}/g).map( function(e) { return parseInt(e, 16); });

	    if (codePairs.length == 4)
	        codePairs[3] = codePairs[3] / 255;
	    else
	        codePairs[3] = 1.0;

	    return codePairs;
	}

/***/ }
/******/ ]);