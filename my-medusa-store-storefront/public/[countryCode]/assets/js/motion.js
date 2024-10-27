jQuery(function($){
    if($('body').hasClass('__loaded')) return
    gsap.registerPlugin(ScrollTrigger);

    gsap.delayedCall(.1, function(){
        $('body').addClass('__loaded');
        $('html,body').scrollTop(0);

    })

    gsap.timeline()
        .from('#header .__header-top', {y:'-102%', duration:1, ease:Quint.easeInOut}, 0)
        .from('#header .__header-main-inner', {autoAlpha:0, duration:1, ease:Linear.easeNone}, .2)
        .from('#main', {autoAlpha:0, duration:.6, ease:Linear.easeNone}, .2)
        .from('.__page-nav', {autoAlpha:0, duration:.6, ease:Linear.easeNone}, .3)
        .from('#footer', {autoAlpha:0, duration:.6, ease:Linear.easeNone}, .3)


    gsap.timeline({
        scrollTrigger: {
            trigger: '.__page-top-box',
            start: function(){
                var headerHeight = $('#header').height();
                return 'top ' + headerHeight + 'px';
            },
            end: 'bottom top',
            scrub: .01,
            invalidateOnRefresh: true,
        }
    })
        .to('.__page-top-box .__bg', {y:'50%', scale:1.125});


    $('.section--animated').each(function(){
        var section = this;
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top top',
                // invalidateOnRefresh: true,
            }
        })
        $('.__animated', section).each(function(){
            var animated = this;
            var delay = $(animated).attr('data-delay') || 0;
            var amount = $(animated).attr('data-amount') || 50;
            var dir = $(animated).attr('data-dir') || 'up';
            var hidden = $(animated).attr('data-hidden') || false;
            if ( hidden ) {
                tl.from($(' > *', animated), {y:'105%', duration:1.125, ease:Quart.easeOut}, delay);
            } else {
                tl.from($(' > *', animated), {y: amount + '%', autoAlpha:0, duration:1.125, ease:Quart.easeOut}, delay);
            }
        });

        if ( $(section).offset().top < $(window).innerHeight()) {
            gsap.delayedCall(.5, function() {
                tl.play();
            });
        }
    })


    $('.__number[data-counting]').each(function(){
        var number = this;
        var txt = $(number).text();
        $(number).html('');
        var reg = new RegExp('^[0-9]$');

        $(txt.split('')).each(function(){
            var char = $('<span class="__char"></span>').appendTo(number);
            var duration = 1.5 + Math.random() * 1.5;
            char.attr('data-duration', duration)
            gsap.set(char, {x:0,y:0,z:0})

            if ( reg.test(this)) {
                gsap.set(char, {display: 'flex', flexDirection:'column', height:'1em', overflow:'hidden'});
                for( var i = 0 ; i < 10; ++i) {
                    var txt = parseInt(this) + i;
                    var txtEl = $('<i class="__txt"></i>').text(txt%10).appendTo(char);

                }
            } else {
                char.text(this);
            }

        })

        var tl = gsap.timeline({
            scrollTrigger: number,
            start:'top 105%',
        })

        $('.__char', number).each(function(){
            var duration = $(this).attr('data-duration')
            tl.fromTo($('.__txt', this), {y:'-900%', z:0}, {y:'0%', duration:duration, ease:Quart.easeInOut}, 0)
        })
    });





});