




import React, { useState, useEffect, useRef } from 'react'
import './Register.css'
import { Eye, EyeOff } from "lucide-react";
 import { useNavigate } from "react-router-dom";






const Register = () => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("")
    const [username,setUsername] = useState("")
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const register = useRef()
    const navigate = useNavigate()
    const [hoveredLink, setHoveredLink] = useState(null)
    const [passwordIcon, setPasswordIcon ] = useState(false)

   









    const userRegister = async (event) => {
            event.preventDefault()
            const User_Register_Data = { name, lastName, username, password, email }

            try {
                console.log("Sending registration request:", User_Register_Data);
                const response = await fetch('https://dogsbreedwebappserver.onrender.com/user/register', {
                    method:"POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(User_Register_Data)
                });
               
               const data = await response.json()
                if(data.success) {
                     setError(data.message)
                     setTimeout(() => navigate('/login'), 3000)
               } else {
                 setError(data.message)
            }
            }catch(error) {
                console.error("Register Error:", error)
                setError('error has occurred, please check your network')
            }

    }






    useEffect(() => {
        const formContainer = document.querySelector('.register-form-container');
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

        if (register.current) {
            register.current.focus();
        }
    }, []);





        useEffect(() => {
            if(register.current) {
              register.current.focus()
            }
          }, [])




    






  return (
    <>


<div className={'register-form-container'}>
            <div className={'register-form-wrapper'}>
                <div className='register-login-form'>
                    <form onSubmit={userRegister}>
                        <div><h3>Register Account</h3></div>

                        <div>
                            <input onChange={(e) => setName(e.target.value)} ref={register} type='text'
                             value={name} placeholder='First Name' required />
                        </div>

                        <div>
                            <input onChange={(e) => setLastName(e.target.value)} type='text' 
                            value={lastName} placeholder='Last Name' required  />
                            </div>

                            <div>
                                <input onChange={(e) => setUsername(e.target.value)} type='text' value={username} placeholder='Username' required />
                            </div>

                        <div >
                              <input  onChange={(e) => setPassword(e.target.value)}  
                                value={password} 
                                type={passwordIcon ? "text" : "password"}
                                placeholder='Password'
                                required />
                            <span  className='password-icon' 
                                onClick={() => setPasswordIcon(!passwordIcon)}
                                onMouseEnter={() => setHoveredLink(passwordIcon ? "Show" : "Hide")}
                                onMouseLeave={() => setHoveredLink(null)}
                                 >
                                <div className='icon-password'>{ passwordIcon ? <EyeOff /> : <Eye /> }</div>
                                { hoveredLink &&   <span className="tooltip">  {passwordIcon ? "Show password" : "Hide password"}  </span> }
                            </span>

                        </div>

                        <div> <input onChange={(e) => setEmail(e.target.value)} type='email' value={email}  placeholder='Email' required /></div>
                        
                            <div className='error-msg'> { error && ( <div><p> {error} </p></div> )} </div>
                           
                           <div><button type='submit'>Create Account</button></div>
                           
                           <div className='register'><a href="/login" 
                           onClick={(e) => { e.preventDefault(); navigate('/login')}}>Login</a>
                           </div>

                    </form>
                </div>










            </div>
        </div>







    </>
  )
}




export default Register
