/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/canvas.js":
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};
var colors = [{
  r: 255,
  g: 71,
  b: 71
}, {
  r: 0,
  g: 206,
  b: 237
}, {
  r: 255,
  g: 255,
  b: 255
}]; // Event Listeners

addEventListener('mousemove', function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});
addEventListener('resize', function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
}); // Objects

var Particle = /*#__PURE__*/function () {
  function Particle(x, y, dx, dy, radius, ttl) {
    _classCallCheck(this, Particle);

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dy = dy;
    this.dx = dx;
    this.timeToLive = ttl;
    this.opacity = 1;
    this.randomColor = Math.floor(Math.random() * colors.length);
  }

  _createClass(Particle, [{
    key: "update",
    value: function update() {
      this.y += this.dy;
      this.x += this.dx;

      if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
        this.dx = -this.dx;
      }

      if (this.y + this.radius >= canvas.height || this.y - this.radius <= 0) {
        this.dy = -this.dy;
      }

      this.x = Math.min(Math.max(this.x, this.radius), canvas.width - this.radius);
      this.y = Math.min(Math.max(this.y, this.radius), canvas.height - this.radius);
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.strokeStyle = 'rgba(' + colors[this.randomColor].r + ',' + colors[this.randomColor].g + ',' + colors[this.randomColor].b + ',' + this.opacity + ')';
      c.stroke();
      c.closePath();
      this.opacity -= 1 / (ttl / 0.1);
      this.radius -= r / (ttl / 0.1);

      if (this.radius < 0) {
        this.radius = 0;
      }

      this.timeToLive -= 0.1;
    }
  }, {
    key: "remove",
    value: function remove() {
      return this.timeToLive <= 0;
    }
  }]);

  return Particle;
}();

var r = 35;
var ttl = 15;

var Explosion = /*#__PURE__*/function () {
  function Explosion(x, y) {
    _classCallCheck(this, Explosion);

    this.particles = [];
    this.x = x;
    this.y = y;
    this.init();
  }

  _createClass(Explosion, [{
    key: "init",
    value: function init() {
      var randomVelocity = {
        x: (Math.random() - 0.5) * 3.5,
        y: (Math.random() - 0.5) * 3.5
      };
      this.particles.push(new Particle(this.x, this.y, randomVelocity.x, randomVelocity.y, r, ttl));
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this = this;

      this.particles.forEach(function (particle, i) {
        particle.update();
        if (particle.remove() == true) _this.particles.splice(i, 1);
      });
    }
  }]);

  return Explosion;
}(); // Implementation


var explosions = []; // Animation Loop

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "#1e1e1e";
  c.fillRect(0, 0, canvas.width, canvas.height);
  explosions.push(new Explosion(mouse.x, mouse.y));
  explosions.forEach(function (explosion) {
    explosion.draw();
  });
  c.save();
  c.font = "bold 60px Balsamiq Sans";
  c.fillStyle = "white";
  c.textAlign = "center";
  c.textBaseline = "ideographic";
  var ctext = "PARTICLE SURGE".split("").join(String.fromCharCode(8201));
  c.fillText(ctext, canvas.width / 2, canvas.height / 2);
  c.font = "40px Crimson Text";
  c.fillText("Jul 27, 2020", canvas.width / 2, canvas.height / 2 + 100);
  c.beginPath();
  c.moveTo(canvas.width / 2 - 100, canvas.height / 2 + 20);
  c.lineTo(canvas.width / 2 + 100, canvas.height / 2 + 20);
  c.strokeStyle = "rgba(255, 255, 255, 1)";
  c.lineWidth = 2.5;
  c.stroke();
  c.closePath();
  c.restore();
}

animate();

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  var xDist = x2 - x1;
  var yDist = y2 - y1;
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

module.exports = {
  randomIntFromRange: randomIntFromRange,
  randomColor: randomColor,
  distance: distance
};

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map