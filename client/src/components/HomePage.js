import React, {useContext, useEffect, useState} from 'react'
import { UserContext } from '../context/userContext'
import { Col, Container, Row } from 'react-bootstrap'
import Navbar1 from './Navbar'
import Class_Card from './ClassCard'
import {Link, Redirect, useHistory} from 'react-router-dom'
import { MdCollectionsBookmark } from 'react-icons/md'

const HomePage = () => {
    const [classes, setClasses] = useState([]);
    const [user, setUser] = useState({
        _id: '',
        email: '',
        username: '',
        role:''
    });
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
            if(data.error) throw data.error
            return data;
        } catch (err) {
            hist.push('/signup');
            console.log(err);
        }
    }

    const unenroll = async (id) => {
        try {
            let res = await fetch(`/class/unenroll/${id}`, { method: 'PATCH' });
            res = await res.json();
            if (!res.error) {
                setClasses(prev => {
                    return prev.filter(cls => cls._id !== id);
                })
                return;
            }
            throw res.error
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        const cookies = document.cookie.split(';');
        cookies.forEach(cookie => {
            let cook = decodeURI(cookie);
            cook = cook.split('=').map(c => c.trim());
            if (cook[0] === 'user') {
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
        })

        fetchClasses().then(res => {
            if(res && res.classes)
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
                    {classes && classes.length == 0 ? renderEmpty() : null}
                    {classes && classes.map((val,index) => 
                        <Class_Card
                            key={index}
                            user={user}
                            id = {val._id}
                            classname = {val.title}
                            ClassCode = {val.subjectCode}
                            link = {val.link}
                            admin={val.admin.name}
                            unenroll = {unenroll}
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
