import React from 'react'
import './OrderPlaced.css'
import { useLocation } from 'react-router-dom'
import { dog_logo } from '../../Components/ArrayData/logo'





const OrderPlaced = () => {
const location = useLocation()
const orderPlaced = location.state || {} // Retrieve passed data


    // Generate a random order number
    const orderNumber = Math.floor(Math.random() * 1000000000);



  return (
   <>

        <div className='order-placed-container'>
            <div className='order-placed-wrapper'>
              <div><img src={dog_logo.Green_Check_Image} alt=''></img></div>
                <div><h3>Order Confirmation</h3></div>
              <div>Thank you: {orderPlaced.firstName} {orderPlaced.lastName} </div>
              <div>Your oder confirmation is: {orderNumber} </div>
              <div> Check your email for the order details: {orderPlaced.email}</div>





            </div>
        </div>




   </>
  )
}

export default OrderPlaced
