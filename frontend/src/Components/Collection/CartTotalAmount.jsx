import React, { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext';
import Title from '../Home/Title';

const CartTotalAmount = () => {

    const { currency, delivery_fee, getTotalCartAmount } = useContext(ShopContext);


    return (
        <div className='md:min-w-[52%] sm:min-w-[60%] min-w-[70%]'>
            <div className='mt-8 mb-3 flex'>
                <Title text1={"CART"} text2={"TOTALS"} />
            </div>

            <div>
                <div className='flex justify-between pt-1'>
                    <h3>Subtotal</h3>
                    <h3>{currency} {getTotalCartAmount()}.00</h3>
                </div>

                <div className='flex justify-between py-1'>
                    <h3>Shipping Fee</h3>
                    <h3>{currency} {delivery_fee}</h3>
                </div>

                <div className='flex justify-between border-y border-gray-400 py-1'>
                    <h3 className='font-medium'>Total Amount</h3>
                    <h3 className='font-medium'>{currency} {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + delivery_fee}</h3>
                </div>
            </div>
        </div>
    )
}

export default CartTotalAmount