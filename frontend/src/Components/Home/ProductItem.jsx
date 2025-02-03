import React, { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({ id, name, image, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className=''>
      <Link className='cursor-pointer text-gray-800 ' to={`/product/${id}`}>
        <div className='overflow-hidden'>
          <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="" />
        </div>
        <h3 className='text-sm max-sm:text-xs'>{name}</h3>
        <h3 className='text-sm'>{currency}{price}</h3>
      </Link>
    </div>
  )
}

export default ProductItem