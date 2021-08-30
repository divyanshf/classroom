import React, { useState } from 'react'
import {Navbar,Modal,Button, Form,Nav} from 'react-bootstrap'
import { AiOutlinePlus } from "react-icons/ai";
import { NavLink } from 'react-router-dom';


const Navbar1 = () => {
    const [modalShow, setModalShow] = useState(false);
    const [modalShow1, setModalShow1] = useState(false);
    
    function MyVerticallyCenteredModal(props) {
        const [code,setCode] = useState('');
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
                Class Code
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                Enter the class code.
              </p>
              <Form>
                <Form.Group>
                    <Form.Control type="text" name="code" id="code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Class Code" />
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-danger" onClick={props.onHide}>Close</Button>
              <Button variant="outline-success" onClick={props.onHide}>Submit</Button>
            </Modal.Footer>
          </Modal>
        );
    }
    
    function MyModal(props) {
        const [name,setName] = useState('');
        const [subjectcode,setSubjectcode] = useState('');
        const [link,setLink] = useState('');
        const [books,setBooks] = useState('');

        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
                Create Class
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                    <Form.Control type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Class Name (required)" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" name="subjectcode" id="subjectcode" value={subjectcode} onChange={(e) => setSubjectcode(e.target.value)} placeholder="Subject Code" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" name="link" id="link" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Link to the Video room" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" name="books" id="books" value={books} onChange={(e) => setBooks(e.target.value)} placeholder="Recommended Books" />
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-danger" onClick={props.onHide}>Close</Button>
              <Button variant="outline-success" onClick={props.onHide}>Submit</Button>
            </Modal.Footer>
          </Modal>
        );
    }

    return (
        <Navbar bg="light" className="nav" fixed="top">
            <NavLink to="/" className="nav-link" style={{color:"black", fontSize:"20px"}}>Classroom</NavLink>
            <Nav>
                {/* For Students */}
                <button className="navbtn" onClick={() => setModalShow(true)}><AiOutlinePlus style={{fontSize:"20px"}} /></button>
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
                {/* For Admin */}
                <button className="navbtn" onClick={() => setModalShow1(true)}><AiOutlinePlus style={{fontSize:"20px"}} /></button>
                <MyModal
                    show={modalShow1}
                    onHide={() => setModalShow1(false)}
                />
                <NavLink className="nav-link" style={{cursor:"pointer"}} to="/signin">SignIn</NavLink>
                <NavLink className="nav-link" style={{cursor:"pointer"}} to="/signup">SignUp</NavLink>
                <NavLink className="nav-link" style={{cursor:"pointer"}} to="/3">Logout</NavLink>
            </Nav>
        </Navbar>
    )
}

export default Navbar1
