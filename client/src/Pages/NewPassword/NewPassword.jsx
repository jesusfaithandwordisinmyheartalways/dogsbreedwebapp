



import { useState } from 'react'
import React from 'react'
import './NewPassword.css'
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";






const NewPassword = () => {
     const [password, setPassword] = useState("");
     const [error, setError] = useState('')
     const [success, setSuccessMessage] = useState('');
      const [hoveredLink, setHoveredLink] = useState(null)
      const [passwordIcon, setPasswordIcon ] = useState(false)
     const navigate = useNavigate();



     const userNewPassword = async (e) => {
        e.preventDefault()
        const newPasswordData = {password}
        try {
            const response = await fetch('https://dogstoreuserappserver.onrender.com/confirm/newPassword', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(newPasswordData)
            })
                const data = await response.json()
                if(data.success) {
                    console.log(data)
                    setSuccessMessage(data.message)
                    setError('')
                    setTimeout(() => navigate('/login', 300))
                } else {
                        setError(data.message)
                }
                 }catch(error) {
                    console.error('error', error)
                    setError('error has occurred')
        }

     }

  return (
   <>

            <div className='new-password-container'>
                <div className='new-password-wrapper'>

                    <div className='new-password-form-wrapper'>
                        <form onSubmit={userNewPassword}>
                        <div><h3> Enter New Password</h3></div>


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
                          <div className='new-icon-password'>{ passwordIcon ? <EyeOff /> : <Eye /> }</div>
                         { hoveredLink &&   <span className="new-tooltip">  {passwordIcon ? "Show password" : "Hide password"}  </span> }
                       </span>  
            </div>


                        <div><button type="submit">Submit New Password</button></div>


                        <div>{error && ( <div><p>{error}</p></div>)}</div>
                        <div>{success && ( <div><p>{success}</p></div>)}</div>









                        </form>
                    </div>





                </div>
            </div>




   </>
  )
}

export default NewPassword
