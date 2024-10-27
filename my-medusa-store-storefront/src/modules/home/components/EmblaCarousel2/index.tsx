'use client'

import React, { PropsWithChildren, useCallback, useEffect, useState, useRef } from 'react';
import { EmblaOptionsType, EmblaEventType, EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useDotButton, DotButton, } from './EmblaCarouselDotButton';
import { PlaySolid, PauseSolid } from '@medusajs/icons'

type PropType = {
    slides: number[]
    options?: EmblaOptionsType;
};

const defaultOptions: EmblaOptionsType = {
    dragFree: false,
    loop: true,
};
const TWEEN_FACTOR_BASE = 0.70

const numberWithinRange = (number: number, min: number, max: number): number =>
    Math.min(Math.max(number, min), max)


const EmblaCarousel: React.FC<PropType> = (props: PropsWithChildren<PropType>) => {
    const { slides, options } = props;
    const mergedOptions = { ...defaultOptions, ...options };
    const [emblaRef, emblaApi] = useEmblaCarousel(mergedOptions, [Autoplay({ playOnInit: false, delay: 3000 })]); // 默认播放
    const [isPlaying, setIsPlaying] = useState(true);

    const tweenFactor = useRef(0)
    const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
        tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
    }, [])

    const tweenOpacity = useCallback(
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

                    const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current)
                    const opacity = numberWithinRange(tweenValue, 0, 1).toString()
                    emblaApi.slideNodes()[slideIndex].style.opacity = opacity
                })
            })
        },
        []
    )

    useEffect(() => {
        if (!emblaApi) return

        setTweenFactor(emblaApi)
        tweenOpacity(emblaApi)
        emblaApi
            .on('reInit', setTweenFactor)
            .on('reInit', tweenOpacity)
            .on('scroll', tweenOpacity)
            .on('slideFocus', tweenOpacity)
    }, [emblaApi, tweenOpacity])

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
        <div className="embla1 w-screen relative">
            <div>          <button className="embla__prev" onClick={scrollPrev}>

            </button>
                <button className="embla__next" onClick={scrollNext}>

                </button></div>

            <div className="embla__viewport1" ref={emblaRef}>
                <div className="embla__container1">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                        <div className="embla__slide1 w-screen relative group" key={index}>
                            <img className="w-full" src={`https://source.unsplash.com/random/1920x1080?sig=${index}`} alt={`Slide ${index}`} />

                            {/* 添加 banner-text */}
                            <div className="banner-text absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center">
                                <h2 className="headline text-2xl font-semibold text-whit">zenmuse-h30-series</h2>
                                <h3 className="banner-slogan text-2xl font-semibold text-white">Unparalleled Vision, Day or Night</h3>
                            </div>

                            {/* 添加 banner-btn-box */}
                            <div className="banner-btn-box absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-between w-32">
                                <button className="banner-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2">Learn More</button>
                                <button className="banner-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2">Buy Now</button>
                            </div>


                        </div>
                    ))}
                </div>
            </div>
            <div className="embla__dots">

                {scrollSnaps.map((_, index) => (
                    <DotButton
                        key={index}
                        onClick={() => onDotButtonClick(index)}
                        className={'embla__dot'.concat(
                            index === selectedIndex ? ' embla__dot--selected' : ''
                        )}
                    />
                ))}
            </div>


            <div className="absolute bottom-3 right-2">
                <button className="embla__play1 shadow-md hover:shadow-lg" onClick={toggleAutoplay} type="button">
                    {isPlaying ? <PauseSolid /> : <PlaySolid />}
                </button>

            </div>

        </div>
    );
};

export default EmblaCarousel;
