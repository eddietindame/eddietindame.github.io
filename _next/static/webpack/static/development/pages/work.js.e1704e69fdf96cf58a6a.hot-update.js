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
/* harmony import */ var _Image_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Image.scss */ "./components/Image/Image.scss");
/* harmony import */ var _Image_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Image_scss__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/Users/eddietindame/Documents/code/eddietindame.github.io_next/components/Image/Image.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





var Image = function Image(_ref) {
  var className = _ref.className,
      animation = _ref.animation,
      image = _ref.image,
      alt = _ref.alt;

  var _animation = Object(react_spring__WEBPACK_IMPORTED_MODULE_2__["useSpring"])(animation);

  var Element = animation ? react_spring__WEBPACK_IMPORTED_MODULE_2__["animated"].img : 'img';
  return __jsx(Element, {
    className: (className ? className + ' ' : '') + 'image',
    style: _animation,
    href: image,
    alt: alt,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: this
  });
};

Image.propTypes = {
  className: prop_types__WEBPACK_IMPORTED_MODULE_1__["string"],
  animation: prop_types__WEBPACK_IMPORTED_MODULE_1__["object"],
  image: prop_types__WEBPACK_IMPORTED_MODULE_1__["string"].isRequired,
  alt: prop_types__WEBPACK_IMPORTED_MODULE_1__["string"].isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Image);

/***/ }),

/***/ "./components/Image/index.js":
/*!***********************************!*\
  !*** ./components/Image/index.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Image__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Image */ "./components/Image/Image.js");

/* harmony default export */ __webpack_exports__["default"] = (_Image__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

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
/* harmony import */ var _Image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Image */ "./components/Image/index.js");
/* harmony import */ var _Video__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Video */ "./components/Video/index.js");
/* harmony import */ var _Project_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Project.scss */ "./components/Project/Project.scss");
/* harmony import */ var _Project_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_Project_scss__WEBPACK_IMPORTED_MODULE_6__);
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
  // const springObject = {
  //     to: { opacity: 1 },
  //     from: { opacity: 0 }
  // }
  var springObject = {
    // to: { opacity: 1 },
    // from: { opacity: 0 }
    opacity: 1,
    transform: 'translate(0px, 0px)',
    from: {
      opacity: 0,
      transform: 'translate(10000px, 0px)'
    }
  };
  var fadeIn = Object(react_spring__WEBPACK_IMPORTED_MODULE_2__["useSpring"])(springObject);
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
      lineNumber: 40
    },
    __self: this
  }, __jsx("div", {
    className: "project__inner",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    },
    __self: this
  }, __jsx("h2", {
    className: 'project__title' + (isLongWord(name, 11) ? ' project__title--smaller' : ''),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    },
    __self: this
  }, __jsx("span", {
    className: "project__highlight",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    },
    __self: this
  }, href ? __jsx("a", {
    href: href,
    target: "__blank",
    rel: "noopener noreferrer",
    className: "project__link",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    },
    __self: this
  }, name) : name)), __jsx("p", {
    className: "project__description",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59
    },
    __self: this
  }, __jsx("span", {
    className: "project__highlight",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60
    },
    __self: this
  }, description)), video ? __jsx(react_lazyload__WEBPACK_IMPORTED_MODULE_3___default.a, {
    height: 400,
    offset: 100,
    once: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64
    },
    __self: this
  }, __jsx(_Video__WEBPACK_IMPORTED_MODULE_5__["default"], {
    className: "project__thumbnail project__thumbnail--video",
    video: video,
    animation: springObject,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69
    },
    __self: this
  })) : __jsx(react_lazyload__WEBPACK_IMPORTED_MODULE_3___default.a, {
    height: 400 // offset={100}
    ,
    once: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75
    },
    __self: this
  }, __jsx(_Image__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: "project__thumbnail",
    animation: springObject,
    image: thumbnail,
    alt: name,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86
    },
    __self: this
  })), __jsx("ul", {
    className: "project__tags",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94
    },
    __self: this
  }, tags.sort().map(function (tag, i) {
    return __jsx("li", {
      key: i,
      className: "project__tags__tag",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 97
      },
      __self: this
    }, tag);
  })), credits && credits.length && credits.map(function (credit, i) {
    return __jsx("div", {
      key: i,
      className: "project__credit",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 106
      },
      __self: this
    }, __jsx("span", {
      className: "project__highlight",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 110
      },
      __self: this
    }, __jsx("span", {
      className: "project__credit__label",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 111
      },
      __self: this
    }, credit.label, ":"), " ", __jsx("strong", {
      className: "project__credit__value",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 111
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
//# sourceMappingURL=work.js.e1704e69fdf96cf58a6a.hot-update.js.map