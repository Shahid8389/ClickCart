import React from 'react'
import Title from '../Components/Home/Title'
import { assets } from '../assets/frontend_assets/assets'

const About = () => {
  return (
    <div className='mt-10 mb-36'>
      <div>
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className='mt-8 w-full flex max-sm:flex-col gap-4 items-center'>
        <div>
          <img className='w-[95%] lg:w-[90%] xl:w-[80%] max-sm:w-full' src={assets.about_img} alt="" />
        </div>

        <div className='text-sm'>
          <p>At ClickCart, we aim to deliver a seamless and enjoyable online shopping experience. We offer a wide variety of high-quality products at competitive prices, ensuring there's something for everyone.</p>
          <p className='pt-2'>Our platform is designed to be user-friendly, making browsing, purchasing, and checkout quick and hassle-free.</p>

          <div>
            <h2 className='font-medium pt-2'>Our Mission</h2>
            <p className='pt-2'>At ClickCart, our mission is to offer high-quality products, excellent customer service, and a seamless shopping experience.</p>
          </div>

        </div>

      </div>

      <div className='flex items-center mt-10'>
        <h2 className=''>WHY</h2>
        <h2 className='font-medium pl-1'>CHOOSE US</h2>
        <p className='lg:w-10 w-8 h-[0.15rem] bg-gray-800 ml-1'></p>
      </div>

      <div className='flex max-sm:flex-col max-sm:gap-2 mt-4 text-sm'>
        <div className='border border-gray-300 py-8 px-8'>
          <h3 className='font-medium pb-4'>Quality Assurance:</h3>
          <p>We ensures the product meets high standards of functionality, reliability, and usability.</p>
        </div>
        <div className='border border-gray-300 py-8 px-8'>
          <h3 className='font-medium pb-4'>Convenience:</h3>
          <p>The hassle-free ordering process ensures that customers can easily find products, add them to their cart, and complete purchases with minimal effort.</p>
        </div>
        <div className='border border-gray-300 py-8 px-8'>
          <h3 className='font-medium pb-4'>customer Services:</h3>
          <p>Our dedicated customer service team is always available to assist with any inquiries, order issues, or concerns, ensuring a responsive and supportive experience.</p>
        </div>
      </div>

    </div>
  )
}

export default About