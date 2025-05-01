

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter} from 'react-router-dom';
import DogStoreProvider from "./Context/DogStoreProvider";
import AppContextProvider from './SharedContext/AppContextProvider.jsx'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';



const client = new ApolloClient({
  uri: 'https://dogsbreedwebappserver.onrender.com/graphql',
  cache: new InMemoryCache()
});






const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
  <ApolloProvider client={client}>     
    <BrowserRouter>
      <DogStoreProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </DogStoreProvider>  
    </BrowserRouter>
  </ApolloProvider>

);


