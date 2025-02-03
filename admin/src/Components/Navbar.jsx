import React from 'react'

const Navbar = ({ setToken }) => {
    
    return (
        <div className='border-b border-gray-300 pb-5'>
            <div className='flex justify-between px-6'>
                <h1 className='text-3xl font-bold text-orange-600 cursor-pointer shadow-sm'>ClickCart</h1>

                <button onClick={ ()=> setToken('') } className='bg-[#fb8950eb] rounded-full px-3 text-xl text-gray-900 font-medium py-0.5 pb-0.5 shadow-lg'>Logout</button>
            </div>


        </div>
    )
}

export default Navbar