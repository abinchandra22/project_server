import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import gell from '../assets/gell.png'
import { addProjectAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { addResponseContext } from '../context/Contextshare';

function Add() {
// context 
const {addResponse,setAddResponse} = useContext(addResponseContext)



  const [projectData, setProjectData] = useState({
    title: "", languages: "", overview: "", github: "", website: "", projectImage: ""
  })
  // img uploading
  const [imgFileStatus, setImgFileStatus] = useState(false)
  //img link get outside
  const [preview,setPreview]=useState("")

  const [show, setShow] = useState(false);

  const handleClose = () =>{ 
    setShow(false)
    setProjectData({    title: "", languages: "", overview: "", github: "", website: "", projectImage: ""})
  setPreview(gell)
  }

  const handleProjectUplode = async()=>{
    const {title, languages, overview, github, website, projectImage}=projectData
    if(!title||!languages||!overview || !github ||!website || !projectImage){
      alert("complete")
    }
    else{
     const reqBody = new FormData()
     reqBody.append("title",title)
     reqBody.append("languages",languages)
     reqBody.append("overview",overview)
     reqBody.append("github",github)
     reqBody.append("website",website)
     reqBody.append("projectImage",projectImage)

const token = sessionStorage.getItem("token")
if(token){
  const reqHeader ={
    "Content-Type":"multipart/form-data",
    "Authorization":`Bearer ${token}`
   }
   console.log("proceed to api call");
   try{
    const result =await addProjectAPI(reqBody,reqHeader)
  console.log(result);
  if(result.status===200){
    // toast.success(`New project ${result.data.title} has added successfully`)

    // share response to context
    setAddResponse(result.data)

    handleClose()
  }
  else{
    toast.warning(result.response.data)
  }
  }
  catch(err){
    console.log(err);
  }
}
    }
  }


  const handleShow = () => setShow(true);

  console.log(projectData);

  useEffect(()=>{
    if(projectData.projectImage?.type=="image/png" || projectData.projectImage?.type=="image/jpg" || projectData.projectImage?.type=="image/jpeg"){
      setImgFileStatus(true)
      // URL.createObjectURL it is default function to create url
      setPreview(URL.createObjectURL(projectData.projectImage))
    }
    else{
      setPreview(gell)
      setProjectData({...projectData,projectImage:""})
      setImgFileStatus(false)
    }
  },[projectData.projectImage])
  return (
    <>
      <button onClick={handleShow} style={{ textDecoration: 'none' }} className='btn btn-link text-warning d-flex align-items-center fw-bolder'>
        <i style={{ height: '50px' }} className='fa-solig fa-plus fa-2x me-2'></i>Add Project
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
                <img height={'200px'} width={'200px'} className='img-fluid' src={preview?preview: gell} alt="project uplode pick" />
              </label>
              {/* conditional rendering */}
              {
              !imgFileStatus && <div className='text-danger'>*Uplode only following file type (jpg,png,jpeg)*</div>
              }
            </div>
            <div className='col-lg-8'>
              <div className='mb-3'>
                <input className='border rount p-2 w-100' type="text" placeholder='Project Tit'
                  value={projectData.title} onChange={e=>setProjectData({...projectData,title:e.target.value})} />
              </div>

              <div className='mb-3'>
                <input className='border rount p-2 w-100' type="text" placeholder='Language Used'
                value={projectData.languages} onChange={e=>setProjectData({...projectData,languages:e.target.value})}  />
              </div>

              <div className='mb-3'>
                <input className='border rount p-2 w-100' type="text" placeholder='Project Github Link'
                value={projectData.github} onChange={e=>setProjectData({...projectData,github:e.target.value})}  />
              </div>

              <div className='mb-3'>
                <input className='border rount p-2 w-100' type="text" placeholder='Project Website Link' 
                value={projectData.website} onChange={e=>setProjectData({...projectData,website:e.target.value})} />
              </div>

              <div className='mb-3'>
                <input className='border rount p-2 w-100' type="text" placeholder='Project Overview '
                value={projectData.overview} onChange={e=>setProjectData({...projectData,overview:e.target.value})}  />
              </div>

            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className='bg-danger' onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" className='bg-success' onClick={handleProjectUplode} >Save</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={3000} theme='colored'></ToastContainer>

    </>
  )
}

export default Add