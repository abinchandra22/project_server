import React from 'react'
import Add from './Add'
import Edit from './Edit'
import { useState,useEffect } from 'react'
import { deleteProjectAPI, getUserProjectAPI } from '../services/allAPI'
import { useContext } from 'react'
import { addResponseContext } from '../context/Contextshare';
import { updateResponseContext } from '../context/Contextshare';

function Myproject() {
// context
const {addResponse,setAddResponse} = useContext(addResponseContext)

const {editResponse,setEditResponse} = useContext(updateResponseContext)


// userproject...

  const [allProject,setAllProject] =useState([])

  const getAllProject = async()=>{
    try{
      const token = sessionStorage.getItem("token")
if(token){
  const reqHeader ={
    "Content-Type":"application/json",
    "Authorization":`Bearer ${token}`
   }
   const result = await getUserProjectAPI(reqHeader)
   if (result.status === 200) {
    setAllProject(result.data)
   }

    }

  }catch(err){
    console.log(err);
  }
}

console.log(allProject);
useEffect(()=>{
  getAllProject()
},[addResponse,editResponse])

// delete
const handleDeleteProject = async (prijectId)=>{
  const token = sessionStorage.getItem("token")
  if (token) {
    const reqHeader ={
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
     }
     try{
      const result = await deleteProjectAPI(prijectId,reqHeader)
      if (result.status==200) {
        getAllProject()
      }else{
        console.log(result);
      }
     }catch(err){
      console.log(err);
     }
  
  }
}

  return (
    <div className='border round p-2'>
      <div className='d-flex justify-content-between'>
        <h2>My project </h2>
        <Add></Add>
      </div>
      <div className='mt-4'>
      { allProject.length>0? allProject?.map((project,index)=>(

        <div key={index} className='border rounded d-flex justify-content-between align-items-center'>
        <h4 className='ms-3'> {project?.title} </h4>
        <div className='icon d-flex align-items-center'>
          <Edit project={project} ></Edit>
          <a href={project?.github} className='btn btn-link ms-2'> <i className='fa-brands text-info fa-github fa-2x'></i></a>
          <button onClick={()=>handleDeleteProject(project._id)} className='btn btn-link text-danger ms-2'><i className='fa-solid fa-trash text-danger fa-2x'></i> </button>
        </div>
      </div>

          )):
          <div className='fw-bolder text-danger fs-4'>Noughting to display</div>

          }


      </div>
    </div>
  )
}

export default Myproject