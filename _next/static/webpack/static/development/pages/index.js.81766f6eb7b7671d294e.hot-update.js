webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/Contact/Contact.js":
/*!***************************************!*\
  !*** ./components/Contact/Contact.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../config */ "./config/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Contact_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Contact.scss */ "./components/Contact/Contact.scss");
/* harmony import */ var _Contact_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Contact_scss__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/Users/eddietindame/Documents/code/eddietindame.github.io_next/components/Contact/Contact.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




var Contact = function Contact() {
  var contactItems = [{
    label: 'eddie.tindame@googlemail.com',
    href: 'mailto:eddie.tindame@googlemail.com',
    isEmail: true
  }, {
    label: 'github',
    href: 'https://github.com/eddietindame'
  }, {
    label: 'linkedin',
    href: 'https://uk.linkedin.com/in/eddietindame'
  }, {
    label: 'c.v.',
    href: "".concat(_config__WEBPACK_IMPORTED_MODULE_1__["HOST"], "/static/eddie_tindame_cv_2019.pdf")
  }];
  return __jsx("section", {
    id: "contact",
    className: "contact",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: this
  }, __jsx("div", {
    className: "contact__inner container",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: this
  }, __jsx("img", {
    src: __webpack_require__(/*! ../../assets/images/portrait.jpg */ "./assets/images/portrait.jpg"),
    alt: "Eddie Tindame",
    className: "contact__portrait",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: this
  }), __jsx("div", {
    className: "contact__items",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: this
  }, contactItems.map(function (_ref, i) {
    var href = _ref.href,
        label = _ref.label,
        isEmail = _ref.isEmail;
    return __jsx("div", {
      key: i,
      className: "contact__item",
      style: {
        position: 'relative',
        zIndex: contactItems.length - i
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 40
      },
      __self: this
    }, __jsx("a", {
      href: href,
      className: 'contact__item__link' + (isEmail ? ' contact__item__link--email' : ''),
      target: isEmail ? undefined : '_blank',
      rel: isEmail ? undefined : 'noopener noreferrer',
      __source: {
        fileName: _jsxFileName,
        lineNumber: 45
      },
      __self: this
    }, __jsx("span", {
      className: "contact__item__highlight",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 50
      },
      __self: this
    }, label)));
  }))));
};

/* harmony default export */ __webpack_exports__["default"] = (Contact);

/***/ })

})
//# sourceMappingURL=index.js.81766f6eb7b7671d294e.hot-update.js.map