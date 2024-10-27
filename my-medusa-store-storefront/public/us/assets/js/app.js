if(navigator.userAgent.indexOf('MSIE')!==-1 || navigator.appVersion.indexOf('Trident/') > -1){
    document.documentElement.classList.add('ie');
}

//header
jQuery(function($){

    var scrollTop = 0;
    var prevScrollTop = 0;
    var scrollDir = 1;
    var $header = $('#header');
    var $footer = $('#footer');
    var windowWidth = $(window).innerWidth();
    var windowHeight = $(window).innerHeight();

    var $stickyBottomNav = $('.__sticky-bottom-nav');
    var isAutoScroll = false;

    $('.__scroll-nav a').on('click', function(e){
        e.preventDefault();
        var target = $(this).attr('href');
        var offset = $(target).attr('data-offset');
        isAutoScroll = true;
        ScrollTrigger.update();
        $('html').addClass('__auto-scrolling');
        gsap.killTweensOf('.__history-per-years .__years dl');
        gsap.set('.__history-per-years .__years dl', {autoAlpha:0});
        gsap.set(window, {scrollTo: {y: target, offsetY: offset}, duration: 0.1, ease:Quint.easeInOut, onComplete:function(){
                    isAutoScroll = false;
                    ScrollTrigger.update();
                    $('html').removeClass('__auto-scrolling');
                    gsap.killTweensOf('.__history-per-years .__years dl');
                    gsap.set('.__history-per-years .__years dl', {autoAlpha:1, delay:.5});
                }});
    })

    $('section[data-nav-scroll="true"]').each(function(){
        var id = $(this).attr('id');
        var offset = $(this).attr('data-offset');

        gsap.timeline({
            scrollTrigger: {
                trigger: this,
                start: 'top ' + (offset + 5) + 'px',
                end: 'bottom ' + (offset + 5) + 'px',
                onEnter:function(){
                    var li = $('.__scroll-nav a[href="#'+id+'"]').parent();
                    li.addClass('__current').siblings().removeClass('__current');
                    $('.__sticky-bottom-nav').scrollLeft(li.position().left);
                    gsap.to('.__sticky-bottom-nav', {scrollTo: {x: li}, duration: 0.2, ease:Quint.easeInOut});
                },
                onEnterBack: function(){
                    var li = $('.__scroll-nav a[href="#'+id+'"]').parent();
                    li.addClass('__current').siblings().removeClass('__current');
                    gsap.to('.__sticky-bottom-nav', {scrollTo: {x: li}, duration: 0.2, ease:Quint.easeInOut});
                },
            }
        })
    });


    function onScroll() {
        scrollTop = $(window).scrollTop();
        if(Math.abs(scrollTop - prevScrollTop) > 10) {
            scrollDir = (prevScrollTop < scrollTop) ? 1 : -1;
        }
        $header.toggleClass('__shrink', scrollTop > 100);
        $header.toggleClass('__hide', ( scrollTop > windowHeight * .7 && scrollDir == 1 && $('.__search-box').hasClass('__active') == false));

        if ( $stickyBottomNav.attr('data-type') == 'history') {
            $stickyBottomNav.toggleClass('__hide', scrollTop < windowHeight * .5 || scrollTop > $footer.offset().top - windowHeight - $footer.outerHeight() - $stickyBottomNav.outerHeight() * 2);
        } else {
            $stickyBottomNav.toggleClass('__hide', ( scrollTop < windowHeight * .5 || (scrollTop > windowHeight * .7 && scrollDir == 1)));
        }

        if ( isAutoScroll) {
            $header.addClass('__hide');
            $stickyBottomNav.removeClass('__hide');
        }
        prevScrollTop = scrollTop;
    }

    function onResize() {
        requestAnimationFrame(function(){
            windowWidth = $(window).innerWidth();
            windowHeight = $(window).innerHeight();
        });
    }



    new Swiper('.__key-info .swiper', {
        freeMode: true,
        slidesPerView: 'auto',
    });


    var langToggle = $('#header .__lang .__toggle');
    langToggle.on('click', function (e) {
        e.preventDefault();
        langToggle.toggleClass('__active');
        if (langToggle.hasClass('__active')) {
            requestAnimationFrame(function () {
                $(document).one('click', function (e) {
                    e.stopImmediatePropagation();
                    langToggle.removeClass('__active');
                })
            })
        }
    });



    $(window).on('scroll', onScroll);
    $(window).on('resize', onResize);
    onScroll();
    onResize();
    ScrollTrigger.update();
});

//footer
jQuery(function($){

    var relatedSites = new Swiper(".__related-site .swiper", {
        direction: "vertical",
        slidesPerView: 'auto',
        freeMode: true,
        mousewheel: {
            invert: false,
        },
        scrollbar: {
            el: ".__related-site .swiper-scrollbar",
            hide: false,
        },
    });

    var toggle = $('.__related-site .__btn-toggle');
    toggle.on('click', function(e){
        e.preventDefault();
        toggle.toggleClass('__active');
        if (toggle.hasClass('__active')) {
            requestAnimationFrame(function(){
                $(document).one('click', function(e){
                    e.stopImmediatePropagation();
                    toggle.removeClass('__active');
                })
                relatedSites.update();
            })
        }

    })


    $('.__footer-menu .__has-sub').each(function(){
        var toggle = $('a', this);
        toggle.on('click', function(e){
            e.preventDefault();
            toggle.toggleClass('__active');
            if (toggle.hasClass('__active')) {
                requestAnimationFrame(function(){
                    $(document).one('click', function(e){
                        e.stopImmediatePropagation();
                        toggle.removeClass('__active');
                    })
                })
            }

        })
    });

    $('.__submenu a').on('click', function () {
        var $location = $(this).attr('href');
        window.open($location, '_blank');
    })
})

//video
jQuery(function(){
    $('.__video-controls').each(function(){
        var id = $(this).attr('data-video-target');
        var videoEl = $('video[data-video-id="' + id + '"');
        var video = videoEl[0];
        if (video) {
            // video.pause();
            var btn = $('.__play', this);
            // btn.addClass('__paused');
            btn.on('click', function(e){
                e.preventDefault();
                if (video.paused) {
                    video.play();
                    // btn.removeClass('__paused');
                } else {
                    video.pause();
                    // btn.addClass('__paused');
                }
            })

            $(video).on('play', function(){
                btn.removeClass('__paused').addClass('hide_btn');
            })


            $(video).on('pause', function(){
                btn.addClass('__paused');
            })
        }
    })
});


//kv
jQuery(function($){

    if ($('html').hasClass('ie')) {
        $('.__top-box .__bg').each(function () {
            var img = $('img', this);
            var imgSrc = img.attr('src');
            $(this).css({
                'background-image': 'url(' + imgSrc + ')',
                'background-size': 'cover',
                'background-position': '50% 50%',
            });
            gsap.set(img, {opacity: 0});
        });
        $(window).on('resize', function(){
            requestAnimationFrame(function(){
                $('.__top-box .__bg').each(function(){
                    var video = $('video', this);
                    if ( video[0]) {
                        var videoWidth = video.attr('data-width');
                        var videoHeight = video.attr('data-height');
                        var width = $(this).width();
                        var height = $(this).height();
                        var scaleX = width/videoWidth;
                        var scaleY = height/videoHeight;
                        var scale = Math.max(scaleX, scaleY);
                        video.width(videoWidth * scale * 1.01);
                        video.height(videoHeight * scale * 1.01);
                    }
                });
            });
        }).trigger('resize');
    }



    if ($('html').hasClass('ie')) {
        $('.__landmark .__bg').each(function () {
            var img = $('img', this);
            var imgSrc = img.attr('src');
            $(this).css({
                'background-image': 'url(' + imgSrc + ')',
                'background-size': 'cover',
                'background-position': '50% 50%',
            });
            gsap.set(img, {opacity: 0});
        });
        $(window).on('resize', function(){
            requestAnimationFrame(function(){
                $('.__landmark .__bg video').each(function(){
                    var video = $(this);
                    if ( video[0]) {
                        var videoWidth = video.attr('data-width');
                        var videoHeight = video.attr('data-height');
                        var width = $(this).closest('.__bg').width();
                        var height = $(this).closest('.__bg').height();
                        var scaleX = width/videoWidth;
                        var scaleY = height/videoHeight;
                        var scale = Math.max(scaleX, scaleY);
                        video.width(videoWidth * scale * 1.01);
                        video.height(videoHeight * scale * 1.01);
                    }
                });
            });
        }).trigger('resize');
    }




    if ($('html').hasClass('ie')) {
        $(window).on('resize', function(){
            requestAnimationFrame(function(){
                $('.__page-nav .__bg').each(function(){
                    var video = $('video', this);
                    if ( video[0]) {
                        var videoWidth = video.attr('data-width');
                        var videoHeight = video.attr('data-height');
                        var width = $(this).width();
                        var height = $(this).height();
                        var scaleX = width/videoWidth;
                        var scaleY = height/videoHeight;
                        var scale = Math.max(scaleX, scaleY);
                        video.width(videoWidth * scale * 1.01);
                        video.height(videoHeight * scale * 1.01);
                    }
                });
            });
        }).trigger('resize');
    }

});