import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Navbar1 from './Navbar'
import Class_Card from './Class_Card'

const HomePage = () => {
    return (
        <>
        <Navbar1/>
         <Container className="mt-5">
             <Row>
                 <Col className="mt-3">
                 <div className="d-flex justify-content-center align-items-center flex-wrap">
                    <Class_Card/>
                    <Class_Card/>
                    <Class_Card/>
                    <Class_Card/>
                    <Class_Card/>
                    <Class_Card/>
                 </div>
                 </Col>
             </Row>
         </Container>   
        </>
    )
}

export default HomePage
