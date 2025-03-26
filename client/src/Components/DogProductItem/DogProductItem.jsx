



import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './DogProductItem.css'




const DogProductItem = ({ id, name, description, image, hoverImage, new_price, old_price }) => {
    const [imageIsHovered, setImageIsHovered] = useState(false)


    const displayImage = Array.isArray(image) && image.length > 0 ? image[0] : image;




    return (
        <>
            <div className='dog-product-container'>
                <div className='dog-product-wrapper'>


                  
                 <div className='dog-product-wrapper-two'>
                 <Link to={`/product/${id}`} onClick={() => window.scrollTo(0,0)}>
                   <div><img alt={name} onMouseOver={() => setImageIsHovered(true)}
                     onMouseOut={() => setImageIsHovered(false)}  src={imageIsHovered && hoverImage ? hoverImage : displayImage}  >
                       </img></div>
                       </Link>


                       <div className='price-wrapper'>
                          <div><p className='name'>{name}</p></div>
                         <p><span>$ {old_price.toFixed(2)}</span> ${new_price.toFixed(2)}</p>
                       </div>


                 </div>





                </div>
            </div>

        </>
    )
}


export default DogProductItem