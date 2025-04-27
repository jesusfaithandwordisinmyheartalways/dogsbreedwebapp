


import React, { useEffect, useState, useContext } from "react";
import './AuthNavbar.css'
import { Link } from "react-router-dom";
import { ShoppingCart, ChevronUp, ChevronDown } from 'lucide-react'; 
import { dog_logo } from "../ArrayData/logo.js";
import { useNavigate } from "react-router-dom";
import { DogStoreContext } from '../../Context/DogStoreProvider.jsx';
import AuthUserImage from "../AuthUserImage/AuthUserImage.jsx";





const AuthNavbar = ({ user, userLogout }) => {
    const [search, setSearch] = useState(false);
    const [stickyNavbar, setStickyNavbar] = useState(false);
    const [navbarTransition, setNavbarTransition] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);  // For active hover section
    const [windowFaded, setWindowFaded] = useState(false); // Track background fade
    const navigate = useNavigate();
    const { TotalCartAmountItems } = useContext(DogStoreContext)




    // Immediately show navbar (without setTimeout)
    useEffect(() => {
        setNavbarTransition(true);
    }, []);

    const navbarScroll = () => {
        if (window.scrollY > 20) {
            setStickyNavbar(true); // Make navbar sticky
        } else {
            setStickyNavbar(false); // Revert to normal position
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', navbarScroll);
        return () => {
            window.removeEventListener('scroll', navbarScroll);
        };
    }, []);




    // Handle hover for dropdown menus
    const handleMouseEnter = (section) => {
        setActiveDropdown(section);
        setWindowFaded(true); // Ensure background fade effect
    };

    const handleMouseLeave = () => {
        setActiveDropdown(null);
        setWindowFaded(false);
    };




    return (
        <>
            {!search && (
                <div className={`dog-navbar-container ${stickyNavbar ? "sticky" : ""}`}>
                    <div className="dog-navbar-wrapper">
                        <div onClick={() => navigate('/')}>
                            <img src={dog_logo.dog_navbar_logo} alt="Dog Logo" />
                        </div>


                        <Link to="/logout" className="link-sgn-in">
                            <div className="sgn-in"><li>Logout</li></div>
                        </Link>



                        {/* Hover container wrapping navbar and dropdown */}
                        <div className="navbar-hover-container" onMouseLeave={handleMouseLeave}>
                            <div className="dogs-navbar-middle-wrapper">
                                {["friendly", "family", "intelligent"].map((category) => (
                                    <div key={category} className="dogs-navbar-middle-section"
                                        onMouseEnter={() => handleMouseEnter(category)}>
                                        <div className={category}><li>{category.charAt(0).toUpperCase() + category.slice(1)}</li></div>
                                        <div>{activeDropdown === category ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Dropdown Menu remains inside the hover container */}
                            <div className="navbar-hover-section">
                                {activeDropdown === "friendly" && (
                                    <div className="dropdown-menu-friendly">
                                        <Link className="link-section"  to="/accessories" >Doberman Pinschers</Link>
                                        <Link className="link-section"  to="/accessories" >Pembroke Corgi</Link>
                                    </div>
                                )}
                                {activeDropdown === "family" && (
                                    <div className="dropdown-menu-family">
                                        <Link className="link-section"  to="/accessories" >Golden Retrievers</Link>
                                        <Link className="link-section"  to="/accessories" >Labrador Retrievers</Link>
                                        <Link className="link-section"  to="/accessories" >German Shepherds</Link>
                                    </div>
                                )}
                                {activeDropdown === "intelligent" && (
                                    <div className="dropdown-menu-intelligent">
                                        <Link className="link-section"  to="/accessories" >Poodles</Link>
                                        <Link className="link-section"  to="/accessories" >French Bulldogs</Link>
                                        <Link className="link-section"  to="/accessories" >Finnish Lapphunds</Link>
                                    </div>
                                )}
                            </div>
                        </div>



                        <Link to="/accessories" className="link-accessories"><div>Accessories</div></Link>

                    


                        <div className="dogs-right-wrapper">

                             <Link to="/category" className="category-link">
                              <div>Categories</div>
                              </Link>

                          
                            <Link to="/cart">
                                <div><ShoppingCart color="black" size={31} /></div>
                            </Link>

                            

                            <div className="cart-count"><span>{TotalCartAmountItems ? TotalCartAmountItems() : 0}</span> </div>
                        </div>



                        <AuthUserImage />


                      





                        <div className="auth-dogs-navbar-middle-section auth-user"  onMouseEnter={() => handleMouseEnter('authuser')}
                         onMouseLeave={handleMouseLeave}>


                              
                                    
                         <div className="auth-user-text"> <li>Welcome: {user?.firstName || user?.name || "User"}</li> </div>
                                <div className="arrow">{activeDropdown === 'authuser' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</div>
                            <div className="auth-dogs-navbar-links-hover-four">
                            <Link to="/userOrders" className="auth-link-section-auth-user"><div>Orders</div></Link>
                            <Link to="/update-profile" className="auth-link-section-auth-user" ><div>Update Profile</div></Link>
                            <Link to="/logout" className="auth-link-section-auth-user"><div>Logout</div></Link>
                    </div>
    </div>
                  
                  
                  
                  
                  



                  
                    </div>








                </div>
   
   )}


            
        </>
    );
};

export default AuthNavbar;
