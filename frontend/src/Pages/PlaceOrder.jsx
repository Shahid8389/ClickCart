import React, { useContext, useState } from 'react'
import Title from '../Components/Home/Title'
import { ShopContext } from '../Context/ShopContext'
import CartTotalAmount from '../Components/Collection/CartTotalAmount';
import { assets } from '../assets/frontend_assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {

    const { country, navigate, backendUrl, products, token, delivery_fee, getTotalCartAmount, cartItems, setCartItems, } = useContext(ShopContext);
    const placeholder = country === 'india' ? 'Pincode' : 'Zipcode';
    const [method, setMethod] = useState('cod');

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        state: "",
        [placeholder]: "",
        country: "",
        phone: ""
    })

    const onChangeHandeler = (e) => {
        const name = e.target.name
        const value = e.target.value

        setFormData(data => ({ ...data, [name]: value }))
    }

    // Funcion to get the data for the Razorpay payment
    const initPay = (order) => {
        const options = {
            key: import.meta.env.RAZORPAY_API_KEY,

            amount: order.amount,
            currency: order.currency,
            name: "Order Payment",
            description: "Order Payment",
            order_id: order.id,
            receipt: order.receipt,

            handler: async (response) => {

                try {
                    const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, { headers: { token } })

                    if (data.success) {
                        setCartItems({})
                        navigate("/orders")
                    }

                } catch (error) {
                    console.log(error);
                    toast.error(error.message)

                }

            }
        }

        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const onSubmitHandeler = async (e) => {
        e.preventDefault();

        // Check if any required field is empty
        const requiredFields = [
            "firstName",
            "lastName",
            "email",
            "address",
            "city",
            "state",
            placeholder,
            "country",
            "phone"
        ];

        const isValid = requiredFields.every((field) => formData[field]);

        if (!isValid) {
            toast.error("Please fill in all required fields.");
            return; // Do not submit the form
        }

        try {
            let orderItems = [];

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {

                        const itemInfo = structuredClone(products.find(product => product._id === items))

                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item]

                            orderItems.push(itemInfo);
                        }
                    }

                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getTotalCartAmount() + delivery_fee
            }

            switch (method) {
                case 'cod':
                    const response = await axios.post(backendUrl + "/api/order/place", orderData, { headers: { token } })

                    if (response.data.success) {
                        setCartItems({})
                        navigate("/orders")
                    }
                    else {
                        toast.error(response.data.message)
                    }

                    break;

                case 'stripe':
                    const responseStripe = await axios.post(backendUrl + "/api/order/stripe", orderData, { headers: { token } })

                    if (responseStripe.data.success) {
                        const { session_url } = responseStripe.data
                        window.location.replace(session_url)
                    }
                    else {
                        console.log(responseStripe.data.message);
                        toast.error(responseStripe.data.message)
                    }

                    break;

                case 'razorpay':
                    const responseRazorpay = await axios.post(backendUrl + "/api/order/razorpay", orderData, { headers: { token } })

                    if (responseRazorpay.data.success) {

                        initPay(responseRazorpay.data.order)

                    }

                    break;

                default:
                    break;
            }


        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }


    return (
        <form className='flex justify-between gap-3 max-md:flex-col mb-28'>
            {/* Left side - delivery information */}
            <div className='lg:min-w-[50%] md:max-w-[44%] max-md:min-w-[90%] max-sm:w-full'>
                <div className='mt-8 mb-3 flex'>
                    <Title text1={"DELIVERY"} text2={"INFORMATION"} />
                </div>

                <div className='mt-6 flex flex-col gap-3'>
                    <div className='flex gap-3'>
                        <input onChange={onChangeHandeler} name='firstName' value={formData.firstName} className='border border-gray-500 rounded-md outline-none py-0.5 px-2 w-full' type="text" placeholder='First name' required />

                        <input onChange={onChangeHandeler} name='lastName' value={formData.lastName} className='border border-gray-500 rounded-md outline-none py-0.5 px-2 w-full' type="text" placeholder='Last name' required />
                    </div>

                    <div>
                        <input onChange={onChangeHandeler} name='email' value={formData.email} className='border border-gray-500 rounded-md outline-none py-0.5 px-2 w-full' type="email" placeholder='Email Address' required />
                    </div>

                    <div>
                        <input onChange={onChangeHandeler} name='address' value={formData.address} className='border border-gray-500 rounded-md outline-none py-0.5 px-2 w-full' type="text" placeholder='Address' required />
                    </div>

                    <div className='flex gap-3'>
                        <input onChange={onChangeHandeler} name='city' value={formData.city} className='border border-gray-500 rounded-md outline-none py-0.5 px-2 w-full' type="text" placeholder='City' required />

                        <input onChange={onChangeHandeler} name='state' value={formData.state} className='border border-gray-500 rounded-md outline-none py-0.5 px-2 w-full' type="text" placeholder='State' required />
                    </div>

                    <div className='flex gap-3'>
                        <input onChange={onChangeHandeler} name={placeholder} value={formData.placeholder} className='border border-gray-500 rounded-md outline-none py-0.5 px-2 w-full' type="text" placeholder={placeholder} required />

                        <input onChange={onChangeHandeler} name='country' value={formData.country} className='border border-gray-500 rounded-md outline-none py-0.5 px-2 w-full' type="text" placeholder='country' required />
                    </div>

                    <div>
                        <input onChange={onChangeHandeler} name='phone' value={formData.phone} className='border border-gray-500 rounded-md outline-none py-0.5 px-2 w-full' type="number" placeholder='Phone no.' required />
                    </div>

                </div>
            </div>


            {/* Right side - Cart Total Information */}
            <div className='sm:min-w-[90%] md:min-w-[38%] lg:min-w-[30%] max-sm:pt-3 md:mt-12 sm:mt-3'>
                <div>
                    <CartTotalAmount />
                </div>

                <div className='pt-7'>
                    <div className='text-sm flex items-center gap-2'>
                        <h3>PAYMENT METHOD</h3>
                        <p className='lg:w-11 w-9 h-[0.13rem] bg-gray-600'></p>
                    </div>

                    <div className='flex items-center gap-2 pt-1'>
                        <div onClick={() => setMethod('stripe')} className='border border-gray-400 py-1 pr-3 pl-1 rounded-sm cursor-pointer flex items-center'>
                            <p className={`border rounded-full min-w-2 h-2 ${method === 'stripe' ? 'bg-orange-600' : ''} `}></p>
                            <img className='w-13 h-5 pl-2' src={assets.stripe_logo} alt="" />
                        </div>
                        <div onClick={() => setMethod('razorpay')} className='border border-gray-400 py-1 pr-3 pl-1 rounded-sm cursor-pointer flex items-center'>
                            <p className={`border rounded-full min-w-2 h-2 ${method === 'razorpay' ? 'bg-orange-600' : ''} `}></p>
                            <img className='w-16 h-5 pl-2' src={assets.razorpay_logo} alt="" />
                        </div>
                        <div onClick={() => setMethod('cod')} className='border border-gray-400 py-1.5 pr-3 pl-1 rounded-sm cursor-pointer flex items-center'>
                            <p className={`border rounded-full min-w-2 h-2 ${method === 'cod' ? 'bg-orange-600' : ''} `}></p>
                            <p className='text-xs pl-2'>CASH ON DELIVERY</p>
                        </div>
                    </div>

                    <div className='pt-9 flex justify-end pr-1'>
                        <button onClick={onSubmitHandeler} type='submit' className='bg-orange-400 active:bg-orange-600 py-1.5 px-7 text-sm font-medium shadow-lg rounded-md'>PLACE ORDER</button>
                    </div>

                </div>

            </div>

        </form>
    )
}

export default PlaceOrder