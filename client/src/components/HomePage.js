import React, {useContext, useEffect, useState} from 'react'
import { UserContext } from '../context/userContext'
import { Col, Container, Row } from 'react-bootstrap'
import Navbar1 from './Navbar'
import Class_Card from './Class_Card'

const HomePage = () => {
    const [classes,setClasses] = useState([]);

    const fetchClasses = async () => {
        try{
            const res = await fetch('/class', {
                method:"GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            // console.log(data);
            setClasses(data.classes);
        }catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchClasses();
    }, []);

    return (
        <>
        <Navbar1/>
         <Container className="mt-5">
             <Row>
                 <Col className="mt-3">
                 <div className="d-flex justify-content-center align-items-center flex-wrap">
                    {classes.map((val,index) => {
                        <Class_Card
                            id = {val._id}
                            classname = {val.title}
                            ClassCode = {val.subjectcode}
                            link = {val.link}
                            admin = {val.admin}
                        />
                    })
                    }
                 </div>
                 </Col>
             </Row>
         </Container>   
        </>
    )
}

export default HomePage
