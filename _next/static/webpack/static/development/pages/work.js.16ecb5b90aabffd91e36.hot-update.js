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
  var videoRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])();

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      isVideoLoaded = _useState[0],
      setIsVideoLoaded = _useState[1];

  var _animation = Object(react_spring__WEBPACK_IMPORTED_MODULE_2__["useSpring"])(animation);

  var Element = animation ? react_spring__WEBPACK_IMPORTED_MODULE_2__["animated"].div : 'div';

  var _onVideoLoaoded = function _onVideoLoaoded() {
    setIsVideoLoaded(true);
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    var videoElement = videoRef.current;
    videoElement.addEventListener('canplay', _onVideoLoaoded);
    return function () {
      videoElement.removeEventListener('canplay', _onVideoLoaoded);
    };
  }, []);
  return __jsx(Element, {
    style: _animation,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: this
  }, __jsx("video", {
    className: (className ? className + ' ' : '') + 'video',
    style: {
      transition: 'opacity 300ms ease-in-out',
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
      lineNumber: 25
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
  }), "Your browser does not support the video tag."));
};

Video.propTypes = {
  className: prop_types__WEBPACK_IMPORTED_MODULE_1__["string"],
  animation: prop_types__WEBPACK_IMPORTED_MODULE_1__["object"],
  video: prop_types__WEBPACK_IMPORTED_MODULE_1__["object"].isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Video); // const Video = ({
//     className,
//     animation,
//     video
// }) => {
//     const videoRef = useRef()
//     const [isVideoLoaded, setIsVideoLoaded] = useState(false)
//     const _animation = useSpring(animation)
//     const Element = animation ? animated.video : 'video'
//     const _onVideoLoaoded = () => { setIsVideoLoaded(true) }
//     useEffect(() => {
//         const videoElement = videoRef.current
//         videoElement.addEventListener('canplay', _onVideoLoaoded)
//         return () => { videoElement.removeEventListener('canplay', _onVideoLoaoded) }
//     }, [])
//     return (
//         <Element
//             className={(className ? className + ' ' :  '') + 'video'}
//             style={_animation}
//             ref={videoRef}
//             // width="250"
//             // height="400"
//             playsinline
//             autoPlay
//             muted
//             loop
//         >
//             {
//                 video.mp4 && <source src={video.mp4} type="video/mp4" />
//             }
//             {
//                 video.webm && <source src={video.webm} type="video/webm" />
//             }
//             Your browser does not support the video tag.
//         </Element>
//     )
// }

/***/ })

})
//# sourceMappingURL=work.js.16ecb5b90aabffd91e36.hot-update.js.map