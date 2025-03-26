



import React, { useContext, useState, useEffect, useRef} from 'react'
import './Purchase.css'
import { DogStoreContext } from '../../Context/DogStoreProvider'
import { useNavigate } from "react-router-dom";
import { dogs_products } from '../../Components/ArrayData/adoptdogs';





const Purchase = () => {
    const  navigate = useNavigate()
    const currentInput = useRef();
    const [errorMessage, setErrorMessage] = useState({});
    const { orderItems, setOrderItems,  selectedSizes, TotalCartAmountItems, 
      TotalCartAmount, setOriginalCartItems} = useContext(DogStoreContext)



    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      street: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
      phone: ''
    });




     // Load orderItems from localStorage on mount
     useEffect(() => {
      const storedOrderItems = localStorage.getItem("orderItems");
      if (storedOrderItems) {
          setOrderItems(JSON.parse(storedOrderItems));
      }
  }, [setOrderItems]);





  useEffect(() => {
    const orderCartItems = JSON.parse(localStorage.getItem('cartItems')) || {}
    const orderSelectedSizes = JSON.parse(localStorage.getItem('selectedSizes')) || {}
    const orderPickUpOptions =  JSON.parse(localStorage.getItem("selectedPickupOption")) || "Not Selected";


    let userOrders = []
    for(let data of dogs_products) {
        let productId = String(data.id)
        if(orderCartItems[productId] > 0) {
            userOrders.push({
                id: productId,
                name: data.name || 'name not found',
                image: data.image[0] || '',
                size: Array.isArray(orderSelectedSizes[productId]) 
                      ? orderSelectedSizes[productId].join(', ') 
                      : orderSelectedSizes[productId] || 'not selected',
                pickupOption: orderPickUpOptions,
                quantity: orderCartItems[productId]
            })
        }
    }
        setOrderItems(userOrders)
        
  }, [])





    // Handle item removal
    const removeItem = (productId) => {
      const updatedOrderItems = orderItems.filter(item => item.id !== productId);
      setOrderItems(updatedOrderItems);
      localStorage.setItem("orderItems", JSON.stringify(updatedOrderItems));

      // Also update originalCartItems if necessary
      setOriginalCartItems(prevCart => {
          const updatedCart = { ...prevCart };
          delete updatedCart[productId];
          localStorage.setItem("cartItems", JSON.stringify(updatedCart));
          return updatedCart;
      });
  };



  const userChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const orderForm = () => {
    let errors = {};
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = "Invalid email format";
    if (!formData.street.trim()) errors.street = "Street is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.state.trim()) errors.state = "State is required";
    if (!formData.zipcode.trim()) errors.zipcode = "Zipcode is required";
    if (!formData.country.trim()) errors.country = "Country is required";
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    if (!/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(formData.phone)) errors.phone = "Invalid phone number format";

    setErrorMessage(errors);
    return Object.keys(errors).length === 0;
  };



  const userOrderSubmit = async (e) => {
    e.preventDefault()
    if(orderForm()) {
      console.log("Form submitted successfully!", formData);
    }

    const orderData = {
      name: `${formData.firstName} ${formData.lastName}`, // Combine first & last name
      email: formData.email,
      address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipcode: formData.zipcode,
          country: formData.country
      },
      phone: formData.phone,
      cart: orderItems,
      pickupOption: localStorage.getItem("selectedPickupOption") || "Not Selected" // Ensure pickup option is sent
  };


  try {
    const response = await fetch('https://dogstoreserver.onrender.com/orders/purchase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(orderData),
  });

  const result = await response.json();
  if(response.ok) {
     setOriginalCartItems({});  // Reset cart after order is placed
     setTimeout(() => { navigate('/order-placed', {orders: orderData})}) // Navigate to OrderPlaced and pass data
  } else {
      setErrorMessage(result.message)
  }
  }catch(error) {
    console.error(error.message);
    setErrorMessage('Something went wrong. Please try again.');
  }

  }



  useEffect(() => {
    if (currentInput.current) {
      currentInput.current.focus();
    }
  }, []);





  
  return (
 <>

      <div className={`order-container`}>
        <div className={`order-wrapper`}>

            <div className='user-order-form'>
              <form onSubmit={userOrderSubmit}>

                <div><h3>Place Order</h3></div>
                  <div>
                    <label>First Name:</label>
                    <input ref={currentInput} type="text" name="firstName" value={formData.firstName} onChange={userChange} required />
                        {errorMessage.firstName &&  <p>{errorMessage.firstName}</p>}
                  </div>

                  <div>
                    <label>Last Name:</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={userChange} required />
                        {errorMessage.lastName &&  <p>{errorMessage.lastName}</p>}
                  </div>


                  <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={userChange} required />
                        {errorMessage.email &&  <p>{errorMessage.email}</p>}
                  </div>


                  <div>
                    <label>Street:</label>
                    <input type="text" name="street" value={formData.street} onChange={userChange} required />
                        {errorMessage.street &&  <p>{errorMessage.street}</p>}
                  </div>


                  <div>
                    <label>City:</label>
                    <input type="text" name="city" value={formData.city} onChange={userChange} required />
                        {errorMessage.city &&  <p>{errorMessage.city}</p>}
                  </div>



                  <div>
                    <label>State:</label>
                    <input type="text" name="state" value={formData.state} onChange={userChange} required />
                        {errorMessage.state &&  <p>{errorMessage.state}</p>}
                  </div>



                  <div>
                    <label>Zipcode:</label>
                    <input type="text" name="zipcode" value={formData.zipcode} onChange={userChange} required />
                        {errorMessage.zipcode &&  <p>{errorMessage.zipcode}</p>}
                  </div>



                  <div>
                    <label>Country:</label>
                    <input type="text" name="country" value={formData.country} onChange={userChange} required />
                        {errorMessage.country &&  <p>{errorMessage.country}</p>}
                  </div>


                  <div>
                    <label>Phone:</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={userChange} required />
                        {errorMessage.phone &&  <p>{errorMessage.phone}</p>}
                  </div>



                    <div>
                      <button type="submit">Submit</button>
                    </div>


              </form>
            </div>





            {orderItems.length > 0 ? (
                 <div className='right-section'>
                    {orderItems.map((data, index) => {
                      const product =  dogs_products.find((elements) => String(elements.id) === String(data.id));
                      return (
                        <div key={index.id} className="order-item">
                            <div><img src={data.image} alt=''></img></div>
                             <div className='purchase-size'>
                                Size:{selectedSizes[data.id]?.map((size, index) => (
                                 <span key={index}> {size} </span>
                                 ))} 

                             </div>
                            <div className='order-quantity'><p> Quantity: {data.quantity}</p></div>
                            <div className='order-name'><p>Breed: {data.name}</p></div>
                            <div className='order-pickup'>
                               <span>{data.pickupOption}</span> 

                            </div>

                        </div>
                      )

                    })}


                  

                

                

                  </div>


                 ): (
                   <div>No items in your order.</div>
        
            )}
           




           <div className='middle-section'>

         


           </div>






                <div className='express-checkout'>



                <div className='order-subtotal'>  
                          <div> <span>Your Total Items: ({TotalCartAmountItems()}items)</span></div>
                 </div>
                 
            <div className='order-total'>
                       <div>
                        <p>Total Amount: ${TotalCartAmount().toFixed(2)}</p>
                          </div>
                 </div>



                  <div>
                      <div> <h3>Express Payment</h3></div>
                      <div>
                      <button onClick={() => navigate('/payment')} className='pay-button'>Proceed to Payment</button>

                      </div>
                  </div>





                </div>













        </div>
      </div>



 </>
  )
}

export default Purchase
