





import React from 'react'
import './StripeCheckoutForm.css'
import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";






const StripeCheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);




    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!stripe || !elements) {
          return; // Ensure Stripe has loaded before processing
        }
    
        setIsProcessing(true);
    
        try {
          const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
              return_url: `${window.location.origin}/completion`,
            },
          });
    
          if (error) {
            setMessage(error.message || "An unexpected error occurred.");
          }
        } catch (err) {
          setMessage("Something went wrong.");
        }
    
        setIsProcessing(false);
      };





  return (
    <>


<div className="stripe-container">
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" />
        <button disabled={isProcessing || !stripe || !elements} id="submit">
          <span id="button-text">
            {isProcessing ? "Processing..." : "Pay now"}
          </span>
        </button>
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>








    </>
  )
}





export default StripeCheckoutForm
