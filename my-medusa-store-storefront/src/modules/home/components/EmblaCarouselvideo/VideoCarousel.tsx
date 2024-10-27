import React, { useState, useRef, useEffect } from 'react';

const VideoCarousel = () => {
    const videoUrls = [
        'https://terra-1-g.djicdn.com/851d20f7b9f64838a34cd02351370894/520%20shoton/F26-F38_WA520_BestShots_N_7s_V3.2_2400x1440%20(1).mp4',
        'https://terra-1-g.djicdn.com/851d20f7b9f64838a34cd02351370894/shot%20on/F59_704_Shot%20on_CLEAN_%E2%89%A410s_V3_2400x1440Timecode.mp4',
        'https://terra-1-g.djicdn.com/851d20f7b9f64838a34cd02351370894/shot%20on/F58_714_Shot%20on_CLEAN_%E2%89%A410s_V3_2400x1440Timecode.mp4'
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const videoRefs = useRef(videoUrls.map(() => React.createRef()));

    const handleNextClick = () => {
        const nextIndex = (activeIndex + 1) % videoUrls.length;
        setActiveIndex(nextIndex);
    };

    const handlePrevClick = () => {
        const prevIndex = (activeIndex - 1 + videoUrls.length) % videoUrls.length;
        setActiveIndex(prevIndex);
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

    return (
        <div className="video-carousel">
            {videoUrls.map((url, index) => (
                <video
                    key={index}
                    ref={videoRefs.current[index]}
                    autoPlay={index === activeIndex}
                    loop
                    muted
                    className="w-full h-[80vh] object-cover"
                >
                    <source src={url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ))}

            <button onClick={handlePrevClick}>Prev</button>
            <button onClick={handleNextClick}>Next</button>
        </div>
    );
};

export default VideoCarousel;
