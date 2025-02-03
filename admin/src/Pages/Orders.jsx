import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';


const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(backendUrl + "/api/order/list", {}, { headers: { token } })

      if (response.data.success) {
        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(backendUrl + "/api/order/status", {orderId, status: e.target.value}, {headers: { token }})
      
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Status updated")
      }
    } catch (error) {
      console.log(error);
      toast.error(error.data.message)
    }
  }


  useEffect(() => {
    fetchAllOrders();
  }, [token])


  return (
    <div>
      <div className='mb-3'>
        <h2>All Orders List</h2>
      </div>

      <div>
        {
          orders.map((order, index) => (
            <div className='grid grid-cols-1 sm:grid-cols-[0.6fr_2fr_1.3fr] lg:grid-cols-[0.5fr_2fr_1.3fr_0.4fr_1fr] gap-x-3 gap-y-7 sm:text-sm xl:text-base py-4 my-3 border border-gray-300 px-2 text-gray-800' key={index}>
              <div className='flex items-center justify-center'>
                <img className='w-14' src={assets.parcel_icon} alt="" />
              </div>

              <div>
                <div className='pb-2.5'>
                  {
                    order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return (
                          <p className='font-medium' key={index}>{item.name} x {item.quantity} <span className='font-medium'>{item.size}</span> </p>
                        )
                      } else {
                        return (
                          <p className='font-medium' key={index}>{item.name} x {item.quantity} <span className='font-medium'>{item.size}</span> </p>
                        )
                      }
                    })
                  }
                </div>

                <div>
                  <div className='pb-2.5'>
                    <p className='font-semibold'>{order.address.firstName + " " + order.address.lastName}</p>
                  </div>

                  <div>
                    <p>{order.address.address}</p>
                    <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.Zipcode}</p>
                  </div>

                  <div>
                    <p>{order.address.phone}</p>
                  </div>
                </div>

              </div>
              
              <div>
                <p className='pb-2.5 font-medium'>Items: {order.items.length}</p>
                <p>Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment ? "Done" : "Pending"}</p>
                <p>Date: {new Date(order.date).toLocaleString() }</p>
              </div>

              <div className='sm:place-self-center lg:place-self-start'>
                <p className='font-medium'>{currency}{order.amount}</p>
              </div>

              <select onChange={(e) => statusHandler(e, order._id)} className='border border-gray-400 sm:place-self-center lg:place-self-start h-fit py-1 px-1 rounded-md font-medium w-fit lg:w-full ' value={order.status}>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Orders