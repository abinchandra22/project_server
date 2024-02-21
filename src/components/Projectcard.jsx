import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import SERVER_URL from '../services/serverUrl';

function Projectcard({project}) {
  // modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card onClick={handleShow} className='shadow mb-5 btn' style={{ width: '25rem' }}>
        <Card.Img variant="top" src={`${SERVER_URL}/uploads/${project?.projectImage}`} />
        <Card.Body>
          <Card.Title>{project?.title}</Card.Title>
        </Card.Body>
      </Card>
      {/* modal */}
      <Modal size='lg' centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className='align-items-center'>
            <Col sm={12} md={6}>
              <img className='img-fluid ' src={`${SERVER_URL}/uploads/${project?.projectImage}`} alt="" />
            </Col>
            <Col sm={12} md={6}>
              <h2 className='fw-bolder text-warning'>{project?.title}</h2>
              <p>Project Overview : <span className='fw-bolder'>{project?.overview}</span></p>
              <p>Language Used : <span className='fw-bolder text-danger'>{project?.languages}</span></p>
            </Col>
          </Row>
          <div className="mt-1">
            <a href={project?.github} target='_blank' className='text-dark ms-5 me-3'><i class="fa-brands fa-github fa-2x"></i></a>
            <a href={project?.website} target='_blank' className='text-dark'><i class="fa-solid fa-link fa-2x"></i></a>

          </div>
        </Modal.Body>

      </Modal>
    </>
  )
}

export default Projectcard