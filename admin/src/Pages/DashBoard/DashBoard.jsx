



import React, { useContext, useState } from 'react'
import './DashBoard.css'
import Navbar from '../../Components/Navbar/Navbar'
import { SharedContext } from '../../SharedContext/AppContextProvider.jsx' ;
import { useEffect } from 'react';






const DashBoard = () => {
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const { userOrders, setUserOrders } = useContext(SharedContext);

  



  const getCookie = (name) => {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find(row => row.startsWith(name + '='));
    return cookie ? cookie.split('=')[1] : null;
};






     // Get general user info from the all the  orders (if available) and the properties
 userOrders.find(order => order.name && order.email);
 userOrders.filter(data => data.dogName && data.image[0] && data.size && data.quantity);




 useEffect(() => {
  if (userOrders.length > 0) {
      setLoading(false);
  } else {
      setError('No orders found.');
      setLoading(false);
  }
}, [userOrders]);






   useEffect(() => {
    const adminRetrieveOrders = async () => {

      try {
        const token = getCookie('authToken')
        const response = await fetch('http://localhost:3001/user-orders', {
           method: 'GET',
           headers: {
            'Authorization' : `Bearer ${token}`,
           },
           credentials: 'include'
        })
        if (!response.ok) throw new Error("Failed to fetch orders");

        const data = await response.json()
        if(data.success) {
          setUserOrders(data.orders); // ✅ fix: access data.orders, not full data
          setError(null);
        } else {
            setError(data.message)
        }
      }catch(error) {
            console.error('admin orders error ', error)

      }
    }

        adminRetrieveOrders()


   }, [])









        useEffect(() => {
          console.log('User Orders Updated:', userOrders);
        }, [userOrders]);






     




    
  return (


    <div>
    <Navbar />


        <div className='dashboard-container'>
         <div className='dashboard-wrapper'>

         {userOrders.map((order, index) => (
    <div key={index} className="order-card">
      <h3>{order.name} — {order.email}</h3>
      <p><strong>Pickup Option:</strong> {order.pickupOption}</p>
      <p><strong>Created:</strong> {new Date(order.createdAt).toLocaleString()}</p>

      <h4>Addresses:</h4>

      <ul>
      {order.addresses?.map((addr, idx) => (
        <li key={idx}>{addr.street}, {addr.city}, {addr.state} {addr.zipcode}, {addr.country}</li>
))}

      </ul>


      <h4>Cart:</h4>
      <ul>
        {order.cart.map((item, i) => (
          <li key={i}>{item.name} — {item.size} — Qty: {item.quantity}</li>
        ))}
      </ul>
    </div>
  ))}






         </div>

        </div>






       
      
    </div>



  )
}



export default DashBoard
