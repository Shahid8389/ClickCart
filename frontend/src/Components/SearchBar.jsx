import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/frontend_assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false)
  const location = useLocation();


  // Show the search bar only in the collection page.
  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setVisible(true)
    }
    else{
      setVisible(false)
    }
  }, [location])
  

  return showSearch && visible ? (
    <div className='pt-2 pb-3'>
      <div className='pt-2 pb-2 border-t border-b border-slate-400 flex items-center justify-center'>

        <div className='py-4 flex items-center relative sm:w-1/2 w-3/4'>
          <input className='border-gray-700 border rounded-full pl-4 pr-10 py-1 outline-none w-full' onChange={(e)=> setSearch(e.target.value)} value={search} type="text" placeholder='Search' />

          <img className='h-5 absolute lg:right-[2.5%] sm:right-[3%] max-sm:right-[3%] cursor-pointer' src={assets.search_icon} alt='' />
        </div>

        <img className='h-5 cursor-pointer pl-2' onClick={ ()=> setShowSearch(false) } src={assets.cross_icon} alt="" />

      </div>

    </div>

  ) : null
}

export default SearchBar