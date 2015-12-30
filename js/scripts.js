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
    document.getElementById('home').style.height = `${navOffset}px`;
}

function width() {
    w = window.innerWidth;
//    $('#header').css("width",w);
    $('#header').css("max-width",w);
}


window.addEventListener('load',height);
window.addEventListener('load',width);
window.addEventListener('load',navPos);
window.addEventListener('resize',width);
window.addEventListener('resize',height);
window.addEventListener("scroll",navPos);

$(document).ready(function($) {
    $('.js-side-menu-button').sidr({
        name: 'side-menu',
        source: 'nav',
        onOpen: function() {
		   $('.burgerbutton').addClass('open');
        },
        onClose: function() {
           $('.burgerbutton').removeClass('open');
        },
        displace: false
    });
    
    $('body').click(function() {
        $.sidr('close','side-menu'); 
    });
    
    $('.burgerbutton').click(function() {
        $(this).toggleClass('open');
	});
    
    $('.window-img').click(function() {
        if (this.class != "js-ontop") {
            $(".js-ontop").toggleClass("js-ontop");
            $(this).toggleClass("js-ontop");
        }
    });
    
    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
            $(".popup").removeClass("hide");
            $(".popup").addClass("animated bounceInDown");
        }
    });
});