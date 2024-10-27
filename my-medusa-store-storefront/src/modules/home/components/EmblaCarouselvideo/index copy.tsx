'use client'

import React, { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import { EmblaOptionsType, EmblaEventType, EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { NextButton, PrevButton, usePrevNextButtons } from './EmblaCarouselArrowButtons';
import { useDotButton, DotButton, } from './EmblaCarouselDotButton';
import { PlaySolid, PauseSolid } from '@medusajs/icons';


// 导入视频 URL
const videoUrls = [
    'https://terra-1-g.djicdn.com/851d20f7b9f64838a34cd02351370894/520%20shoton/F26-F38_WA520_BestShots_N_7s_V3.2_2400x1440%20(1).mp4',
    'https://terra-1-g.djicdn.com/851d20f7b9f64838a34cd02351370894/shot%20on/F59_704_Shot%20on_CLEAN_%E2%89%A410s_V3_2400x1440Timecode.mp4',
    'https://terra-1-g.djicdn.com/851d20f7b9f64838a34cd02351370894/shot%20on/F58_714_Shot%20on_CLEAN_%E2%89%A410s_V3_2400x1440Timecode.mp4'
];

const TWEEN_FACTOR_BASE = 0.2
type PropType = {
    slides: number[]
    options?: EmblaOptionsType;
};

const defaultOptions: EmblaOptionsType = {
    dragFree: false,
    loop: true,
};

const EmblaCarousel: React.FC<PropType> = (props: PropsWithChildren<PropType>) => {
    const { options } = props;
    const mergedOptions = { ...defaultOptions, ...options };
    const [emblaRef, emblaApi] = useEmblaCarousel(mergedOptions, [Autoplay({ playOnInit: false, delay: 3000 })]); // 默认播放
    const [isPlaying, setIsPlaying] = useState(true);
    const [isVideoPlaying, setIsVideoPlaying] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const videoRefs = useRef(videoUrls.map(() => React.createRef()));
    const tweenFactor = useRef(0)
    const tweenNodes = useRef<HTMLElement[]>([])

    const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
        tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
            return slideNode.querySelector('.embla__parallax__layer') as HTMLElement
        })
    }, [])

    const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
        tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
    }, [])

    const tweenParallax = useCallback(
        (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
            const engine = emblaApi.internalEngine()
            const scrollProgress = emblaApi.scrollProgress()
            const slidesInView = emblaApi.slidesInView()
            const isScrollEvent = eventName === 'scroll'

            emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
                let diffToTarget = scrollSnap - scrollProgress
                const slidesInSnap = engine.slideRegistry[snapIndex]

                slidesInSnap.forEach((slideIndex) => {
                    if (isScrollEvent && !slidesInView.includes(slideIndex)) return

                    if (engine.options.loop) {
                        engine.slideLooper.loopPoints.forEach((loopItem) => {
                            const target = loopItem.target()

                            if (slideIndex === loopItem.index && target !== 0) {
                                const sign = Math.sign(target)

                                if (sign === -1) {
                                    diffToTarget = scrollSnap - (1 + scrollProgress)
                                }
                                if (sign === 1) {
                                    diffToTarget = scrollSnap + (1 - scrollProgress)
                                }
                            }
                        })
                    }

                    const translate = diffToTarget * (-1 * tweenFactor.current) * 100
                    const tweenNode = tweenNodes.current[slideIndex]
                    tweenNode.style.transform = `translateX(${translate}%)`
                })
            })
        },
        []
    )

    useEffect(() => {
        if (!emblaApi) return

        setTweenNodes(emblaApi)
        setTweenFactor(emblaApi)
        tweenParallax(emblaApi)

        emblaApi
            .on('reInit', setTweenNodes)
            .on('reInit', setTweenFactor)
            .on('reInit', tweenParallax)
            .on('scroll', tweenParallax)
            .on('slideFocus', tweenParallax)
    }, [emblaApi, tweenParallax])

    const handleNextClick = () => {
        const nextIndex = (activeIndex + 1) % videoUrls.length;
        setActiveIndex(nextIndex);
    };

    const handlePrevClick = () => {
        const prevIndex = (activeIndex - 1 + videoUrls.length) % videoUrls.length;
        setActiveIndex(prevIndex);
    };

    const handleDotButtonClick = (index: number) => {
        onDotButtonClick(index); // Call the function to handle dot button click
        setActiveIndex(index); // Set active index to the clicked dot index
    };

    useEffect(() => {
        // Pause all videos except the active one
        videoRefs.current.forEach((videoRef, index) => {
            if (index === activeIndex) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        });
    }, [activeIndex]);



    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi);

    const {
        selectedIndex,
        scrollSnaps,
        onDotButtonClick,
    } = useDotButton(emblaApi);

    const onButtonAutoplayClick = useCallback(
        (callback: () => void) => {
            const autoplay = emblaApi?.plugins()?.autoplay;
            if (!autoplay) return;

            const resetOrStop =
                autoplay.options.stopOnInteraction === false
                    ? autoplay.reset
                    : autoplay.stop;

            resetOrStop();
            callback();
        },
        [emblaApi]
    );

    const toggleAutoplay = useCallback(() => {
        const autoplay = emblaApi?.plugins()?.autoplay;
        if (!autoplay) return;

        if (autoplay.isPlaying()) {
            autoplay.stop();
            setIsPlaying(false); // 直接设置为 false
        } else {
            autoplay.play();
            setIsPlaying(true); // 直接设置为 true
        }
    }, [emblaApi]);

    useEffect(() => {
        const autoplay = emblaApi?.plugins()?.autoplay;
        if (!autoplay) return;

        setIsPlaying(autoplay.isPlaying());
        emblaApi
            .on('autoplay:play', () => setIsPlaying(true))
            .on('autoplay:stop', () => setIsPlaying(false))
            .on('reInit', () => setIsPlaying(autoplay.isPlaying()));
    }, [emblaApi]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])


    return (
        <div className="embla4 w-screen h-[80vh] relative">
            <div className="embla__viewport4" ref={emblaRef}>
                <div className="embla__container4">
                    {videoUrls.map((url, index) => (
                        <div className="embla__slide1 w-screen relative group" key={index} >
                            <div className="embla__parallax">
                                <div className="embla__parallax__layer">
                                    <video
                                        className="w-full h-[80vh] object-cover embla__slide__img embla__parallax__img"
                                        ref={videoRefs.current[index]} autoPlay={index === activeIndex} loop muted>
                                        <source src={url} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>


                                </div>
                            </div>


                            {/* 添加 banner-text */}
                            <div className="banner-text absolute top-1/4 left-1/2 transfo
                            rm -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center">
                                <h2 className="headline text-2xl font-semibold text-whit">zenmuse-h30-series</h2>
                                <h3 className="banner-slogan text-2xl font-semibold text-white">Unparalleled Vision, Day or Night</h3>
                            </div>

                            {/* 添加 banner-btn-box */}
                            <div className="banner-btn-box absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-between w-32">
                                <button className="banner-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2">Learn More</button>
                                <button className="banner-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2">Buy Now</button>
                            </div>

                            <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <PrevButton
                                    onClick={() => {
                                        onButtonAutoplayClick(scrollPrev); // Call the function to handle autoplay
                                        handlePrevClick(); // Call the function to handle previous click
                                    }}
                                    disabled={prevBtnDisabled}
                                    className="embla__button shadow-md hover:shadow-2xl hover:bg-gray-200/50"
                                />
                            </div>

                            <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <NextButton
                                    onClick={() => {
                                        onButtonAutoplayClick(scrollNext);
                                        handleNextClick();
                                    }}
                                    disabled={nextBtnDisabled}
                                    className="embla__button shadow-md hover:shadow-2xl hover:bg-gray-200/50"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="embla__dots">
                {scrollSnaps.map((_, index) => (
                    <DotButton
                        key={index}
                        onClick={() => {
                            handleDotButtonClick(index);
                        }}
                        className={'embla__dot'.concat(
                            index === selectedIndex ? ' embla__dot--selected' : ''
                        )}
                    />
                ))}
            </div>

            <div className="absolute bottom-10 right-5">
                <button className="embla__play shadow-md hover:shadow-lg embla__play inline-flex items-center justify-center text-white font-semibold text-lg px-6 opacity-0 transition-opacity duration-300 hover:opacity-100 hover:bg-gray-200/50 rounded-full cursor-pointer" onClick={() => setIsVideoPlaying(!isVideoPlaying)} type="button">
                    {isVideoPlaying ? <PauseSolid /> : <PlaySolid />}
                </button>
            </div>
        </div>
    );
};

export default EmblaCarousel;

