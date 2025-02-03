import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../Context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';


const LatestCollection = () => {

    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);


    // set the 8 latest products.
    useEffect(() => {
      setLatestProducts(products.slice(0, 8));
    }, [products])
    

  return (
    <div className='pt-11'>
        <div className='text-center'>
            <Title text1={"LATEST"} text2={"COLLECTION"}/>
            <p>Discover ClickCart's latest collection, featuring fresh arrivals and premium products for a seamless shopping experience.</p>
        </div>

        <div className='pt-7 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-4'>
            {
                latestProducts.map( (item, index)=> (
                    <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
                ))
            }
        </div>

    </div>
  )
}

export default LatestCollection