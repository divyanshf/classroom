import React, {useContext, useEffect, useState} from 'react'
import { UserContext } from '../context/userContext'
import { Col, Container, Row } from 'react-bootstrap'
import Navbar1 from './Navbar'
import Class_Card from './Class_Card'
import {Link, Redirect, useHistory} from 'react-router-dom'

const HomePage = () => {
    const [classes, setClasses] = useState([]);
    const [user, setUser] = useContext(UserContext)
    const hist = useHistory();

    const fetchClasses = async () => {
        try{
            const res = await fetch('/class', {
                method:"GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            return data;
        } catch (err) {
            hist.push('/signup');
            console.log(err);
        }
    }

    useEffect(() => {
        fetchClasses().then(res => {
            setClasses(res.classes);
        });
    }, []);

    const renderEmpty = () => {
        return (
            <div>
                No classes available yet.
            </div>
        );
    }

    return (
        <>
        <Navbar1/>
         <Container className="mt-5">
             <Row>
                 <Col className="mt-3">
                 <div className="d-flex justify-content-center align-items-center flex-wrap">
                    {classes.length == 0 ? renderEmpty() : null}
                    {classes.map((val,index) => 
                        <Class_Card
                            key={index}
                            id = {val._id}
                            classname = {val.title}
                            ClassCode = {val.subjectCode}
                            link = {val.link}
                            admin = {val.admin.name}
                        />
                    )
                    }
                 </div>
                 </Col>
             </Row>
         </Container>   
        </>
    )
}

export default HomePage
