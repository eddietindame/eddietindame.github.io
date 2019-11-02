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

  var _animation = animation ? Object(react_spring__WEBPACK_IMPORTED_MODULE_2__["useSpring"])(animation) : undefined;

  var Element = animation ? react_spring__WEBPACK_IMPORTED_MODULE_2__["animated"].div : 'div';
  return __jsx(Element, {
    className: (className ? className + ' ' : '') + 'image',
    style: _animation,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: this
  }, __jsx(react_image__WEBPACK_IMPORTED_MODULE_3___default.a, {
    src: image,
    alt: alt,
    className: "image__inner",
    loader: __jsx("div", {
      className: "image__inner",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 26
      },
      __self: this
    }, __jsx("div", {
      className: "image__loader loader",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 27
      },
      __self: this
    })),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  }));
};

Image.propTypes = {
  className: prop_types__WEBPACK_IMPORTED_MODULE_1__["string"],
  animation: prop_types__WEBPACK_IMPORTED_MODULE_1__["object"],
  image: prop_types__WEBPACK_IMPORTED_MODULE_1__["string"].isRequired,
  alt: prop_types__WEBPACK_IMPORTED_MODULE_1__["string"].isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Image);

/***/ }),

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
    style: _animation,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
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
      lineNumber: 28
    },
    __self: this
  }, video.mp4 && __jsx("source", {
    src: video.mp4,
    type: "video/mp4",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40
    },
    __self: this
  }), video.webm && __jsx("source", {
    src: video.webm,
    type: "video/webm",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    },
    __self: this
  }), "Your browser does not support the video tag."), !isVideoLoaded && __jsx("div", {
    className: "video__overlay",
    style: {
      opacity: isVideoLoaded ? 0 : 1
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    },
    __self: this
  }, __jsx("div", {
    className: "video__overlay__loader loader",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: this
  })));
};

Video.propTypes = {
  className: prop_types__WEBPACK_IMPORTED_MODULE_1__["string"],
  animation: prop_types__WEBPACK_IMPORTED_MODULE_1__["object"],
  video: prop_types__WEBPACK_IMPORTED_MODULE_1__["object"].isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Video);

/***/ })

})
//# sourceMappingURL=work.js.1d5a2ffa61c478533820.hot-update.js.map