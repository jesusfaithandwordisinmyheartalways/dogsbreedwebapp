



import express from 'express';
import dotenv from 'dotenv'
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import registerRoutes from './routes/registerRoute.js'
import loginRoutes from './routes/loginRoute.js'
import authenticationRoutes from './routes/authRoute.js'
import logoutRoutes from './routes/logoutRoute.js'
import reviewRoutes from './routes/reviewsRoute.js'
import orderRoutes from './routes/orderlRoute.js'
import stripeRoutes from './routes/stripeRoute.js'
import adminLoginRoutes from './routes/adminRoute.js'
import adminAuthenticationRoutes from './routes/adminAuth.js'
import adminOrders from './routes/adminOrders.js'
import userImageUpload from './routes/uploadImages.js'
import connectMongoDB from './configuration/mongodb.js'
import { resolve } from 'path';
import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';




const dogs_breed =  [
  { title: 'Multiple Dogs Breed', type: 'All Clients' },
  { title: 'Multiple Payout Systems' , type: 'Google & Stripe '}
]





const typeDefs = gql` 
type Breeds {   
  title: String,
  type: String
}


type Query { 
  dogs_breed: [Breeds] 
}
`;



// Resolvers
const resolvers = { 
    Query: {
      dogs_breed: () => dogs_breed
    }
}




const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cache: "bounded", 
    introspection: true,  
    plugins: [
      ApolloServerPluginLandingPageLocalDefault({ embed: true })
    ]
  });

  await server.start()
  server.applyMiddleware({ app, path: '/graphql' });
  console.log(`🚀 GraphQL endpoint ready at http://localhost:${PORT}${server.graphqlPath}`);

}

startApolloServer(); 








dotenv.config();

const app = express()


app.use(express.json());
app.use(cookieParser());


app.use(cors({
  credentials:true,
  origin:'https://dogsbreedwebappclient.onrender.com',
}))

app.use(helmet());











app.use('/user', registerRoutes)
app.use('/account', loginRoutes)
app.use('/auth', authenticationRoutes)
app.use('/exit', logoutRoutes)
app.use('/reviews', reviewRoutes)
app.use('/stripe', stripeRoutes)
app.use('/orders', orderRoutes)
app.use('/orders', adminOrders)
app.use('/upload', userImageUpload)
app.use('/admin', adminLoginRoutes)
app.use('/adminAuth', adminAuthenticationRoutes)




connectMongoDB()






//  Serve static files from the 'client' directory
 // Serves static files like HTML, CSS, JS from the client folder
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






const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
