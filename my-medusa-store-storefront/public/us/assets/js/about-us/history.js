jQuery(function(){

    gsap.registerPlugin(ScrollTrigger);

    $('.__history-section .__history-cover').each(function(){
        var cover = this;
        gsap.timeline({
            scrollTrigger: {
                trigger:  $(cover).closest('.__history-section'),
                start: 'top bottom',
                end:  'top top',
                scrub: .2,
                invalidateOnRefresh: true,
            }
        })
            .fromTo($('.__year.__l img', cover), {y:'-60%', autoAlpha:0}, {y:'0%', autoAlpha:2, duration:.5}, 0)
            .fromTo($('.__year.__r img', cover), {y:'60%', autoAlpha:0}, {y:'0%', autoAlpha:2, duration:.5}, 0)
            .fromTo($('.__title-area .__title .__l', cover), {x:'-110%'}, {x:'0%', duration:1.5}, 1.5)
            .fromTo($('.__title-area .__title .__r', cover), {x:'110%'}, {x:'0%', duration:1.5}, 1.5)
            .fromTo($('.__description p', cover), {y:'4em', autoAlpha:0}, {y:'0em', autoAlpha:1, duration:1}, 2)


        gsap.timeline({
            scrollTrigger: {
                trigger: cover,
                start: 'top top',
                end:  'bottom bottom',
                scrub: .2,
                pin: $('.__cover-inner', cover),
                pinSpacing: false,
                invalidateOnRefresh: true,
            }
        })


        var gallery = $('.__cover-gallery', cover);
        var galleryTL = gsap.timeline({
            scrollTrigger: {
                trigger:  gallery,
                start: 'top bottom',
                end:  'bottom top',
                scrub: .2,
                invalidateOnRefresh: true,
            }
        })

        $('.__img img', gallery).each(function(index){
            galleryTL.fromTo(this, {y:function(){
                    return index * 30 + 'vh';
                }}, {y:'-20vh', duration:2}, 0)
        })
    })

    $('.__history-section .__history-recent').each(function(){
        var recent = this;
        gsap.timeline({
            scrollTrigger: {
                trigger: recent,
                start: 'top bottom',
                end: 'top 50%',
                scrub: .2,
                // markers: true,
                invalidateOnRefresh: true,
            }
        })
            .fromTo($('.__img', recent), {x:function(){
                    return '-3.5vw';
                }, webkitFilter:'opacity(0)'}, {x:0, webkitFilter:'opacity(1)', ease:Linear.easeNone, duration:1}, 0)
            .fromTo($('.__desc', recent), {x:function(){
                    return '3.5vw';
                    //22.04.01 does 수정사항 반영
                }, webkitFilter:'opacity(0)'}, {x:xValue4Device(), webkitFilter:'opacity(1)', ease:Linear.easeNone, duration:1}, 0)
    });
    //22.04.01 does 수정사항 반영(웹모바일 분기처리)
    function xValue4Device(){
        let xValue; 
        window.innerWidth < 768 ? xValue = 0 : xValue = "-50px";
        return xValue 
    }

    $('.__history-section .__history-per-years').each(function(){
        var el = this;
        gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: "top top",
                end: function(){
                    var top = parseInt($('.__inner', el).css('padding-top')) * 3;
                    return 'bottom ' + top +'px'
                },
                pin: $('.__years', el),
                pinSpacing: false,
                invalidateOnRefresh: true,
            }
        })

        $('.__detail-block', el).each(function(index){


            var __self = this;
            gsap.timeline({
                scrollTrigger: {
                    trigger: __self,
                    start: function(){
                        var top = parseInt($('.__inner', el).css('padding-top')) * 2;
                        return 'top ' + top +'px'
                    },
                    end: function(){
                        var top = parseInt($('.__inner', el).css('padding-top')) * 2;
                        return 'bottom ' + top +'px'
                    },

                    invalidateOnRefresh: true,
                    onEnter:function() {
                        gsap.to($('.__years dd', el), {duration: .6, ease:Circ.easeInOut, y:index * -100 + '%'});
                        $('.__years ul li:nth-child(' + (index + 1) + ')', el).addClass('__current').siblings().removeClass('__current');
                        $(__self).addClass('__current').siblings().removeClass('__current');
                    },
                    onEnterBack:function() {
                        gsap.to($('.__years dd', el), {duration: .6, ease:Circ.easeInOut, y:index * -100 + '%'});
                        $('.__years ul li:nth-child(' + (index + 1) + ')', el).addClass('__current').siblings().removeClass('__current');
                        $(__self).addClass('__current').siblings().removeClass('__current');
                    }
                }
            })
        });
    })



    $('.__history-per-years .__detail-block img').each(function(){
        var li = $(this).closest('li');
        li.on('mouseenter', function(){
            var block = $(this).closest('.__detail-block');
            var details = $(this).closest('.__details');
            block.find('dt, li').addClass('__inactive');
            $(this).removeClass('__inactive');
            var img =  $(this).find('img').clone();
            $('.__history-per-years .__hover-img img').remove();
            $('.__history-per-years .__hover-img').append(img).addClass('__active');
            var offsetY = $(this).position().top + $(this).height() * .5;
            $('.__history-per-years .__hover-img').css({top: offsetY});

        });

        li.on('mouseleave', function(){
            var block = $(this).closest('.__detail-block');
            block.find('dt, li').removeClass('__inactive');
            $('.__history-per-years .__hover-img').removeClass('__active');
        });

    })

});