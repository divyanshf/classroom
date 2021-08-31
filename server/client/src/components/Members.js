import React, { useState, useEffect } from 'react'
import { Col, Container, Row, ListGroup } from 'react-bootstrap'
import Navbar2 from './Navbar2'
import { FaUserCircle } from "react-icons/fa";
import { useParams } from 'react-router'

const Members = () => {
    const params = useParams();
    const [admin, setAdmin] = useState('');
    const [students, setStudents] = useState([]);

    const fetchClass = async () => {
        try {
            let res = await fetch(`/class/${params.id}`);
            res = await res.json();
            if (!res.error) return res;
            throw res.error;
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchClass().then(res => {
            setAdmin(res.class.admin.name);
            setStudents(res.class.students);
        })
    }, [])

    return (
        <>
            <Navbar2  id={params.id}/>
            <Container className="mt-5">
                <Row>
                    <Col className="mt-5">
                        <div className="d-md-flex justify-content-center align-items-center" style={{textAlign:"left"}}>
                            <div className="col-md-7">
                                <h1 style={{paddingLeft:"15px"}}>Teachers</h1>
                                <hr/>
                            </div>
                        </div>
                        <div className="d-md-flex justify-content-center align-items-center" style={{textAlign:"left"}}>
                            <ListGroup variant="flush" className="col-md-7">
                                <ListGroup.Item className="mb-3">
                                    <div className="d-flex align-items-center">
                                        <FaUserCircle style={{fontSize:"20px", marginRight:"10px"}}/>
                                        <div>{admin}</div>
                                    </div>
                                </ListGroup.Item>                            
                            </ListGroup>
                        </div>
                        {/* ----------------Students------------- */}
                        <div className="mt-4 mb-0 d-md-flex justify-content-center align-items-center" style={{textAlign:"left"}}>
                            <div className="col-md-7">
                                <h1 style={{paddingLeft:"15px"}}>Students</h1>
                                <hr/>
                            </div>
                        </div>
                        <div className="d-md-flex justify-content-center align-items-center"  style={{textAlign:"left"}}>
                            <ListGroup variant="flush" className="col-md-7">
                                {students.map((stud, index) => {
                                    return (
                                    <ListGroup.Item key={index} className="mb-3">
                                        <div className="d-flex align-items-center">
                                            <FaUserCircle style={{fontSize:"20px", marginRight:"10px"}}/>
                                            <div>{stud.user}</div>
                                        </div>
                                    </ListGroup.Item>
                                    );
                                })}
                            </ListGroup>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Members
