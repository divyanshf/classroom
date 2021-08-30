import React,{ useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Col, Container, Row,Form,Button, Media, Image,Spinner } from 'react-bootstrap'
import { MdAccountBox, MdEmail, MdLock } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";

import Navbar1 from './Navbar';

const SignUp = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loader, setLoader] = useState(false);

    return (
        <>
        <Navbar1/>
         <Container className="p-5 p-md-0">
             <Row className="mt-5 justify-content-center align-content-center">
                 <Col md="12" xl="6" className="mt-5 p-md-5 p-sm-5 mb-5 bg-white align-content-center justify-content-center form_bg">
                     <h3 className="mb-5 mt-4">Sign Up</h3>
                     <Form className="mb-5 ">
                         <Form.Group as={Row} className="mb-3 justify-content-center align-content-center">
                            <Form.Label column md="1" xs="1"><MdAccountBox style={{fontSize:"20px"}}/></Form.Label>
                            <Col md="8" xs="10">
                                <Form.Control className="form_bg1" name="name" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Username" autoComplete="off"/>
                            </Col>
                         </Form.Group>
                         <Form.Group as={Row} className="mb-3 justify-content-center align-content-center">
                            <Form.Label column md="1" xs="1"><MdEmail style={{fontSize:"20px"}}/></Form.Label>
                            <Col md="8" xs="10">
                                <Form.Control className="form_bg1" name="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" autoComplete="off"/>
                            </Col>
                         </Form.Group>
                         <Form.Group as={Row} className="mb-3 justify-content-center align-content-center">
                            <Form.Label column md="1" xs="1"><MdLock style={{fontSize:"20px"}}/></Form.Label>
                            <Col md="8" xs="10">
                                <Form.Control className="form_bg1" name="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" autoComplete="off"/>
                            </Col>
                         </Form.Group>
                         <Form.Group as={Row} className="mb-3 justify-content-center align-content-center">
                            <Form.Label column md="1" xs="1"><FaChalkboardTeacher style={{fontSize:"20px"}}/></Form.Label>
                            <Col md="8" xs="10">
                                <Form.Control as="select" className="form_bg1">
                                    <option>Student</option>
                                    <option>Teacher</option>
                                </Form.Control>
                            </Col>
                         </Form.Group>
                         <Form.Group as={Row} className="mt-4 justify-content-center align-content-center">
                            <Col md="8" xs="10">
                                <Button className="button">Create Account</Button>
                            </Col>
                         </Form.Group>
                     </Form>
                     <p><NavLink className="nav-link" to="/signin">Already have an account? Sign in</NavLink></p>
                 </Col>
             </Row>
         </Container>
        </>
    )
}

export default SignUp
