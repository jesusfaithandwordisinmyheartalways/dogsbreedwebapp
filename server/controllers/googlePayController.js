


import dotenv from 'dotenv';


dotenv.config();



const googlePayControllerFunction = async (req, res) => {
    res.status(200).send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
        merchantId: process.env.GOOGLE_PAY_MERCHANT_ID,
        merchantName: process.env.GOOGLE_PAY_MERCHANT_NAME,
      });

}


export default googlePayControllerFunction