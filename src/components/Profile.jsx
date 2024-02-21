import React, { useEffect } from 'react'
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import uplodeProfile from '../assets/profile.jpg'
import SERVER_URL from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {updateUserProfileAPI} from '../services/allAPI'
function Profile() {
  // collaps bootstrap
  const [open, setOpen] = useState(false);

  const [userData, setUserdata] = useState({
    username: "", password: "", email: "", github: "", linkedin: "", profileImage: ""
  })

  const [existingImage, setExistingImage] = useState("")
  const [preview, setPreview] = useState("")

  useEffect(() => {
    if (sessionStorage.getItem("userdetails")) {
      const userdetails = JSON.parse(sessionStorage.getItem("userdetails"))
      setUserdata({...userData, username: userdetails.username, password: userdetails.password, email: userdetails.email, github: userdetails.github, linkedin: userdetails.linkedin })
      setExistingImage(userdetails.profile)
    }
  },[open])

  useEffect(()=>{
    if (userData.profileImage) {
      setPreview(URL.createObjectURL(userData.profileImage))
      
    }else{
      setPreview("")
    }
  },[userData.profileImage])
  console.log(userData);

  const handleProfileUpdate = async (e)=>{
    // prevent autoreloading
    e.preventDefault()
    const {username,password,email,github,linkedin,profileImage} = userData
    if (!github || !linkedin) {
      toast.info("please complete form")
    }else{
      // proside api
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("password",password)
      reqBody.append("email",email)
      reqBody.append("github",github)
      reqBody.append("linkedin",linkedin)
      preview?reqBody.append("profileImage",profileImage):reqBody.append("profileImage",existingImage)

      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader ={
          "Content-Type":preview? "multipart/form-data":"application/json",
          "Authorization":`Bearer ${token}`
        }
        // api call
        try{
          const result = await updateUserProfileAPI(reqBody,reqHeader)
          if(result.status==200){
            setOpen(!open)
            sessionStorage.setItem("userdetails",JSON.stringify(result.data))
          }else{
            console.log(result);
          }
        }catch(err){
          console.log(err);
        }
      }
    }
  }

  return (
    <div className='border rounded p-2'>
      <div className='d-flex justify-content-between'>
        <h2>Profile</h2>
        <button onClick={() => setOpen(!open)} className='btn btn-outline-warning'><i className='fa-solid fa-caret-down fa-beat-fade'></i></button>
      </div>
      <Collapse in={open}>
        <div className='text-center' id="example-collapse-text">

          <form >
            <label >
              <input type="file" style={{ display: 'none' }}  onChange={e=>setUserdata({...userData,profileImage:e.target.files[0]})} />
              {/* conditional rendering for img */}
              {existingImage == "" ?
                <img width={'200px'} height={'200px'} className='img-fluid rounde-circle mt-3' src={preview? preview:uplodeProfile} alt="uplode profile pick" />
                :
                <img width={'200px'} height={'200px'} className='img-fluid rounde-circle mt-3' src={ preview?preview:`${SERVER_URL}/uploads/${existingImage}`} alt="uplode profile pick" />

              }
            </label>
            <div className='mb-3 mt-3' >
              <input type="text" className='rounded p-1 w-75' placeholder='Enter your Github link Here' value={userData.github} onChange={e=>setUserdata({...userData,github:e.target.value})}/>
            </div>
            <div className='mb-3'>
              <input type="text" className='rounded p-1 w-75' placeholder='Enter your Linkedin link Here'value={userData.linkedin} onChange={e=>setUserdata({...userData,linkedin:e.target.value})} />
            </div>
            <div className='mb-3 d-grid w-75 mx-auto'>
              <button onClick={handleProfileUpdate} className='btn btn-warning'>Update</button>
            </div>

          </form>
        </div>
      </Collapse>
      <ToastContainer autoClose={3000} theme='colored'></ToastContainer>

    </div>
  )
}

export default Profile