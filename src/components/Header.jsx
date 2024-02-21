import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { tokenAuthContext } from '../context/TokenShare';
import { useContext } from 'react';
function Header({insideDashboard}) {
  const{isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)

  const navigate= useNavigate()
  const handlelogout=()=>{
    sessionStorage.clear()
    setIsAuthorised(false)
    navigate('/')
  }
  return (
    <div style={{backgroundColor:'#1be032', width:'100%', position:'fixed',top:'0px',zIndex:'5'}}>
      <Navbar >
        <Container>
          <Link to={'/'} style={{textDecoration:'none'}}>
            <Navbar.Brand  >
            <h1 className='fw-bolder text-light mt-2'>
                  <i style={{ height: '40px' }} className='fa-solid fa-hands-holding-circle'></i>
                  Project Fair
                </h1>
            </Navbar.Brand>
          </Link>
           {
              insideDashboard&&
              <div  className='ms-auto  d-flex'>
                <button onClick={handlelogout} style={{textDecoration:'none'}} className='btn btn-link text-light fw-bolder'>
               Logout
                </button>
              </div>
            }
        </Container>
      </Navbar>
    </div>
  )
}

export default Header