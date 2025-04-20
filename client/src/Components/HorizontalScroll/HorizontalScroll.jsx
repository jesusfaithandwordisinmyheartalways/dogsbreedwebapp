



import React, { useState, useEffect } from 'react'
import './HorizontalScroll.css'
import Women_Profile_Image from '../Images/women_profile_image.png'
import Women_Profile_Image_Two from '../Images/women_profile_image_two.png'
import Men_Profile_Image from '../Images/men+profile_image.png'
import Men_Profile_Image_Two from '../Images/men_profile_image_two.png'
import Men_Profile_Image_Three from '../Images/Man profile pic_three.png'





const imagesData = [
    {
      src: Men_Profile_Image_Three,
      name: "Adam Green",
      company: "Dogs For Us"
    },
    {
      src: Women_Profile_Image_Two,
      name: "Amy Green",
      company: "Dogs Breed Greatness"
    },
    {
      src: Men_Profile_Image,
      name: "Chad Salis",
      company: "Good Morning America"
    },
    {
      src: Men_Profile_Image_Two,
      name: "Greg Green",
      company: "Dog Network"
    }
  ];





const HorizontalScroll = () => {

    const [loaded, setLoaded] = useState(false);




  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);
  





  return (
   <>

<div className='HorizontalScroll-Container'>
      <div className='HorizontalScroll-Header-Wrapper'>
        <div><h3> Our Sponsors</h3></div>
      </div>

      <div className='HorizontalScroll-Wrapper'>
        {imagesData.map((item, index) => (
          <div key={index}>
            {!loaded ? (
              <>
                <div className='skeleton skeleton-img'></div>
                <div className='skeleton skeleton-text'></div>
                <div className='skeleton skeleton-text'></div>
              </>
            ) : (
              <>
                <img src={item.src} alt='' />
                <div><p>{item.name}</p></div>
                <div><p>{item.company}</p></div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>





   </>
  )
}

export default HorizontalScroll
