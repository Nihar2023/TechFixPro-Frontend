import React from 'react'
import Header from '../../components/Header/Header.jsx'
import SpecialityMenu from '../../components/SpecialityMenu/SpecialityMenu.jsx'
import TopRepairCenters from '../../components/TopRepairCenters/TopRepairCenters.jsx'
import Baner from '../../components/Baner/Baner.jsx'
import Features from '../../components/Features/Features.jsx'
import Reviews from '../../components/Reviews/Reviews.jsx'
function Home() {
  return (
    <div>
      <Header></Header>
      <SpecialityMenu/>
      {/* <TopRepairCenters/> */}
      <Features></Features>
      <Reviews></Reviews>
      <Baner/>
      
    </div>
  )
}

export default Home
