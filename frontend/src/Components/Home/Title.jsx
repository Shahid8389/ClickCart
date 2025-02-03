import React from 'react'

const Title = ({ text1, text2 }) => {
  return (
    <div>
        <div className='flex gap-2 items-center justify-center'>
            <h2 className='lg:text-2xl md:text-xl text-lg font-light'>{text1}</h2>
            <h2 className='lg:text-2xl md:text-xl text-lg font-semibold'>{text2}</h2>
            <p className='lg:w-11 w-9 h-[0.15rem] bg-gray-600'></p>
        </div>
    </div>
  )
}

export default Title