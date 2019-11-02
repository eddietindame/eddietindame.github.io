webpackHotUpdate("static/development/pages/_app.js",{

/***/ "./config/index.js":
/*!*************************!*\
  !*** ./config/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

var NODE_ENV = "development";
var c = {
  DEV: NODE_ENV !== 'production',
  PORT: 3000,
  TITLE: 'Eddie Tindame - Full Stack Developer',
  DESC: 'I am a full-stack / creative developer currently working out of Firepit Technology in the heart of Warner Music Group, London. I take freelance gigs if they\'re cool enough!',
  GA_TRACKING_ID: 'UA-151353051-1'
};
c.HOST = c.DEV ? "http://localhost:".concat(c.PORT) : 'https://eddietindamegithubionext.firepit1.now.sh'; // : 'https://eddietindame.github.io'

c.FAVICON = "".concat(c.HOST, "/static/favicon.ico");
c.OG_IMAGE = "".concat(c.HOST, "/static/img/og.png");
module.exports = c;

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/extends */ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/app */ "./node_modules/next/app.js");
/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_app__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var next_ga__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! next-ga */ "./node_modules/next-ga/index.js");
/* harmony import */ var next_ga__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_ga__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var next_nprogress_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! next-nprogress/component */ "./node_modules/next-nprogress/component.js");
/* harmony import */ var next_nprogress_component__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(next_nprogress_component__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var next_page_transitions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! next-page-transitions */ "./node_modules/next-page-transitions/lib/index.js");
/* harmony import */ var next_page_transitions__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(next_page_transitions__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _components_Nav__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../components/Nav */ "./components/Nav/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../config */ "./config/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_13__);






var _jsxFileName = "/Users/eddietindame/Documents/code/eddietindame.github.io_next/pages/_app.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement;









var MyApp =
/*#__PURE__*/
function (_App) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__["default"])(MyApp, _App);

  function MyApp() {
    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, MyApp);

    return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(MyApp).apply(this, arguments));
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(MyApp, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          Component = _this$props.Component,
          pageProps = _this$props.pageProps;
      return __jsx(react__WEBPACK_IMPORTED_MODULE_6___default.a.Fragment, null, __jsx(next_nprogress_component__WEBPACK_IMPORTED_MODULE_10___default.a, {
        color: "#000000",
        spinner: false,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 16
        },
        __self: this
      }), __jsx(_components_Nav__WEBPACK_IMPORTED_MODULE_12__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 20
        },
        __self: this
      }), __jsx(next_page_transitions__WEBPACK_IMPORTED_MODULE_11__["PageTransition"], {
        timeout: 300,
        classNames: "page-transition",
        skipInitialTransition: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        },
        __self: this
      }, __jsx(Component, Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, pageProps, {
        key: false ? undefined : next_router__WEBPACK_IMPORTED_MODULE_8___default.a.route,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 26
        },
        __self: this
      }))));
    }
  }]);

  return MyApp;
}(next_app__WEBPACK_IMPORTED_MODULE_7___default.a);

/* harmony default export */ __webpack_exports__["default"] = (next_ga__WEBPACK_IMPORTED_MODULE_9___default()(_config__WEBPACK_IMPORTED_MODULE_13__["GA_TRACKING_ID"], next_router__WEBPACK_IMPORTED_MODULE_8___default.a)(MyApp));

/***/ })

})
//# sourceMappingURL=_app.js.79145737a97b26a5a9cc.hot-update.js.map