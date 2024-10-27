'use client'

import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll'
import { NextButton, PrevButton, usePrevNextButtons } from '../EmblaCarousel/EmblaCarouselArrowButtons';
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
    const [emblaRef, emblaApi] = useEmblaCarousel(mergedOptions, [AutoScroll({ playOnInit: true, speed: 0.8, stopOnInteraction: false, stopOnMouseEnter: true })]); // 默认播放
    const [isPlaying, setIsPlaying] = useState(true);

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi);

    const onButtonautoScrollClick = useCallback(
        (callback: () => void) => {
            const autoScroll = emblaApi?.plugins()?.autoScroll;
            if (!autoScroll) return;

            const resetOrStop =
                autoScroll.options.stopOnInteraction === false
                    ? autoScroll.reset
                    : autoScroll.stop;

            resetOrStop();
            callback();
        },
        [emblaApi]
    );

    const toggleautoScroll = useCallback(() => {
        const autoScroll = emblaApi?.plugins()?.autoScroll;
        if (!autoScroll) return;

        if (autoScroll.isPlaying()) {
            autoScroll.stop();
            setIsPlaying(false); // 直接设置为 false
        } else {
            autoScroll.play();
            setIsPlaying(true); // 直接设置为 true
        }
    }, [emblaApi]);

    useEffect(() => {
        const autoScroll = emblaApi?.plugins()?.autoScroll;
        if (!autoScroll) return;

        setIsPlaying(autoScroll.isPlaying());
        emblaApi
            .on('autoScroll:play', () => setIsPlaying(true))
            .on('autoScroll:stop', () => setIsPlaying(false))
            .on('reInit', () => setIsPlaying(autoScroll.isPlaying()));
    }, [emblaApi]);

    return (
        <div className="embla3 w-screen relative">
            <div className="embla__viewport3" ref={emblaRef}>
                <div className="embla__container3">
                    {[1, 2, 3, 4, 5, 6, 7].map((index) => (
                        <div className="embla__slide3 w-screen relative group" key={index}>
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

            <div className="absolute bottom-0 right-0">
                <button className="embla__play shadow-md hover:shadow-lg inline-flex items-center justify-center text-white font-semibold text-lg px-6 opacity-0 transition-opacity duration-300 hover:opacity-100 hover:bg-gray-200/50 rounded-full cursor-pointer" onClick={toggleautoScroll} type="button">
                    {isPlaying ? <PauseSolid /> : <PlaySolid />}
                </button>
            </div>
        </div>
    );
};

export default EmblaCarousel;
