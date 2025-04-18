

import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Pages/Login/Login';
import DashBoard from './Pages/DashBoard/DashBoard';
import Orders from './Pages/Orders/Orders';
import Profile from './Pages/Profile/Profile';
import List from './Pages/List/List'



function App() {
  const [adminAuthUser, setAdminUser] = useState(null)
  const [adminUserLoggedIn, setAdminUserLoggedIn] = useState(false);
  const  navigate = useNavigate()






  useEffect(() => {
      const adminUserAuthentication = async () => {
          try {
            const response = await fetch('http://localhost:3001/adminAuth/adminAuthentication',{
              credentials: 'include',
            });
              const data = await response.json()
              if(data.authenticated) {
                setAdminUser(data.adminUser)
                setAdminUserLoggedIn(true);
                localStorage.setItem('adminAuthUser', JSON.stringify(data.adminUser))
              } else {
                setAdminUser(null)
                setAdminUserLoggedIn(false);
                localStorage.removeItem('adminAuthUser')
              }
             }catch(error) {
              console.error("Error checking admin authentication:", error);
              localStorage.removeItem('adminAuthUser')
          }
      }

      adminUserAuthentication()


         
  }, [])



  useEffect(() => {
    const storedUser = localStorage.getItem('adminAuthUser');
    if (storedUser) {
      setAdminUser(JSON.parse(storedUser));
      setAdminUserLoggedIn(true);
    }
  }, []);




  useEffect(() => {
      if(adminAuthUser === null) {
          navigate('/admin')
      }

  }, [adminAuthUser])


  








  return (
    <>

  
    
      
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path="/admin" element={<Login />} /> 
        <Route path="/admin/dashboard" element={<DashBoard />} />
        <Route path="/admin/orders" element={<Orders/>} /> 
        <Route path="/admin/list" element={<List/>} /> 
        <Route path="/admin/profile" element={<Profile/>} /> 





      </Routes>

   




    </>
  );
}



export default App;
