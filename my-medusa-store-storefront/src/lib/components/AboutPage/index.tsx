"use client"
import { useEffect, useRef } from 'react';
import { Quint, ScrollTrigger, Linear, Quart } from 'gsap/all';
import { gsap } from 'gsap';
import Swiper, { Navigation, EffectCreative } from 'swiper';
import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-creative';
import 'swiper/swiper-bundle.css';
import './app.css';
import DynamicStyles from './DynamicStyles';
import { useRouter } from 'next/navigation';
import styles from './YourComponent.module.css';
const YourComponent = () => {
    const router = useRouter();





    useEffect(() => {
        const animateOnLoad = () => {
            gsap.set('#aboutTop .__scrolldown', { y: '-100%', opacity: 0 });
            gsap.timeline({
                onComplete: function () {
                    document.querySelector('#aboutTop .__page-title').classList.add('__filled');
                    document.querySelector('#aboutTop .__bg video').play();
                    gsap.to('body', { backgroundColor: 'transparent', duration: 0 });
                }
            })
                .from('#aboutTop .__bg-area', { x: '100%', duration: 1.6, ease: 'Quint.easeInOut' }, 0)
                .from('#aboutTop .__bg-area .__bg', { x: '-90%', duration: 1.6, ease: 'Quint.easeInOut' }, 0)
                .from('#aboutTop .__page-title strong', { x: '-120%', duration: 1.6, ease: 'Quint.easeInOut' }, 0)
                .to('#aboutTop .__bg-area', { x: '0%', duration: 1.6, ease: 'Quint.easeInOut' }, 0)
                .to('#aboutTop .__bg-area .__bg', { x: '0%', duration: 1.6, ease: 'Quint.easeInOut' }, 0)
                .to('#aboutTop .__page-title strong', { x: '0%', duration: 1.6, ease: 'Quint.easeInOut' }, 0);

        };

        if (document.readyState === 'complete') {
            animateOnLoad();
        } else {
            window.addEventListener('load', animateOnLoad);
        }

        return () => {
            // 清除事件监听器（可选）
            window.removeEventListener('load', animateOnLoad);
        };
        gsap.timeline({
            onComplete: function () {
                // 完成时的操作
            },
            overwrite: "none" // 避免动画结束后的样式重置
        })



    }, []);



    useEffect(() => {
        // Your overview component code here

        gsap.registerPlugin(ScrollTrigger);

        gsap.set('#aboutMotion .__box-item img', { y: '120%', autoAlpha: 0 });
        gsap.set('#aboutMotion .__bg-inner', { x: '120vw', scale: 0.25 });

        const tl1 = gsap.timeline({
            scrollTrigger: {
                trigger: '#aboutMotion .__motion.__box-in',
                start: 'top 50%',
                end: 'bottom bottom',
                scrub: .5,
            }
        });

        tl1.fromTo('body', { backgroundColor: 'transparent' }, { backgroundColor: '#121212' }, 0)
            .to('#aboutMotion .__box-item img', { y: 0, autoAlpha: .6, duration: 1, stagger: .2 }, 0.4);


        document.querySelectorAll('#aboutMotion .__title-area .__title .__txt').forEach((element, index) => {
            tl1.fromTo(element, { y: `${(index + 1) * 30}vh`, autoAlpha: 0 }, { autoAlpha: 1, y: '0vh', duration: 2, ease: Linear.easeNone }, index * .25);
        });

        if (document.querySelector('#aboutMotion')) {
            const tl2 = gsap.timeline({
                scrollTrigger: {
                    trigger: '#aboutMotion',
                    start: 'top top',
                    end: 'bottom bottom',
                    pin: '#aboutMotion .__motion-area',
                    pinSpacing: false,
                    invalidateOnRefresh: false,
                    onUpdate: (self) => {
                        // 获取固定的元素
                        const pinElement = document.querySelector('#aboutMotion .__motion-area');
                        if (pinElement) {
                            // 计算 translateY 值，根据需要调整 0
                            const maxTranslateY = 0;
                            const translateY = self.progress * maxTranslateY;
                            // 动态设置 transform 属性
                            pinElement.style.transform = `translate(0px, ${translateY}px)`;
                        }
                    }
                }
            });
        }

        // 添加一个页面离开事件处理器，以便在页面离开时销毁 ScrollTrigger 实例
        window.addEventListener('beforeunload', () => {
            if (gsap && gsap.ScrollTrigger) {
                gsap.ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            }
        });

        gsap.set('#aboutMotion .__title-area .__title .__and-m', { autoAlpha: 0 });

        const tl3 = gsap.timeline({
            scrollTrigger: {
                trigger: '#aboutMotion .__motion.__box-out',
                start: 'top bottom',
                end: 'bottom bottom',
                scrub: .5,
                invalidateOnRefresh: true
            }
        });

        tl3.to('#aboutMotion .__title-area', { opacity: 1, duration: 2 }, 0)
            .to('#aboutMotion .__title-area .__title .__txt', { margin: 0, webkitTextFillColor: '#fff', webkitTextStrokeColor: 'transparent', duration: 1.4 }, 0)
            .to('#aboutMotion .__boxes.__d .__box-item.__up img', { y: '-50vh', autoAlpha: 0, duration: 1, stagger: -.15, ease: Linear.easeNone }, 0.4)
            .to('#aboutMotion .__boxes.__d .__box-item.__down img', { y: '50vh', autoAlpha: 0, duration: 1, stagger: -.15, ease: Linear.easeNone }, 0.4)
            .to('#aboutMotion .__title-area .__title .__and', { margin: 0, autoAlpha: 1, duration: 1 }, 1.25)
            .to('#aboutMotion .__title-area .__title .__and-m', { autoAlpha: 1, duration: .7 }, 1.4)
            .to('#aboutMotion .__title-area .__slogan', { autoAlpha: 1, duration: 1 }, 1.25)
            .to('#aboutMotion .__bg-inner', { x: '0vw', scale: 1, duration: 1.5 }, .8);

        document.querySelectorAll('#aboutMotion .__boxes.__m .__box-item').forEach(item => {
            const dir = item.classList.contains('__up') ? -50 : 50;
            const delay = parseInt(item.getAttribute('data-fade-index')) * .125;
            tl3.to(item.querySelector('img'), { y: `${dir}vh`, autoAlpha: 0, duration: 1, ease: Linear.easeNone }, 0.4 + delay);
        });

        const tl4 = gsap.timeline({
            scrollTrigger: {
                trigger: '#aboutMotion .__motion.__gallery',
                start: 'top bottom',
                end: 'bottom bottom',
                scrub: .25,
                invalidateOnRefresh: true
            }
        });

        tl4.to('#aboutMotion .__bg', { width: '100.1vw', height: '100vh', borderRadius: 0, duration: 1 }, 0)
            .to('#aboutMotion .__b2', { autoAlpha: 1, duration: .4 }, 1)
            .to('#aboutMotion .__b3', { autoAlpha: 1, duration: .4 }, 2)
            .to('#aboutMotion .__b4', { autoAlpha: 1, duration: .4 }, 3);

        const tl5 = gsap.timeline({
            scrollTrigger: {
                trigger: '#aboutBusinessPortfolio',
                start: 'top bottom',
                end: 'top 40%',
                scrub: 0.25,
                invalidateOnRefresh: true
            }
        })
            .to('body', { backgroundColor: 'transparent', duration: 0.5 }, 0)
            .to('#aboutMotion .__bg', {
                width: () => '100%',
                height: () => '100vh',
                borderRadius: () => '0.4444444444rem',
                duration: 1
            }, 0);
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            gsap.globalTimeline.clear();
            const pinElement = document.querySelector('#aboutMotion .__motion-area');
            tl1.kill(); // 停止 gsap 动画
            gsap.to('body', { backgroundColor: 'transparent', duration: 0 }); // 恢复背景颜色

        };
    }, []);







    useEffect(() => {
        // Your swiper component code here

        const swiper = new Swiper('#aboutBusinessPortfolio .swiper', {
            loop: true,
            loopedSlides: 50,
            effect: 'creative',
            speed: 600,
            creativeEffect: {
                limitProgress: 2,
                prev: {
                    translate: ['-100%', '7.5%', 0],
                    rotate: [0, 0, -10],
                },
                next: {
                    translate: ['100%', '7.5%', 0],
                    rotate: [0, 0, 10],
                },
            },
            navigation: {
                nextEl: '#aboutBusinessPortfolio .__controls .__next',
                prevEl: '#aboutBusinessPortfolio .__controls .__prev',
            },
            breakpoints: {
                640: {
                    creativeEffect: {
                        limitProgress: 2,
                        prev: {
                            translate: ['-100%', '20%', 0],
                            rotate: [0, 0, -12],
                        },
                        next: {
                            translate: ['100%', '20%', 0],
                            rotate: [0, 0, 12],
                        },
                    },
                },
            },
        });

        swiper.on('slideChangeTransitionStart', swiper => {
            const current = document.querySelector('#aboutBusinessPortfolio .swiper .swiper-slide-active');
            const index = current.getAttribute('data-index');
            document.querySelector('#aboutBusinessPortfolio .__box').setAttribute('data-index', index);
            document.querySelector(`#aboutBusinessPortfolio .__nav li[data-index='${index}']`).classList.add('__active');
            document.querySelectorAll('#aboutBusinessPortfolio .__nav li[data-index]').forEach(nav => {
                if (nav.getAttribute('data-index') !== index) {
                    nav.classList.remove('__active');
                }
            });
            document.querySelector(`#aboutBusinessPortfolio .__description p[data-index='${index}']`).classList.add('__active');
            document.querySelectorAll('#aboutBusinessPortfolio .__description p[data-index]').forEach(desc => {
                if (desc.getAttribute('data-index') !== index) {
                    desc.classList.remove('__active');
                }
            });
        });

        document.querySelectorAll('#aboutBusinessPortfolio .__nav a').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const index = link.closest('li').getAttribute('data-index');
                swiper.slideToLoop(index - 1);
            });
        });

    }, []);

    return (
        <div >
            <DynamicStyles styles="/path/to/app.css" />
            <section className="section __top-box __page-top-box" id="aboutTop" >
                {/* Your JSX content for aboutTop section goes here */}

                <div className="section-inner">
                    <div className="container container-boxed">
                        <div className="__box">
                            <div className="__bg-area" >
                                <div className="__bg" >
                                    <img src="/us/assets/img/about/top-bg.jpg" alt="Background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <video

                                        src="https://www.samsungcnt.com/assets/video/home/about/top.mp4"
                                        data-width="1920"
                                        data-height="1080"
                                        preload="auto"
                                        playsInline
                                        muted
                                        poster="/us/assets/video/home/about/top.jpg"
                                    ></video>
                                </div>
                            </div>
                            <div className="__breadcrumb __white">
                                <ul>
                                    <li>
                                        <Link href="https://maple-global.com">
                                            <span className="__home">MAPLE</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/overview">
                                            <span>GLOBAL</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/overview">
                                            <span>TRENDS</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="__content-inner">
                                <h1 className="__page-title">
                                    <strong data-text="MAPLE GLOBAL LTD">ABOUT MAPLE-GLOBAL</strong>
                                </h1>
                            </div>
                            <div className="__scrolldown" >
                                <span>SCROLL DOWN</span>
                                <i>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10.707" height="10.707" viewBox="0 0 10.707 10.707">
                                        <g transform="translate(0.111 -0.5)">
                                            <g transform="translate(0 0)">
                                                <path d="M4538.414-5152.892l-5.354-5.354.707-.707,4.646,4.646,4.646-4.646.707.707Z" transform="translate(-4533.172 5164.099)" fill="#fff" />
                                                <path d="M28.242,65.9h-1v-10h1Z" transform="translate(-22.5 -55.4)" fill="#fff" />
                                            </g>
                                        </g>
                                    </svg>
                                </i>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section" id="aboutMotion">
                {/* Your JSX content for aboutMotion section goes here */}

                <div className="section-inner">
                    <div className="__motion-area">
                        <div className="__motion-area-inner">
                            <div className="__bgs">
                                <div className="container container-boxed">
                                    <div className="__bg-inner">
                                        <div className="__bg">
                                            <div className="__back __b1" style={{ backgroundImage: 'url(/us/assets/img/about/bg1.jpg)' }}></div>
                                            <div className="__back __b2" style={{ backgroundImage: 'url(/us/assets/img/about/bg2.jpg)' }}></div>
                                            <div className="__back __b3" style={{ backgroundImage: 'url(/us/assets/img/about/bg3.jpg)' }}></div>
                                            <div className="__back __b4" style={{ backgroundImage: 'url(/us/assets/img/about/bg4.jpg)' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="__boxes __d">
                                <div className="container container-boxed">
                                    <div className="__boxes-inner">
                                        <div className="__box-item __up"><img src="/us/assets/img/about/img1-1.jpg" /></div>
                                        <div className="__box-item __up"><img src="/us/assets/img/about/img1-2.jpg" /></div>
                                        <div className="__box-item __up"><img src="/us/assets/img/about/img1-3.jpg" /></div>
                                        <div className="__box-item __up"><img src="/us/assets/img/about/img1-4.jpg" /></div>
                                        <div className="__box-item __down"><img src="/us/assets/img/about/img1-5.jpg" /></div>
                                        <div className="__box-item __down"><img src="/us/assets/img/about/img1-6.jpg" /></div>
                                        <div className="__box-item __down"><img src="/us/assets/img/about/img1-7.jpg" /></div>
                                        <div className="__box-item __down"><img src="/us/assets/img/about/img1-8.jpg" /></div>
                                    </div>
                                </div>
                            </div>
                            <div className="__boxes __m">
                                <div className="container container-boxed">
                                    <div className="__boxes-inner">
                                        <div className="__box-item __up" data-fade-index="2"><img src="/us/assets/img/about/img1-1.jpg" /></div>
                                        <div className="__box-item __up" data-fade-index="1"><img src="/us/assets/img/about/img1-2.jpg" /></div>
                                        <div className="__box-item __up" data-fade-index="4"><img src="/us/assets/img/about/img1-3.jpg" /></div>
                                        <div className="__box-item __up" data-fade-index="3"><img src="/us/assets/img/about/img1-4.jpg" /></div>
                                        <div className="__box-item __down" data-fade-index="4"><img src="/us/assets/img/about/img1-5.jpg" /></div>
                                        <div className="__box-item __down" data-fade-index="3"><img src="/us/assets/img/about/img1-6.jpg" /></div>
                                        <div className="__box-item __down" data-fade-index="2"><img src="/us/assets/img/about/img1-7.jpg" /></div>
                                        <div className="__box-item __down" data-fade-index="1"><img src="/us/assets/img/about/img1-8.jpg" /></div>
                                    </div>
                                </div>
                            </div>
                            <div className="__title-area">
                                <div className="container container-boxed">
                                    <div className="__slogan">
                                        <p className="__sub-headline3" data-trn-key="sub-title-01"><span>PIONEERING NEW TRENDS IN THE MARKETPLACE.</span> <span>TRADING, FASHION, AND GLOBAL BUSINESS</span></p>
                                    </div>
                                    <h2 className="__title">
                                        <strong className="__txt __txt1">Global Business Partner</strong>
                                        <strong className="__and-m"><span>&</span></strong>
                                        <strong className="__txt __txt2"><span className="__and">& </span>LIFESTYLE INNOVATOR</strong>
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="__motion __box-in"></div>
                    <div className="__motion __box-out"></div>
                    <div className="__motion __gallery"></div>
                </div>
            </section>
            <section className="section section--animated mg-btm-15" id="aboutBusinessPortfolio">
                <div className="section-inner">
                    <div className="container container-boxed">
                        <div className="section-header">
                            <h2 className="__headline3">
                                <strong className="__animated" data-dir="up" data-hidden="true">
                                    <span>BUSINESS PORTFOLIO</span>
                                </strong>
                            </h2>
                        </div>
                        <div className="section-body">
                            <div className="__animated" data-dir="up" data-delay=".4" data-amount="20">
                                <div className="__box">
                                    <div className="swiper">
                                        <div className="swiper-wrapper">
                                            <div className="swiper-slide" data-index="1">
                                                <div className="__portfolio-item">
                                                    <h3 className="__title __headline3">
                                                        <strong data-trn-key="business-title-01"> Supply Chain</strong>
                                                    </h3>
                                                    <div className="__img">
                                                        <img src="/us/assets/img/about/portfolio1.jpg" alt="Supply Chain" />
                                                        <div className="__links">
                                                            <a
                                                                href=""
                                                                className="__btn __filled"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <span className="__label" data-trn-key="business-content-01">
                                                                    Overview
                                                                </span>
                                                            </a>
                                                            <a
                                                                href="https://www.secc.co.kr/ko"
                                                                className="__btn"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <span className="__label" data-trn-key="business-content-02">
                                                                    Specialization
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="swiper-slide" data-index="2">
                                                <div className="__portfolio-item">
                                                    <h3 className="__title __headline3">
                                                        <strong data-trn-key="business-title-02">Tracking </strong>
                                                    </h3>
                                                    <div className="__img">
                                                        <img src="/us/assets/img/about/portfolio2.jpg" alt="" />
                                                        <div className="__links">
                                                            <a
                                                                href="https://www.samsungcnt.com/eng/business/trading.do"
                                                                className="__btn __filled"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <span className="__label" data-trn-key="business-content-01">
                                                                    Global Logistics
                                                                </span>
                                                            </a>
                                                            <a
                                                                href="http://trading.samsungcnt.com/KR/trading/index.do"
                                                                className="__btn"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <span className="__label" data-trn-key="business-content-03">
                                                                    International Shipping
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="swiper-slide" data-index="3">
                                                <div className="__portfolio-item">
                                                    <h3 className="__title __headline3">
                                                        <strong data-trn-key="business-title-03">Fashion</strong>
                                                    </h3>
                                                    <div className="__img">
                                                        <img src="/us/assets/img/about/portfolio3.jpg" alt="Fashion" />
                                                        <div className="__links">
                                                            <a
                                                                href="https://www.samsungcnt.com/eng/business/fashion.do"
                                                                className="__btn __filled"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <span className="__label" data-trn-key="business-content-01">
                                                                    Fabric
                                                                </span>
                                                            </a>
                                                            <a
                                                                href="https://www.samsungfashion.com/main.do?LANG=EN"
                                                                className="__btn"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <span className="__label" data-trn-key="business-content-04">
                                                                    Textile
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="swiper-slide" data-index="4">
                                                <div className="__portfolio-item">
                                                    <h3 className="__title __headline3">
                                                        <strong data-trn-key="business-title-04">Global Purchasing</strong>
                                                    </h3>
                                                    <div className="__img">
                                                        <img src="/us/assets/img/about/portfolio4.jpg" alt="Purchase" />
                                                        <div className="__links">
                                                            <a
                                                                href="https://www.samsungcnt.com/eng/business/resort.do"
                                                                className="__btn __filled"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <span className="__label" data-trn-key="business-content-01">
                                                                    Organisations
                                                                </span>
                                                            </a>
                                                            <a
                                                                href="https://rnc.samsungcnt.com/main.html"
                                                                className="__btn"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <span className="__label" data-trn-key="business-content-05">
                                                                    Management
                                                                </span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="__description">
                                        <p className="__active" data-index="1" data-trn-key="business-content-06">
                                            active response "dual circulation" strategy
                                            <br />
                                            we continuously advance our strategies of "specialization" and "internationalization," establishing strong positions in sectors such as consumer, industrial, electronics.
                                        </p>
                                        <p data-index="2" data-trn-key="business-content-07">
                                            We pursue and develop businesses around the world in the areas of Multi-sized business with world-class shipping and logistics
                                            <br />
                                            leveraging our talented workforce, global network, and extensive experience.
                                        </p>
                                        <p data-index="3" data-trn-key="business-content-08">
                                            We operate leading fashion brands and resources to manufacture, print, dye and finish a new fabric within a single organisation.
                                            <br />
                                            We also engage in e-commerce through our Shop website, and import a wide range of international brands.
                                        </p>
                                        <p data-index="4" data-trn-key="business-content-09">
                                            Global sourcing is a procurement strategy in which a business buys goods and services from international markets across geopolitical boundaries
                                            <br />
                                            to save money by using cheap raw materials or skilled labor from low-cost countries.
                                        </p>
                                    </div>
                                    <div className="__nav">
                                        <ul>
                                            <li data-index="1" className="__active">
                                                <a href="#">
                                                    <span data-trn-key="portfolio-carousel-nav-01">SupplyChain</span>
                                                </a>
                                            </li>
                                            <li data-index="2">
                                                <a href="#">
                                                    <span data-trn-key="portfolio-carousel-nav-02">Tracking</span>
                                                </a>
                                            </li>
                                            <li data-index="3">
                                                <a href="#">
                                                    <span data-trn-key="portfolio-carousel-nav-03">Fashion</span>
                                                </a>
                                            </li>
                                            <li data-index="4">
                                                <a href="#">
                                                    <span data-trn-key="portfolio-carousel-nav-04">Source</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="__controls __swiper-nav-controls">
                                        <a className="__prev">
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                                                    <path
                                                        d="M19.9,25.9L7.4,15L19.9,4l1.6,1.9L11.2,15l10.4,9.1L19.9,25.9z"
                                                        fill="#fff"
                                                    />
                                                </svg>
                                            </span>
                                        </a>
                                        <a className="__next">
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                                                    <path
                                                        d="M10.1,25.9l-1.6-1.9L18.8,15L8.5,5.9L10.1,4L22.6,15L10.1,25.9z"
                                                        fill="#fff"
                                                    />
                                                </svg>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section section--animated" id="aboutBusinessPortfolioStats">
                <div className="section-inner">
                    <div className="container container-boxed">
                        <div className="section-body">
                            <div className="__stats">
                                <div className="__grid__">
                                    <div className="__col__ __animated" data-dir="up" data-delay=".2" data-amount="20">
                                        <div className="__stat-item">
                                            <dl>
                                                <dt className="__title" data-trn-key="portfolio-title-01">Progress</dt>
                                                <dd className="__stat" data-trn-key="portfolio-content-01">
                                                    <span className="__stat-block">
                                                        <strong className="__number" data-counting="true" data-trn-key="content-counting-num-1"></strong>integrate resources
                                                    </span>
                                                    <span className="__stat-block">
                                                        <strong className="__number" data-counting="true"></strong> design services
                                                    </span>
                                                </dd>
                                            </dl>
                                            <small className="__memo" data-trn-key="portfolio-caption-02">
                                                2024
                                            </small>
                                            <div className="__icon">
                                                <img src="https://www.samsungcnt.com/assets/img/about/icon1.svg" alt="icon" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="__col__ __animated" data-dir="up" data-delay=".4" data-amount="20">
                                        <div className="__stat-item">
                                            <dl>
                                                <dt className="__title" data-trn-key="portfolio-title-02">Sales</dt>
                                                <dd className="__stat" data-trn-key="portfolio-content-02">
                                                    <span className="__stat-block">
                                                        <strong className="__number" data-counting="true"></strong>assistance
                                                    </span>
                                                    <span className="__stat-block">
                                                        <strong className="__number" data-counting="true"></strong> exploration
                                                    </span>
                                                </dd>
                                            </dl>
                                            <small className="__memo" data-trn-key="portfolio-caption-02">
                                                2024
                                            </small>
                                            <div className="__icon">
                                                <img src="https://www.samsungcnt.com/assets/img/about/icon2.svg" alt="icon" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="__col__ __animated" data-dir="up" data-delay=".6" data-amount="20">
                                        <div className="__stat-item">
                                            <dl>
                                                <dt className="__title" data-trn-key="portfolio-title-03">Operating </dt>
                                                <dd className="__stat" data-trn-key="portfolio-content-03">
                                                    <span className="__stat-block">
                                                        <strong className="__number" data-counting="true">export</strong> Manufacturers and retailers sell
                                                    </span>
                                                </dd>
                                            </dl>
                                            <small className="__memo" data-trn-key="portfolio-caption-02">
                                                2024
                                            </small>
                                            <div className="__icon">
                                                <img src="https://www.samsungcnt.com/assets/img/about/icon3.svg" alt="icon" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="__col__ __animated" data-dir="up" data-delay=".8" data-amount="20">
                                        <div className="__stat-item">
                                            <dl>
                                                <dt className="__title" data-trn-key="portfolio-title-04">Employees</dt>
                                                <dd className="__stat" data-trn-key="portfolio-content-04">
                                                    <span className="__stat-block">
                                                        <strong className="__number" data-counting="true">Around the world</strong>
                                                    </span>
                                                </dd>
                                            </dl>
                                            <small className="__memo" data-trn-key="portfolio-caption-02">
                                                2024
                                            </small>
                                            <div className="__icon">
                                                <img src="https://www.samsungcnt.com/assets/img/about/icon4.svg" alt="icon" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section section--animated" id="homeGlobalNetwork">
                <div className="section-inner">
                    <div className="container container-boxed">
                        <div className="section-header">
                            <h2 className="__headline3">
                                <strong className="__animated" data-dir="up" data-hidden="true">
                                    <span>GLOBAL NETWORK</span>
                                </strong>
                            </h2>
                        </div>
                        <div className="section-body">
                            <div className="__animated" data-dir="up" data-delay=".5" data-amount="5">
                                <div className="__box">
                                    <div className="__bg">
                                        <img src="/us/assets/img/home/global-network.png" alt="Global Network" />
                                        <div className="__anim"></div>
                                    </div>
                                    <div className="__box-inner">
                                        <p data-trn-key="global-content-01">
                                            <span>
                                                <strong>MapleGlobal LTD  </strong>is a multi-business company consisting of four independent business groups
                                            </span>{' '}
                                            <span>Integrate logistics resources & links of supply chain operations for customers, Trading & Quality management for export purchase.</span>
                                            <br />
                                            <span>
                                                We are actively engaged in business around the world through our extensive network of overseas offices.
                                            </span>
                                            <br />
                                        </p>
                                        <div className="__info">
                                            <dl data-trn-key="global-content-03">
                                                <dt>Export</dt>
                                                <dd>
                                                    <strong>
                                                        <span className="__number" data-counting="true">
                                                            Full
                                                        </span>
                                                    </strong>{' '}
                                                    Support
                                                </dd>
                                            </dl>
                                            <div className="__split"></div>
                                            <dl data-trn-key="global-content-04">
                                                <dt>shipping </dt>
                                                <dd>
                                                    <strong>
                                                        <span className="__number" data-counting="true">
                                                            197
                                                        </span>
                                                    </strong>{' '}
                                                    Countries
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                                <div className="__utils fr">
                                    <small className="__remark">* provide in the form of wholly owned operations, Cargo Shipping agents' services and wholesale trade services.</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default YourComponent;