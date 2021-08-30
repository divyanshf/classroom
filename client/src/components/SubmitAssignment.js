import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Navbar2 from './Navbar2'

const SubmitAssignment = () => {
    return (
        <>
            <Navbar2 />
            <Container className="p-5">
                <Row className="mt-5">
                    <Col>
                        <h1>Solve the Assignment</h1>
                    </Col>
                </Row>
            </Container>   
        </>
    )
}

export default SubmitAssignment
