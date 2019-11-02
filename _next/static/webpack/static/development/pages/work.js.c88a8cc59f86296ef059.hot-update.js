webpackHotUpdate("static/development/pages/work.js",{

/***/ "./components/Project/Project.js":
/*!***************************************!*\
  !*** ./components/Project/Project.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_spring__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-spring */ "./node_modules/react-spring/web.js");
/* harmony import */ var react_lazyload__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-lazyload */ "./node_modules/react-lazyload/lib/index.js");
/* harmony import */ var react_lazyload__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_lazyload__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Project_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Project.scss */ "./components/Project/Project.scss");
/* harmony import */ var _Project_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Project_scss__WEBPACK_IMPORTED_MODULE_4__);
var _jsxFileName = "/Users/eddietindame/Documents/code/eddietindame.github.io_next/components/Project/Project.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;






var Project = function Project(_ref) {
  var name = _ref.name,
      thumbnail = _ref.thumbnail,
      video = _ref.video,
      description = _ref.description,
      tags = _ref.tags,
      href = _ref.href,
      credits = _ref.credits,
      isReversed = _ref.isReversed,
      animation = _ref.animation,
      className = _ref.className;
  var fadeIn = Object(react_spring__WEBPACK_IMPORTED_MODULE_2__["useSpring"])({
    to: {
      opacity: 1
    },
    from: {
      opacity: 0
    }
  });
  var Element = animation ? react_spring__WEBPACK_IMPORTED_MODULE_2__["animated"].div : 'div';

  var isLongWord = function isLongWord(words, threshold) {
    return words.split(' ').reduce(function (acc, cur) {
      return acc ? acc : cur.length > threshold;
    }, false);
  };

  return __jsx(Element, {
    className: (className ? className + ' ' : '') + 'project' + (isReversed ? ' project--reversed' : ''),
    style: animation,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: this
  }, __jsx("div", {
    className: "project__inner",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: this
  }, __jsx("h2", {
    className: 'project__title' + (isLongWord(name, 11) ? ' project__title--smaller' : ''),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: this
  }, __jsx("span", {
    className: "project__highlight",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    },
    __self: this
  }, href ? __jsx("a", {
    href: href,
    target: "__blank",
    rel: "noopener noreferrer",
    className: "project__link",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    },
    __self: this
  }, name) : name)), __jsx("p", {
    className: "project__description",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    },
    __self: this
  }, __jsx("span", {
    className: "project__highlight",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: this
  }, description)), video ? __jsx(react_lazyload__WEBPACK_IMPORTED_MODULE_3___default.a, {
    height: 400,
    offset: 100,
    once: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    },
    __self: this
  }, __jsx(react_spring__WEBPACK_IMPORTED_MODULE_2__["animated"].video, {
    className: "project__thumbnail project__thumbnail--video",
    style: fadeIn // width="250"
    // height="400"
    ,
    autoPlay: true,
    muted: true,
    loop: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56
    },
    __self: this
  }, video.mp4 && __jsx("source", {
    src: video.mp4,
    type: "video/mp4",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66
    },
    __self: this
  }), video.webm && __jsx("source", {
    src: video.webm,
    type: "video/webm",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69
    },
    __self: this
  }), "Your browser does not support the video tag.")) : __jsx(react_lazyload__WEBPACK_IMPORTED_MODULE_3___default.a, {
    height: 400 // offset={100}
    ,
    once: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74
    },
    __self: this
  }, __jsx(react_spring__WEBPACK_IMPORTED_MODULE_2__["animated"].img, {
    src: thumbnail,
    alt: name,
    className: "project__thumbnail",
    style: fadeIn,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79
    },
    __self: this
  })), __jsx("ul", {
    className: "project__tags",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87
    },
    __self: this
  }, tags.sort().map(function (tag, i) {
    return __jsx("li", {
      key: i,
      className: "project__tags__tag",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 90
      },
      __self: this
    }, tag);
  })), credits && credits.length && credits.map(function (credit, i) {
    return __jsx("div", {
      key: i,
      className: "project__credit",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 99
      },
      __self: this
    }, __jsx("span", {
      className: "project__highlight",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 103
      },
      __self: this
    }, __jsx("span", {
      className: "project__credit__label",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 104
      },
      __self: this
    }, credit.label, ":"), " ", __jsx("strong", {
      className: "project__credit__value",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 104
      },
      __self: this
    }, credit.value)));
  })));
};

Project.propTypes = {
  name: prop_types__WEBPACK_IMPORTED_MODULE_1__["string"].isRequired,
  thumbnail: prop_types__WEBPACK_IMPORTED_MODULE_1__["string"].isRequired,
  video: prop_types__WEBPACK_IMPORTED_MODULE_1__["string"],
  description: prop_types__WEBPACK_IMPORTED_MODULE_1__["string"].isRequired,
  tags: prop_types__WEBPACK_IMPORTED_MODULE_1__["array"].isRequired,
  href: prop_types__WEBPACK_IMPORTED_MODULE_1__["string"],
  credits: prop_types__WEBPACK_IMPORTED_MODULE_1__["array"],
  isReversed: prop_types__WEBPACK_IMPORTED_MODULE_1__["bool"],
  animation: prop_types__WEBPACK_IMPORTED_MODULE_1__["object"],
  className: prop_types__WEBPACK_IMPORTED_MODULE_1__["string"]
};
/* harmony default export */ __webpack_exports__["default"] = (Project);

/***/ })

})
//# sourceMappingURL=work.js.c88a8cc59f86296ef059.hot-update.js.map