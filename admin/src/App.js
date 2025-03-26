

import React from 'react';
import './App.css';
import {  BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login';
import DashBoard from './Pages/DashBoard/DashBoard';
import Navbar from './Components/Navbar/Navbar';
import Orders from './Pages/Orders/Orders';
import Profile from './Pages/Profile/Profile';
import List from './Pages/List/List'



function App() {
  return (
    <>

      <BrowserRouter>
        <Navbar />
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path="/admin" element={<Login />} /> 
        <Route path="/admin/dashboard" element={<DashBoard />} />
        <Route path="/admin/orders" element={<Orders/>} /> 
        <Route path="/admin/list" element={<List/>} /> 
        <Route path="/admin/profile" element={<Profile/>} /> 





      </Routes>

      </BrowserRouter>




    </>
  );
}



export default App;
