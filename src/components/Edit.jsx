import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import gell from '../assets/gell.png'
import SERVER_URL from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { updateProjectAPI } from '../services/allAPI';
import { updateResponseContext } from '../context/Contextshare';

function Edit({project}) {
  // context
  const {editResponse,setEditResponse} = useContext(updateResponseContext)

  const [projectData, setProjectData] = useState({
   id:project._id , title: project.title, languages: project.languages, overview: project.overview, github: project.github, website: project.website, projectImage: ""
  })

  // edit
  const [preview,setPreview]=useState("")




  const [show, setShow] = useState(false);

  const handleClose = () =>{
    setShow(false)
    setProjectData({   id:project._id , title: project.title, languages: project.languages, overview: project.overview, github: project.github, website: project.website, projectImage: ""
  })
  setPreview("")
  
  } 
  const handleShow = () => setShow(true);


  useEffect(()=>{
    if(projectData.projectImage){
setPreview(URL.createObjectURL(projectData.projectImage))
    }
    else{
setPreview("")
    }
  },[projectData.projectImage])

  const handleUpdateProject = async ()=>{
    const {id , title, languages, overview, github, website, projectImage}  = projectData
    if (!title || !languages || !overview || !github || !website) {
      toast.info("Please complete the form completly..")
    }else{
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)
       

      const token = sessionStorage.getItem("token")
if(token){
  const reqHeader ={
    "Content-Type":preview? "multipart/form-data":"application/json",
    "Authorization":`Bearer ${token}`
   }
   console.log("proceed to api call");
try{
  const result = await updateProjectAPI(id,reqBody,reqHeader)
  if (result.status==200) {
    handleClose()
    // share response to ,myproject component using contextshare
    setEditResponse(result.data)
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
    <>
    <button onClick={handleShow} style={{textDecoration:'none'}} className='btn btn-link text-success d-flex align-items-center fw-bolder'>
      <i style={{height:'34px'}} className='fa-solid fa-edit fa-2x '></i>
    </button>

    <Modal centered size='lg'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-lg-4'>
              <label className='w-100 d-flex align-items-center flex-column justify-content-center'>
              <input type="file" style={{ display: 'none' }} onChange={e => setProjectData({ ...projectData, projectImage: e.target.files[0] })} />

                <img height={'200px'} width={'200px'} className='img-fluid' src= {preview?preview:`${SERVER_URL}/uploads/${project.projectImage}`} alt="project uplode pick" />
              </label>
            </div>
            <div className='col-lg-8'>
              <div className='mb-3'>
                <input className='border rount p-2 w-100' type="text" placeholder='Project Title' value={projectData.title} onChange={e => setProjectData({ ...projectData, title: e.target.value })}/>
                 </div>

                 <div className='mb-3'>
                <input className='border rount p-2 w-100' type="text" placeholder='Language Used' value={projectData.languages} onChange={e => setProjectData({ ...projectData, languages: e.target.value })}/>
                 </div>

                 <div className='mb-3'>
                <input className='border rount p-2 w-100' type="text" placeholder='Project Github Link' value={projectData.github} onChange={e => setProjectData({ ...projectData, github: e.target.value })}/>
                 </div>

                 <div className='mb-3'>
                <input className='border rount p-2 w-100' type="text" placeholder='Project Website Link' value={projectData.website} onChange={e => setProjectData({ ...projectData, website: e.target.value })}/>
                 </div>

                 <div className='mb-3'>
                <input className='border rount p-2 w-100' type="text" placeholder='Project Overview ' value={projectData.overview} onChange={e => setProjectData({ ...projectData, overview: e.target.value })}/>
                 </div>

            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className='bg-danger' onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleUpdateProject} variant="primary" className='bg-success'>Update</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={3000} theme='colored'></ToastContainer>

    </>

  )
}

export default Edit