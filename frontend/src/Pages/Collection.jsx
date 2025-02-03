import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/frontend_assets/assets';
import ProductItem from '../Components/Home/ProductItem';

const Collection = () => {

  const { products, showSearch, search, currentPage, setCurrentPage } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setcategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState("relavent")

  // For the pagination
  const [resDevice, setResDevice] = useState(0);
 
  let showDataLength = null;

  if (filterProducts.length > 0) {

    // set how many prducts should be displayed on the one page based on the width of the device
    if (resDevice >= 1280) {
      showDataLength = 10;
    }
    else if (resDevice < 1280 && resDevice >= 1024) {
      showDataLength = 8;
    }
    else if (resDevice < 1024 && resDevice >= 768) {
      showDataLength = 6;
    }
    else{
      showDataLength = 4;
    }

  }

  // Fuction for the pagination
  const handleResize = () => {
    window.addEventListener('resize', () => {
      setResDevice(window.innerWidth);
    })
  }

  // Function to set the product based on the category
  const toggleCategory = (e) => {

    if (category.includes(e.target.value)) {
      setcategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setcategory(prev => [...prev, e.target.value])
    }
  }

  // Function to set the product based on the sub-category
  const toggleSubCategory = (e) => {

    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  // Function to apply the filter and show the filtered products
  const applyFilter = () => {

    let productsCopy = products.slice();

    if (search && showSearch) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy)

  }

  // Function to sort the product by - price, relavent
  const sortProduct = () => {

    let filterProductCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(filterProductCopy.sort((a, b) => a.price - b.price))
        break;

      case 'high-low':
        setFilterProducts(filterProductCopy.sort((a, b) => b.price - a.price))
        break;

      default:
        applyFilter();
        break;
    }

  }


  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products])

  useEffect(() => {
    sortProduct();
  }, [sortType])

  // For the pagination
  useEffect(() => {
    setResDevice(window.innerWidth);
    handleResize();
  }, [])


  return (
    <div className='pt-7 pb-24 flex max-md:flex-col md:gap-8 gap-6'>

      <div className='inline-flex flex-col gap-3'>

        <div className='pb-2 flex items-center gap-2'>
          <p onClick={() => setShowFilter(!showFilter)} className='text-xl max-md:cursor-pointer'>FILTERS</p>

          <img onClick={() => setShowFilter(!showFilter)} className={`h-4 cursor-pointer md:hidden ${showFilter ? 'rotate-90' : ''} `} src={assets.dropdown_icon} alt="" />
        </div>

        {/* Creating Category Filters */}
        <div className={`border border-gray-300 inline-block py-2 pl-4 pr-28 w-fit ${showFilter ? '' : 'max-md:hidden'} `}>
          <p className='pb-2 font-medium'>CATEGORIES</p>

          <div className='flex gap-2'>
            <input className='cursor-pointer w-4' type="checkbox" value={"Men"} onChange={toggleCategory} />
            <p>Men</p>
          </div>

          <div className='flex gap-2'>
            <input className='cursor-pointer w-4' type="checkbox" value={"Women"} onChange={toggleCategory} />
            <p>Women</p>
          </div>

          <div className='flex gap-2'>
            <input className='cursor-pointer w-4' type="checkbox" value={"Kids"} onChange={toggleCategory} />
            <p>Kids</p>
          </div>

        </div>

        {/* Creating Sub-Category Filters */}
        <div className={`border border-gray-300 inline-block py-2 pl-4 pr-24 w-fit ${showFilter ? '' : 'max-md:hidden'} `}>
          <p className='pb-2 font-medium'>TYPE</p>

          <div className='flex gap-2'>
            <input className='cursor-pointer w-4' type="checkbox" value={"Topwear"} onChange={toggleSubCategory} />
            <p>Topwear</p>
          </div>

          <div className='flex gap-2'>
            <input className='cursor-pointer w-4' type="checkbox" value={"Bottomwear"} onChange={toggleSubCategory} />
            <p>Bottomwear</p>
          </div>

          <div className='flex gap-2'>
            <input className='cursor-pointer w-4' type="checkbox" value={"Winterwear"} onChange={toggleSubCategory} />
            <p>Winterwear</p>
          </div>

        </div>

      </div>

      <div className='w-full'>
        <div className='flex justify-between'>

          <div className='inline-flex md:text-xl xl:text-2xl text-base items-center w-fit'>
            <h2 className='font-light' id='all-collection'>ALL</h2>
            <h2 className='font-semibold pl-2'>COLLECTION</h2>
            <p className='lg:w-10 w-8 max-sm:w-4 h-[0.15rem] bg-gray-800 ml-1'></p>
          </div>

          <select onChange={(e) => setSortType(e.target.value)} className='border border-slate-500 text-sm max-sm:text-xs px-1 rounded-sm text-black'>
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>

        </div>

        {/* Displaying the All Collections */}
        <div className='pt-7 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-4'>
          {
            filterProducts.slice((currentPage - 1) * showDataLength, currentPage * showDataLength).map((item, index) => (
              <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
            ))
          }
        </div>

        {/* Pagination */}
        {
          filterProducts.length > 0 && (
            <div className='flex gap-2.5 items-center justify-center mt-10'>

              <a href="#all-collection">
                <img onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} className='h-4 w-3 cursor-pointer rotate-180 invert brightness-200' src={assets.dropdown_icon} alt="left arrow icon" />
              </a>

              {
                Array.from({ length: Math.ceil(filterProducts.length / showDataLength) }).map((_, index) => (
                  <a key={index} href="#all-collection">
                    <button onClick={() => setCurrentPage(index + 1)} className={`w-7 h-7 border border-gray-400 rounded-sm text-sm ${currentPage === index + 1 ? "bg-orange-500/75 text-slate-900 shadow-md" : "text-gray-800"}`}>{index + 1}</button>
                  </a>
                ))
              }

              <a href="#all-collection">
                <img onClick={() => setCurrentPage(Math.min(currentPage + 1, Math.ceil(filterProducts.length / showDataLength)))} className='h-4 w-3 cursor-pointer invert brightness-200' src={assets.dropdown_icon} alt="left arrow icon" />
              </a>

            </div>
          )
        }

      </div>

    </div>
  )
}

export default Collection