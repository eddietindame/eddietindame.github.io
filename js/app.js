$(document).foundation();

$(document).ready(function($) {
    $('#responsive-menu-button').sidr({
        name: 'sidr-main',
        source: '#navigation',
        onOpen: function() {
//            $('#smallLogo').css('position','relative');
//            $('#responsive-menu-button').css('float','right');
//            $('.flex').css('flex-wrap','nowrap');
		   $('#burgerbutton').addClass('open');
//		   $('#smallLogo').addClass('hide');
        },
        onClose: function() {
//            $('#smallLogo').css('position','absolute');
//            $('#responsive-menu-button').css('float','none');
//            $('.flex').css('flex-wrap','wrap');
           $('#burgerbutton').removeClass('open');
//		   $('#smallLogo').removeClass('hide');
        },
        displace: false
    });
    
    $('#burgerbutton').click(function(){
		$(this).toggleClass('open');
	});
    
    $('body').on("click",function(e) {
       $.sidr('close','sidr-main'); 
    });
    
//  var navOffset = $("#header").offset().top;
//	var controller = new ScrollMagic.Controller({globalSceneOptions: {duration: 100}});
//	new ScrollMagic.Scene({triggerElement: "#contact"})
//					.setClassToggle("#portrait", "active") // add class toggle
//					.addIndicators() // add indicators (requires plugin)
//					.addTo(controller);
    
    var navOffset = window.innerHeight - 60;
    
    function navPos() {
        var scrollPos = $(window).scrollTop();
        if (scrollPos >= navOffset) {
            $("#header").addClass("fixed");
            $("#smallLogo").show("fast");
            //$("#mobile-header").css("position","absolute");
        } else {
            $("#header").removeClass("fixed");
            $("#smallLogo").hide("fast");
            //$("#mobile-header").css("position","relative");
        } 
    }
        
    function height() {
        //var h = window.innerHeight - 60;
        navOffset = window.innerHeight - 60;
        document.getElementById('home').style.height = `${navOffset}px`;
    }
    
    function width() {
        var w = window.innerWidth;
        $('#header').css("max-width",w);
    }
    
    window.addEventListener('resize',width);
    window.addEventListener('resize',height);
    window.addEventListener('load',height);
    window.addEventListener('load',navPos);
    window.addEventListener('scroll',navPos);
});

window.addEventListener("load", function() {
    var load_screen = document.getElementById("load_screen");
    document.body.removeAttribute('class');
});