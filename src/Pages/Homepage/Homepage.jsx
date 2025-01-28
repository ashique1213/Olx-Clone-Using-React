import React from 'react'
import './Homepage.css'
import Navbar from '../../Components/Navbar/Navbar'
import SubNav from '../../Components/SubNav/SubNav'
import RecommendedProducts from '../../Components/RecommendedProducts/RecommendedProducts'
import Footer from '../../Components/Footer/Footer'

const Homepage = () => {
  return (
    <div className='home'>
      <Navbar />
      <SubNav />
      <RecommendedProducts />
      <Footer />
    </div>
  )
}

export default Homepage
