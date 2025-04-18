

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter} from 'react-router-dom';
import DogStoreProvider from "./Context/DogStoreProvider";
import AppContextProvider from './SharedContext/AppContextProvider.jsx'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
  <BrowserRouter>
      <DogStoreProvider>
       <AppContextProvider>
             <App />
       </AppContextProvider>
       </DogStoreProvider>  
  </BrowserRouter>

);


