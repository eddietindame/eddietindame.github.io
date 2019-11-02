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
      video = _ref.video,
      onTouchStart = _ref.onTouchStart,
      onTouchEnd = _ref.onTouchEnd;
  var videoRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])();

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      isVideoLoaded = _useState[0],
      setIsVideoLoaded = _useState[1];

  var _animation = animation ? Object(react_spring__WEBPACK_IMPORTED_MODULE_2__["useSpring"])(animation) : undefined;

  var Element = animation ? react_spring__WEBPACK_IMPORTED_MODULE_2__["animated"].div : 'div';

  var _onVideoLoaded = function _onVideoLoaded() {
    setIsVideoLoaded(true);
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    var videoElement = videoRef.current;
    videoElement.addEventListener('canplay', _onVideoLoaded);
    return function () {
      videoElement.removeEventListener('canplay', _onVideoLoaded);
    };
  }, []);
  return __jsx(Element, {
    className: (className ? className + ' ' : '') + 'video',
    onTouchStart: onTouchStart,
    onTouchEnd: onTouchEnd,
    style: _animation,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: this
  }, __jsx("video", {
    className: "video__element",
    style: {
      opacity: isVideoLoaded ? 1 : 0
    },
    ref: videoRef // width="250"
    // height="400"
    ,
    playsInline: true,
    autoPlay: true,
    muted: true,
    loop: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: this
  }, video.sources.map(function (source, i) {
    return __jsx("source", {
      key: i,
      src: "/static/video/".concat(video.name, ".").concat(source),
      type: "video/".concat(source),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 45
      },
      __self: this
    });
  }), "Your browser does not support the video tag. \uD83D\uDE22"), !isVideoLoaded && __jsx("div", {
    className: "video__overlay",
    style: {
      opacity: isVideoLoaded ? 0 : 1
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56
    },
    __self: this
  }, __jsx("div", {
    className: "video__overlay__loader loader",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60
    },
    __self: this
  })));
};

Video.propTypes = {
  className: prop_types__WEBPACK_IMPORTED_MODULE_1__["string"],
  animation: prop_types__WEBPACK_IMPORTED_MODULE_1__["object"],
  video: prop_types__WEBPACK_IMPORTED_MODULE_1__["object"].isRequired,
  onTouchStart: prop_types__WEBPACK_IMPORTED_MODULE_1__["func"],
  onTouchEnd: prop_types__WEBPACK_IMPORTED_MODULE_1__["func"]
};
/* harmony default export */ __webpack_exports__["default"] = (Video);

/***/ })

})
//# sourceMappingURL=work.js.6e464361519b852487c6.hot-update.js.map