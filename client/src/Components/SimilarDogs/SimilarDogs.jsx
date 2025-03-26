



import React from 'react'
import { dogs_products } from '../ArrayData/adoptdogs'
import DogProductItem from '../DogProductItem/DogProductItem';
import './SimilarDogs.css'





const SimilarDogs = () => {

  return (
   <>

    <div className='SimilarDogs-Container'>
      <div className='SimilarDogs-Wrapper'>

          <div><h3>Similar Dogs</h3></div>


         {dogs_products.slice(0,4).map((data) => (
          <div>
             <DogProductItem id={data.id} 
             image={data.image}
              hoverImage={data.hoverImage}
               old_price={data.old_price}
               new_price={data.new_price} />
          </div>
         ))}




      </div>

    </div>



   </>
  )
}

export default SimilarDogs
