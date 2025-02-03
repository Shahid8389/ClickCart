import React from 'react'
import Hero from '../Components/Home/Hero'
import LatestCollection from '../Components/Home/LatestCollection'
import BestSeller from '../Components/Home/BestSeller'
import OurPolicy from '../Components/Home/OurPolicy'


const Home = () => {
  return (
    <div className='py-5'>
        <Hero />
        <LatestCollection />
        <BestSeller />
        <OurPolicy />
    </div>
  )
}

export default Home