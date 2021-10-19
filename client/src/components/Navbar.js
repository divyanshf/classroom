import React, { useState, useEffect } from 'react'
import {Navbar,Modal,Button, Form,Nav, Container} from 'react-bootstrap'
import { AiOutlinePlus } from "react-icons/ai";
import { NavLink, useHistory } from 'react-router-dom';


const Navbar1 = () => {
    const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);
  const hist = useHistory();
  const [user, setUser] = useState({
        _id: '',
        email: '',
        username: '',
        role:''
  });
  
  useEffect(() => {
    const cookies = document.cookie.split(';');
        cookies.forEach(cookie => {
            let cook = decodeURI(cookie);
            cook = cook.split('=').map(c => c.trim());
            if (cook[0] === 'user') {
              try{
                console.log('parse');
                let data = decodeURIComponent(cook[1]);
                if(data){
                  const temp = JSON.parse(decodeURIComponent(cook[1]));
                  if(temp)
                    setUser(() => {
                        return {
                            _id: temp._id,
                            email: temp.email,
                            username: temp.username,
                            role:temp.role
                        }
                    });
                }
                else throw 'Unverified user'
              }catch(e){
                console.log(e);
                setUser({
                  _id: '',
                  email: '',
                  username: '',
                  role:''
                })
              }
            }
        })
  }, [])

  const logout = async () => {
    try {
      let res = await fetch('/auth/logout');
      console.log(res);
      res = await res.json();
      console.log(res);
      if (res.success) {
        hist.push('/signup');
      }
      else throw res.error;
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    console.log(user);
  }, [user])

    function MyVerticallyCenteredModal(props) {
      const [code, setCode] = useState('');
      const [error, setError] = useState('');

      const submit = async () => {
        let res = await fetch(`/class/join/${code}`, {method: 'PATCH', headers: {
            'Content-Type':'application/json'
        }})
        res = await res.json();
        if (res.error) {
          setError(res.error);
        }
        else {
          props.onHide();
          window.location.reload();
        }
      }

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
            <p>{error}</p>
            <Modal.Footer>
              <Button variant="outline-danger" onClick={props.onHide}>Close</Button>
              <Button variant="outline-success" onClick={submit}>Submit</Button>
            </Modal.Footer>
          </Modal>
        );
    }
    
    function MyModal(props) {
      const [name,setName] = useState('');
      const [subjectcode,setSubjectcode] = useState('');
      const [books, setBooks] = useState('');
      const [error, setError] = useState('');
      
      const submit = async () => {
        let res = await fetch('/class', {
          method: 'POST',
          body: JSON.stringify({
            title: name,
            subjectCode: subjectcode,
            books: books.split(','),
          }),
          headers: {
            'Content-Type':'application/json'
          }
        })

        res = await res.json();
        if (res.error) {
          setError(res.error)
        }
        else {
          props.onHide();
          window.location.reload();
        }
      }

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
                    <Form.Control type="text" name="books" id="books" value={books} onChange={(e) => setBooks(e.target.value)} placeholder="Recommended Books" />
                </Form.Group>
            </Form>
            </Modal.Body>
            <p> {error} </p>
            <Modal.Footer>
              <Button variant="outline-danger" onClick={props.onHide}>Close</Button>
              <Button variant="outline-success" onClick={submit}>Submit</Button>
            </Modal.Footer>
          </Modal>
        );
    }

    return (
        <Navbar collapseOnSelect expand="sm" variant="light" className="nav" fixed="top">
          <Container>
            {user._id ?
              <NavLink to="/" className="nav-link" style={{color:"black", fontSize:"larger", fontWeight:"600"}}>Classroom</NavLink>
              :
              <NavLink to="/signin" className="nav-link" style={{color:"black", fontSize:"larger", fontWeight:"600"}}>Classroom</NavLink>
            }
            <Navbar.Toggle style={{fontSize:"15px"}} aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav style={{marginLeft:"auto",justifyContent:"center",alignItems:"center"}}>
                  {user._id ?
                    <>
                      <button className="navbtn" style={{justifyContent:"center", alignItems:"center"}} 
                              onClick={() => { user.role === 'Student' ? setModalShow(true) : setModalShow1(true) }}><AiOutlinePlus style={{ fontSize: "20px" }} />
                      </button> 
                      <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
                      <MyModal show={modalShow1} onHide={() => setModalShow1(false)} />
                        <button className="btn btn-danger button1" onClick={()=>{logout()}} style={{cursor:"pointer"}}>Logout</button>
                    </>
                    :
                    <NavLink className="nav-link" style={{cursor:"pointer"}} to="/signin">Login</NavLink>
                  }
            </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    )
}

export default Navbar1
