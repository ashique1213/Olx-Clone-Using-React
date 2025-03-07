import React from 'react'
import './SubNav.css'
import Arrow from '../../assets/Arrow'
import bannerImage from '../../assets/Screenshot 2025-01-30 113352.png'

const SubNav = () => {
  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <span>ALL CATEGORIES</span>
            <Arrow /> 
          </div>
          <div className="otherQuickOptions">
            <span>Cars</span>
            <span>Motorcy...</span>
            <span>Mobile Ph...</span>
            <span>For Sale:Houses & Apart...</span>
            <span>Scoot...</span>
            <span>Commercial & Other Ve...</span>
            <span>For Rent: House & Apart...</span>
          </div>
        </div>
        <div className="banner">
          <img
            src={bannerImage}
            alt=""
          />
        </div>
      </div>
      
    </div>
  )
}

export default SubNav
