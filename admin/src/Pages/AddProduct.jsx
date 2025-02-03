import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const AddProduct = ({ token }) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Men')
  const [subCategory, setSubCategory] = useState('Topwear')
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image1 && formData.append("image2", image2);
      image1 && formData.append("image3", image3);
      image1 && formData.append("image4", image4);

      const response = await axios.post(backendUrl + "/api/product/add", formData, {headers: {token}});

      if (response.data.success) {
        toast.success("Product Added")
        
        setName('')
        setDescription('')
        setPrice('')
        setBestseller(false)
        setSizes([])

        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
      }
      else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }

  }


  return (
    <form onSubmit={onSubmitHandler} >
      <div className=''>
        <h2>Upload Image</h2>

        <div className='w-full flex gap-3 mt-2'>
          <label htmlFor="image1" className='block w-[18%] xl:w-[16%]'>
            <input onChange={(e)=> setImage1(e.target.files[0])} type="file" id='image1' accept='image/*' hidden />
            <img className='w-full aspect-square cursor-pointer' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
          </label>

          <label htmlFor="image2" className='block w-[18%] xl:w-[16%]'>
            <input onChange={(e)=> setImage2(e.target.files[0])} type="file" id='image2' accept='image/*' hidden />
            <img className='w-full aspect-square cursor-pointer' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
          </label>

          <label htmlFor="image3" className='block w-[18%] xl:w-[16%]'>
            <input onChange={(e)=> setImage3(e.target.files[0])} type="file" id='image3' accept='image/*' hidden />
            <img className='w-full aspect-square cursor-pointer' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
          </label>

          <label htmlFor="image4" className='block w-[18%] xl:w-[16%]'>
            <input onChange={(e)=> setImage4(e.target.files[0])} type="file" id='image4' accept='image/*' hidden />
            <img className='w-full aspect-square cursor-pointer' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
          </label>

        </div>

      </div>

      <div className='mt-4'>
        <h2>Product name</h2>
        <input onChange={(e)=> setName(e.target.value)} value={name} className='w-[80%] border border-slate-600 rounded-md outline-none py-1 px-2 mt-1' type="text" placeholder='Enter product name' required />
      </div>

      <div className='mt-4'>
        <h2>Product description</h2>
        <textarea onChange={(e)=> setDescription(e.target.value)} value={description} className='w-[80%] border border-slate-600 rounded-md outline-none py-1 px-2 mt-1' type="text" rows="3" placeholder='Enter product description' required />
      </div>

      <div className='mt-3 w-full flex md:flex-row flex-col gap-10'>
        <div className='w-[35%]'>
          <h2>Product Category</h2>
          <select onChange={(e)=> setCategory(e.target.value)} className='w-full border border-slate-700 rounded-sm py-1 px-2 mt-1' name="" id="">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className='w-[35%]'>
          <h2>Sub-Category</h2>
          <select onChange={(e)=> setSubCategory(e.target.value)} className='w-full border border-slate-700 rounded-sm py-1 px-2 mt-1' name="" id="">
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

      </div>

      <div className='mt-5'>
        <h2>Product Price</h2>
        <input onChange={(e)=> setPrice(e.target.value)} value={price} className='w-[40%] border border-slate-600 rounded-md outline-none py-1 px-2 mt-1' type="number" placeholder='Enter product price' required />
      </div>

      <div className='mt-4'>
        <h2>Product Sizes</h2>

        <div className='flex gap-3 pt-1'>
          <div onClick={()=> setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"] )} >
            <p className={`${sizes.includes("S") ? 'bg-orange-200' : 'bg-gray-200'} px-3 py-0.5 rounded-sm cursor-pointer`}>S</p>
          </div>

          <div onClick={()=> setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"] )} >
            <p className={`${sizes.includes("M") ? 'bg-orange-200' : 'bg-gray-200'} px-3 py-0.5 rounded-sm cursor-pointer`}>M</p>
          </div>

          <div onClick={()=> setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"] )} >
            <p className={`${sizes.includes("L") ? 'bg-orange-200' : 'bg-gray-200'} px-3 py-0.5 rounded-sm cursor-pointer`}>L</p>
          </div>

          <div onClick={()=> setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"] )} >
            <p className={`${sizes.includes("XL") ? 'bg-orange-200' : 'bg-gray-200'} px-2.5 py-0.5 rounded-sm cursor-pointer`}>XL</p>
          </div>

          <div onClick={()=> setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"] )} >
            <p className={`${sizes.includes("XXL") ? 'bg-orange-200' : 'bg-gray-200'} px-2.5 py-0.5 rounded-sm cursor-pointer`}>XXL</p>
          </div>

        </div>
      </div>

      <div className='flex gap-1 mt-3'>
        <input onChange={()=> setBestseller(prev => !prev)} checked={bestseller} className='cursor-pointer' type="checkbox" name="" id="bestseller" />
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
      </div>

      <div className='mt-6 mb-8'>
        <button className='bg-orange-400 active:bg-orange-600 py-2 px-6 text-sm font-medium shadow-lg rounded-md'>ADD PRODUCT</button>
      </div>

    </form>
  )
}

export default AddProduct