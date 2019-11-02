webpackHotUpdate("static/development/pages/_app.js",{

/***/ "./components/Nav/Nav.js":
/*!*******************************!*\
  !*** ./components/Nav/Nav.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/parse-int */ "./node_modules/@babel/runtime-corejs2/core-js/parse-int.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_scrollchor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-scrollchor */ "./node_modules/react-scrollchor/lib/scrollchor.js");
/* harmony import */ var react_scrollchor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_scrollchor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Nav_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Nav.scss */ "./components/Nav/Nav.scss");
/* harmony import */ var _Nav_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Nav_scss__WEBPACK_IMPORTED_MODULE_4__);

var _jsxFileName = "/Users/eddietindame/Documents/code/eddietindame.github.io_next/components/Nav/Nav.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;





var Nav = function Nav() {
  var router = Object(next_router__WEBPACK_IMPORTED_MODULE_2__["useRouter"])();
  var navItems = [{
    label: 'Home',
    hash: '#home',
    ref: Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])()
  }, {
    label: 'About',
    hash: '#about',
    ref: Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])()
  }, {
    label: 'Projects',
    href: '/work',
    ref: Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])()
  }, {
    label: 'Contact',
    hash: '#contact',
    ref: Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])()
  }];

  var _onClickAnchor = function _onClickAnchor(e) {
    var _e$target = e.target,
        pathname = _e$target.pathname,
        dataset = _e$target.dataset;
    var ref = pathname !== '/work' ? navItems[_babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_0___default()(dataset.index[0])].ref.current : null;
    e.preventDefault();
    router.push(pathname).then(function () {
      if (ref) setTimeout(function () {
        // timeout because page transition takes 300ms
        ref.simulateClick();
      }, 309);
    });
  };

  var _onHoverAnchor = function _onHoverAnchor() {
    router.prefetch('/');
  };

  return __jsx("nav", {
    className: "nav",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: this
  }, __jsx("ul", {
    className: "nav__items",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48
    },
    __self: this
  }, navItems.map(function (item, i) {
    return __jsx("li", {
      key: i,
      className: "nav__items__item",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 51
      },
      __self: this
    }, item.hash ? router.pathname === '/work' ? __jsx(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, __jsx(react_scrollchor__WEBPACK_IMPORTED_MODULE_3___default.a, {
      ref: item.ref,
      to: item.hash,
      disableHistory: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 59
      },
      __self: this
    }), __jsx("a", {
      href: '/' + item.hash,
      className: "nav__items__link",
      onClick: _onClickAnchor,
      onMouseEnter: _onHoverAnchor,
      "data-index": i,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 64
      },
      __self: this
    }, item.label)) : __jsx(react_scrollchor__WEBPACK_IMPORTED_MODULE_3___default.a, {
      to: item.hash,
      className: "nav__items__link",
      disableHistory: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 72
      },
      __self: this
    }, item.label) : router.pathname === '/work' ? __jsx(react_scrollchor__WEBPACK_IMPORTED_MODULE_3___default.a, {
      to: "#work",
      className: "nav__items__link",
      disableHistory: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 78
      },
      __self: this
    }, item.label) : __jsx("a", {
      href: item.href,
      className: "nav__items__link",
      onClick: _onClickAnchor,
      onMouseEnter: _onHoverAnchor,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 83
      },
      __self: this
    }, item.label));
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (Nav);

/***/ })

})
//# sourceMappingURL=_app.js.9aafce79df74369800b8.hot-update.js.map