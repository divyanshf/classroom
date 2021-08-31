import React, { useState, useEffect } from 'react'
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap'
import Navbar2 from './Navbar2'
import { MdAssignment, MdAssignmentInd,MdCreateNewFolder } from "react-icons/md";
import { useParams } from 'react-router'
import { NavLink, useLocation } from 'react-router-dom';

const Classwork = () => {
    const [assigns, setAssigns] = useState([]);
    const params = useParams();
    const [user, setUser] = useState({
        _id: '',
        email: '',
        username: '',
        role:''
    });



    const fetchAssigns = async () => {
        try {
            let res = await fetch(`/class/${params.id}/assign`);
            res = await res.json();
            if (res.assigns) return res;
            throw res.error
        }
        catch (e) {
            console.log(e);
        }
    }

    const renderEmpty = () => {
        return (
            <div>
                <p> No assignments available </p>
            </div>
        );
    }

    useEffect(() => {
        const cookies = document.cookie.split(';');
        cookies.forEach(cookie => {
            let cook = decodeURI(cookie);
            cook = cook.split('=').map(c => c.trim());
            if (cook[0] === 'user') {
                const temp = JSON.parse(decodeURIComponent(cook[1]));
                setUser(() => {
                    return {
                        _id: temp._id,
                        email: temp.email,
                        username: temp.username,
                        role:temp.role
                    }
                });
            }
        })

        fetchAssigns().then(res => {
            setAssigns(res.assigns);
        });

    }, [])

    useEffect(()=>{

        console.log(user)

    }, [user])

    return (
        <>
            <Navbar2  id={params.id} />
            <Container className="mt-5">
                <Row>
                    <Col className="mt-5">
                        <h3><MdAssignmentInd style={{fontSize:"30px", marginRight:"10px"}} />View Your Work</h3>
                        {user.role === "Teacher" && <NavLink to={`/class/${params.id}/assign/create`} className="nav-link" style={{color:"black"}}><MdCreateNewFolder className="create"/></NavLink>}
                        <div className="d-md-flex justify-content-center align-items-center">
                            <ListGroup variant="flush"  className="mt-5 col-md-7">
                                {assigns.length === 0 ? renderEmpty() : null}
                                {assigns.map((ass, index) =>
                                    <NavLink key={index} to={`/assign/${ass._id}/submit`} className="mb-3" style={{ color: "black", border: "none", textDecoration: "none" }}>
                                        <ListGroup.Item>
                                            <div className="d-flex justify-content-between">
                                                <div><MdAssignment style={{fontSize:"20px", marginRight:"10px"}}/> {ass.title}</div>
                                                <div>{ass.due}</div>
                                            </div>
                                        </ListGroup.Item>
                                    </NavLink>
                                )}
                            </ListGroup>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Classwork
