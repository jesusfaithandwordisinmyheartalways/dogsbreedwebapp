



import React, {useState, useRef, useEffect} from 'react'
import './Login.css'
import { useNavigate } from "react-router-dom";




const Login = () => {
      const [username,setUsername] = useState("")
        const [password, setPassword] = useState("");
        const [email, setEmail] = useState("");
        const [error, setError] = useState("");
        const admin = useRef()
        const navigate = useNavigate();







        const userChange = (e) => {
            const { name, value } = e.target;  // Extract the name and value of the input field
            
            // Update the corresponding state based on the name attribute of the input
            if (name === 'username') {
              setUsername(value);
            } else if (name === 'password') {
              setPassword(value);
            } else if (name === 'email') {
              setEmail(value);
            }
          };




          const adminLogin = async (e) => {
            e.preventDefault()

            const adminLogin = {
                adminUsername: username,
                adminPassword: password,
                adminEmail: email
            }

            try {
                const response = await fetch('https://dogstoreserver.onrender.com/admin/admin-login', {
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body:JSON.stringify(adminLogin)
                });
                const data = await response.json()
                if(data.success) {
                    setError('')
                    alert(data.message)
                    setTimeout(() => navigate('/admin/dashboard'), 3000)
                } else {
                    setError(data.message)
                }
            }catch(error) {
                    console.error('admin login error', error)
                    setError('admin panel error')

            }
          }
        



        useEffect(() => {

            if (admin.current) {
                admin.current.focus();
            }
        }, [])




        
        


  return (
   <>
    <div className={'admin-form-container'}>
        <div className={'admin-form-wrapper'}>

            <div className='admin-form'>
                <form onSubmit={adminLogin}>
                    <div><h3>Admin Login</h3></div>

                    <div>
                        <input onChange={userChange} type='text'  name="username"  value={username} placeholder='admin username' required></input>
                    </div>

                    <div>
                        <input onChange={userChange} type='password' name="password" value={password} placeholder='admin password' required></input>
                    </div>


                    <div>
                        <input onChange={userChange} type='email' name="email"  value={email} placeholder='admin email' required></input>
                    </div>



                    <div><button type="submit">Sign In</button></div>
                        <div>{error && <span>{error}</span>}</div>








                </form>
            </div>





        </div>
    </div>




   </>
  )
}

export default Login
