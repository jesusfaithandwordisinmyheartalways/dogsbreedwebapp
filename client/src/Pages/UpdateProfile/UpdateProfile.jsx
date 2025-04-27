



import React , { useState,  useEffect }  from 'react'
import './UpdateProfile.css'




const UpdateProfile = () => {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(''); 


    useEffect(() => {
      const savedImage = localStorage.getItem('profileImageUrl');
      if (savedImage) {
        setImageUrl(savedImage);
      }
    }, []);





    const uploadImage = async () => {
        if (!file) {
            alert('Please select an image to upload');
            return;
          }
      
          const formData = new FormData();
          formData.append('image', file);


            try {
                const response = await fetch('https://dogsbreedwebappserver.onrender.com/upload/profile' , {
                    method: 'POST',
                    body: formData,
                    credentials: 'include'
                })
                const data = await response.json();
                if (response.ok) {
                    alert('Image uploaded successfully!');
                    console.log(data); // { url: 'cloudinary-image-url' }
                    setImageUrl(data.url);
                    localStorage.setItem('profileImageUrl', data.url);
                  } else {
                    alert('Image upload failed.');
                  }
            }catch(error) {
                console.error('Upload error:', error);

            }
    }






    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      if (selectedFile) {
          const tempUrl = URL.createObjectURL(selectedFile);
          setImageUrl(tempUrl); // Show preview immediately
      }
  }



  return (
   <>

        <div className='UpdateProfile-Container'>
            <div className='UpdateProfile-Wrapper'>

            <div className="Upload-Image-Circle">
            {imageUrl && (
              <img  src={imageUrl}  alt="Profile"  className="Upload-Image-Preview"/>
               )}

            <input onChange={handleFileChange} type="file"
              accept="image/*"
              style={{ display: 'none' }}
              id="upload-input"
            />
            <label htmlFor="upload-input" className="Upload-Button"> Upload Image </label>
          </div>


          <div>
            <h3>User Update Profile</h3>
            <button onClick={uploadImage} className='img-btn'>Submit Image</button>
          </div>
      
                

            </div>
        </div>




   </>
  )
}

export default UpdateProfile
