



import React, { useEffect, useRef, useState } from 'react'
import './HorizontalScroll.css'
import Hover_Image from '../Images/Sponsor companies.png'
import Hover_Image_Two from '../Images/Sponsor companies_logo_two.png'
import Hover_Image_Three from '../Images/Sponsor companies_logo_three.png'
import Hover_Image_Four from '../Images/Sponsor companies_logo_four.png'
import Hover_Image_Five from '../Images/Sponsor companies_logo_five.png'
import Hover_Image_Six from '../Images/Sponsor companies_logo_six.png'

const HorizontalScroll = () => {
  const [animateHeader, setAnimateHeader] = useState(false)
  const headerRef = useRef(null)



  useEffect(() => {
    const hasAnimated = localStorage.getItem('headerAnimated')
  
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setAnimateHeader(true)
          localStorage.setItem('headerAnimated', 'true')
        }
      },
      { threshold: 0.5 }
    )
  
    if (headerRef.current) {
      observer.observe(headerRef.current)
    }
  
    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current)
      }
    }
  }, [])






  window.addEventListener('beforeunload', () => {
    localStorage.removeItem('headerAnimated')
  })









  return (
    <>
      <div className='HorizontalScroll-Container'>
        <div
          ref={headerRef}
          className={`HorizontalScroll-Header-Wrapper ${animateHeader ? 'animate-header' : ''}`}
        >
          <div><h3> Our Sponsors</h3></div>
        </div>

        <div className='HorizontalScroll-Wrapper'>
          <div><img src={Hover_Image} alt='' /></div>
          <div><img src={Hover_Image_Two} alt='' /></div>
          <div><img src={Hover_Image_Three} alt='' /></div>
          <div><img src={Hover_Image_Four} alt='' /></div>
          <div><img src={Hover_Image_Five} alt='' /></div>
          <div><img src={Hover_Image_Six} alt='' /></div>

          {/* Duplicate images for seamless loop */}
          <div><img src={Hover_Image} alt='' /></div>
          <div><img src={Hover_Image_Two} alt='' /></div>
          <div><img src={Hover_Image_Three} alt='' /></div>
          <div><img src={Hover_Image_Four} alt='' /></div>
          <div><img src={Hover_Image_Five} alt='' /></div>
          <div><img src={Hover_Image_Six} alt='' /></div>
        </div>
      </div>
    </>
  )
}

export default HorizontalScroll