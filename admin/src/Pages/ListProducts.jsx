import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const ListProducts = ({ token }) => {

  const [list, setList] = useState([])

  const fetchProducts = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");

      if (response.data.success) {
        setList(response.data.products)
      }
      else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const removeProducts = async (id) => {
    try {
      
      const response = await axios.post(backendUrl + "/api/product/remove", {id}, {headers: {token}})

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchProducts();
      }
      else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }

  }


  useEffect(() => {
    fetchProducts();
  }, [])
  

  return (
    <div className='mr-1'>
      <div className='mb-3'>
        <h2>All Products List</h2>
      </div>

      <div className='grid grid-cols-[1fr_2fr_1fr_1fr_1fr] max-md:grid-cols-[1fr_2fr_1fr_1fr] gap-1 py-1 bg-gray-200 px-1'>
        <p className='font-medium'>Image</p>
        <p className='font-medium'>Name</p>
        <p className='font-medium max-md:hidden'>Category</p>
        <p className='font-medium'>Price</p>
        <p className='text-center font-medium'>Action</p>
      </div>

      {/* Displaying all the Products list */}
      {
        list.map((item, index)=> (
          <div key={index} className='grid grid-cols-[1fr_2fr_1fr_1fr_1fr] max-md:grid-cols-[1fr_2fr_1fr_1fr] gap-1 items-center text-sm py-1 bg-gray-50 px-1'>
            <img className='w-12' src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p className='max-md:hidden'>{item.category}</p>
            <p >{currency}{item.price}</p>
            <p onClick={()=> removeProducts(item._id)} className='text-center cursor-pointer text-lg'>X</p>
          </div>
        ))
      }

    </div>
  )
}

export default ListProducts