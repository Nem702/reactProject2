import { useEffect, useRef, useState } from 'react'
import { hightlightsSlides } from '../constants'
import { pauseImg, playImg, replayImg } from '../utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
    const videoRef = useRef([]);
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);

    // state for video / video and indicator
    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false,
        // need answers to these questions!
    })

    const [loadedData, setLoadedData] = useState([]);

    // destructuring, so its easier to work with data, so i can use them without saying video.this, video.that,
    const {isEnd, startPlay, videoId, isLastVideo, isPlaying} = video;

    useGSAP(() => {
        // slider animation to move the video out of the screen and bring the next video in
        gsap.to('#slider', {
            transform: `translateX(${-100 * videoId}%)`,
            duration: 2,
            ease: 'power2.inOut'
        });

        // animating video in view
        gsap.to('#video', {
            scrollTrigger: {
                // once in view trigger it
                trigger: '#video',
                // only interested in playing it once it initially gets into view
                toggleActions: 'restart none none none'
            },
            onComplete: () => {
                setVideo((prevVideo) => ({
                    ...prevVideo,
                    startPlay: true,
                    isPlaying: true,
                }))
            }
        })
    }, [isEnd, videoId])


    // checking if loaded data exists, only if it does then start playing
    useEffect(() => {
        if(loadedData.length > 3) {
            if(!isPlaying) {
                // pause if at the end
                videoRef.current[videoId].pause();
            } else {
                // this is not going to start inital video because it doesnt have any refs
                startPlay && videoRef.current[videoId].play();
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData])

    const handleLoadedMetadata = (i, e) => setLoadedData((prevVideo) => [...prevVideo, e])

    useEffect(() => {
        // first gotta figure out video playing journey, which one is playing
        let currentProgress = 0;
        let span = videoSpanRef.current;

        if(span[videoId]) {
            // animate the progress of the video, anim short for animation
            let anim = gsap.to(span[videoId], {
                // as the second parameter providing options options don't have to be properties like opacity/Y/X axis it can also be specific function like onUpdate (what will happen once animation updates)
                onUpdate: () => {
                    const progress = Math.ceil(anim.progress() * 100);
                    // progress bar
                    if(progress !=currentProgress) {
                        currentProgress = progress;
                        // set the width of the progress bar
                        gsap.to(videoDivRef.current[videoId], {
                            width: window.innerWidth < 760
                                ? '10vw'
                                : window.innerWidth < 1200
                                    ? '10vw'
                                    : '4vw'
                        })

                        // animating progress bar and setting background
                        gsap.to(span[videoId], {
                            width: `${currentProgress}%`,
                            backgroundColor: 'white'
                        })
                    }
                },
                // when the video ends, replace the progress bar with the indicator and change the bg color
                onComplete: () => {
                    if(isPlaying) {
                        gsap.to(videoDivRef.current[videoId], {
                            width: '12px'
                        })
                        gsap.to(span[videoId], {
                            backgroundColor: '#afafaf'
                        })
                    }
                }
            })

            if(videoId === 0) {
                // utility handler given by gsap
                anim.restart();
            }
            // modifying how long anim. lasts / update the progress bar
        const animUpdate = () => {
            anim.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration)
        }
        //  remove the ticker if video is paused
            if(isPlaying) {
                gsap.ticker.add(animUpdate)
            } else {
                gsap.ticker.remove(animUpdate)
            }
        }
    }, [videoId, startPlay])

    const handleProcess = (type, i) => {
        switch (type) {
            case 'video-end':
                setVideo((prevVideo) => ({...prevVideo, isEnd: true, videoId: i + 1}))
                break;
            case 'video-last':
                setVideo((prevVideo) => ({ ...prevVideo, isLastVideo: true}))
                break;
            case 'video-reset':
                setVideo((prevVideo) => ({...prevVideo, isLastVideo: false, videoId: 0 }))
            case 'play':
                setVideo((prevVideo) => ({...prevVideo, isPlaying: !prevVideo.isPlaying}))
                break;
                case 'pause':
                setVideo((prevVideo) => ({...prevVideo, isPlaying: !prevVideo.isPlaying}))
                break;
            default:
                return video;
        }
    }


  return (
    <>
        <div className='flex items-center'>
            {/* immediate return, using () instead of {}  */}
            {hightlightsSlides.map((list, i) => (
                <div key={list.id} id='slider' className='sm:pr-20 pr-10'>
                    <div className='video-carousel_container'>
                        <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                            <video
                                id='video'
                                playsInline={true}
                                preload='auto'
                                muted
                                className={`${
                                    list.id === 2 && 'translate-x-44 '}
                                    pointer-events-none
                                `}
                                // missing ref from above useEffect
                                // finding specific index in videoRefs array and setting it to the current video element
                                ref={(el) => (videoRef.current[i] = el)}
                                onEnded={() =>
                                    i !== 3
                                        ? handleProcess('video-end', i)
                                        : handleProcess('video-last')
                                }
                                onPlay={() => {
                                    setVideo((prevVideo) => ({
                                        ...prevVideo, isPlaying: true
                                    }))
                                }}
                                onLoadedMetadata={(e) => handleLoadedMetadata(i, e)}
                            >
                                <source src={list.video} type='video/mp4' />
                            </video>
                        </div>

                        <div className='absolute top-12 left-[5%] z-10'>
                            {list.textLists.map((text) => (
                                <p key={text} className='md:text-2xl text-xl font-medium' >
                                    {text}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className='relative flex-center mt-10'>
            <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
                {/* tracking video progress */}
                {/* getting each video, but not doing s**t with it */}
                {videoRef.current.map((_, i) => (
                    <span
                        key={i}
                        // adding new video to the array
                        ref={(el) => (videoDivRef.current[i] = el)}
                        className='mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer'
                    >
                        <span
                            className='absolute h-full w-full rounded-full'
                            ref={(el) => (videoSpanRef.current[i] = el)}
                        />
                    </span>
                ))}
            </div>
            <button className='control-btn'>
                <img
                    src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
                    alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
                    onClick={isLastVideo
                        ? () => handleProcess('video-reset')
                        : !isPlaying
                            ? () => handleProcess('play')
                            : () => handleProcess('pause')
                    }
                />
            </button>
        </div>
    </>
  )
}

export default VideoCarousel