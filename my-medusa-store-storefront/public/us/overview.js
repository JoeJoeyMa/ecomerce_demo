jQuery(function($){

    gsap.registerPlugin(ScrollTrigger);

    gsap.set('#aboutMotion .__box-item img', {y:'120%', autoAlpha:0});
    gsap.set('#aboutMotion .__bg-inner', {x:'120vw', scale:0.25});

    var tl1 = gsap.timeline({
        scrollTrigger: {
            trigger: '#aboutMotion .__motion.__box-in',
            start: 'top 90%',
            end: 'bottom bottom',
            scrub: .5,
            invalidateOnRefresh: true
        }
    })
        .fromTo('body', {backgroundColor:'transparent'}, {backgroundColor:'#121212'}, 0)
        .to('#aboutMotion .__box-item img',  {y:0, autoAlpha:.6, duration:1, stagger:.2}, 0.4);


    $('#aboutMotion .__title-area .__title .__txt').each(function(index){
        tl1.fromTo(this, {y:function(){return (index + 1) * 30 + 'vh';}, autoAlpha:0}, { autoAlpha:1, y:'0vh', duration:2, ease:Linear.easeNone}, index * .25)
    });

    var tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: '#aboutMotion',
            start: 'top top',
            end: 'bottom bottom',
            pin: '#aboutMotion .__motion-area',
            pinSpacing: false,
            invalidateOnRefresh: true
        }
    })

    gsap.set('#aboutMotion .__title-area .__title .__and-m', {autoAlpha:0});

    var tl3 = gsap.timeline({
        scrollTrigger: {
            trigger: '#aboutMotion .__motion.__box-out',
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: .5,
            invalidateOnRefresh: true
        }
    })

        .to('#aboutMotion .__title-area', {opacity:1, duration:2}, 0)
        .to('#aboutMotion .__title-area .__title .__txt', {margin: 0, webkitTextFillColor:'#fff', webkitTextStrokeColor:'transparent', duration:1.4}, 0)

        .to('#aboutMotion .__boxes.__d .__box-item.__up img',  {y:'-50vh', autoAlpha:0, duration:1, stagger:-.15, ease:Linear.easeNone}, 0.4)
        .to('#aboutMotion .__boxes.__d .__box-item.__down img',  {y:'50vh', autoAlpha:0, duration:1, stagger:-.15, ease:Linear.easeNone}, 0.4)

        .to('#aboutMotion .__title-area .__title .__and', {margin: 0, autoAlpha:1, duration:1}, 1.25)
        .to('#aboutMotion .__title-area .__title .__and-m', {autoAlpha:1, duration:.7}, 1.4)
        .to('#aboutMotion .__title-area .__slogan', {autoAlpha:1, duration:1}, 1.25)
        .to('#aboutMotion .__bg-inner', {x:'0vw', scale:1, duration:1.5}, .8);

    $('#aboutMotion .__boxes.__m .__box-item').each(function(){
        var dir = $(this).hasClass('__up') ? -50 : 50;
        var delay = parseInt($(this).attr('data-fade-index')) * .125;
        tl3.to($('img', this),  {y: dir + 'vh', autoAlpha:0, duration:1, ease:Linear.easeNone}, 0.4 + delay)
    });

    var tl4 = gsap.timeline({
        scrollTrigger: {
            trigger: '#aboutMotion .__motion.__gallery',
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: .25,
            invalidateOnRefresh: true
        }
    })
        .to('#aboutMotion .__bg', {width:function(){return '100.1vw';}, height:function(){return '100vh';}, borderRadius:0, duration:1}, 0)
        .to('#aboutMotion .__b2', {autoAlpha:1, duration:.4}, 1)
        .to('#aboutMotion .__b3', {autoAlpha:1, duration:.4}, 2)
        .to('#aboutMotion .__b4', {autoAlpha:1, duration:.4}, 3)


    var tl5 = gsap.timeline({
        scrollTrigger: {
            trigger: '#aboutBusinessPortfolio',
            start: 'top bottom',
            end: 'top 40%',
            scrub: .25,
            invalidateOnRefresh: true
        }
    })
        .to('body', {backgroundColor:'transparent', duration:.5}, 0)
        .to('#aboutMotion .__bg', {width:function(){return '100%';}, height:function(){return '100vh';}, borderRadius:function(){return '0.4444444444rem';}, duration:1}, 0)

});