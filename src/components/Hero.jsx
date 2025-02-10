import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
// importing two versions of the video for responsive design
import { heroVideo, smallHeroVideo } from '../utils'


const Hero = () => {
    // getting width of the screen
    const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo)

    // dynamic video change
    const handlevideoSrcSet = () => {
        if(window.innerWidth < 760) {
            setVideoSrc(smallHeroVideo)
        } else {
            setVideoSrc(heroVideo)
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handlevideoSrcSet)
        // IN REACT IS VERY IMPORTANT TO CLEAN UP EVENT LISTENERS! by returning function
        return () => {
            window.removeEventListener('resize', handlevideoSrcSet)
        }
    }, [])

    // gsaphook {function, dependencies []}
    useGSAP(() => {
        // adding delay of 1.5s because animation is too quick
        gsap.to('#hero', { opacity: 1, delay: 1.5} )
        gsap.to('#cta', { opacity: 1, y: -50, delay: 2})
    }, [])

  return (
    <section className='w-full nav-height bg-black relative'>
        {/* height about 83.3% = h-5/6 */}
        <div className='h-5/6 w-full flex-center flex-col'>
        {/* initially hidden text, animated using gsap */}
            <p id='hero' className='hero-title'>
                iPhone 15 Pro Max Mega Ultra S94
            </p>

            <div className='md:w-10/12 w-9/12'>
                <video autoPlay muted playsInline={true} key={videoSrc} >
                    <source src={videoSrc} type='video/mp4' />
                </video>
            </div>
        </div>

        <div id='cta' className='flex flex-col items-center opacity-0 translate-y-20'>
            <a href="#highlights" className='btn'>Buy</a>
            <p className='font-normal text-xl'>From $199/Month or $999</p>
        </div>
    </section>
  )
}

export default Hero