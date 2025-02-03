import React from 'react'

const Footer = () => {
  return (
    <div className='pt-8'>
      <div className='sm:grid sm:grid-cols-[2fr_1fr_1fr] sm:gap-4 max-sm:flex flex-col gap-10 max-sm:text-center pb-8'>

        <div className='lg:pr-40 md:pr-16 sm-pr-6 pr-4 max-sm:flex flex-col items-center max-sm:text-center'>
          <h1 className='text-3xl font-bold text-orange-600 cursor-pointer shadow-sm'>ClickCart</h1>
          <p className='pt-3 text-sm'>ClickCart is a user-friendly e-commerce platform that offers a seamless shopping experience, allowing customers to easily browse products, view details, and make purchases with a simple checkout process.</p>
        </div>

        <div>
          <h3 className='font-semibold text-lg'>COMPANY</h3>

          <ul className='pt-2'>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h3 className='font-semibold text-lg'>GET IN TOUCH</h3>

          <ul className='pt-2'>
            {/* Dummy phone number and gmail. */}
            <li>+919876543210</li>  
            <li>clickcart@gmail.com</li>
          </ul>
        </div>

      </div>

      <div className='pt-3 border-t-2 border-gray-400'>
        <p className='text-center pb-5'>Copyright@clickcart.com - All Rights Reserved.</p>
      </div>

    </div>
  )
}

export default Footer