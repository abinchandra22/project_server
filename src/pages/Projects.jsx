import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import Projectcard from '../components/Projectcard'
import { getAllProjectAPI } from '../services/allAPI'
function Projects() {

  // searching
  const [searchkey,setSearchKey] = useState("")
  const [allProject,setAllProject] =useState([])

  const getAllProject = async()=>{
    try{
      const token = sessionStorage.getItem("token")
if(token){
  const reqHeader ={
    "Content-Type":"application/json",
    "Authorization":`Bearer ${token}`
   }
   const result = await getAllProjectAPI(searchkey,reqHeader)
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
},[searchkey])

  return (

    < >
      <Header></Header>
      <div style={{ marginTop: '150px', marginBottom: '20px',  }} className='container-fluid '>
        <div className='d-flex justify-content-between'>
          <h1 className='ms-5'>All Project</h1>
          <input onChange={e=>setSearchKey(e.target.value)} style={{width:'350px'}} type="text" placeholder='Search Project by its Language'/>
        </div>
        <Row className='mt-5 ms-3'>
          { allProject.length>0? allProject?.map((project,index)=>(
                      <Col key={index} sm={12} md={6} lg={4}>
            <Projectcard project={project}></Projectcard>
          </Col>

          )):
          <div className='fw-bolder text-danger fs-4'>Noughting to display</div>

          }
        </Row>
      </div>
    </>
  )
}

export default Projects