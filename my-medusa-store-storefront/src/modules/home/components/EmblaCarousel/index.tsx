'use client'

import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { NextButton, PrevButton, usePrevNextButtons } from './EmblaCarouselArrowButtons';
import { PlaySolid, PauseSolid } from '@medusajs/icons'

type PropType = {
    options?: EmblaOptionsType;
};

const defaultOptions: EmblaOptionsType = {
    dragFree: false,
    loop: true,
};

const EmblaCarousel: React.FC<PropType> = (props: PropsWithChildren<PropType>) => {
    const { options } = props;
    const mergedOptions = { ...defaultOptions, ...options };
    const [emblaRef, emblaApi] = useEmblaCarousel(mergedOptions, [Autoplay({ playOnInit: true, delay: 3000 })]); // 默认播放
    const [isPlaying, setIsPlaying] = useState(true);

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi);

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
    const imagePaths = [
        '/us/assets/video/home/about/ps/1.png',
        '/us/assets/video/home/about/ps/watch.png',
        '/us/assets/video/home/about/ps/3.png',
    ];

    return (
        <div className="embla w-screen h-[80vh] relative">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {imagePaths.map((src, index) => (
                        <div className="embla__slide w-screen relative group" key={index}>
                            <img className="w-full h-[80vh] object-cover" src={src} alt={`Slide ${index + 1}`} />

                            {/* 添加 banner-text */}
                            <div className="banner-text absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center">
                                <h2 className="headline text-2xl font-semibold text-whit">Unleash the Future</h2>
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

                                    }}
                                    disabled={prevBtnDisabled}
                                    className="embla__button shadow-md hover:shadow-2xl hover:bg-gray-200/50"
                                />
                            </div>

                            <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <NextButton
                                    onClick={() => onButtonAutoplayClick(scrollNext)}
                                    disabled={nextBtnDisabled}
                                    className="embla__button shadow-md hover:shadow-2xl hover:bg-gray-200/50"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-10 right-5">
                <button className="embla__play shadow-md hover:shadow-lg embla__play inline-flex items-center justify-center text-white font-semibold text-lg px-6 opacity-0 transition-opacity duration-300 hover:opacity-100 hover:bg-gray-200/50 rounded-full cursor-pointer" onClick={toggleAutoplay} type="button">
                    {isPlaying ? <PauseSolid /> : <PlaySolid />}
                </button>
            </div>
        </div>
    );
};

export default EmblaCarousel;
