



import React , { useState }  from 'react'
import './UpdateProfile.css'




const UpdateProfile = () => {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(''); 




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
                  } else {
                    alert('Image upload failed.');
                  }
            }catch(error) {
                console.error('Upload error:', error);

            }
    }



  return (
   <>

        <div className='UpdateProfile-Container'>
            <div className='UpdateProfile-Wrapper'>
                {/*---------------ADD CODE TO UPLOAD IMAGE & Cloudinary */}
                
                <div className="Upload-Image-Circle">
               <input onChange={(e) => setFile(e.target.files[0])}  type="file" accept="image/*"  style={{ display: 'none' }} id="upload-input"
            />
               <label htmlFor="upload-input" className="Upload-Button"> Upload Image  </label>
            </div>


            <div>
            <h3>User Update Profile</h3>
            <button onClick={uploadImage}>Submit Image</button>
          </div>



                {imageUrl && (
                        <div style={{ marginTop: '20px' }}>
                            <img src={imageUrl} alt="Profile" style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }} />
                        </div>
                    )}



            </div>
        </div>




   </>
  )
}

export default UpdateProfile
