

import React from "react"
import './Navbar.css'
import admin_logo from '../Images/dog_navbar_log.png'
import { Link } from "react-router-dom"


const Navbar = () => {


    return (
        <>
        <div className="admin-navbar-container">
            <div className="admin-navbar-wrapper">

                <Link to="/admin/dashboard"><div><img src={admin_logo} alt=""></img></div></Link>

                <div className="admin-links-wrapper">
                     <Link to="/admin/orders" className="admin-link"><div>Orders</div></Link>
                     <Link to="/admin/list" className="admin-link"><div>List</div></Link>
                     <Link to="/admin/profile" className="admin-link"><div>Profile</div></Link>

                </div>

                <div><button>Log Out</button></div>

            </div>
        </div>





        </>
    )
}

export default Navbar