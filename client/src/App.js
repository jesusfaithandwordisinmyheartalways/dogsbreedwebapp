

import React, {useState, useEffect} from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import AuthNavbar from './Components/ AuthNavbar/AuthNavbar';
import { useNavigate } from "react-router-dom";
import Logout from "./Pages/Logout/Logout";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import ResetCode from "./Pages/ResetCode/ResetCode";
import NewPassword from "./Pages/NewPassword/NewPassword";
import Footer from "./Components/Footer/Footer";
import Accessories from "./Pages/Accessories/Accessories";
import { ChevronUp } from 'lucide-react';
import Cart from "./Pages/Cart/Cart";
import Product from "./Pages/Product/Product";
import Purchase from "./Pages/Purchase/Purchase";
import OrderPlaced from "./Pages/OrderPlaced/OrderPlaced";
import StripePayment from "./Pages/StripePayment/StripePayment";
import Category from "./Pages/Category/Category";
import AuthUserOrders from "./Pages/AuthUserOrders/AuthUserOrders";
import GooglePayConfirm from "./Pages/GooglePayConfirm/GooglePayConfirm";





function App() {
  const [authUser, setAuthUser] = useState(null)
  const [userScroll, setUserScroll] = useState(false)
  const  navigate = useNavigate()
  const location = useLocation()



  useEffect(() => {
    const windowScroll = () => {
      if (window.scrollY > 20) {
        setUserScroll(true);
      } else {
        setUserScroll(false);
      }
    };

    window.addEventListener("scroll", windowScroll );
    return () => {
      window.removeEventListener("scroll", windowScroll );
    };
  })



   // ✅ Function to scroll to navbar
   const scrollToTop = () => {
    const navbar = document.getElementById("navbar-content");
    if (navbar) {
      navbar.scrollIntoView({ behavior: "smooth" });
    }
  };






  // Check authentication status from sessionStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setAuthUser(JSON.parse(storedUser)); // Retrieve and set the user data
    }
  }, []);




  useEffect(() => {
    const checkAuthUser = () => {
        const storedUser = localStorage.getItem("authUser");
        if (storedUser) {
            setAuthUser(JSON.parse(storedUser)); 
        } else {
            setAuthUser(null);
        }
    };

    checkAuthUser(); // Initial check

    // ✅ Listen for auth changes (triggered by login)
    window.addEventListener("authUserChanged", checkAuthUser);

    return () => {
        window.removeEventListener("authUserChanged", checkAuthUser);
    };
}, []);



  const userAuthentication = async () => {
    try {
      const response = await fetch('https://dogsbreedwebappserver.onrender.com/auth/authentication',{
        credentials: "include", // Ensures cookies are sent
      });
      const data = await response.json();
      console.log("Auth response:", data); // Debug log
      if (data.authenticated) {
        setAuthUser(data.user);
        localStorage.setItem("authUser", JSON.stringify(data.user)); // Store in sessionStorage
      } else {
        setAuthUser(null);
        localStorage.removeItem("authUser"); // Clear from sessionStorage
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      setAuthUser(null);
      localStorage.removeItem("authUser"); // Clear if error occurs
    }
  }



  useEffect(() => {
    userAuthentication()
  }, []) // Run once when the component mounts



  useEffect(() => {
    if (authUser === null) {
      navigate('/'); // Ensures navbar updates
    }
  }, [authUser]); // Trigger re-render when `authUser` changes



    const authenticationLogout = () => {
    setAuthUser(null)
    localStorage.removeItem("authUser"); // Clear on logout
    navigate('/')
}




useEffect(() => {
  localStorage.setItem("lastRoute", location.pathname);
}, [location.pathname]);


useEffect(() => {
  const lastRoute = localStorage.getItem("lastRoute");
  if (lastRoute && lastRoute !== "/logout") {
      navigate(lastRoute);
  }
}, []);



useEffect(() => {
  if (location.pathname === "/purchase") {
    document.body.classList.remove("overlay-active");
    localStorage.removeItem("overlayActive"); // Clear stored overlay state
    document.body.classList.add("overlay-actives");
  } else {
    document.body.style.backgroundColor = "white"; // Reset background color when leaving purchase route
    document.body.classList.remove("overlay-actives");
  }
}, [location.pathname]);







  return (
    <>

<div className="app-container">


<div className="content" id="navbar-content">
{ authUser !== null ?  <AuthNavbar user={authUser} onLogout={authenticationLogout} /> : <Navbar authUser={authUser}  /> }

<Routes>
    <Route path='/' element={<Home />}/>
    <Route path='/login' element={<Login setAuthUser={setAuthUser} />}/>
    <Route path='/logout' element={<Logout onLogout={authenticationLogout} />}/>
    <Route path='/accessories' element={<Accessories />}/>
    <Route path='/register' element={<Register />}/>
    <Route path='/cart' element={<Cart />}/>
    <Route path='/category' element={<Category />}/>
    <Route path="/security" element={<ForgotPassword />}/>
    <Route path="/verify" element={<ResetCode />}/>
    <Route path="/confirm" element={<NewPassword />}/>
    <Route path="/product/:productId" element={<Product />} />
    <Route path="/purchase" element={<Purchase />}/>
    <Route path="/orderPlaced" element={<OrderPlaced />}/>
    <Route path="/payment" element={<StripePayment />}/>
    <Route path="/userOrders" element={<AuthUserOrders />}/>
    <Route path="/googlepayconfirm" element={<GooglePayConfirm />}/>





    



  </Routes>
</div>
  <Footer />


      {/* ChevronUp button */}
  {userScroll && (
    <div><button  className="scroll-to-top" onClick={scrollToTop}>  <ChevronUp size={31} /> Back To Top </button></div>
  )}




</div>




    

    </>
  );
}


export default App;
