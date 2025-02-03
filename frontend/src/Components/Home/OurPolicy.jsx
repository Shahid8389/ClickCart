import React from 'react'
import { assets } from '../../assets/frontend_assets/assets'


const OurPolicy = () => {
  return (
    <div className='flex flex-col gap-12 sm:flex-row sm:flex-wrap md:flex-nowrap md:gap-4 sm:gap-10 items-center justify-around pt-36 text-center mb-28'>

        <div className='flex flex-col items-center'>
            <img className='w-14 pb-2' src={assets.exchange_icon} alt="" />
            <h3 className='font-semibold text-lg'>Easy Exchange Policy</h3>
            <p>We offer hasle free exchange policy</p>
        </div>

        <div className='flex flex-col items-center'>
            <img className='w-14 pb-2' src={assets.quality_icon} alt="" />
            <h3 className='font-semibold text-lg'>7 Days Return Policy</h3>
            <p>We provide 7 days free return policy</p>
        </div>

        <div className='flex flex-col items-center'>
            <img className='w-12 pb-2' src={assets.support_img} alt="" />
            <h3 className='font-semibold text-lg'>Best Customer Support</h3>
            <p>We provide 24/7 customer support</p>
        </div>

    </div>
  )
}

export default OurPolicy