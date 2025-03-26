
                

import React, { useContext, useEffect, useState } from 'react';
import './SidebarCart.css'
import { DogStoreContext } from '../../Context/DogStoreProvider'
import { dogs_products } from '../../Components/ArrayData/adoptdogs.js';
import { Link } from "react-router-dom";






const SidebarCart =  ({ display, closeSidebar }) => {
    const [selectedPickupOption, setSelectedPickupOption] = useState(null);
     const { originalCartItems, selectedSizes,
        TotalCartAmount, TotalCartAmountItems,
         RemoveCartItems , quantityDecrease, 
         quantityIncrease, CheckoutOrderItems} = useContext(DogStoreContext);
    
    
    
    
           useEffect(() => {
            const storedPickupOption = localStorage.getItem('selectedPickupOption');
            if (storedPickupOption) {
                setSelectedPickupOption(JSON.parse(storedPickupOption));
            }
            
         }, [])
    


         const isCartEmpty = Object.values(originalCartItems).every(quantity => quantity === 0);

       

        


         


    return (
        <div className={`sidebar-cart ${display ? 'open' : ''}`} id='sidebar-cart-container'>
            <div className="sidebar-cart-wrapper">
      
          <div className="sidebar-cart-top-section">
             <div> <h3>CART</h3></div>
             <div><button onClick={closeSidebar} className="close-btn">X</button></div>
          </div>
      
   
      
          {isCartEmpty ? (
            <p>Your cart is empty</p>
          ) : (
            <>
           
      
              {dogs_products.map((data) => 
                originalCartItems[data.id] > 0 ? ( 
                  <div key={data.id} className="sidebar-cart-top-section-three">
               
                   
      
                       
      
                        <div className="sidebar-cart-size-section">
                              <Link to={`/product${data.id}`} onClick={() => window.scrollTo(0, 0)}>
                                <img src={data.image[0]} alt={data.name} />
                              </Link>
                             <div> <p>{data.name}</p></div>

                              <div className='sidebar-size'>
                              {selectedSizes[data.id]?.map((size, index) => (
                                 <span key={index}> {size} </span>
                                 ))} 
                              </div>



                              <div className="sidebar-remove-items" onClick={() => RemoveCartItems(data.id)}>
                                      <p>Delete</p>
                                 </div>
                              
                              
                              
                              <div className="sidebar-cart-quantity-wrapper">

                              <div className="sidebar-cart-quantity">
                                 <button onClick={() => quantityDecrease(data.id)}>-</button>
                                  <span>{originalCartItems[data.id]}</span>
                                  <button onClick={() => quantityIncrease(data.id)}>+</button>
                                 </div>


                                <div className="sidebar-cart-price-cart">
                                   <p>${data.new_price.toFixed(2)}</p>
                              </div>


                              </div>



                              <div className="sidebar-delivery-option">
                                      <p>{selectedPickupOption}</p>
                                  </div>
                          






                        </div>
      
                        
      
               
                  </div>
                ) : null
              )}
      
              <hr className="sidebar-second-hr" />
      
              <div className="sidebar-cart-subtotal-cart">
                <p>Subtotal:</p>
                <p>${TotalCartAmount().toFixed(2)}</p>
              </div>
      


              <div className="sidebar-cart-terms">
                <button onClick={CheckoutOrderItems}>
                  CHECKOUT <span>({TotalCartAmountItems()} items)</span>
                </button>
              </div>
            </>
          )}




        </div>
      </div>




   
    )
}



export default SidebarCart