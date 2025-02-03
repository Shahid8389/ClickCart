import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import RelatedProducts from '../Components/Collection/RelatedProducts';


const Product = () => {

  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  // Fetch the data of the selected product from the collection.
  const fetchProductData = () => {

    products.map((item) => {
      if (item._id == productId) {
        setProductData(item);
        setImage(item.image[0]);

        return null;
      }
    })

  }


  useEffect(() => {
    fetchProductData();
  }, [productId, productData, products])

  useEffect(() => {
    window.scrollTo(0, 0); // Smooth scroll to the top
  }, []);


  return productData ? (
    <div className='pt-6 pb-10'>

      <div className='flex sm:flex-row max-sm:flex-col max-sm:gap-4' id='collection-top' >

        {/* Product Image */}
        <div className='flex gap-2 lg:w-[50%] md:w-[60%] sm:w-[65%] max-sm:w-full' >

          <div className='flex flex-col md:w-[18%] sm:w-[17%] max-sm:w-[18%] gap-2'>
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} className='w-full cursor-pointer' src={item} key={index} alt="" />
              ))
            }
          </div>

          <div className='md:w-[75%] sm:w-[77%]'>
            <img className='w-full auto' src={image} alt="" />
          </div>

        </div>

        {/* Product Information */}
        <div className='lg:w-[50%] md:w-[40%] sm:w-[36%] max-sm:w-full'>
          <div>
            <h2 className='text-lg font-medium max-md:text-base max-sm:font-medium'>{productData.name}</h2>
          </div>

          <div className='flex gap-0.5 items-center pt-1'>
            <img className='h-3' src={assets.star_icon} alt="" />
            <img className='h-3' src={assets.star_icon} alt="" />
            <img className='h-3' src={assets.star_icon} alt="" />
            <img className='h-3' src={assets.star_icon} alt="" />
            <img className='h-3' src={assets.star_dull_icon} alt="" />

            <p className='text-sm pl-1'>(350)</p>
          </div>

          <div className='flex pt-3'>
            <p className='font-semibold text-lg'>{currency}</p>
            <p className='font-semibold text-lg'>{productData.price}</p>
          </div>

          <div className='pt-2'>
            <p className='text-sm'>{productData.description.split(/\n/)[0]}</p>
          </div>

          <div className='pt-2'>
            <p>Select Size</p>

            <div className='flex gap-2 pt-2'>
              {
                productData.sizes.map((item, index) => (
                  <button onClick={() => setSize(item)} className={`bg-gray-200 px-2.5 py-0.5 text-sm font-medium rounded-sm ${size === item ? 'border border-black' : ''}`} key={index}>{item}</button>
                ))
              }
            </div>
          </div>

          <div className='pt-5'>
            <button className='bg-orange-400 active:bg-orange-600 py-2 px-6 text-sm font-medium shadow-lg rounded-full' onClick={() => addToCart(productData._id, size)}>ADD TO CART</button>
          </div>

        </div>

      </div>

      {/* Description page */}
      <div className='mt-20'>

        <div className='flex'>
          <h3 className='border border-slate-300 py-1 px-4 font-medium'>Description</h3>
        </div>

        <div className='border border-slate-300 py-5 px-4 text-sm'>
          <p>{productData.description.split(/\n/)[0]}</p>

          <p className='mt-3'>{productData.description.split(/\n/)[1]}</p>
        </div>

      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>

  ) :
    <div className='py-4'>
      <h2 className='text-lg'>No Product Data to show.</h2>
    </div>
}

export default Product