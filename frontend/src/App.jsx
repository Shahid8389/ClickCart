import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Collection from './Pages/Collection'
import About from './Pages/About'
import Login from './Pages/Login'
import Orders from './Pages/Orders'
import Contact from './Pages/Contact'
import Cart from './Pages/Cart'
import Navbar from './Components/Home/Navbar'
import Footer from "./Components/Home/Footer"
import SearchBar from "./Components/SearchBar"
import Product from "./Pages/Product"
import PlaceOrder from "./Pages/PlaceOrder"
import Verify from "./Pages/Verify"

import React from 'react';
import { ToastContainer } from 'react-toastify';


function App() {

  return (
    <div className="lg:px-14 sm:px-9 px-2">
      <ToastContainer
        newestOnTop
        limit={3}
        autoClose={4000}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        theme="dark"
      />

      <Navbar />
      <SearchBar />

      {/* define the routes for the different pages */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>

      <Footer />

    </div>
  )
}

export default App
