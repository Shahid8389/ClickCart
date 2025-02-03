import React from 'react'
import { assets } from '../../assets/frontend_assets/assets'

const Hero = () => {
    return (
        <div className='flex flex-col sm:flex-row border-2 border-slate-400'>

            <div className='sm:w-1/2 w-full flex flex-col gap-1 items-center justify-center py-10 sm:py-0'>
                <div>
                    <div className='flex gap-1 items-center lg:pl-1'>
                        <p className='lg:w-11 w-8 h-[0.15rem] bg-gray-600'></p>
                        <h2 className='lg:text-lg text-base'>OUR BESTSELLER</h2>
                    </div>

                    <h2 className='lg:text-5xl text-3xl'>Latest Arrivals</h2>

                    <div className='flex gap-1 items-center lg:pt-2.5 lg:pl-1 pt-1'>
                        <p className='lg:text-lg text-base'>SHOP NOW</p>
                        <p className='lg:w-11 w-8 h-[0.15rem] bg-gray-600'></p>
                    </div>
                </div>

            </div>

            {/* Right side logo of the home page */}
            <img className='sm:w-1/2 w-full max-sm:h-[35vh]' src={assets.hero_img3} alt="" />

        </div>
    )
}

export default Hero