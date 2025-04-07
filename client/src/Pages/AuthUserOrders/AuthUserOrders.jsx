



import React, { useContext, useEffect, useState } from 'react';
import './AuthUserOrders.css';
import { DogStoreContext } from '../../Context/DogStoreProvider';



const AuthUserOrders = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userOrders, setUserOrders } = useContext(DogStoreContext);


     // Get general user info from the first order (if available)
     const userInfo = userOrders.find(order => order.name && order.email);
     const userDogOrders = userOrders.find(data => data.dogName && data.image[0] && data.size && data.quantity)

     useEffect(() => {
         if (userOrders.length > 0) {
             setLoading(false);
         } else {
             setError('No orders found.');
             setLoading(false);
         }
     }, [userOrders]);


    useEffect(() => {
        const fetchUserOrders = async () => {
          try {
            const token = document.cookie.split('=')[1]; // Assuming token is stored in cookies as 'authToken'
            const response = await fetch('https://dogstoreserver.onrender.com/orders/user-orders', {
              method: 'GET',
              headers: {
                        'Authorization': `Bearer ${token}`
                    },
              credentials: 'include', // Important for sending cookies
            });
    
            if (!response.ok) throw new Error("Failed to fetch orders");
    
            const data = await response.json();
            console.log("Fetched user orders:", data);
            setUserOrders(data); // Store orders in context
          } catch (error) {
            console.error("Error fetching orders:", error);
          }
        };
    
             fetchUserOrders();

      }, [setUserOrders]);



      if (loading) return <div>Loading your orders...</div>;
      if (error) return <div>{error}</div>;



      

    return (
        <>
            <div className='auth-orders-container'>
                <div className='auth-orders-wrapper'>
                    <h3>Your Order History</h3>

                    {userInfo && (
                        <div>
                            <p><strong>Name:</strong>{userInfo.name}</p>
                            <p><strong>Contact:</strong>{userInfo.phone}</p>
                            <p><strong>PickupOption:</strong>{userInfo.pickupOption}</p>
                        </div>
                    )}

                    {userInfo && (
                        <div>
                        <h3>Mailing Address</h3>
                            <p><strong>Street:</strong>{userInfo.address?.street}</p>
                            <p><strong>City:</strong>{userInfo.address?.city}</p>
                            <p><strong>State:</strong>{userInfo.address?.state}</p>
                            <p><strong>Zip Code:</strong>{userInfo.address?.zipcode}</p>
                            <p><strong>Country:</strong>{userInfo.address?.country}</p>

                        </div>
                    )}



                    {userDogOrders && (
                        <div>
                            <p><strong>Breed:</strong>{userDogOrders.dogName}</p>
                            <div><img src={userDogOrders.image} alt={userDogOrders.dogName}></img></div>
                            <p><strong>Size:</strong>{userDogOrders.size}</p>
                            <p><strong>PickupOption</strong> {userDogOrders.pickupOption}</p>
                            <p><strong>Quantity</strong> {userDogOrders.quantity}</p>
                        </div>
                    )}


                   


                  
                </div>
            </div>
        </>
    );
};



export default AuthUserOrders;
