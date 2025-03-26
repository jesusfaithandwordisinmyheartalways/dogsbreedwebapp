





import React from 'react'
import './CartProductItem.css'
import { Link } from 'react-router-dom'



const CartProductItem = ({ id, image, name}) => {


    const displayCartImage = Array.isArray(image) && image.length > 0 ? image[0] : image



  return (
<>


        <div className='CartProductItem-Container'>
            <div className='CartProductItem-Wrapper'>
                <Link to={`/product${id}`} onClick={() => window.scrollTo(0,0)}>
                    <div><img src={image[0]} alt={name}></img></div>
                 </Link>




            </div>
        </div>




</>
  )
}

export default CartProductItem
