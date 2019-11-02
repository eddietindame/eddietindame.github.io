webpackHotUpdate("static/development/pages/work.js",{

/***/ "./components/Image/Image.js":
/*!***********************************!*\
  !*** ./components/Image/Image.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_spring__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-spring */ "./node_modules/react-spring/web.js");
/* harmony import */ var react_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-image */ "./node_modules/react-image/umd/index.js");
/* harmony import */ var react_image__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_image__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Image_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Image.scss */ "./components/Image/Image.scss");
/* harmony import */ var _Image_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Image_scss__WEBPACK_IMPORTED_MODULE_4__);
var _jsxFileName = "/Users/eddietindame/Documents/code/eddietindame.github.io_next/components/Image/Image.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;






var Image = function Image(_ref) {
  var className = _ref.className,
      animation = _ref.animation,
      image = _ref.image,
      alt = _ref.alt;

  var _animation = Object(react_spring__WEBPACK_IMPORTED_MODULE_2__["useSpring"])(animation);

  var Element = animation ? react_spring__WEBPACK_IMPORTED_MODULE_2__["animated"].div : 'div';
  return __jsx(Element, {
    className: (className ? className + ' ' : '') + 'image',
    style: _animation,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: this
  }, __jsx("div", {
    className: "image__inner",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: this
  }, __jsx("div", {
    className: "image__loader loader",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  })));
};

Image.propTypes = {
  className: prop_types__WEBPACK_IMPORTED_MODULE_1__["string"],
  animation: prop_types__WEBPACK_IMPORTED_MODULE_1__["object"],
  image: prop_types__WEBPACK_IMPORTED_MODULE_1__["string"].isRequired,
  alt: prop_types__WEBPACK_IMPORTED_MODULE_1__["string"].isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Image);

/***/ })

})
//# sourceMappingURL=work.js.c1c8cde94a82ed2b1d18.hot-update.js.map