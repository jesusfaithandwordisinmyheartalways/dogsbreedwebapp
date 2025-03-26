



import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import './ForgotPassword.css'




const ForgotPassword = () => {
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [radio, setRadio] = useState(null);
    const [error, setError] = useState("");
    const [countryCode, setCountryCode] = useState('+1'); // Default to US
    const navigate = useNavigate();
    


     // Load saved radio selection from localStorage on component mount
  useEffect(() => {
    const savedRadio = localStorage.getItem('forgotPasswordRadio');
    if (savedRadio) {
      setRadio(savedRadio); // Load saved radio selection
    }
  }, []);

  // Save radio selection to localStorage whenever it changes
  useEffect(() => {
    if (radio !== null) {
      localStorage.setItem('forgotPasswordRadio', radio);
    }
  }, [radio]);





    const userForgotPassword = async (e) => {
        e.preventDefault()
        const formattedNumber = `${countryCode}${number}`
        const forgotData = { number: formattedNumber, email }
        console.log(forgotData)
        if (!radio) {
            setError("Please select a reset method (Email or SMS).");
            return;
          }

        try {
            const response = await fetch('http://localhost:3001/reset/forgot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body:JSON.stringify(forgotData)
            })
                const data = await response.json()
                if(data.success) {
                    console.log(data)//debugging
                    navigate('/verify', {state: { email, formattedNumber }})
                } else{
                    setError(data.message)
                }
        }catch(error) {
                console.error('error', error)
                setError("An error occurred. Please try again.");


        }
    }



    return (
        <>
        <div className='ForgotPassword-Container'> 
            <div className='ForgotPassword-Wrapper'>

                <div className='forgot-form'>
                    <form onSubmit={userForgotPassword}>
                    <div><h3>How would you like to reset your password?</h3></div>
                     <div className='forgot-form-section'>
                        <div className='forgot-radio-wrapper'>
                             <div><input checked={radio === 'email'} onChange={() => setRadio('email')} name="resetMethod" type='radio' ></input>Email</div>
                             <div><input checked={radio === 'sms'} onChange={() => setRadio('sms')} name="resetMethod" type='radio' ></input>Text Message (SMS)</div>
                        </div>


                             {radio === 'email' && (
                                <div className='email-forgot-passwrd-wrapper'>
                                    <div><p>We will send you an email with instructions on how to reset your password.</p></div>
                                    <div><input onChange={(e) => setEmail(e.target.value)}  type='email' placeholder='name@example.com' required></input></div>
                                    <div><button type='submit'> Email Me</button></div>
                                </div>
                             )}

                             {radio === 'sms' && (
                                <div className='sms-forgot-passwrd-wrapper'>
                                    <div><p>We will text you a verification code to reset your password. Message and data rates may apply.</p></div>
                                     <div className='phone-input-wrapper'>
                                        <select onChange={(e) => setCountryCode(e.target.value)} value={countryCode}>
                                            <option value="+1">🇺🇸 +1 (USA)</option>
                                            <option value="+44">🇬🇧 +44 (UK)</option>
                                            <option value="+91">🇮🇳 +91 (India)</option>
                                            <option value="+61">🇦🇺 +61 (Australia)</option>
                                            <option value="+33">🇫🇷 +33 (France)</option>
                                        </select>

                                     <div><input onChange={(e) => setNumber(e.target.value)}  type="tel" value={number} 
                                       pattern="[0-9]{10}" placeholder="enter number" required></input></div>

                                     </div>
                                   
                                    <div><button type='submit'> Text Me</button></div>

                                </div>
                             )}

                     </div>


                    </form>
                </div>




            </div>
        </div>





        </>
    )
}


export default ForgotPassword