import React from 'react'
import ReactDOM from 'react-dom'
import Windows from './components/Windows'

const navHeight = 60
let w = window.innerWidth
let navOffset = window.innerHeight - navHeight

function navPos() {
    let scrollPos = $(window).scrollTop()

    if (scrollPos >= navOffset) {
        $('#header').addClass('u-fixed')
        $('.logo--small').show('slow')
    } else {
        $('#header').removeClass('u-fixed')
        $('.logo--small').hide('slow')
    }
}

function height() {
    navOffset = window.innerHeight - navHeight
    document.getElementById('home').style.height = `${navOffset}px`
}

function width() {
    w = window.innerWidth
    $('#header').css('max-width', w)
}

window.addEventListener('load', height)
window.addEventListener('load', width)
window.addEventListener('load', navPos)
window.addEventListener('resize', width)
window.addEventListener('resize', height)
window.addEventListener('scroll', navPos)

$(document).ready(function($) {

    let $menuTrigger = $('.burgerbutton')
    let $nav = $('nav')

    $menuTrigger.click(function() {
        $(this).toggleClass('open')
        $nav.slideToggle()
    })

    $('nav a').click(function() {
        if ($menuTrigger.hasClass('open')) {
            $menuTrigger.toggleClass('open')
            $nav.slideToggle()
        }
    })

    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
            $('.popup').removeClass('hide')
            $('.popup').addClass('animated bounceInDown')
        }
    })

    // AUTO SCROLL
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
            let target = $(this.hash)
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']')
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault()
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function() {
                    // Callback after animation
                    // Must change focus!
                    let $target = $(target)
                    $target.focus()
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false
                    } else {
                        $target.attr('tabindex','-1') // Adding tabindex for elements not focusable
                        $target.focus() // Set focus again
                    }
                })
            }
        }
    })
})

ReactDOM.render(
    <Windows />,
    document.getElementById('projects')
)
