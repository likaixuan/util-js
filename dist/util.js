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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

let util = {};

//类型检测 is···
(function (util, arr) {
    let type = "";
    for (let i = 0, type; type = arr[i++];) {
        util['is' + type] = function (obj) {
            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
        }
    }

})(util, ['String', 'Array', 'Number', 'Object', 'Function', 'Null', 'Undefined']);

//职责链
util.Chain = (
    function () {
        let Chain = function (fn) {
            if (!(this instanceof Chain)) {
                return new Chain(fn);
            }
            this.fn = fn;
            this.successor = null;
        };

        Chain.prototype.setNext = function (successor) {
            return this.successor = successor;
        }
        Chain.prototype.run = function () {
            //第一次传参时
            if (!Chain.args) {
                Chain.args = Array.prototype.slice.call(arguments);
            }
            let arr = Array.prototype.concat.call(Chain.args, this.next.bind(this));
            console.log(arr);
            return this.fn.apply(this, arr);
        }
        Chain.prototype.next = function () {
            return this.successor && this.successor.run.apply(this.successor, arguments);
        }
        return Chain;
    }
)();


/* harmony default export */ __webpack_exports__["a"] = (util);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(0);




//测试职责链

let order500 = function (orderType, pay, stock, next) {
    // console.log(next,555);
    if (orderType === 1 && pay === true) {
        console.log("交过五百定金");
    } else {
        console.log("三秒后出结果");
        setTimeout(next,3000);

    }
}
let order200 = function (orderType, pay, stock, next) {
    if (orderType === 2 && pay === true) {
        console.log("交过二百定金");
    } else {
        next();
    }
}
let orderNormal = function (orderType, pay,stock) {
    if (stock > 0) {
        console.log("没交过定金");
    } else {
        console.log('手机库存不足');
    }
}
var a500 = __WEBPACK_IMPORTED_MODULE_0__util_js__["a" /* default */].Chain(order500),
    a200 = __WEBPACK_IMPORTED_MODULE_0__util_js__["a" /* default */].Chain(order200),
    aNormal = __WEBPACK_IMPORTED_MODULE_0__util_js__["a" /* default */].Chain(orderNormal);
a500.setNext(a200).setNext(aNormal);
a500.run(3, true, 500);

/***/ })
/******/ ]);