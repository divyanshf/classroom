import React from 'react'
import { NavLink } from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap'

const Navbar2 = () => {
    return (
        <Navbar collapseOnSelect expand="sm" bg="light" className="nav" fixed="top" >
            <Navbar.Brand href="#">Classroom</Navbar.Brand>
            <Navbar.Toggle style={{fontSize:"15px"}} aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav style={{marginLeft:"auto"}}>
                    <NavLink className="nav-link" style={{cursor:"pointer"}} to="/1">Stream</NavLink>
                    <NavLink className="nav-link" style={{cursor:"pointer"}} to="/2">Classwork</NavLink>
                    <NavLink className="nav-link" style={{cursor:"pointer"}} to="/3">People</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navbar2
