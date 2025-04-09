





import React, { useContext, useState } from 'react'
import './Logout.css'
import { useNavigate } from "react-router-dom";




const Logout = ({ onLogout}) => {
    const [ error, setErrorMessage ] = useState('')
        const navigate = useNavigate()
    





        const userLogout = async (e) => {
            e.preventDefault()
            try {
                const response = await fetch('https://dogstoreuserappserver.onrender.com/exit/logout', {
                    method: "POST",
                    credentials: 'include',
                })
                const result = await response.json()
                if(response.status === 200) {
                    console.log(result.message)
                    onLogout()// Update authUser state in parent (App component)
                    sessionStorage.removeItem("authUser"); // Clear sessionStorage on logout
                    setTimeout(() => navigate('/'), 300)
                } else {
                    console.error('Logout failed');
                    setErrorMessage(result.message || 'Failed to log out. Please try again.' );
                }
            }catch(error) {
                console.error('Error:', error);
                setErrorMessage('Network error. Please try again later.');  
            }
        }



  return (
   <>

        <div className='logout-form-container'>
            <div className={'logout-form-wrapper'}>

               <div>
                <form >
                 <div><h3>User Logout</h3></div>
                <div><button onClick={userLogout}>Logout</button></div>
                <div>{error && ( <div><p>{error}</p></div>)}</div>
                </form>
               </div>


            </div>
        </div>




   </>
  )
}

export default Logout
