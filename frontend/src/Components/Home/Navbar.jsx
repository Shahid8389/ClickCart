import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { assets } from '../../assets/frontend_assets/assets'
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {

    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)
    const [visible, setVisible] = useState(false)

    const logout = () => {
        navigate("/login")
        localStorage.removeItem("token")
        setToken('')
        setCartItems({})
    }

    return (
        <div className='flex flex-row items-center justify-between py-3 w-[100%]'>
            <div className=''>
                <h1 onClick={() => navigate("/")} className='text-3xl max-sm:text-2xl font-bold text-orange-600 cursor-pointer shadow-sm'>ClickCart</h1>
            </div>

            <div className=''>
                <ul className='md:flex hidden flex-row gap-4'>
                    <NavLink to="/" className="flex flex-col items-center">
                        <p>HOME</p>
                        <span className='border-b-2 border-slate-900 w-2/4 hidden'></span>
                    </NavLink>

                    <NavLink to="/collection" className="flex flex-col items-center">
                        <p>COLLECTION</p>
                        <span className='border-b-2 border-slate-900 w-2/4 hidden'></span>
                    </NavLink>

                    <NavLink to="/about" className="flex flex-col items-center">
                        <p>ABOUT</p>
                        <span className='border-b-2 border-slate-900 w-2/4 hidden'></span>
                    </NavLink>

                    <NavLink to="/contact" className="flex flex-col items-center">
                        <p>CONTACT</p>
                        <span className='border-b-2 border-slate-900 w-2/4 hidden'></span>
                    </NavLink>
                </ul>
            </div>


            <div className='flex gap-3 max-sm:gap-2 xl:mr-[-17%] lg:mr-[-10%]'>
                <img onClick={() => setShowSearch(true)} className='w-5 max-sm:w-4 max-sm:h-5 cursor-pointer' src={assets.search_icon} alt="" />

                <div className='group relative'>
                    <img className='w-5 max-sm:w-4 max-sm:h-5 cursor-pointer' src={assets.profile_icon} alt="" />

                    {/* Drop down menu for the profile icon */}
                    {
                        token &&
                        <div className='absolute py-1 group-hover:block hidden right-0'>
                            <div className='flex flex-col gap-[0.1rem] w-28 bg-gray-100 text-gray-900 px-3 py-2 rounded-lg'>
                                <p onClick={() => navigate("/orders")} className='cursor-pointer hover:text-black hover:font-medium'>Orders</p>
                            </div>
                        </div>
                    }

                </div>

                <Link to="/cart" className='relative'>
                    <img className='w-5 max-sm:w-4 max-sm:h-5 cursor-pointer' src={assets.cart_icon} alt="" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 bg-black rounded-full text-white text-center aspect-square text-[0.7rem]'>{getCartCount()}</p>
                </Link>

            </div>

            <div className='flex gap-5 max-sm:gap-2 items-center'>
                <button onClick={logout} className='bg-[#fb8950eb] rounded-full px-3 lg:text-xl sm:text-lg text-base text-gray-900 font-semibold py-0.5 shadow-lg'>{token ? "Logout" : "Login"}</button>

                <div className='md:hidden'>
                    <img onClick={() => setVisible(true)} className='w-6 cursor-pointer' src={assets.menu_icon} alt="" />
                </div>

            </div>


            {/* sidebar for the i-pad and the smaller screens */}
            <div className={`absolute top-0 right-0 bottom-0 bg-gray-100 overflow-hidden transition-all ${visible ? 'w-[60%]' : 'w-0'}`}>

                <div className='flex flex-col gap-2 text-gray-800'>
                    <div onClick={() => setVisible(false)} className='flex gap-2 items-center pl-2 py-2 cursor-pointer border-b-2 border-black'>
                        <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
                        <p>Back</p>
                    </div>

                    <NavLink to="/" onClick={() => setVisible(false)} className="border-b-2 border-black pl-3 pb-2">HOME</NavLink>

                    <NavLink to="/collection" onClick={() => setVisible(false)} className="border-b-2 border-black pl-3 pb-2">COLLECTION</NavLink>

                    <NavLink to="/about" onClick={() => setVisible(false)} className="border-b-2 border-black pl-3 pb-2">ABOUT</NavLink>

                    <NavLink to="/contact" onClick={() => setVisible(false)} className="border-b-2 border-black pl-3 pb-2">CONTACT</NavLink>
                </div>

            </div>

        </div>
    )
}

export default Navbar