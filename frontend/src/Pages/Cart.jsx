import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext';
import Title from '../Components/Home/Title';
import { assets } from '../assets/frontend_assets/assets';
import CartTotalAmount from '../Components/Collection/CartTotalAmount';
import { toast } from 'react-toastify';


const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate, getCartCount } = useContext(ShopContext);
  const [cartData, setCartData] = useState([])

  // If the cart is empty then show the message to the user(can't proceed).
  const handleCheckout = () => {
    const getCartLength = getCartCount()

    if (getCartLength < 1) {
      toast.error("Your cart is empty. Please add products to proceed.")
    }
    else{
      navigate("/place-order")
    }

  }

  // Get the cart data.
  useEffect(() => {

    if (products.length > 0) {

      let data = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          try {
            if (cartItems[items][item] > 0) {
              data.push({
                _id: items,
                size: item,
                quantity: cartItems[items][item]
              })
            }
          } catch (error) {
            console.log("Error Occured, while adding product to the cart page");
          }
        }
      }

      setCartData(data);
    }

  }, [cartItems, products])


  return (
    <div>

      <div className='mt-8 mb-3 flex'>
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {
          cartData.map((item, index) => {
            const cartData = products.find((product) => product._id === item._id)

            return (
              <div className='grid md:grid-cols-[3fr_1.5fr] grid-cols-[3fr_1fr] border-t last:border-b border-gray-300' key={index}>

                <div className='flex items-center py-2'>
                  <img className='md:w-14 sm:w-12 h-14' src={cartData.image[0]} alt="" />

                  <div className='pl-3'>
                    <h3 className='font-medium'>{cartData.name}</h3>

                    <div className='flex text-sm pt-1'>
                      <p>{currency}</p>
                      <p>{cartData.price}</p>

                      <div className='pl-8'>
                        <p className='bg-gray-200 px-1 rounded-sm'>{item.size}</p>
                      </div>

                    </div>

                  </div>

                </div>

                <div className='flex items-center justify-between px-1'>
                  {/* Update the quantity - increase or decrease it */}
                  <input className='border border-slate-700 rounded-sm w-12 pl-1 text-sm' type="number" defaultValue={item.quantity} min={1} max={99} onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} />

                  {/* Update the quantity - delete the cart data */}
                  <img className='w-5 cursor-pointer md:mr-7 mr-2' src={assets.bin_icon} onClick={() => updateQuantity(item._id, item.size, 0)} alt="" />
                </div>

              </div>
            )
          })
        }

      </div>

      <div className='w-full mt-10 mb-28'>
        <div className='flex justify-end items-start'>
          <CartTotalAmount />
        </div>

        <div className='text-end py-8'>
          <button className='bg-orange-400 active:bg-orange-600 py-2 px-6 text-sm font-medium shadow-lg rounded-md' onClick={() => handleCheckout()} >PROCEED TO CHECKOUT</button>
        </div>

      </div>

    </div>
  )

}

export default Cart