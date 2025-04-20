



import React from 'react'
import { dog_logo } from '../ArrayData/logo'
import './Hero.css'
import Dog_Breed_Hero from '../Images/dogbreedheroimage.png'

const Hero = () => {
  return (
    <div className='hero-container'>
      <div className='hero-wrapper'>
        <div><h3>Dog Arrivals</h3></div>
        <div><img src={Dog_Breed_Hero} alt="Dog Hero" /></div>
      </div>
    </div>
  )
}

export default Hero