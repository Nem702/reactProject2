import { useGSAP } from '@gsap/react'
import React, { useRef } from 'react'
import { animateWithGsap } from '../utils/animations'
import { explore1Img, explore2Img, exploreVideo } from '../utils';
import gsap from 'gsap';

const Features = () => {

    const videoRef =  useRef();

    useGSAP(() => {
        // manual animation/without using reusable function from animations.js
        gsap.to('#exploreVideo', {
            scrollTrigger: {
                trigger: '#exploreVideo',
                toggleActions: 'play pause reverse restart',
                start: '-10% bottom',
            },
            onComplete: () => {
                videoRef.current.play();
            }
        })

        // providing target
        animateWithGsap('#features-title', { y: 0, opacity: 1})
        // animating feature images
        animateWithGsap('.g_grow',
            { scale: 1, opacity: 1, ease: 'power1'},
            { scrub: 5.5}
        )
        animateWithGsap(
            '.g_text',
            { y: 0, opacity: 1, ease: 'power2.inOut', duration: 1}
        )
    }, []);

  return (
    <section className='h-full common-padding bg-zinc relative overflow-hidden'>
        <div className="screen-max-width">
            <div className="mb-12 w-full">
                <h1 id='features-title' className='section-heading'>
                    Explore the full story. If you want...
                </h1>
            </div>

            <div className="flex flex-col justify-center items-center overflow-hidden">
                <div className="mt-32 mb-24 pl-24">
                    <h2 className='text-5xl lg:text-7xl font-semibold'>
                        iPhone
                    </h2>
                    <h2 className='text-5xl lg:text-7xl font-semibold'>
                        Forged by Titans Kratos fought!
                    </h2>
                </div>

                <div className="flex-center flex-col sm:px-10">
                    <div className="relative h-[50vh] w-full flex items-center">
                        <video playsInline id='exploreVideo' className='w-full h-full object-cover object-center' preload='none' muted autoPlay ref={videoRef}>
                            <source src={exploreVideo} type='video/mp4' />
                        </video>
                    </div>

                    <div className='flex flex-col w-full relative'>
                        <div className="feature-video-container">
                            <div className="overflow-hidden flex-1 h-[50vh]">
                                <img src={explore1Img} alt="titanium" className='feature-video g_grow' />
                            </div>
                            <div className="overflow-hidden flex-1 h-[50vh]">
                                <img src={explore2Img} alt="titanium" className='feature-video g_grow' />
                            </div>
                        </div>

                        <div className="feature-text-container">
                            <div className="flex-1 flex-center">
                                {/* g_text (g stands for GSAP) */}
                                <p className='feature-text g_text'>
                                    iPhone 15 Pro is {' '}
                                    <span className='text-white'>
                                        the first iPhone to feature implementation of exotic materials harvested across universe
                                    </span>,
                                    like for example "Cosmic Dust" and "Vibranium"
                                </p>
                            </div>

                            <div className="flex-1 flex-center">
                                {/* g_text (g stands for GSAP) */}
                                <p className='feature-text g_text'>
                                    PTEXT {' '}
                                    <span className='text-white'>
                                        Captain America's Shield is made of a Vibranium-Iron alloy created by Dr. Myron MacLain.
                                    </span>,
                                    Cosmic dust contains complex organic compounds (amorphous organic solids with a mixed aromatic-aliphatic structure) that can be created naturally by stars and radiation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Features