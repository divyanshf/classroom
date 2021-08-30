import React from 'react'
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap'
import Navbar2 from './Navbar2'
import { MdAssignment, MdAssignmentInd,MdCreateNewFolder } from "react-icons/md";
import { useParams } from 'react-router'
import { NavLink } from 'react-router-dom';

const Classwork = () => {
    const params = useParams();
    return (
        <>
            <Navbar2  id={params.id} />
            <Container className="mt-5">
                <Row>
                    <Col className="mt-5">
                        <h3><MdAssignmentInd style={{fontSize:"30px", marginRight:"10px"}} />View Your Work</h3>
                        <NavLink to={`/class/${params.id}/assign/create`} className="nav-link" style={{color:"black"}}><MdCreateNewFolder className="create"/></NavLink>
                        <div className="d-md-flex justify-content-center align-items-center">
                            <ListGroup variant="flush"  className="mt-5 col-md-7">
                                <NavLink to={`/assign/${1}/submit`} className="mb-3"  style={{color:"black", border:"none", textDecoration:"none"}}>
                                    <ListGroup.Item>
                                        <div className="d-flex justify-content-between">
                                            <div><MdAssignment style={{fontSize:"20px", marginRight:"10px"}}/> Assignment Name</div>
                                            <div>Due Date</div>
                                        </div>
                                    </ListGroup.Item>
                                </NavLink>
                                <NavLink to={`/assign/${1}/submit`} className="mb-3"  style={{color:"black", border:"none", textDecoration:"none"}}>
                                    <ListGroup.Item>
                                        <div className="d-flex justify-content-between">
                                            <div><MdAssignment style={{fontSize:"20px", marginRight:"10px"}}/> Assignment Name</div>
                                            <div>Due Date</div>
                                        </div>
                                    </ListGroup.Item>
                                </NavLink>
                                <NavLink to={`/assign/${1}/submit`} className="mb-3"  style={{color:"black", border:"none", textDecoration:"none"}}>
                                    <ListGroup.Item>
                                        <div className="d-flex justify-content-between">
                                            <div><MdAssignment style={{fontSize:"20px", marginRight:"10px"}}/> Assignment Name</div>
                                            <div>Due Date</div>
                                        </div>
                                    </ListGroup.Item>
                                </NavLink>
                            </ListGroup>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Classwork
