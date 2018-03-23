import React from 'react'
import ReactDOM from 'react-dom'
import { slick } from 'slick-carousel'
import Windows from './components/Windows'

var navHeight = 60;
var w = window.innerWidth;
var navOffset = window.innerHeight - navHeight;

function navPos() {
    var scrollPos = $(window).scrollTop();
    if (scrollPos >= navOffset) {
        $('#header').addClass('u-fixed');
        $('.logo--small').show('slow');
    } else {
        $('#header').removeClass('u-fixed');
        $('.logo--small').hide('slow');
    }
    // console.log('navpos');
}

function height() {
    navOffset = window.innerHeight - navHeight;
    document.getElementById('home').style.height = `${navOffset}px`;
    // console.log('heught');
}

function width() {
    w = window.innerWidth;
    $('#header').css('max-width', w);
    // console.log('width');
}

window.addEventListener('load', height);
window.addEventListener('load', width);
window.addEventListener('load', navPos);
window.addEventListener('resize', width);
window.addEventListener('resize', height);
window.addEventListener('scroll', navPos);

$(document).ready(function($) {

    var $menuTrigger = $('.burgerbutton');
    var $nav = $('nav');

    $menuTrigger.click(function() {
        $(this).toggleClass('open');
        $nav.slideToggle();
    });

    $('nav a').click(function() {
        if ($menuTrigger.hasClass('open')) {
            $menuTrigger.toggleClass('open');
            $nav.slideToggle();
        }
    });

    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
            $('.popup').removeClass('hide');
            $('.popup').addClass('animated bounceInDown');
        }
    });

    // $('.js-slick').slick();

    // Select all links with hashes
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
            && 
            location.hostname == this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000, function() {
                // Callback after animation
                // Must change focus!
                var $target = $(target);
                $target.focus();
                if ($target.is(":focus")) { // Checking if the target was focused
                return false;
                } else {
                $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
                };
            });
            }
        }
    });
});

ReactDOM.render(
    <Windows />,
    document.getElementById('apps')
)
