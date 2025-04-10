




import dotenv from 'dotenv';
import Stripe from 'stripe';



dotenv.config();


// Initialize Stripe with your secret key (from .env)
const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);


const StripeControllerFunction = async (req, res) => {
  try {
    const { amount } = req.body;

    // Create a payment intent for Stripe or Google Pay (both use the same endpoint)
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: amount * 100, // Stripe requires the amount in cents
      currency: 'usd',
      payment_method_types: ['card'], // Includes Google Pay as a payment method
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).send({ error: 'Failed to create payment intent.' });
  }

}



export default StripeControllerFunction