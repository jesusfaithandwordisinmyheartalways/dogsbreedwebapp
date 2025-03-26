


import React from 'react'
import { dog_logo } from '../ArrayData/logo'
import './Hero.css'



const Hero = () => {
  return (
    <>


    <div className='hero-container'>
        <div className='hero-wrapper'>

                <div><h3>Dog Arrivals</h3></div>

            <div><img src={dog_logo.dog_hero_banner_four} alt=""></img></div>


        </div>
    </div>




    </>
  )
}

export default Hero
