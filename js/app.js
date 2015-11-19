$(document).foundation();

$(document).ready(function($) {
    $('#responsive-menu-button').sidr({
        name: 'sidr-main',
        source: '#navigation',
        onOpen: function() {
//            $('#smallLogo').css('position','relative');
//            $('#responsive-menu-button').css('float','right');
        },
        onClose: function() {
//            $('#smallLogo').css('position','absolute');
//            $('#responsive-menu-button').css('float','none');
        }
    });
    
    $('body').on("click",function(e) {
       $.sidr('close','sidr-main'); 
    });
    
    var navOffset = $("#header").offset().top;
    
    function navPos() {
        var scrollPos = $(window).scrollTop();
        if (scrollPos >= navOffset) {
            $("#header").addClass("fixed");
            $("#smallLogo").show("fast");
        } else {
            $("#header").removeClass("fixed");
            $("#smallLogo").hide("fast");
        } 
    }
    
    function width() {
        var w = window.innerWidth;
        $('#header').css("max-width",w);
    }
    
    window.addEventListener('resize',width);
    window.addEventListener('load',navPos);
    window.addEventListener('scroll',navPos);
});



/*
 function height() {
        var h = window.innerHeight;
        var n = document.getElementById('header').innerHeight;
        document.getElementById('home').style.height = h - n + "px";
    } 

    window.addEventListener('load',height);
    
function height() {
    var h = window.innerHeight;
    document.getElementById('home').style.height    = h - 50 + "px";
    document.getElementById('about').style.height   = h+"px";
    document.getElementById('apps').style.height    = h+"px";
    document.getElementById('web').style.height     = h+"px";
    document.getElementById('art').style.height     = h+"px";
    document.getElementById('study').style.height   = h+"px";
    document.getElementById('contact').style.height = h+"px";
}

window.addEventListener('load',height);
window.addEventListener('resize',height);

function move() {
    var Y = window.pageYOffset;
    var h = window.innerHeight;
    var s = document.getElementById('');
    if(Y < h) (s.style.left = "100px");
    if(Y < (2*h)) (s.style.left = "200px");
    if(Y < (3*h)) (s.style.left = "300px");
    if(Y < (4*h)) (s.style.left = "400px"); 
}*/