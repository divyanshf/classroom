import React from 'react'
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap'
import Navbar2 from './Navbar2'
import { MdAssignment, MdAssignmentInd,MdCreateNewFolder } from "react-icons/md";
const Classwork = () => {
    return (
        <>
            <Navbar2 />
            <Container className="mt-5">
                <Row>
                    <Col className="mt-5">
                        <h3><MdAssignmentInd style={{fontSize:"30px", marginRight:"10px"}} />View Your Work</h3>
                        <MdCreateNewFolder className="create"/>
                        <div className="d-md-flex justify-content-center align-items-center">
                            <ListGroup variant="flush"  className="mt-5 col-md-7">
                                <ListGroup.Item>
                                    <div className="d-flex justify-content-between">
                                        <div><MdAssignment style={{fontSize:"20px", marginRight:"10px"}}/> Assignment Name</div>
                                        <div>Due Date</div>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="d-flex justify-content-between">
                                        <div><MdAssignment style={{fontSize:"20px", marginRight:"10px"}}/> Assignment Name</div>
                                        <div>Due Date</div>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="d-flex justify-content-between">
                                        <div><MdAssignment style={{fontSize:"20px", marginRight:"10px"}}/> Assignment Name</div>
                                        <div>Due Date</div>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="d-flex justify-content-between">
                                        <div><MdAssignment style={{fontSize:"20px", marginRight:"10px"}}/> Assignment Name</div>
                                        <div>Due Date</div>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Classwork
