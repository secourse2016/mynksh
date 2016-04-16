/* -----------------------------
Backgroung slider
----------------------------- */
$(window).ready(function() {
    'use strict';
    $.vegas('slideshow', {
        backgrounds: [{
            src: 'images/bg-slider/bg-1.jpg',
            fade: 1000
        }, {
            src: 'images/bg-slider/bg-2.jpg',
            fade: 1000
        }, {
            src: 'images/bg-slider/bg-3.jpg',
            fade: 1000
        }]
    })();
});




/* -----------------------------
Scroll into viewPort Animation
----------------------------- */
$(document).ready(function() {
    'use strict';
    $('.animated').appear(function() {
        var element = $(this),
            animation = element.data('animation'),
            animationDelay = element.data('animation-delay');
        if (animationDelay) {

            setTimeout(function() {
                element.addClass(animation + " visible");
            }, animationDelay);

        } else {
            element.addClass(animation + " visible");
        }
    });
});
/* -----------------------------
Card Style Script
----------------------------- */
$(document).ready(function() {
    'use strict';
    var $el = $('#card-ul'),
        sectionFeature = $('#section-feature'),
        baraja = $el.baraja();

    if ($(window).width() > 480) {
        sectionFeature.appear(function() {
            baraja.fan({
                speed: 1500,
                easing: 'ease-out',
                range: 100,
                direction: 'right',
                origin: {
                    x: 50,
                    y: 200
                },
                center: true
            });
        });
        $('#feature-expand').click(function() {
            baraja.fan({
                speed: 500,
                easing: 'ease-out',
                range: 100,
                direction: 'right',
                origin: {
                    x: 50,
                    y: 200
                },
                center: true
            });
        });
    } else {
        sectionFeature.appear(function() {
            baraja.fan({
                speed: 1500,
                easing: 'ease-out',
                range: 80,
                direction: 'left',
                origin: {
                    x: 200,
                    y: 50
                },
                center: true
            });
        });
        $('#feature-expand').click(function() {
            baraja.fan({
                speed: 500,
                easing: 'ease-out',
                range: 80,
                direction: 'left',
                origin: {
                    x: 200,
                    y: 50
                },
                center: true
            });
        });
    }

    // Feature navigation
    $('#feature-prev').on('click', function(event) {
        baraja.previous();
    });

    $('#feature-next').on('click', function(event) {
        baraja.next();
    });

    // close Features
    $('#feature-close').on('click', function(event) {
        baraja.close();
    });
});

/* -----------------------------
Fitvids init
----------------------------- */
$(document).ready(function() {
    'use strict';
    $('.video-content').fitVids();
});


/* -----------------------------
IE 9 Placeholder fix
----------------------------- */
$('[placeholder]').focus(function() {
    var input = $(this);
    if (input.val() == input.attr('placeholder')) {
        input.val('');
        input.removeClass('placeholder');
    }
}).blur(function() {
    var input = $(this);
    if (input.val() == '' || input.val() == input.attr('placeholder')) {
        input.addClass('placeholder');
        input.val(input.attr('placeholder'));
    }
}).blur();

/* -----------------------------
BxSlider
----------------------------- */
$(document).ready(function() {
    'use strict';
    $('.testimonial-slider').bxSlider({
        pagerCustom: '#bx-pager',
        pager: true,
        touchEnabled: true,
        controls: false
    });
});


/* -----------------------------
Main navigation
----------------------------- */
$(document).ready(function() {
    'use strict';
    $('.nav').onePageNav({
        currentClass: 'current',
        scrollSpeed: 1000,
        easing: 'easeInOutQuint'
    });
    $(window).bind('scroll', function(e) {
        var scrollPos = $(window).scrollTop();
        scrollPos > 220 ? $('.sticky-section').addClass('nav-bg') : $('.sticky-section').removeClass('nav-bg');
    });
});