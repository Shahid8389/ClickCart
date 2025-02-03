import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../Context/ShopContext';
import Title from './Title'
import ProductItem from './ProductItem';


const BestSeller = () => {

    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    // To set the 5 best seller products
    useEffect(() => {
        const bestProduct = products.filter( (item) => item.bestseller);
        
        setBestSeller(bestProduct.slice(0, 5));

    }, [products])


    return (
        <div className='pt-11'>
            <div className='text-center'>
                <Title text1={"BEST"} text2={"SELLER"} />
                <p>Shop ClickCart's best sellers, featuring top-rated products loved by customers for their quality and value.</p>
            </div>

            <div className='pt-7 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-4'>
                {
                    bestSeller.map((item, index) => (
                        <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
                    ))
                }
            </div>

        </div>
    )
}

export default BestSeller