import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='sm:w-[30%] xl:w-[22%] lg:w-[25%] w-[20%] min-h-screen border-r border-gray-300'>

      <div className='flex flex-col gap-2 pt-4 pl-6 pr-1'>

        <NavLink to='/add' className='flex max-sm:justify-center gap-3 text-gray-900 px-2 py-2 font-semibold rounded-md cursor-pointer border border-gray-300'>
          <img className='sm:w-6 w-8' src={assets.add_icon} alt="" />
          <h2 className='hidden sm:block'>Add Product</h2>
        </NavLink>

        <NavLink to="/list" className='flex max-sm:justify-center gap-3 text-gray-900 px-2 py-2 font-semibold rounded-md cursor-pointer border border-gray-300'>
          <img className='sm:w-6 w-8' src={assets.order_icon} alt="" />
          <h2 className='hidden sm:block'>List Products</h2>
        </NavLink>

        <NavLink to="/orders" className='flex max-sm:justify-center gap-3 text-gray-900 px-2 py-2 font-semibold rounded-md cursor-pointer border border-gray-300'>
          <img className='sm:w-6 w-8' src={assets.order_icon} alt="" />
          <h2 className='hidden sm:block'>Orders</h2>
        </NavLink>

      </div>

    </div>
  )
}

export default Sidebar