webpackHotUpdate("static/development/pages/work.js",{

/***/ "./components/Video/Video.js":
/*!***********************************!*\
  !*** ./components/Video/Video.js ***!
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
/* harmony import */ var _Video_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Video.scss */ "./components/Video/Video.scss");
/* harmony import */ var _Video_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Video_scss__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/Users/eddietindame/Documents/code/eddietindame.github.io_next/components/Video/Video.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





var Video = function Video(_ref) {
  var className = _ref.className,
      animation = _ref.animation,
      video = _ref.video;
  var fadeIn = Object(react_spring__WEBPACK_IMPORTED_MODULE_2__["useSpring"])({
    // to: { opacity: 1 },
    // from: { opacity: 0 }
    opacity: 1,
    transform: 'translate(0px, 0px)',
    // backgroundColor: '#FFF',
    from: {
      opacity: 0,
      // transform: 'translate(0px, 1000px)'
      transform: 'translate(10000px, 0px)' // backgroundColor: '#000'

    }
  });
  var Element = animation ? react_spring__WEBPACK_IMPORTED_MODULE_2__["animated"].video : 'video';
  return __jsx(Element, {
    className: (className ? className + ' ' : '') + 'video',
    style: fadeIn // width="250"
    // height="400"
    ,
    autoPlay: true,
    muted: true,
    loop: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: this
  }, video.mp4 && __jsx("source", {
    src: video.mp4,
    type: "video/mp4",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: this
  }), video.webm && __jsx("source", {
    src: video.webm,
    type: "video/webm",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40
    },
    __self: this
  }), "Your browser does not support the video tag.");
};

Video.propTypes = {
  className: prop_types__WEBPACK_IMPORTED_MODULE_1__["string"],
  animation: prop_types__WEBPACK_IMPORTED_MODULE_1__["object"],
  video: prop_types__WEBPACK_IMPORTED_MODULE_1__["object"].isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Video);

/***/ })

})
//# sourceMappingURL=work.js.6d18e4ae99a8d22d6908.hot-update.js.map