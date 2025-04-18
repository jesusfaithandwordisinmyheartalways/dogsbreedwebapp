



import React, { useContext, useState, useEffect, useRef} from 'react'
import './Purchase.css'
import { DogStoreContext } from '../../Context/DogStoreProvider'
import { useNavigate } from "react-router-dom";
import { dogs_products } from '../../Components/ArrayData/adoptdogs';
import GooglePayButton from '@google-pay/button-react'
import { SharedContext } from '../../SharedContext/AppContextProvider.jsx' ;




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
    const [disbledStripe, setDisableStripe] = useState(true)
    const [config, setConfig] = useState(null); // Store configuration data


    const { orderItems, setOrderItems,  selectedSizes, TotalCartAmountItems, 
      TotalCartAmount, setOriginalCartItems} = useContext(DogStoreContext)

      const { userOrders, setUserOrders } = useContext(SharedContext)




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


     // Check if form is valid
     const isFormValid = () => {
      return formData.firstName && formData.lastName && formData.email && 
             formData.street && formData.city && formData.state &&
             formData.zipcode && formData.country && formData.phone && 
             /^\S+@\S+\.\S+$/.test(formData.email) && 
             /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(formData.phone);
    }



    // Check form validity on each change
    useEffect(() => {
      setDisableStripe(!isFormValid());
    }, [formData]);




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
    if (Object.keys(errors).length > 0) {
      alert("Please complete all required fields and ensure the information is valid.");
      return false; // Return false to prevent form submission
    }
    return true; 

    
  };



  





  const userOrderSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
        name: `${formData.firstName} ${formData.lastName}`,
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
        pickupOption: localStorage.getItem("selectedPickupOption") || "Not Selected"
    };

    try {
        const token = getCookie('purchaseToken');
        const response = await fetch('https://dogsbreedwebappserver.onrender.com/orders/purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            body: JSON.stringify(orderData),
        });

        const result = await response.json();
        if (!response.ok) {
            console.log("Server responded with an error:", result.message);
            setErrorMessage(result.message);
        }

        // Regardless of response, navigate and update
        navigate('/orderPlaced');
        setOriginalCartItems({});
        setUserOrders(prevOrders => [...prevOrders, orderData]);

    } catch (error) {
        console.error("Request failed:", error.message);
        setErrorMessage('Something went wrong. Please try again.');

        // Still navigate even on request error
        navigate('/orderPlaced');
        setOriginalCartItems({});
        setUserOrders(prevOrders => [...prevOrders, orderData]);
    }
};

  


  useEffect(() => {
    if (currentInput.current) {
      currentInput.current.focus();
    }
  }, []);





          const formattedAmount = Number(TotalCartAmount).toFixed(2);
          const totalAmount = Number(TotalCartAmount);
        if (!isNaN(totalAmount)) {
          const formattedAmount = isNaN(TotalCartAmount) ? "0.00" : TotalCartAmount.toFixed(2);
        } else {
        console.error("TotalCartAmount is not a number:", TotalCartAmount);
        }
          



// Function to handle Google Pay Button onClick
const handleGooglePay = async (paymentData) => {
  try {
    const token = getCookie('purchaseToken');
    const response = await fetch('https://dogsbreedwebappserver.onrender.com/stripe/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        amount: TotalCartAmount() // Send the total amount for the order
      })
    });

    const result = await response.json();
    const { clientSecret } = result;

    // Process the payment using the Google Pay data
    const { paymentMethodData } = paymentData;
    const { tokenizationData } = paymentMethodData;
    
    // Send token and client secret to your backend for completion
    const paymentIntentResponse = await fetch('https://dogsbreedwebappserver.onrender.com/stripe/confirm-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        clientSecret,
        paymentMethod: tokenizationData.token
      })
    });

    const paymentResult = await paymentIntentResponse.json();
    if (paymentResult.success) {
      navigate('/orderPlaced');
    } else {
      setErrorMessage(paymentResult.message);
    }
  } catch (error) {
    console.error(error);
    setErrorMessage('Payment failed. Please try again.');
  }
};





 // Fetch configuration (for Stripe and Google Pay)
 const fetchConfig = async () => {
  try {
    const response = await fetch('https://dogsbreedwebappserver.onrender.com/config');
    const data = await response.json();
    setConfig(data);
  } catch (error) {
    console.error("Error fetching config:", error);
  }
};

useEffect(() => {
  fetchConfig(); // Fetch the configuration on component mount
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

                    <div>
                    <label>Last Name:</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={userChange} required />
                  </div>


                  <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={userChange} required />
                  </div>



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
           






                              
                              
                              
                              
                          









                <div className='express-checkout'>



                <div className='order-subtotal'>  
                          <div> <span>Your Total Items: ({TotalCartAmountItems()}items)</span></div>
                 </div>
                 
            <div className='order-total'>
                       <div>
                        <p>Total Amount: ${TotalCartAmount().toFixed(2)}</p>
                          </div>
                 </div>



                  <div className='stripe-section'>
                      <div> <h3>Express Payment</h3></div>
                      <div>
                      <button onClick={() => navigate('/payment')} disabled={disbledStripe}  className='pay-button'>Stripe Payment</button>
                            {!isFormValid() && (
                              <div className='form-error-message'><p>Please fill out form before proceeding to payment</p></div>
                            )}
                      </div>


                  </div>






                  <div className='google-pay-section'    >
                  <div>
                          <GooglePayButton
                            environment="PRODUCTION"
                            paymentRequest={{
                              apiVersion: 2,
                              apiVersionMinor: 0,
                              allowedPaymentMethods: [
                                {
                                  type: 'CARD',
                                  parameters: {
                                    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                    allowedCardNetworks: ['MASTERCARD', 'VISA']
                                  },
                                  tokenizationSpecification: {
                                    type: 'PAYMENT_GATEWAY',
                                    parameters: {
                                      gateway: 'stripe',
                                      "stripe:version": "2022-08-01",
                                      'stripe:publishableKey': process.env.STRIPE_PUBLISHABLE_KEY,
                                      gatewayMerchantId:  process.env.STRIPE_MERCHANT_ID,
                                    }
                                  }
                                }
                              ],
                              merchantInfo: {
                                merchantId: process.env.GOOGLE_PAY_MERCHANT_ID,
                                merchantName: process.env.GOOGLE_PAY_MERCHANT_NAME
                              },
                              transactionInfo: {
                                totalPriceStatus: 'FINAL',
                                totalPriceLabel: 'Total',
                                totalPrice: formattedAmount,
                                currencyCode: 'USD',
                                countryCode: 'US'
                              }
                            }}
                            onLoadPaymentData={handleGooglePay}

                />
                            
                    </div>


                      </div>



                  




               



                </div>




                              












        </div>
      </div>



 </>
  )
}

export default Purchase
