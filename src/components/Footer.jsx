import React from 'react'
import { Col, Row } from 'react-bootstrap'

function Footer() {
  return (
    <div>

    <div className='p-5  w-100' style={{ color: 'white', backgroundColor:'#2df744' }}>
      <Row>
        <Col lg={3} md={2}>
        <h1 className='fw-bolder text-light mt-2'>
                  <i style={{ height: '40px' }} className='fa-solid fa-hands-holding-circle'></i>
                  Project Fair
                </h1>
          <br />
          <p className='p-3 text-center' style={{ color: 'black' }}>
            Designed and build with all the  love in the world by the Daily-Cart team Possimus recusandae consequatur ipsa veritatis expedita aspernature.

          </p>
        </Col>

        <Col lg={3} md={2}>
          <h4 style={{ color: '#f98306' }} >Link</h4>
          <br />
          <a style={{ color: 'black', textDecoration: 'none' }} href="">Landing Page</a>
          <br />
          <a style={{ color: 'black', textDecoration: 'none' }} href="">Home</a>
          <br />
          <a style={{ color: 'black', textDecoration: 'none' }} href="">Watch History</a>
          <p>

          </p>
        </Col>

        <Col lg={3} md={2}>
          <h4 style={{ color: '#f98306' }}>Guides</h4>
          <br />
          <p style={{ color: 'black' }}>
            React <br />
            React Bootstrap <br />
            Routing
          </p>
          <br />
        </Col>

        <Col lg={3} md={2}>
          <h4 style={{ color: '#f98306' }}>Contact Us</h4>
          <br />
          <input className='w-100' style={{ borderRadius: '10px', backgroundColor: 'wheat' }} type="text" placeholder='enter e-mail' />
          <br />
          <br />
          <button className='w-100' style={{ borderRadius: '20px', backgroundColor: 'red' }} type='button'>Send</button>
          <br />
          <br />
          <a className='p-3' style={{ color: 'white' }} href=""><i class="fa-brands fa-github fa-xl"></i></a>
          <a className='p-3' style={{ color: 'white' }} href=""><i class="fa-brands fa-instagram fa-xl"></i></a>
          <a className='p-3' style={{ color: 'white' }} href=""><i class="fa-brands fa-twitter fa-xl"></i></a>
          <a style={{ color: 'white' }} href=""><i class="fa-brands fa-linkedin fa-xl"></i></a>
        </Col>
      </Row>
    </div>
    

  </div>

  )
}

export default Footer