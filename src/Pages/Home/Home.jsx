import React from 'react'
import Header from '../../components/Header/Header'
import SpecialityMenu from '../../components/SpecialityMenu/SpecialityMenu'
import TopRepairCenters from '../../components/TopRepairCenters/TopRepairCenters'
import Baner from '../../components/Baner/Baner'
import Features from '../../components/Features/Features'
import Reviews from '../../components/Reviews/Reviews'
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
