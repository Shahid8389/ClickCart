import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AddProduct from './Pages/AddProduct';
import ListProduct from './Pages/ListProducts';
import Orders from './Pages/Orders';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import Login from './Components/Login';

import { ToastContainer } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = "$"

function App() {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')


  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])


  return (
    <div>
      <ToastContainer
        pauseOnHover={false}
        theme="dark"
        newestOnTop
        limit={3}
      />
      {
        token !== '' ?
          <div className='pt-5'>
            <Navbar setToken={setToken} />

            <div className='flex w-full'>
              <Sidebar />

              <div className='w-[70%] pt-3 pl-6'>
                <Routes>
                  <Route path='/add' element={<AddProduct token={token} />} />
                  <Route path='/list' element={<ListProduct token={token} />} />
                  <Route path='/orders' element={<Orders token={token} />} />
                </Routes>
              </div>

            </div>
          </div>
          :
          <div>
            <Login setToken={setToken} />
          </div>

      }

    </div>

  )

}

export default App
