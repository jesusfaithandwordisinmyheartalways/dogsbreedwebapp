


import React, { useState, useEffect } from 'react'
import './AuthUserImage.css'




const AuthUserImage = () => {
    const [imageUrl, setImageUrl] = useState('');


    const getCookie = (name) => {
        const cookies = document.cookie.split('; ');
        const cookie = cookies.find(row => row.startsWith(name + '='));
        return cookie ? cookie.split('=')[1] : null;
    };



    const fetchUserImage = async () => {
        try {
            const token = getCookie('profileImage');
            if (!token) {
              const localImage = localStorage.getItem('profileImageUrl');
              if (localImage) {
                setImageUrl(localImage);
              }
              return;
            }

            const response = await fetch('https://dogsbreedwebappserver.onrender.com/images', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                     credentials: 'include',
            })
            const data = await response.json();
            if (response.ok) {
                setImageUrl(data.url);
            }
        }catch(error) {
            console.error('Fetch image error:', error);

        }
    }


    useEffect(() => {
        const localImage = localStorage.getItem('profileImageUrl');
        if (localImage) {
          setImageUrl(localImage);
        }
      }, []);


    useEffect(() => {
        fetchUserImage();
    }, []);





  return (
   <>
          <div className='AuthUserImage-Container'>
                {imageUrl && (
                    <img src={imageUrl} alt="User Profile" className="AuthUserImage-Picture" />
                )}
            </div>


   </>
  )
}

export default AuthUserImage
