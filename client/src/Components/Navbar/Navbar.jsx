



import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, ChevronUp, ChevronDown, Menu } from 'lucide-react';
import '../Navbar/Navbar.css';
import { dog_logo } from "../ArrayData/logo.js";
import AuthNavbar from '../ AuthNavbar/AuthNavbar.jsx';
import { DogStoreContext } from '../../Context/DogStoreProvider.jsx';




const Navbar = ({ authUser }) => {
    const [navbarSticky, setNavbarSticky] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const { TotalCartAmountItems } = useContext(DogStoreContext)
    const navigate = useNavigate();

 


    // Handle sticky navbar on scroll
    useEffect(() => {
        const handleScroll = () => {
            setNavbarSticky(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle hover for dropdown menus
    const handleMouseEnter = (section) => {
        setActiveDropdown(section);
    };

    const handleMouseLeave = () => {
        setActiveDropdown(null);
    };







    return (
        <>
            {authUser ? (
                <AuthNavbar />
            ) : (
                <div className={`dog-navbar-container ${navbarSticky ? "sticky" : ""}`}>
                    <div className="dog-navbar-wrapper">
                        <div onClick={() => navigate('/')}>
                            <img src={dog_logo.dog_navbar_logo} alt="Dog Logo" />
                        </div>


                        <Link to="/register" className="link-sgn-in">
                            <div className="sgn-in"><li>Sign In</li></div>
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
                              <div style={{cursor: 'pointer'}}>Categories</div>
                              </Link>

                          
                            <Link to="/cart">
                                <div><ShoppingCart color="black" size={31} /></div>
                            </Link>

                            <div className="cart-count"><span>{TotalCartAmountItems ? TotalCartAmountItems() : 0}</span> </div>
                        </div>
                  
                  
                  
                  
                  



                  
                    </div>
                </div>
            )}
        </>
    );
};





export default Navbar;