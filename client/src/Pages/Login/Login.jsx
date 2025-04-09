




import React, { useState, useEffect, useRef } from 'react'
import { Eye, EyeOff } from "lucide-react";
 import { useNavigate } from "react-router-dom";
import './Login.css'




const Login = ({ setAuthUser}) => {
     const [username,setUsername] = useState("")
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const login = useRef()
    const navigate = useNavigate();
    const [hoveredLink, setHoveredLink] = useState(null)
    const [passwordIcon, setPasswordIcon ] = useState(false)
    
    




    const userLogin = async (e) => {
        e.preventDefault()

        const loginData = {
            loginUsername: username,
            loginPassword: password,
            loginEmail: email
        }

        if (!username || !password || !email) {
            setError("Please enter  your credentials username, email and password.");
            return;
        }

        try {
            const response = await fetch('https://dogstoreuserappserver.onrender.com/account/login', {
                method: 'POST',
                headers: {"Content-Type": "application/json",},
                credentials: 'include',
                body: JSON.stringify(loginData),
            });
              const data = await response.json()
              if(data.success) {
                setError(""); 
                console.log(data); // Debugging output
                setAuthUser({ firstName: data.user.firstName, username: data.user.username });
                setSuccessMessage(data.message);  // Set the success message
                sessionStorage.setItem("authUser", JSON.stringify(data.user)); // Save to sessionStorage
                // ✅ Force App.js to update UI
                window.dispatchEvent(new Event("authUserChanged"));
                navigate('/');  // Redirect after login
              } else {
                setError(data.message);
                setSuccessMessage("");  // Reset success message if login fails
              }
            }catch(error) {
                console.error("user Error:", error);

        }
}   





useEffect(() => {
    const formContainer = document.querySelector('.login-form-container');
    if (formContainer) {
        formContainer.classList.add('show'); // Trigger the transition effect on page load
    }

    // Trigger the transition animation every time user visits the page
    const resetAnimation = () => {
        formContainer.classList.remove('show');
        void formContainer.offsetWidth; // Trigger reflow to restart animation
        formContainer.classList.add('show');
    }

    resetAnimation(); // Reset animation

    if (login.current) {
        login.current.focus();
    }
}, []);




  return (
   <>


<div className={'login-form-container'}>
<div className={'login-form-wrapper'}>


    <div>
        <form onSubmit={userLogin}>
            <div><h3>LOGIN</h3></div>

            <div><input  onChange={(e) => setUsername(e.target.value)}  ref={login} type='text' value={username} placeholder='Username' required /></div>

            <div>
                <input onChange={(e) => setPassword(e.target.value)} type={passwordIcon ? "text" : "password"} 
                    placeholder='Password'
                     value={password} 
                     required /> 
                     <span className='password-icon'  
                        onClick={() => setPasswordIcon(!passwordIcon)}
                        onMouseEnter={() => setHoveredLink(passwordIcon ? "Show" : "Hide")}
                        onMouseLeave={() => setHoveredLink(null)}
                      > 
                          <div className='icon-password'>{ passwordIcon ? <EyeOff /> : <Eye /> }</div>
                         { hoveredLink &&   <span className="tooltip">  {passwordIcon ? "Show password" : "Hide password"}  </span> }
                       </span>  
            </div>



            <div className='login-email'>
              <input onChange={(e) => setEmail(e.target.value)} type="email" value={email} placeholder='Email' required></input>
            </div>
                    
                  <div className='login-error-msg'> {error && ( <div><p>{error}</p></div> )} </div>
                  {successMessage && <div className="success-message">{successMessage}</div>}


            <div><button type="submit">Sign In</button></div>


            <div className='register'><a href="/register" onClick={(e) => {e.preventDefault(); navigate('/register')}}>Create A Profile</a></div>
            <div className='security'><a href="/security" onClick={(e) => {e.preventDefault(); navigate('/security')}}> Forgot Password?</a></div>




        </form>
    </div>






</div>
</div>



            




   </>
  )
}



export default Login
