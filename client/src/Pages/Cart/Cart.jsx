




import React, { useContext, useEffect, useState } from 'react';
import './Cart.css'
import { DogStoreContext } from '../../Context/DogStoreProvider'
import { dogs_products } from '../../Components/ArrayData/adoptdogs.js';
import { Link } from "react-router-dom";






const Cart = () => {
  const [selectedPickupOption, setSelectedPickupOption] = useState(null);
    const { originalCartItems, selectedSizes,
       TotalCartAmount, TotalCartAmountItems, RemoveCartItems ,
      quantityDecrease, quantityIncrease, CheckoutOrderItems} = useContext(DogStoreContext);




       useEffect(() => {
        const storedPickupOption = localStorage.getItem('selectedPickupOption');
        if (storedPickupOption) {
            setSelectedPickupOption(JSON.parse(storedPickupOption));
        }
        
     }, [])


   
   

     const isCartEmpty = Object.values(originalCartItems).every(quantity => quantity === 0);
  




  return (


    <div className="cart-container">
      <div className="cart-wrapper">



        <div className="cart-top-section">
          <h3>SHOPPING CART</h3>
        </div>

        <hr />




        {isCartEmpty ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <div className="cart-top-section-two">
                 <div><p>Price</p></div>
            </div>

            <hr className="second-hr" />

            {dogs_products.map((data) => 
              originalCartItems[data.id] > 0 ? ( 
                <div key={data.id} className="cart-top-section-three">
                  <div className="cart-image-section-main">
                    <div className="cart-image-section">

                     
                      <Link to={`/product${data.id}`} onClick={() => window.scrollTo(0, 0)}>
                        <img src={data.image[0]} alt={data.name} />
                      </Link>

                      <div className="cart-size-section">
                        <p>{data.name}</p>
                      </div>

                      <div className="size-two">
                        Sizes:  {selectedSizes[data.id]?.map((size, index) => (
                              <span key={index}> {size} </span>
                             ))} 
                      </div>

                    
                      <div className="cart-quantity">
                        <button onClick={() => quantityDecrease(data.id)}>-</button>
                        <span>{originalCartItems[data.id]}</span>
                        <button onClick={() => quantityIncrease(data.id)}>+</button>
                      </div>


                      <div className="remove-items" onClick={() => RemoveCartItems(data.id)}>
                        <p>Delete</p>
                      </div>


                      <div className="delivery-option">
                        <p>Delivery option: {selectedPickupOption}</p>
                      </div>


                      <div className="cart-price-cart">
                        <p>${data.new_price.toFixed(2)}</p>
                      </div>

                 


                    </div>
                  </div>
                </div>
              ) : null
            )}

            <hr className="second-hr" />

            <div className="cart-subtotal-cart">
              <p>Subtotal:</p>
              <p>${TotalCartAmount().toFixed(2)}</p>
            </div>

            <div className="cart-terms">
              <button onClick={CheckoutOrderItems}>
                CLIENT CHECKOUT <span>({TotalCartAmountItems()} items)</span>
              </button>
            </div>
          </>
        )}




      </div>
    </div>
  );

}









export default Cart
