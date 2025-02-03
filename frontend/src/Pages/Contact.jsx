import React from 'react'
import Title from '../Components/Home/Title'
import { assets } from '../assets/frontend_assets/assets'

const Contact = () => {
  return (
    <div className='mt-14 mb-36'>
      <div>
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className='w-full flex max-sm:flex-col items-center justify-center mt-14 gap-6'>
        <img className='w-[50%] lg:w-[41%] xl:w-[35%] max-sm:w-[80%]' src={assets.contact_img} alt="" />

        <div className='flex flex-col max-sm:items-center max-sm:justify-center gap-5'>
          <h2 className='font-medium text-lg'>Our Store:</h2>
          <div className='max-sm:flex items-center flex-col'>
            <p>789 Trendy Ave, 2nd Floor New York</p>
            <p>NY 10001, United States</p>
          </div>

          <div className='max-sm:flex items-center flex-col'>
            <p>Tel: +91987654321</p>
            <p>Email: clickcart@gmail.com</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Contact