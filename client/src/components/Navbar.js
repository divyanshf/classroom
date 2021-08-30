import React, { useState } from 'react'
import {Navbar,Modal,Button, Form} from 'react-bootstrap'
import { AiOutlinePlus } from "react-icons/ai";


const Navbar1 = () => {
    const [modalShow, setModalShow] = useState(false);
    
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
                <Form.Group controlId="exampleForm.ControlInput1">
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

    return (
        <Navbar bg="light" className="nav" fixed="top">
            <Navbar.Brand href="#">Classroom</Navbar.Brand>
            <button className="navbtn" onClick={() => setModalShow(true)}><AiOutlinePlus style={{fontSize:"20px"}} /></button>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </Navbar>
    )
}

export default Navbar1
