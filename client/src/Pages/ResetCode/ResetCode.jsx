




import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import './ResetCode.css'




const ResetCode = () => {
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('');
    const [number, setNumber] = useState('');
    const [error, setError] = useState('')
    const [success, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    





    const userResetCode = async (e) => {
        e.preventDefault()
        if (!otp) {
            setError("Please enter the OTP.");
            return;
          }
        try {
            const response = await fetch('https://dogstoreserver.onrender.com/code/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body:JSON.stringify({ email, number, otp })
            })
            const data = await response.json();
            if(data.success) {
                setSuccessMessage(data.message)
                setError('')
                navigate('/confirm', {state: { email }}) 
            } else {
                    setError(data.message)
            }
          }catch(error) {
              console.error('error has occurred', error)
              setError("An error occurred. Please try again.");

        }

    }
    

    


    return (
        <>

            <div  className="reset-container">
                <div className="reset-wrapper">

                    <div><h3>Reset Code</h3></div>

                    <div className="reset-form-wrapper">
                       <div>
                        <form onSubmit={userResetCode}>
                            <div>
                            <div><label>Email: </label></div>
                            <input onChange={(e) => setEmail(e.target.value)}  type="email" value={email}  placeholder="email" required></input>
                            </div>


                            <div>
                            <div><label>Phone Number</label></div>
                            <input  onChange={(e) => setNumber(e.target.value)} pattern="[0-9]{10}"
                             type="tel" value={number} placeholder="mobile number" required></input>
                            </div>


                            <div>
                             <div><label>Verification Code</label></div>
                              <input onChange={(e) => setOtp(e.target.value)} value={otp}  type="text"  placeholder="Enter OTP" required></input>
                            </div>


                            <div><button type="submit">Verify Code</button></div>

                            <div>{error && (<div><p>{error}</p></div>)}</div>
                            <div>{success && (<div><p>{success}</p></div>)}</div>



                        </form>
                       </div>




                    </div>





                </div>
            </div>





        </>
    )
}




export default ResetCode
