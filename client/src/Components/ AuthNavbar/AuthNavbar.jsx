



import React, { useEffect, useState } from "react";
import './AuthNavbar.css'
import { Link } from "react-router-dom";
import { Search, ShoppingCart, ChevronUp, ChevronDown } from 'lucide-react'; 
import { dog_logo } from "../ArrayData/logo.js";
import { useNavigate } from "react-router-dom";





const  AuthNavbar = ({ user, userLogout}) => {
    const [search, setSearch] = useState(false);
      const [stickyNavbar, setStickyNavbar] = useState(false);
      const [navbarTransition, setNavbarTransition] = useState(false);
      const [click, setClick] = useState(null) // Track active section
      const [windowFaded, setWindowFaded] = useState(false)// Track background fade
      const  navigate = useNavigate()
      



       // Immediately show navbar (without setTimeout)
          useEffect(() => {
              setNavbarTransition(true);
          }, []);
      
          const navbarScroll = () => {
              if (window.scrollY > 20) {
                  setStickyNavbar(true);
              } else {
                  setStickyNavbar(false);
              }
          };
      
          useEffect(() => {
              window.addEventListener('scroll', navbarScroll);
              return () => {
                  window.removeEventListener('scroll', navbarScroll);
              };
          }, []);
      
      
      
      
      
              // Toggle section visibility
          const navbarHoverSectionDisplay = (hoverOver) => {
              setClick(( data) => (data === hoverOver ? null : hoverOver))
              setWindowFaded(true); // Ensure background fade effect appears
      
          }
      
      
      
      
          useEffect(() => {
              const documentCLickedOutsideWindow = (event) => {
                  if(!event.target.closest(".auth-dogs-navbar-middle-wrapper, .auth-navbar-hover-section")) {
                      setClick(null)
                      setWindowFaded(false)
                    }
                 };
                    document.addEventListener('click', documentCLickedOutsideWindow)
                  return () => {
                      document.removeEventListener('click', documentCLickedOutsideWindow)
                  }
           }, [])
          
      
      



  return (
   <>
   
   {!search && (
    <div className={`auth-dog-navbar-container ${navbarTransition ? "show" : ""} ${stickyNavbar ? "visible" : ""} ${windowFaded ? "faded-background" : ""}`} >
        <div className="auth-dog-navbar-wrapper">
            <div onClick={() => navigate('/')}><img src={dog_logo.dog_navbar_logo} alt="" /></div>

            <Link to="/logout" className="auth-link-sgn-in">
                <div><li>Log Out</li></div>
            </Link>


            <div className="auth-dogs-navbar-middle-wrapper">
                <div className="auth-dogs-navbar-middle-section auth-friendly" 
                    onClick={() => navbarHoverSectionDisplay('friendly')} >
                    <div className="auth-friendly"><li>Friendly</li></div>
                    <div>{click === 'friendly' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</div>
                </div>

                <div className="auth-dogs-navbar-middle-section auth-family" 
                    onClick={() => navbarHoverSectionDisplay('family')} >
                    <div className="auth-family"><li>Family</li></div>
                    <div>{click === 'family' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</div>
                </div>

                <div className="auth-dogs-navbar-middle-section auth-intelligent" 
                    onClick={() => navbarHoverSectionDisplay('intelligent')} > 
                    <div className="auth-intelligent"><li>Intelligent</li></div>
                    <div>{click === 'intelligent' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</div>
                </div>


                <div>
                  <Link to="/accessories" className="auth-link-accessories"><div>Accessories</div></Link>
                  </div>


                <div className="auth-dogs-navbar-middle-section auth-user"
                  onClick={() => navbarHoverSectionDisplay('authuser')} >
                 <div className="auth-user-text"><li> Welcome: {user?.firstName || user?.name || "User"}  </li></div>
                 <div >{click === 'authuser' ? <ChevronUp size={18} /> : <ChevronDown  size={18}/> }</div>
            </div>






            </div>

           
            
            


          







            <div className="auth-dogs-right-wrapper">
                <Link to="/cart" >
                    <div><ShoppingCart size={31}  /></div>
                </Link>
            </div>

        </div>





        <div className="auth-navbar-hover-section">
            <div className={`auth-dogs-navbar-links-hover-one ${click === "friendly" ? "show" : "hide"}`} >
                <Link className="auth-link-section" ><div>Doberman Pinschers</div></Link>
                <Link className="auth-link-section" ><div>Poodles</div></Link>
                <Link className="auth-link-section"><div>Lapphunds</div></Link>
            </div>

            <div className={`auth-dogs-navbar-links-hover-two ${click === "family" ? "show" : "hide"}`} >
                <Link className="auth-link-section" ><div>Golden Retrievers</div></Link>
                <Link className="auth-link-section" ><div>Labrador Retrievers</div></Link>
                <Link className="auth-link-section"><div>German Shepherds</div></Link>
            </div>

            <div className={`auth-dogs-navbar-links-hover-three ${click === "intelligent" ? "show" : "hide"}`} >
                <Link className="auth-link-section" ><div>Poodles</div></Link>
                <Link className="auth-link-section" ><div>French Bulldogs</div></Link>
                <Link className="auth-link-section"><div>Finnish Lapphunds</div></Link>
            </div>


            <div className={`auth-dogs-navbar-links-hover-four ${click === "authuser" ? "show" : "hide"}`} >
                <Link to="/orders" className="auth-link-section-auth-user" ><div>Orders</div></Link>
                <Link to="/update-profile" className="auth-link-section-auth-user" ><div>Update Profile</div></Link>
                <Link to="/logout" className="auth-link-section-auth-user" ><div>Logout</div></Link>
            </div>



        </div>







    </div>
)}
        




   </>
  )
}




export default  AuthNavbar
