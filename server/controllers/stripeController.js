




import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config();


// Initialize Stripe with your secret key (from .env)
const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);



const StripeControllerFunction = async (req, res) => {
    try {
        const { amount } = req.body; // Extract the amount from the client request
    
        if (!amount || isNaN(amount) || amount <= 0) {
          return res.status(400).send({ error: { message: "Invalid amount" } });
        }
    
        // Create a payment intent for the given amount in USD (amount in cents, so multiply by 100)
        const paymentIntent = await stripeInstance.paymentIntents.create({
          currency: "usd",  // Currency for the payment
          amount: amount * 100,  // Convert the amount to cents
          automatic_payment_methods: { enabled: true },  // Enable automatic payment methods (cards)
        });
    
        // Send back the client secret for the payment
        res.send({
          clientSecret: paymentIntent.client_secret,
        });
      } catch (error) {
        // If an error occurs, send a bad request with the error message
        res.status(400).send({
          error: {
            message: error.message,  // Send the error message to the client
          },
        });
      }

}



export default StripeControllerFunction