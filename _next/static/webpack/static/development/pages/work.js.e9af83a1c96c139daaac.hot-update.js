webpackHotUpdate("static/development/pages/work.js",{

/***/ "./pages/work.js":
/*!***********************!*\
  !*** ./pages/work.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ "./node_modules/next-server/dist/lib/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_ProjectGallery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/ProjectGallery */ "./components/ProjectGallery/index.js");
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../scss/index.scss */ "./scss/index.scss");
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_scss_index_scss__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/Users/eddietindame/Documents/code/eddietindame.github.io_next/pages/work.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


 // import projects from '~data/projects.json'



var Work = function Work() {
  var projects = [{
    name: 'Busby Marou - The Great Divide',
    thumbnail: __webpack_require__(/*! ../assets/images/bm-tgd-thumbnail.jpg */ "./assets/images/bm-tgd-thumbnail.jpg"),
    description: 'A follow-to-win contest which allowed the chance to meet the band. Exclusive video content could be unlocked after a streaming threshold had been met in each Australian region.',
    tags: ['React', 'Spotify', 'Apple Music', 'NodeJS', 'MongoDB', 'Websockets', 'YouTube'],
    href: 'https://thegreatdivide.com.au',
    credits: [{
      label: 'Where',
      value: 'Firepit Technology'
    }, {
      label: 'Commissioner',
      value: 'Warner Music Australia'
    }, {
      label: 'Designer',
      value: 'Finn McLean'
    }, {
      label: 'DSP Integration',
      value: 'Firepit Platforms'
    }]
  }, {
    name: 'Joy Division - Unknown Pleasures - Reimagined',
    thumbnail: __webpack_require__(/*! ../assets/images/jd-upr-thumbnail.jpg */ "./assets/images/jd-upr-thumbnail.jpg"),
    video: {
      webm: '/static/video/jd_upr_video.webm'
    },
    description: 'A microsite showcasing reimagined music videos created for the 40th aniversary of the seminal album "Unknown Pleasures".',
    tags: ['React', 'YouTube'],
    href: 'https://www.joydivisionofficial.com/reimagined/',
    credits: [{
      label: 'Where',
      value: 'Firepit Technology'
    }, {
      label: 'Commissioner',
      value: 'Rhino Records'
    }, {
      label: 'Designer',
      value: 'Toni Hollis'
    }]
  }, {
    name: 'Marina - Orange Trees',
    thumbnail: __webpack_require__(/*! ../assets/images/m-ot-thumbnail.jpg */ "./assets/images/m-ot-thumbnail.jpg"),
    description: 'A fan activation with allowed the chance to unlock exclusive video content after a pre-save threshold had been met in each continent of the globe.',
    tags: ['React', 'Spotify', 'Apple Music', 'Deezer', 'NodeJS', 'MongoDB', 'Websockets'],
    credits: [{
      label: 'Where',
      value: 'Firepit Technology'
    }, {
      label: 'Commissioner',
      value: 'Atlantic Records'
    }, {
      label: 'Designers',
      value: 'Finn McLean, Toni Hollis'
    }, {
      label: 'DSP Integration',
      value: 'Firepit Platforms'
    }]
  }, {
    name: 'Disturbed - Evolution',
    thumbnail: 'https://placehold.it/250x400',
    video: '/static/video/d_e_tg_video.mp4',
    description: 'A Facebook camera effect that turns the user into Disturbed\'s mascot: "The Guy".',
    tags: ['Augmented Reality', 'Spark AR', 'Facebook', 'Javascript'],
    href: 'https://www.facebook.com/Disturbed/videos/1097834423714167/',
    credits: [{
      label: 'Where',
      value: 'Firepit Technology'
    }, {
      label: 'Commissioner',
      value: 'Warner Records'
    }, {
      label: 'Designer',
      value: 'Eddie Tindame'
    }, {
      label: '3D Model',
      value: 'Project XIV'
    }]
  }, {
    name: '#WarnerSquad',
    thumbnail: __webpack_require__(/*! ../assets/images/ws-thumbnail.jpg */ "./assets/images/ws-thumbnail.jpg"),
    description: 'A rewards hub for fans of Warner Artists. This site offers Italian / English localisation and uses Wordpress as a headless CMS.',
    tags: ['React', 'NodeJS', 'MongoDB', 'i18n', 'Wordpress'],
    href: 'https://club.warnermusic.it',
    credits: [{
      label: 'Where',
      value: 'Firepit Technology'
    }, {
      label: 'Commissioner',
      value: 'Warner Music Italy'
    }, {
      label: 'Designer',
      value: 'Eddie Tindame'
    }]
  }, {
    name: 'Spotify Listening Party',
    thumbnail: 'https://placehold.it/250x400',
    video: {
      webm: '/static/video/slp_video.webm'
    },
    description: 'A real-time synchronised listening / chat room experience where fans can connect with artists. Designed as a one-time fan activation, a countdown is set for a certain time and date and then the party begins! Chat can be moderated and includes an admin panel.',
    tags: ['React', 'Spotify', 'NodeJS', 'Websockets'],
    credits: [{
      label: 'Where',
      value: 'Firepit Technology'
    }, {
      label: 'Commissioner',
      value: 'Parlophone Records'
    }, {
      label: 'Designer',
      value: 'Finn McLean'
    }]
  }, {
    name: '#dualita',
    thumbnail: 'https://placehold.it/250x400',
    video: {
      mp4: '/static/video/dl_ss_video.mp4',
      webm: '/static/video/dl_ss_video.webm'
    },
    description: 'A Facebook camera effect / Snapchat lens that lets you sport Alita\'s war paint from the film Alita: Battle Angel. The main soundtrack "Swan Song" by Dua Lipa plays as you frown and apply the paint.',
    tags: ['Augmented Reality', 'Spark AR', 'Facebook', 'Javascript', 'Snapchat', 'Snap Studio'],
    // href: 'https://www.facebook.com/Disturbed/videos/1097834423714167/',
    credits: [{
      label: 'Where',
      value: 'Firepit Technology'
    }, {
      label: 'Commissioner',
      value: 'Warner Records'
    }, {
      label: 'Designer',
      value: 'Eddie Tindame'
    }]
  }, {
    name: '#LMHR',
    thumbnail: __webpack_require__(/*! ../assets/images/lmhr-thumbnail.jpg */ "./assets/images/lmhr-thumbnail.jpg"),
    description: 'A pro bono project for the charity "Love Music Hate Racism". Visitors can anonymously upload their personal stories of how racism has affected them in the past.',
    tags: ['React', 'Wordpress', 'PHP', 'jQuery'],
    href: 'https://www.lovemusichateracism.com/',
    credits: [{
      label: 'Where',
      value: 'Firepit Technology'
    }, {
      label: 'Commissioner',
      value: 'Love Music Hate Racism'
    }, {
      label: 'Designer',
      value: 'Chris'
    }]
  }];
  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(next_head__WEBPACK_IMPORTED_MODULE_1___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 202
    },
    __self: this
  }, __jsx("title", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 203
    },
    __self: this
  }, "Eddie Tindame | Work")), __jsx("div", {
    id: "work",
    className: "work",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 205
    },
    __self: this
  }, __jsx("div", {
    className: "container",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 209
    },
    __self: this
  }, __jsx(_components_ProjectGallery__WEBPACK_IMPORTED_MODULE_2__["default"], {
    projects: projects,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 210
    },
    __self: this
  }))));
};

/* harmony default export */ __webpack_exports__["default"] = (Work); // import React from 'react'
// import Page from '~components/Page'
// import ProjectGallery from '~components/ProjectGallery'
// import '~scss/index.scss'
// const Work = () => {
//     const projects = [
//         {
//             name: 'Busby Marou - The Great Divide',
//             thumbnail: 'https://placehold.it/250x400',
//             description: 'A follow-to-win contest which allowed the chance to meet the band. Exclusive video content could be unlocked after a streaming threshold had been met in each Australian region.',
//             tags: ['React', 'Spotify', 'Apple Music', 'NodeJS', 'MongoDB', 'Websockets', 'YouTube'],
//             credits: [
//                 {
//                     label: 'Where',
//                     value: 'Firepit Technology'
//                 },
//                 {
//                     label: 'Commissioner',
//                     value: 'Warner Musiusc Australia'
//                 },
//                 {
//                     label: 'Designer',
//                     value: 'Finn McLean'
//                 },
//                 {
//                     label: 'DSP Integration',
//                     value: 'Firepit Platforms'
//                 }
//             ]
//         },
//         {
//             name: 'Joy Division - Unknown Pleasures - Reimagined',
//             thumbnail: require('~assets/images/jd-upr-thumbnail.jpg'),
//             description: 'A microsite showcasing reimagined music videos created for the 40th aniversary of the seminal album "Unknown Pleasures".',
//             tags: ['React', 'YouTube'],
//             href: 'https://www.joydivisionofficial.com/reimagined/',
//             credits: [
//                 {
//                     label: 'Where',
//                     value: 'Firepit Technology'
//                 },
//                 {
//                     label: 'Commissioner',
//                     value: 'Rhino Records'
//                 },
//                 {
//                     label: 'Designer',
//                     value: 'Toni Hollis'
//                 }
//             ]
//         },
//         {
//             name: 'Marina - Orange Trees',
//             thumbnail: require('~assets/images/m-ot-thumbnail.jpg'),
//             description: 'A fan activation with allowed the chance to unlock exclusive video content after a pre-save threshold had been met in each continent of the globe.',
//             tags: ['React', 'Spotify', 'Apple Music', 'Deezer', 'NodeJS', 'MongoDB', 'Websockets'],
//             credits: [
//                 {
//                     label: 'Where',
//                     value: 'Firepit Technology'
//                 },
//                 {
//                     label: 'Commissioner',
//                     value: 'Atlantic Records'
//                 },
//                 {
//                     label: 'Designers',
//                     value: 'Finn McLean, Toni Hollis'
//                 },
//                 {
//                     label: 'DSP Integration',
//                     value: 'Firepit Platforms'
//                 }
//             ]
//         },
//         {
//             name: 'Disturbed - Evolution',
//             thumbnail: 'https://placehold.it/250x400',
//             video: '/static/video/d_e_tg_video.mp4',
//             description: 'A Facebook camera effect that turns the user into Disturbed\'s mascot: "The Guy".',
//             tags: ['Augmented Reality', 'Spark AR', 'Facebook', 'Javascript'],
//             href: 'https://www.facebook.com/Disturbed/videos/1097834423714167/',
//             credits: [
//                 {
//                     label: 'Where',
//                     value: 'Firepit Technology'
//                 },
//                 {
//                     label: 'Commissioner',
//                     value: 'Warner Records'
//                 },
//                 {
//                     label: 'Designer',
//                     value: 'Eddie Tindame'
//                 },
//                 {
//                     label: '3D Model',
//                     value: 'Project XIV'
//                 }
//             ]
//         },
//         {
//             name: '#WarnerSquad',
//             thumbnail: 'https://placehold.it/250x400',
//             description: 'A rewards hub for fans of Warner Artists. This site offers Italian / English localisation and uses Wordpress as a headless CMS.',
//             tags: ['React', 'NodeJS', 'MongoDB', 'i18n', 'Wordpress'],
//             href: 'https://club.warnermusic.it',
//             credits: [
//                 {
//                     label: 'Where',
//                     value: 'Firepit Technology'
//                 },
//                 {
//                     label: 'Commissioner',
//                     value: 'Warner Music Italy'
//                 },
//                 {
//                     label: 'Designer',
//                     value: 'Eddie Tindame'
//                 }
//             ]
//         },
//         {
//             name: 'Spotify Listening Party',
//             thumbnail: 'https://placehold.it/250x400',
//             description: 'A real-time synchronised listening / chat room experience where fans can connect with artists.',
//             tags: ['React', 'Spotify', 'NodeJS', 'Websockets'],
//             credits: [
//                 {
//                     label: 'Where',
//                     value: 'Firepit Technology'
//                 },
//                 {
//                     label: 'Commissioner',
//                     value: 'Parlophone Records'
//                 },
//                 {
//                     label: 'Designer',
//                     value: 'Finn McLean'
//                 }
//             ]
//         },
//         {
//             name: '#LMHR',
//             thumbnail: 'https://placehold.it/250x400',
//             description: 'A pro bono project for the charity "Love Music Hate Racism". Visitors can anonymously upload their personal stories of how racism has affected them in the past.',
//             tags: ['React', 'Wordpress', 'PHP'],
//             href: 'https://www.lovemusichateracism.com/',
//             credits: [
//                 {
//                     label: 'Where',
//                     value: 'Firepit Technology'
//                 },
//                 {
//                     label: 'Commissioner',
//                     value: 'Love Music Hate Racism'
//                 },
//                 {
//                     label: 'Designer',
//                     value: 'Chris'
//                 }
//             ]
//         }
//     ]
//     return (
//         <Page>
//             <div className="container">
//                 <ProjectGallery projects={projects} />
//             </div>
//         </Page>
//     )
// }
// export default Work

/***/ })

})
//# sourceMappingURL=work.js.e9af83a1c96c139daaac.hot-update.js.map