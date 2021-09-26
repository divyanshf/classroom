import React from 'react'
import { NavLink } from 'react-router-dom';
import {Navbar,Nav,Container} from 'react-bootstrap'

const Navbar2 = (props) => {
    return (
        <Navbar collapseOnSelect expand="sm" variant="light" className="nav" fixed="top" >
            <Container>
            <NavLink to="/" className="nav-link" style={{color:"black", fontSize:"larger", fontWeight:"600"}}>Classroom</NavLink>
            <Navbar.Toggle style={{fontSize:"15px"}} aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav style={{marginLeft:"auto"}}>
                    <NavLink className="nav-link" style={{cursor:"pointer"}} to={`/class/${props.id}/stream`}>Stream</NavLink>
                    <NavLink className="nav-link" style={{cursor:"pointer"}} to={`/class/${props.id}/classwork`}>Classwork</NavLink>
                    <NavLink className="nav-link" style={{cursor:"pointer"}} to={`/class/${props.id}/people`}>People</NavLink>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navbar2
