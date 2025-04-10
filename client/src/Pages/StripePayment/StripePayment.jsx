




import React  from 'react'
import './StripePayment.css'
import StripeCheckoutForm from '../../Components/StripeCheckoutForm/StripeCheckoutForm'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";



const StripePayment = () => {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");




    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
              console.log("Requesting Payment Intent..."); // Add this
      
              const response = await fetch('https://dogsbreedwebappserver.onrender.com/stripe/create-payment-intent', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: 5000 }), // Ensure amount is sent
              });
      
              if (!response.ok) throw new Error("Failed to create payment intent");
      
              const { clientSecret } = await response.json();
              console.log("Client Secret Received:", clientSecret); // Add this
      
              setClientSecret(clientSecret);
            } catch (error) {
              console.error("Error creating payment intent:", error);
            }
          };
      
          createPaymentIntent();
      }, []);
    
    
    
    
    
    
    
      useEffect(() => {
        const fetchConfig = async () => {
          try {
            const response = await fetch('https://dogsbreedwebappserver.onrender.com/config');
            if (!response.ok) throw new Error("Failed to fetch Stripe config");
    
            const { publishableKey } = await response.json();
            setStripePromise(loadStripe(publishableKey));
          } catch (error) {
            console.error("Error fetching Stripe config:", error);
          }
        };
    
        fetchConfig();
      }, []);




  return (
 <>

<div className="stripe-container">
      <h1>Payment</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <StripeCheckoutForm />
        </Elements>
      )}
    </div>





 </>
  )
}

export default StripePayment
