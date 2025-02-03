import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext';
import Title from '../Components/Home/Title';
import { toast } from 'react-toastify';
import axios from 'axios';

const Orders = () => {

  const { backendUrl, token, currency } = useContext(ShopContext);

  const [ordersData, setOrdersData] = useState([])

  // Fetch the user orders
  const fetchUserOrdersData = async () => {
    try {
      if (!token) {
        return null;
      }
  
      const response = await axios.post(backendUrl + "/api/order/userorders", {}, { headers: { token } })

      if (response.data.success) {
        let allOrderItems = []

        response.data.orders.map(order => {
          order.items.map(item => {
            item['status'] = order.status,
            item['payment'] = order.payment,
            item['paymentMethod'] = order.paymentMethod,
            item['date'] = order.date,

            allOrderItems.push(item);
 
          })
        })
        setOrdersData(allOrderItems.reverse())
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }


  useEffect(() => {
    fetchUserOrdersData();
  }, [token])


  return (
    <div className='min-h-[41dvh] mb-20'>
      <div className='flex mt-8'>
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div className='mt-4'>
        {
          ordersData.map((item, index) => (
            <div key={index} className='border-t last:border-b border-gray-300 py-1.5 pl-0.5 flex gap-3 items-center'>
              <div>
                <img className='w-14' src={item.image[0]} alt="" />
              </div>

              <div className='grid md:grid-cols-[2fr_1fr_1fr] sm:grid-cols-[1.7fr_0.95fr_0.8fr] grid-cols-[1.1fr_1fr] gap-2 gap-y-3 items-center w-full max-sm:pb-1'>

                <div className='max-sm:col-span-2'>
                  <div>
                    <h2>{item.name}</h2>
                  </div>

                  <div className='flex gap-6 text-sm'>
                    <div>
                      <h3>{currency}{item.price}</h3>
                    </div>

                    <div>
                      <h3>Quantity: {item.quantity}</h3>
                    </div>

                    <div>
                      <h3>Size: {item.size}</h3>
                    </div>
                  </div>

                  <div className='flex gap-1 text-sm'>
                    <h3 className='font-medium'>Date: </h3>
                    <h3 className='text-gray-700'>{new Date(item.date).toDateString()}</h3>
                  </div>

                  <div className='text-sm'>
                  <h3 className='font-medium'>Payment: <span className='text-gray-700'>{item.paymentMethod}</span></h3>
                  </div>

                </div>

                <div>
                  <div className='flex items-center gap-1'>
                    <p className='border rounded-full min-w-2 h-2 bg-green-500'></p>
                    <h3>{item.status}</h3>
                  </div>
                </div>

                <div>
                  <button onClick={fetchUserOrdersData} className='border border-slate-400 py-0.5 px-2 rounded-md active:bg-gray-200'>Track Order</button>
                </div>

              </div>

            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Orders