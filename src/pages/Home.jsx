import React, { useEffect, useState } from 'react'
import landing from '../assets/landing.jpg'
import { Link, useNavigate } from 'react-router-dom'
import Projectcard from '../components/Projectcard'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { getHomeProjectAPI } from '../services/allAPI';

function Home() {
  // homeproject
  const [allProject,setAllProject]= useState([])

  // change button name
  const [loginStatus, setLoginStatus] = useState(false)
  const navigate = useNavigate()

  // call from api homeproject
const getHomeProject = async ()=>{
  try{
    const result= await getHomeProjectAPI()
    if(result.status===200){
      setAllProject(result.data)
    }
  }catch(err){
    console.log(err);
  }
}
console.log(allProject);
  useEffect(() => {
    getHomeProject()
    if (sessionStorage.getItem("token")) {
      setLoginStatus(true)
    } else {
      setLoginStatus(false)
    }
  }, [])
  // view moreprojects
  const handleNavigate = () => {
    if (loginStatus === true) {
      navigate('/projects')
    }
    else {
      toast.warning("Please login to get full ascess!!")
    }

  }
  return (
    <div>
      <div style={{ height: '100vh', backgroundColor: '#1be032', color: 'white' }} className='w-100 d-flex justify-content-center align-items-center'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <h1 style={{ fontSize: '80px' }} className='fw-bolder text-align mb-3'>
                <i style={{ height: '85px' }} className='fa-solid fa-hands-holding-circle'></i>
                Project Fair
              </h1>
              <p style={{ textAlign: 'justify', color: 'black' }}>One Stop destination for all Software Developement Projects.where Users can add and manage their projects. As well as access all the projects avaibale in our website...What are you waiting for!!!</p>
              {loginStatus ? <Link className='btn btn-warning mt-3' to={'/dashboard'}>Manage Your Projects <i className='fa-solid fa-arrow-right'></i></Link>
                : <Link className='btn btn-warning mt-3' to={'/login'}>Start to Explore <i className='fa-solid fa-arrow-right'></i></Link>
              }
            </div>
            <div className='col-lg-1'></div>
            <div className='col-lg-4'>
              <img className='img-fluid' src={landing} alt="landing" />
            </div>
          </div>
        </div>
      </div>
      {/* all projects */}
      <div className='mt-5'>
        <h1 className='text-center mb-5'>Explore Our Project</h1>
        <marquee >
          <div className='d-flex'>
            {allProject.length>0 &&
            allProject.map((project,index)=>(
              <div key={index} className='project me-5'>
              <Projectcard project={project}></Projectcard>
            </div>
            ))}
            
          </div>
        </marquee>
        <div className='text-center'>
          <ToastContainer autoClose={3000} theme='colored'></ToastContainer>
          <button onClick={handleNavigate} className='btn btn-link'>View More Project</button>
        </div>
      </div>
    </div>

  )
}

export default Home