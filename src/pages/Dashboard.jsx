import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Myproject from '../components/Myproject'
import Profile from '../components/Profile'

function Dashboard() {
  const [username,setUsername]= useState("")
  useEffect(()=>{
if(sessionStorage.getItem("username")){
  setUsername(sessionStorage.getItem("username"))
}else{
  setUsername("")
}
  },[])
  return (
    <>
      <Header insideDashboard></Header>
      <div style={{ marginTop: '150px', marginBottom: '20px' }} className='container'>
        <h1>Welcome <span className='text-warning'>{username}</span></h1>
        <div className='row mt-5 '>
          <div className='col-lg-8'>
            <Myproject></Myproject>
          </div>
          <div className='col-lg-4'>
            <Profile></Profile>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard