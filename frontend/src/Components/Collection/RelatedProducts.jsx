import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../Context/ShopContext';
import Title from '../Home/Title';
import ProductItem from '../Home/ProductItem';
import { useParams } from 'react-router-dom';

const RelatedProducts = ({ category, subCategory }) => {

    const { productId } = useParams();

    const { products } = useContext(ShopContext);
    const [relatedProductData, setRelatedProductData] = useState([]);


    useEffect(() => {
        let productsCopy = products.slice();

        productsCopy = productsCopy.filter((item) => category === item.category)
        productsCopy = productsCopy.filter((item) => subCategory === item.subCategory)

        productsCopy = productsCopy.filter((item) => productId !== item._id)

        setRelatedProductData(productsCopy.slice(0, 5));

    }, [products, productId])


    return (
        <div className='mt-20 mb-16'>
            <div className='text-center'>
                <Title text1={"RELATED"} text2={"PRODUCTS"} />
            </div>

            <div className='pt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-4'>
                {
                    relatedProductData.map((item, index) => (
                        <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
                    ))
                }
            </div>

        </div>
    )
}

export default RelatedProducts