



import express from 'express';
import session from 'express-session'
import dotenv from 'dotenv'
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser'
import cors from 'cors';
import registerRoutes from './routes/registerRoute.js'
import loginRoutes from './routes/loginRoute.js'
import authenticationRoutes from './routes/authRoute.js'
import logoutRoutes from './routes/logoutRoute.js'
import reviewRoutes from './routes/reviewsRoute.js'
import orderRoutes from './routes/orderlRoute.js'
import stripeRoutes from './routes/stripeRoute.js'
import adminLoginRoutes from './routes/adminRoute.js'
import connectMongoDB from './configuration/mongodb.js'



dotenv.config();

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));



// Setup session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: true,
        sameSite: 'none'
            } // For development, set secure: false. For production, set to true and use HTTPS
}));



app.use(cookieParser());

app.use(cors({
    credentials:true,
    origin: 'https://dogstoreclient.onrender.com' 

}))






app.use(helmet());




app.use('/user', registerRoutes)
app.use('/account', loginRoutes)
app.use('/auth', authenticationRoutes)
app.use('/exit', logoutRoutes)
app.use('/reviews', reviewRoutes)
app.use('/stripe', stripeRoutes)
app.use('/orders', orderRoutes)
app.use('/admin', adminLoginRoutes)




connectMongoDB()













//  Serve static files from the 'client' directory
app.use(express.static(process.env.STATIC_DIR));  // Serves static files like HTML, CSS, JS from the client folder



// Root endpoint (home page) that serves index.html
app.get("/payment", (req, res) => {
    // Resolve the file path to the index.html in the static folder
    const pathToFile = resolve(process.env.STATIC_DIR + "/index.html");
    res.sendFile(pathToFile);  // Send the index.html file to the client
  });



// Config endpoint that sends the Stripe public key to the client
app.get("/config", (req, res) => {
    // Send the Stripe publishable key to the client
    res.send({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  });
  


  





app.get('/', (req, res) => {
    res.end('backend server')
})






const PORT = process.env.PORT || 'https://dogstoreserver.onrender.com';
app.listen(PORT, () => {
    console.log(`Server is on port ${PORT}`);
});
