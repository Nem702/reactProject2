import React, { useRef } from 'react'
import { chipImg, frameImg, frameVideo } from '../utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { animateWithGsap } from '../utils/animations'


const HowItWorks = () => {

    const videoRef = useRef();

    useGSAP(() => {
        gsap.from('#chip', {
            scrollTrigger: {
                trigger: '#chip',
                start: '20% bottom'
            },
            opacity: 0,
            scale: 2,
            duration: 2,
            ease: 'power2.inOut'
        })

        animateWithGsap('.g_fadeIn', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.inOut'
        })
    }, [])

  return (
    <section className='common-padding'>
        <div className="screen-max-width">
            <div id="chip" className='flex-center w-full my-20'>
                <img src={chipImg} alt="chip" width={180} height={180}/>
            </div>

            <div className="flex flex-col items-center">
                {/* hiw = HowItWorks */}
                <h2 className="hiw-title">
                    A17 Pro chip <br /> excellent gaming performace
                </h2>
                <p className="hiw-subtitle">
                    It's here and there, the biggest redesign of GPU chip in the Universe!
                </p>
            </div>

            <div className="mt-10 md:mt-20 mb-14">
                <div className="relative h-full flex-center">
                    <div className="overflow-hidden">
                        <img
                            src={frameImg}
                            alt="frame"
                            className='bg-transparent relative z-10'
                        />
                    </div>
                    <div className="hiw-video">
                        <video
                            className='pointer-events-none'
                            playsInline
                            preload='none'
                            muted
                            autoPlay
                            ref={videoRef}
                        >
                            <source src={frameVideo} type='video/mp4' />
                        </video>
                    </div>
                </div>
                <p className='text-gray font-semibold text-center mt-3'>
                    Honkai: Star Rail
                </p>
                </div>
                <div className="hiw-text-container">
                    <div className="flex flex-1 flex-col justify-center">
                        <p className='hiw-text g_fadeIn'>
                            {/* {' '} addes space */}
                            A17 Pro is new class of iPhone chip, {' '}
                            <span className='text-white'>
                               best graphic performace for a solid rock
                            </span>
                            .
                        </p>
                    
                    <p className='hiw-text g_fadeIn'>
                        PTEXT {' '}
                        <span className='text-white'>
                            Captain America's Shield is made of a Vibranium-Iron alloy created by Dr. Myron MacLain
                        </span>,
                        Cosmic dust contains complex organic compounds (amorphous organic solids with a mixed aromatic-aliphatic structure) that can be created naturally by stars and radiation.
                    </p>
                    </div>
                <div className="flex-1 flex justify-center flex-col g_fadeIn">
                    <p className="hiw-text">New</p>
                    <p className="hiw-bigtext">Pro class GPU</p>
                    <p className="hiw-text">with 6 cores</p>
                </div>
                </div>
            </div>
    </section>
  )
}

export default HowItWorks