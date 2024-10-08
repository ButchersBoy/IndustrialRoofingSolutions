function include(scriptUrl) {
    document.write('<script src="' + scriptUrl + '"></script>');
}

function isIE() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
};

/* cookie.JS
 ========================================================*/
include('js/jquery.cookie.js');

/* Easing library
 ========================================================*/
include('js/jquery.easing.1.3.js');

/* Stick up menus
 ========================================================*/
;
(function ($) {
    var o = $('html');
    if (o.hasClass('desktop')) {
        include('js/tmstickup.js');

        $(window).load(function () {
            $('#stuck_container').TMStickUp({})
        });
    }
})(jQuery);

/* FancyBox
    ========================================================*/
    ;(function ($) {
        var o = $('.fancybox');
        var t = $('.thumb');
        if (o.length > 0) {
            include('js/jquery.fancybox.js');
            include('js/jquery.fancybox-media.js');
            include('js/jquery.fancybox-buttons.js');
            $(document).ready(function () {
                o.fancybox();
            });
        }
        if (t.length > 0) {
            if(o.length == 0)
            {
                include('js/jquery.fancybox.js');
                include('js/jquery.fancybox-media.js');
                include('js/jquery.fancybox-buttons.js');
                $(document).ready(function () {
                    t.fancybox();
                });
            }
            else{
                $(document).ready(function () {
                    t.fancybox();
                });
            }
            
        }
    })(jQuery);

/* Camera
    ========================================================*/
    ;(function ($) {
        var o = $('#camera');
        if (o.length > 0) {
            if (!(isIE() && (isIE() > 9))) {
                include('js/jquery.mobile.customized.min.js');
            }

            include('js/camera.js');

            $(document).ready(function () {
                o.camera({
                    autoAdvance: true,
                    height: '26.92708333333333%',
                    minHeight: '300px',
                    pagination: true,
                    thumbnails: false,
                    playPause: false,
                    hover: false,
                    loader: 'none',
                    navigation: false,
                    navigationHover: false,
                    mobileNavHover: false,
                    fx: 'simpleFade'
                })
            });
        }
    })(jQuery);

/* Owl Carousel
     ========================================================*/
    ;
    (function ($) {
        var o = $('.owl-carousel');
        if (o.length > 0) {
            include('js/owl.carousel.min.js');
            $(document).ready(function () {
                o.owlCarousel({
                    margin: 30,
                    smartSpeed: 450,
                    loop: true,
                    dots: true,
                    nav: false,
                    navClass: ['owl-prev fa fa-angle-left', 'owl-next fa fa-angle-right'],
                    responsive: {
                        0: { items: 1 },
                        768: { items: 2},
                        980: { items: 3}
                    }
                });
            });
        }
    })(jQuery);    
/* ToTop
 ========================================================*/
;
(function ($) {
    var o = $('html');
    if (o.hasClass('desktop')) {
        include('js/jquery.ui.totop.js');

        $(document).ready(function () {
            $().UItoTop({easingType: 'easeOutQuart'});
        });
    }
})(jQuery);

/* EqualHeights
 ========================================================*/
;
(function ($) {
    var o = $('[data-equal-group]');
    if (o.length > 0) {
        include('js/jquery.equalheights.js');
    }
})(jQuery);

/* SMOOTH SCROLLIG
 ========================================================*/
;
(function ($) {
    var o = $('html');
    if (o.hasClass('desktop')) {
        include('js/jquery.mousewheel.min.js');
        include('js/jquery.simplr.smoothscroll.min.js');

        $(document).ready(function () {
            $.srSmoothscroll({
                step: 150,
                speed: 800
            });
        });
    }
})(jQuery);

/* Copyright Year
 ========================================================*/
var currentYear = (new Date).getFullYear();
$(document).ready(function () {
    $("#copyright-year").text((new Date).getFullYear());
});

/* Superfish menus
 ========================================================*/
;
(function ($) {
    include('js/superfish.js');
    include('js/jquery.mobilemenu.js');    
})(jQuery);


/* Google Map
 ========================================================*/
;
(function ($) {
    var o = document.getElementById("google-map");
    if (o) {
        include('//maps.google.com/maps/api/js?sensor=false');
        include('js/jquery.rd-google-map.js');

        $(document).ready(function () {
            var o = $('#google-map');
            if (o.length > 0) {
                o.googleMap();
            }
        });
    }
})
(jQuery);

/* WOW
 ========================================================*/
;
(function ($) {
    var o = $('html');

    if ((navigator.userAgent.toLowerCase().indexOf('msie') == -1 ) || (isIE() && isIE() > 9)) {
        if (o.hasClass('desktop')) {
            include('js/wow.js');

            $(document).ready(function () {
                new WOW().init();
            });
        }
    }
})(jQuery);

/* Contact Form
 ========================================================*/
;
(function ($) {
    var o = $('#contact-form');
    if (o.length > 0) {
        include('js/modal.js');
        include('js/TMForm.js');
    }
})(jQuery);

/* Search.js
 ========================================================*/
;
(function ($) {
    var o = $('#search-results');
    if (o.length > 0) {
        include('search/search.js');
    }
})(jQuery);

/* Search Form Toggleable
 ========================================================*/
;
(function ($) {
    var o = $('.search-form-toggle');
    if (o.length > 0) {
        var f = $('.search-form');
        o.click(function () {
            o.toggleClass('active');
            f.slideToggle(300);
            f.find('input').val('').focus();
            return false;
        });

        $(document).click(function (e) {
            if (o.hasClass('active')) {
                var target = e.clientY;
                if (target > (f.offset().top) + f.height()) {
                    o.removeClass('active');
                    f.slideUp(300);
                }
            }
        });

        $(window).load(function () {
            var o_stuck = $('.isStuck .search-form-toggle'),
                f_stuck = $('.isStuck .search-form');

            o_stuck.click(function () {
                o_stuck.toggleClass('active');
                f_stuck.slideToggle(300);
                f_stuck.find('input').val('').focus();
                return false;
            });

            $(document).click(function (e) {
                var s = $('.isStuck');
                if (o_stuck.hasClass('active')) {
                    var target = e.clientY;
                    if (target > s.height()) {
                        o_stuck.removeClass('active');
                        f_stuck.slideUp(300);
                    }
                }
            });
        });
    }
})(jQuery);

/* Orientation tablet fix
 ========================================================*/
$(function () {
    // IPad/IPhone
    var viewportmeta = document.querySelector && document.querySelector('meta[name="viewport"]'),
        ua = navigator.userAgent,

        gestureStart = function () {
            viewportmeta.content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6, initial-scale=1.0";
        },

        scaleFix = function () {
            if (viewportmeta && /iPhone|iPad/.test(ua) && !/Opera Mini/.test(ua)) {
                viewportmeta.content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
                document.addEventListener("gesturestart", gestureStart, false);
            }
        };

    scaleFix();
    // Menu Android
    if (window.orientation != undefined) {
        var regM = /ipod|ipad|iphone/gi,
            result = ua.match(regM);
        if (!result) {
            $('.sf-menus li').each(function () {
                if ($(">ul", this)[0]) {
                    $(">a", this).toggle(
                        function () {
                            return false;
                        },
                        function () {
                            window.location.href = $(this).attr("href");
                        }
                    );
                }
            })
        }
    }
});
var ua = navigator.userAgent.toLocaleLowerCase(),
    regV = /ipod|ipad|iphone/gi,
    result = ua.match(regV),
    userScale = "";
if (!result) {
    userScale = ",user-scalable=0"
}
document.write('<meta name="viewport" content="width=device-width,initial-scale=1.0' + userScale + '">')

