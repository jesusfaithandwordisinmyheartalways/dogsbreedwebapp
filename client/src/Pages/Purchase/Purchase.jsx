



import React, { useContext, useState, useEffect, useRef} from 'react'
import './Purchase.css'
import { DogStoreContext } from '../../Context/DogStoreProvider'
import { useNavigate } from "react-router-dom";
import { dogs_products } from '../../Components/ArrayData/adoptdogs';




// ✅ Add this at the top
const getCookie = (name) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
};





const Purchase = () => {
    const  navigate = useNavigate()
    const currentInput = useRef();
    const [errorMessage, setErrorMessage] = useState({});
    const [savedAddress, setSavedAddress] = useState([]);
    const [prevAddress, setPrevAddress] = useState(null)
    const [editAddress, setEditAddress] = useState([])
    const [removeAddress, setRemoveAddress] = useState([])
    const [editAddressFormVisible, setEditAddressFormVisible] = useState(false)




    const { orderItems, setOrderItems,  selectedSizes, TotalCartAmountItems, 
      TotalCartAmount, setOriginalCartItems, userOrders, setUserOrders} = useContext(DogStoreContext)



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


    let userOrders = [];

for (let data of dogs_products) {
    let productId = String(data.id);
    if (orderCartItems[productId] > 0) {
        const selectedSize = selectedSizes[productId] || orderSelectedSizes[productId] || [];
        const formattedSize = Array.isArray(selectedSize) ? selectedSize.join(', ') : selectedSize;

        userOrders.push({
            id: productId,
            dogName: data.name || 'name not found',
            image: data.image[0] || '',
            size: formattedSize || 'not selected',
            pickupOption: orderPickUpOptions,
            quantity: orderCartItems[productId]
        });
    }
}
    setOrderItems(userOrders);    
    setUserOrders(userOrders);// Add this line

     
    

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
    if (!orderForm()) return;

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
    const token = getCookie('authToken');  // Assuming token is stored in cookies as 'authToken'
    const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/purchase`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
       },
      credentials: 'include',
      body: JSON.stringify(orderData),
  });

  const result = await response.json();
  if(response.ok) {
     setOriginalCartItems({});  // Reset cart after order is placed
     setUserOrders(prevOrders => [...prevOrders, orderData])// Update the global userOrders state from DogStoreProvider
      navigate('/order-placed') // Navigate to OrderPlaced and pass data
  } else {
      setErrorMessage(result.message)
  }
  }catch(error) {
    console.error(error.message);
    setErrorMessage('Something went wrong. Please try again.');
  }

  }



//PUT Request to Save/Update Address
  const saveNewAddress = async () => {
    try {
      const token = getCookie('authToken'); 
      const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/purchase`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
  
      const data = await response.json();
      if (response.ok) {
        setSavedAddress(data.addresses);
      }
    } catch (error) {
      console.error("Failed to save new address", error);
    }
  };



 // Handle Delete Address
 const deleteAddress = async (addressId) => {
  try {
    const token = getCookie('authToken'); 
      const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/purchase/${addressId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` },
          credentials: 'include'
      });

      if (response.ok) {
          setSavedAddress(prev => prev.filter(addr => addr._id !== addressId));
      }
  } catch (error) {
      console.error("Delete failed", error);
  }
};









  //Handler for Selecting Saved Address

    const userSelectedAddress  = (address) => {
        setPrevAddress(address)
        setFormData({
          firstName: address.firstName || '',
          lastName: address.lastName || '',
          email: address.email || '',
          street: address.street,
          city: address.city,
          state: address.state,
          zipcode: address.zipcode,
          country: address.country,
          phone: address.phone || ''
        })
    }


   // Fetch Saved Addresses (Only last 3)
   useEffect(() => {
    const fetchSavedAddress = async () => {
        try {
            const token = getCookie('authToken'); 
            const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/purchase`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` },
                credentials: 'include'
            });
            const data = await response.json();
            if (response.ok && data.addresses) {
                setSavedAddress(data.addresses);
            }
        } catch (error) {
            console.error("Failed to fetch saved addresses", error);
        }
    };
    fetchSavedAddress();
}, []);
  






    const userEdit = (address) => {
      setFormData({...address})
      setEditAddressFormVisible(true)
    }



   // Submit Edited Address
   const submitEdit = async (e) => {
    e.preventDefault();
       try {
       const token = getCookie('authToken'); 
        const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/purchase`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            body: JSON.stringify({ address: formData })
        });

        const data = await response.json();
        if (response.ok) {
            alert("Address updated.");
            setSavedAddress(data.addresses);
            setEditAddressFormVisible(false);
        }
    } catch (error) {
        console.error("Error updating address", error);
    }
};
    










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
                  </div>

                  <div>
                    <label>Last Name:</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={userChange} required />
                  </div>


                  <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={userChange} required />
                  </div>


                  <div>
                    <label>Street:</label>
                    <input type="text" name="street" value={formData.street} onChange={userChange} required />
                  </div>


                  <div>
                    <label>City:</label>
                    <input type="text" name="city" value={formData.city} onChange={userChange} required />
                  </div>



                  <div>
                    <label>State:</label>
                    <input type="text" name="state" value={formData.state} onChange={userChange} required />
                  </div>



                  <div>
                    <label>Zipcode:</label>
                    <input type="text" name="zipcode" value={formData.zipcode} onChange={userChange} required />
                  </div>



                  <div>
                    <label>Country:</label>
                    <input type="text" name="country" value={formData.country} onChange={userChange} required />
                  </div>


                  <div>
                    <label>Phone:</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={userChange} required />
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
                             <div className='purchase-size'> Size: {data.size}</div>
                            <div className='order-quantity'><p> Quantity: {data.quantity}</p></div>
                            <div className='order-name'><p>Breed: {data.dogName}</p></div>
                            <div className='order-pickup'>
                               <span>PickupOption: {data.pickupOption}</span> 

                            </div>

                        </div>
                      )

                    })}


                  </div>


                 ): (
                   <div>No items in your order.</div>
        
            )}
           






                {/*----------ADD CODE FOR THE FORM  to review all the user  Saved Addresses */}

                        <div className='display-saved-address-wrapper'>
                          <div> <h3>Previous Addresses</h3></div>

                          <div className="previous-addresses-wrapper">
                          {savedAddress.length > 0 ? (
                        savedAddress.map((address, index) => (
                            <div key={index} className="saved-address">
                                <p>{address.street}, {address.city}, {address.state}, {address.zipcode}, {address.country}</p>
                                <button onClick={() => userSelectedAddress(address)}>Select</button>
                                <button onClick={() => userEdit(address)}>Edit</button>
                                <button onClick={() => deleteAddress(address._id)}>Remove</button>
                            </div>
                        ))
                    ) : (
                        <p>No saved addresses available.</p>
                    )}
                </div>
                         



                        </div>
                              
                              
                              
                              
                              
                              {/*----------ADD CODE FOR THE FORM  for the user to edit their Addresses and update it in the DOM as the new Address */}

                              {editAddressFormVisible && (
                              <div className="edit-address-form">
                                  <h3>Edit Address</h3>
                                  <form onSubmit={submitEdit}>
                                      <div>
                                          <label>Street:</label>
                                          <input type="text" name="street" value={formData.street} onChange={(e) => setFormData({ ...formData, street: e.target.value })} />
                                      </div>
                                      <div>
                                          <label>City:</label>
                                          <input type="text" name="city" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                                      </div>
                                      {/* Add other fields as needed */}
                                      <button type="submit">Save Changes</button>
                                  </form>
                              </div>
                          )}









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
                      <button onClick={() => navigate('/payment')} className='pay-button'>Stripe Payment</button>

                      </div>
                  </div>





                </div>













        </div>
      </div>



 </>
  )
}

export default Purchase
