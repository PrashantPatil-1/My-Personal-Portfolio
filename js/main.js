(function($) {

    "use strict";

    /*---------------------------------------------------- */
    /* Preloader
    ------------------------------------------------------ */
    $(window).on('load', function() {
        $("#loader").fadeOut("slow", function() {
            $("#preloader").delay(300).fadeOut("slow");
        });
    });

    /*---------------------------------------------------- */
    /* FitText Settings
    ------------------------------------------------------ */
    setTimeout(function() {
        $('#intro h1').fitText(1, { minFontSize: '42px', maxFontSize: '84px' });
    }, 100);

    /*---------------------------------------------------- */
    /* FitVids
    ------------------------------------------------------ */
    $(".fluid-video-wrapper").fitVids();

    /*---------------------------------------------------- */
    /* Owl Carousel
    ------------------------------------------------------ */
    $("#owl-slider").owlCarousel({
        navigation: false,
        pagination: true,
        itemsCustom: [
            [0, 1],
            [700, 2],
            [960, 3]
        ],
        navigationText: false
    });

    /*----------------------------------------------------- */
    /* Alert Boxes
    ------------------------------------------------------- */
    $('.alert-box').on('click', '.close', function() {
        $(this).parent().fadeOut(500);
    });

    /*----------------------------------------------------- */
    /* Stat Counter
    ------------------------------------------------------- */
    var statSection = $("#stats"),
        stats = $(".stat-count");

    statSection.waypoint({
        handler: function(direction) {
            if (direction === "down") {
                stats.each(function() {
                    var $this = $(this);
                    $({ Counter: 0 }).animate({ Counter: $this.text() }, {
                        duration: 4000,
                        easing: 'swing',
                        step: function(curValue) {
                            $this.text(Math.ceil(curValue));
                        }
                    });
                });
            }
            this.destroy();
        },
        offset: "90%"
    });

    /*---------------------------------------------------- */
    /* Masonry
    ------------------------------------------------------ */
    var containerProjects = $('#folio-wrapper');

    containerProjects.imagesLoaded(function() {
        containerProjects.masonry({
            itemSelector: '.folio-item',
            resize: true
        });
    });

    /*----------------------------------------------------*/
    /* Modal Popup
    ------------------------------------------------------*/
    $('.item-wrap a').magnificPopup({
        type: 'inline',
        fixedContentPos: false,
        removalDelay: 300,
        showCloseBtn: false,
        mainClass: 'mfp-fade'
    });

    $(document).on('click', '.popup-modal-dismiss', function(e) {
        e.preventDefault();
        $.magnificPopup.close();
    });

 /*-----------------------------------------------------*/
    /* Project
    ------------------------------------------------------ */



    /*-----------------------------------------------------*/
    /* Navigation Menu
    ------------------------------------------------------ */
    var toggleButton = $('.menu-toggle'),
        nav = $('.main-navigation');

    // Toggle button
    toggleButton.on('click', function(e) {
        e.preventDefault();
        toggleButton.toggleClass('is-clicked');
        nav.slideToggle();
    });

    // Nav items
    nav.find('li a').on("click", function() {
        // Update the toggle button
        toggleButton.toggleClass('is-clicked');
        // Fade out the navigation panel
        nav.fadeOut();
    });

    // Close the menu when scrolling
    $(window).on('scroll', function() {
        if (toggleButton.hasClass('is-clicked')) {
            toggleButton.removeClass('is-clicked');
            nav.slideUp();
        }

        // Change color of menu icon on scroll
        var scroll = $(window).scrollTop();
        var introHeight = $('#intro').outerHeight(); // Height of the intro section
        if (scroll >= introHeight) {
            toggleButton.addClass('scrolled');
        } else {
            toggleButton.removeClass('scrolled');
        }
    });

    /*---------------------------------------------------- */
    /* Highlight the current section in the navigation bar
    ------------------------------------------------------ */
    var sections = $("section"),
        navigation_links = $("#main-nav-wrap li a");

    sections.waypoint({
        handler: function(direction) {
            var active_section;
            active_section = $('section#' + this.element.id);

            if (direction === "up") active_section = active_section.prev();

            var active_link = $('#main-nav-wrap a[href="#' + active_section.attr("id") + '"]');
            navigation_links.parent().removeClass("current");
            active_link.parent().addClass("current");
        },
        offset: '25%'
    });

    /*---------------------------------------------------- */
    /* Smooth Scrolling
    ------------------------------------------------------ */
    $('.smoothscroll').on('click', function(e) {
        e.preventDefault();

        var target = this.hash,
            $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 800, 'swing', function() {
            window.location.hash = target;
        });
    });

    /*---------------------------------------------------- */
    /* Placeholder Plugin Settings
    ------------------------------------------------------ */
    $('input, textarea, select').placeholder();

    /*---------------------------------------------------- */
    /* Contact Form
    ------------------------------------------------------ */
    $('#contactForm').validate({
        /* Submit via ajax */
        submitHandler: function(form) {
            var sLoader = $('#submit-loader');

            $.ajax({
                type: "POST",
                url: "inc/sendEmail.php",
                data: $(form).serialize(),
                beforeSend: function() {
                    sLoader.fadeIn();
                },
                success: function(msg) {
                                      // Message was sent
                    if (msg == 'OK') {
                        sLoader.fadeOut();
                        $('#message-warning').hide();
                        $('#contactForm').fadeOut();
                        $('#message-success').fadeIn();
                    }
                    // There was an error
                    else {
                        sLoader.fadeOut();
                        $('#message-warning').html(msg);
                        $('#message-warning').fadeIn();
                    }
                },
                error: function() {
                    sLoader.fadeOut();
                    $('#message-warning').html("Something went wrong. Please try again.");
                    $('#message-warning').fadeIn();
                }
            });
        }
    });

    /*----------------------------------------------------- */
    /* Back to top
    ------------------------------------------------------- */
    var pxShow = 300; // Height on which the button will show
    var fadeInTime = 400; // How slow/fast you want the button to show
    var fadeOutTime = 400; // How slow/fast you want the button to hide
    var scrollSpeed = 300; // How slow/fast you want the button to scroll to top. Can be a value, 'slow', 'normal' or 'fast'

    // Show or hide the sticky footer button
    $(window).scroll(function() {
        if (!($("#header-search").hasClass('is-visible'))) {
            if ($(window).scrollTop() >= pxShow) {
                $("#go-top").fadeIn(fadeInTime);
            } else {
                $("#go-top").fadeOut(fadeOutTime);
            }
        }
    });

})(jQuery);

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.project-slides .slide');
    const arrowLeft = document.querySelector('.arrow-left');
    const arrowRight = document.querySelector('.arrow-right');
    let currentSlide = 0;
    const slideInterval = 5000; // Interval time in milliseconds

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
        showSlide(currentSlide);
    }

    function previousSlide() {
        currentSlide = (currentSlide > 0) ? currentSlide - 1 : slides.length - 1;
        showSlide(currentSlide);
    }

    arrowLeft.addEventListener('click', previousSlide);
    arrowRight.addEventListener('click', nextSlide);

    showSlide(currentSlide); // Show the first slide initially

    // Set interval for automatic slide change
    setInterval(nextSlide, slideInterval);
});
