"use strict";

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

/*! Sidr - v1.2.1 - 2013-11-06
 * https://github.com/artberri/sidr
 * Copyright (c) 2013 Alberto Varela; Licensed MIT */
(function (e) {
    var t = !1,
        i = !1,
        n = { isUrl: function isUrl(e) {
            var t = RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$", "i");return t.test(e) ? !0 : !1;
        }, loadContent: function loadContent(e, t) {
            e.html(t);
        }, addPrefix: function addPrefix(e) {
            var t = e.attr("id"),
                i = e.attr("class");"string" == typeof t && "" !== t && e.attr("id", t.replace(/([A-Za-z0-9_.\-]+)/g, "sidr-id-$1")), "string" == typeof i && "" !== i && "sidr-inner" !== i && e.attr("class", i.replace(/([A-Za-z0-9_.\-]+)/g, "sidr-class-$1")), e.removeAttr("style");
        }, execute: function execute(n, s, a) {
            "function" == typeof s ? (a = s, s = "sidr") : s || (s = "sidr");var r,
                d,
                l,
                c = e("#" + s),
                u = e(c.data("body")),
                f = e("html"),
                p = c.outerWidth(!0),
                g = c.data("speed"),
                h = c.data("side"),
                m = c.data("displace"),
                v = c.data("onOpen"),
                y = c.data("onClose"),
                x = "sidr" === s ? "sidr-open" : "sidr-open " + s + "-open";if ("open" === n || "toggle" === n && !c.is(":visible")) {
                if (c.is(":visible") || t) return;if (i !== !1) return o.close(i, function () {
                    o.open(s);
                }), void 0;t = !0, "left" === h ? (r = { left: p + "px" }, d = { left: "0px" }) : (r = { right: p + "px" }, d = { right: "0px" }), u.is("body") && (l = f.scrollTop(), f.css("overflow-x", "hidden").scrollTop(l)), m ? u.addClass("sidr-animating").css({ width: u.width(), position: "absolute" }).animate(r, g, function () {
                    e(this).addClass(x);
                }) : setTimeout(function () {
                    e(this).addClass(x);
                }, g), c.css("display", "block").animate(d, g, function () {
                    t = !1, i = s, "function" == typeof a && a(s), u.removeClass("sidr-animating");
                }), v();
            } else {
                if (!c.is(":visible") || t) return;t = !0, "left" === h ? (r = { left: 0 }, d = { left: "-" + p + "px" }) : (r = { right: 0 }, d = { right: "-" + p + "px" }), u.is("body") && (l = f.scrollTop(), f.removeAttr("style").scrollTop(l)), u.addClass("sidr-animating").animate(r, g).removeClass(x), c.animate(d, g, function () {
                    c.removeAttr("style").hide(), u.removeAttr("style"), e("html").removeAttr("style"), t = !1, i = !1, "function" == typeof a && a(s), u.removeClass("sidr-animating");
                }), y();
            }
        } },
        o = { open: function open(e, t) {
            n.execute("open", e, t);
        }, close: function close(e, t) {
            n.execute("close", e, t);
        }, toggle: function toggle(e, t) {
            n.execute("toggle", e, t);
        }, toogle: function toogle(e, t) {
            n.execute("toggle", e, t);
        } };e.sidr = function (t) {
        return o[t] ? o[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "function" != typeof t && "string" != typeof t && t ? (e.error("Method " + t + " does not exist on jQuery.sidr"), void 0) : o.toggle.apply(this, arguments);
    }, e.fn.sidr = function (t) {
        var i = e.extend({ name: "sidr", speed: 200, side: "left", source: null, renaming: !0, body: "body", displace: !0, onOpen: function onOpen() {}, onClose: function onClose() {} }, t),
            s = i.name,
            a = e("#" + s);if ((0 === a.length && (a = e("<div />").attr("id", s).appendTo(e("body"))), a.addClass("sidr").addClass(i.side).data({ speed: i.speed, side: i.side, body: i.body, displace: i.displace, onOpen: i.onOpen, onClose: i.onClose }), "function" == typeof i.source)) {
            var r = i.source(s);n.loadContent(a, r);
        } else if ("string" == typeof i.source && n.isUrl(i.source)) e.get(i.source, function (e) {
            n.loadContent(a, e);
        });else if ("string" == typeof i.source) {
            var d = "",
                l = i.source.split(",");if ((e.each(l, function (t, i) {
                d += '<div class="sidr-inner">' + e(i).html() + "</div>";
            }), i.renaming)) {
                var c = e("<div />").html(d);c.find("*").each(function (t, i) {
                    var o = e(i);n.addPrefix(o);
                }), d = c.html();
            }n.loadContent(a, d);
        } else null !== i.source && e.error("Invalid Sidr Source");return this.each(function () {
            var t = e(this),
                i = t.data("sidr");i || (t.data("sidr", s), "ontouchstart" in document.documentElement ? (t.bind("touchstart", function (e) {
                e.originalEvent.touches[0], this.touched = e.timeStamp;
            }), t.bind("touchend", function (e) {
                var t = Math.abs(e.timeStamp - this.touched);200 > t && (e.preventDefault(), o.toggle(s));
            })) : t.click(function (e) {
                e.preventDefault(), o.toggle(s);
            }));
        });
    };
})(jQuery);
/**
 * SmoothScroll
 * This helper script created by DWUser.com.  Copyright 2012 DWUser.com.  
 * Dual-licensed under the GPL and MIT licenses.  
 * All individual scripts remain property of their copyrighters.
 * Date: 10-Sep-2012
 * Version: 1.0.1
 */
if (!window['jQuery']) alert('The jQuery library must be included before the smoothscroll.js file.  The plugin will not work propery.');

/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.3.1
 */
;(function ($) {
    var h = $.scrollTo = function (a, b, c) {
        $(window).scrollTo(a, b, c);
    };h.defaults = { axis: 'xy', duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1, limit: true };h.window = function (a) {
        return $(window)._scrollable();
    };$.fn._scrollable = function () {
        return this.map(function () {
            var a = this,
                isWin = !a.nodeName || $.inArray(a.nodeName.toLowerCase(), ['iframe', '#document', 'html', 'body']) != -1;if (!isWin) return a;var b = (a.contentWindow || a).document || a.ownerDocument || a;return (/webkit/i.test(navigator.userAgent) || b.compatMode == 'BackCompat' ? b.body : b.documentElement
            );
        });
    };$.fn.scrollTo = function (e, f, g) {
        if ((typeof f === "undefined" ? "undefined" : _typeof(f)) == 'object') {
            g = f;f = 0;
        }if (typeof g == 'function') g = { onAfter: g };if (e == 'max') e = 9e9;g = $.extend({}, h.defaults, g);f = f || g.duration;g.queue = g.queue && g.axis.length > 1;if (g.queue) f /= 2;g.offset = both(g.offset);g.over = both(g.over);return this._scrollable().each(function () {
            if (e == null) return;var d = this,
                $elem = $(d),
                targ = e,
                toff,
                attr = {},
                win = $elem.is('html,body');switch (typeof targ === "undefined" ? "undefined" : _typeof(targ)) {case 'number':case 'string':
                    if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)) {
                        targ = both(targ);break;
                    }targ = $(targ, this);if (!targ.length) return;case 'object':
                    if (targ.is || targ.style) toff = (targ = $(targ)).offset();}$.each(g.axis.split(''), function (i, a) {
                var b = a == 'x' ? 'Left' : 'Top',
                    pos = b.toLowerCase(),
                    key = 'scroll' + b,
                    old = d[key],
                    max = h.max(d, a);if (toff) {
                    attr[key] = toff[pos] + (win ? 0 : old - $elem.offset()[pos]);if (g.margin) {
                        attr[key] -= parseInt(targ.css('margin' + b)) || 0;attr[key] -= parseInt(targ.css('border' + b + 'Width')) || 0;
                    }attr[key] += g.offset[pos] || 0;if (g.over[pos]) attr[key] += targ[a == 'x' ? 'width' : 'height']() * g.over[pos];
                } else {
                    var c = targ[pos];attr[key] = c.slice && c.slice(-1) == '%' ? parseFloat(c) / 100 * max : c;
                }if (g.limit && /^\d+$/.test(attr[key])) attr[key] = attr[key] <= 0 ? 0 : Math.min(attr[key], max);if (!i && g.queue) {
                    if (old != attr[key]) animate(g.onAfterFirst);delete attr[key];
                }
            });animate(g.onAfter);function animate(a) {
                $elem.animate(attr, f, g.easing, a && function () {
                    a.call(this, e, g);
                });
            }
        }).end();
    };h.max = function (a, b) {
        var c = b == 'x' ? 'Width' : 'Height',
            scroll = 'scroll' + c;if (!$(a).is('html,body')) return a[scroll] - $(a)[c.toLowerCase()]();var d = 'client' + c,
            html = a.ownerDocument.documentElement,
            body = a.ownerDocument.body;return Math.max(html[scroll], body[scroll]) - Math.min(html[d], body[d]);
    };function both(a) {
        return (typeof a === "undefined" ? "undefined" : _typeof(a)) == 'object' ? a : { top: a, left: a };
    }
})(jQuery);

/**
 * jQuery.LocalScroll
 * Copyright (c) 2007-2010 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 05/31/2010
 * @author Ariel Flesler
 * @version 1.2.8b
 **/
;(function (b) {
    function g(a, e, d) {
        var h = e.hash.slice(1),
            f = document.getElementById(h) || document.getElementsByName(h)[0];if (f) {
            a && a.preventDefault();var c = b(d.target);if (!(d.lock && c.is(":animated") || d.onBefore && !1 === d.onBefore(a, f, c))) {
                d.stop && c._scrollable().stop(!0);if (d.hash) {
                    var a = f.id == h ? "id" : "name",
                        g = b("<a> </a>").attr(a, h).css({ position: "absolute", top: b(window).scrollTop(), left: b(window).scrollLeft() });f[a] = "";b("body").prepend(g);location = e.hash;g.remove();f[a] = h;
                }c.scrollTo(f, d).trigger("notify.serialScroll", [f]);
            }
        }
    }var i = location.href.replace(/#.*/, ""),
        c = b.localScroll = function (a) {
        b("body").localScroll(a);
    };c.defaults = { duration: 1E3, axis: "y", event: "click", stop: !0, target: window, reset: !0 };c.hash = function (a) {
        if (location.hash) {
            a = b.extend({}, c.defaults, a);a.hash = !1;if (a.reset) {
                var e = a.duration;delete a.duration;b(a.target).scrollTo(0, a);a.duration = e;
            }g(0, location, a);
        }
    };b.fn.localScroll = function (a) {
        function e() {
            return !!this.href && !!this.hash && this.href.replace(this.hash, "") == i && (!a.filter || b(this).is(a.filter));
        }
        a = b.extend({}, c.defaults, a);return a.lazy ? this.bind(a.event, function (d) {
            var c = b([d.target, d.target.parentNode]).filter(e)[0];c && g(d, c, a);
        }) : this.find("a,area").filter(e).bind(a.event, function (b) {
            g(b, this, a);
        }).end().end();
    };
})(jQuery);

// Initialize all .js-smoothScroll links
jQuery(function ($) {
    $.localScroll({ filter: '.js-smoothScroll' });
});

var navHeight = 60;
var w = window.innerWidth;
var navOffset = window.innerHeight - navHeight;

function navPos() {
    var scrollPos = $(window).scrollTop();
    if (scrollPos >= navOffset) {
        $("#header").addClass("fixed");
        $(".logo--small").show("fast");
    } else {
        $("#header").removeClass("fixed");
        $(".logo--small").hide("fast");
    }
}

function height() {
    navOffset = window.innerHeight - navHeight;
    document.getElementById('home').style.height = navOffset + "px";
}

function width() {
    w = window.innerWidth;
    //    $('#header').css("width",w);
    $('#header').css("max-width", w);
}

//function popup() {
//    window.alert('test');
//}
//
//var waypoint = new Waypoint({
//    element: document.getElementById('contact'),
//    handler: function() {
//        popup()
//    },
//    offset: function() {
//        return Waypoint.viewportHeight() - this.element.clientHeight
//    }
//});

window.addEventListener('load', height);
window.addEventListener('load', width);
window.addEventListener('load', navPos);
window.addEventListener('resize', width);
window.addEventListener('resize', height);

window.addEventListener("scroll", navPos);window.addEventListener("load", function () {
    var load_screen = document.getElementById("load_screen");
    document.body.removeAttribute("class");
});

$(document).ready(function ($) {
    $('.js-side-menu-button').sidr({
        name: 'side-menu',
        source: 'nav',
        onOpen: function onOpen() {
            $('.burgerbutton').addClass('open');
        },
        onClose: function onClose() {
            $('.burgerbutton').removeClass('open');
        },
        displace: false
    });

    $('body').click(function () {
        $.sidr('close', 'side-menu');
    });

    $('.burgerbutton').click(function () {
        $(this).toggleClass('open');
    });

    $('.window-img').click(function () {
        if (this.class != "js-ontop") {
            $(".js-ontop").toggleClass("js-ontop");
            $(this).toggleClass("js-ontop");
        }
    });
});
