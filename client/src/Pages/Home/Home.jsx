




import React from 'react'
import Hero from '../../Components/Hero/Hero'
import ListOfBreeds from '../../Components/ListOfBreeds/ListOfBreeds'
import FeaturedDeals from '../../Components/FeaturedDeals/FeaturedDeals'
import HomeDogs from '../../Components/HomeDogs/HomeDogs'
import HorizontalScroll from '../../Components/HorizontalScroll/HorizontalScroll'
import CountUpAnimation from '../../Components/CountUpAnimation/CountUpAnimation'




const Home = () => {
  return (
    <>
    <Hero />
    <HorizontalScroll />
    <CountUpAnimation />
    <ListOfBreeds />
    <FeaturedDeals />
    <HomeDogs />



    </>
  )
}

export default Home
