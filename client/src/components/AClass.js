import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Jumbotron, Card,Form, Button } from 'react-bootstrap'
import Navbar2 from './Navbar2'
import {Link, useParams} from 'react-router-dom'

const A_Class = () => {
    const [details, setDetails] = useState({
        id:'',
        ClassCode: '',
        admin: '',
        classname: '',
        link:''
    });
    const [expand, setExpand] = useState(false);
    const [announce, setAnnounce] = useState('');
    const [error, setError] = useState('');
    const [posts, setPosts] = useState([]);

    const params = useParams();

        const fetchCls = async () => {
            try {
                let res = await fetch(`/class/${params.id}`, {
                });
                res = await res.json();
                if (res.error) {
                    setError(res.error);
                }
                else return res;
            } catch (e) {
                console.log(e);
            }
        }
        const fetchPosts = async () => {
            try {
                let res = await fetch(`/class/${params.id}/posts`);
                res = await res.json();
                if (res.error) {
                    setError(res.error);
                }
                else return res;
            } catch (e) {
                console.log(e);
            }
    };
    
    useEffect(() => {

        fetchPosts().then(res => {
            if(res && res.posts)
                setPosts(res.posts)
        });

        fetchCls().then(res => {
            setDetails(() => {
                return {
                    id:res.class._id,
                    ClassCode: res.class.subjectCode,
                    admin: res.class.admin.name,
                    classname: res.class.title,
                    link:res.class.link
                }
            });
        })
    }, [])

    const submitPost = async () => {
        try {
            let res = await fetch(`/class/${details.id}/posts`, {
                method: 'POST',
                body: JSON.stringify({title:'',content: announce}),
                headers: {
                    'Content-Type':'application/json'
                }
            })
            res = await res.json();
            if (res.error) {
                setError(res.error);
            }
            else {
                setError(res.success);
                window.location.reload()
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <Navbar2 id={details.id}/>
            <Container className="mt-5">
                <Row >
                    <Col>
                        <div className="d-md-flex align-items-center justify-content-center">
                            <Jumbotron className="jumbo p-5 mt-4 col-md-9">
                                <h1>{details.classname}</h1>
                                <p>Join Code : {details.id}</p>
                                <p>Subject Code : {details.ClassCode}</p>
                                <p>Meet Link : <a href={`https://${details.link}`} target="_blank" style={{color:"white", textDecoration:"none"}}>https://{details.link}</a> </p>
                            </Jumbotron>
                        </div>
                        <div className="d-md-flex align-items-center justify-content-center">
                            <Jumbotron className="mt-4 announce col-sm-12 col-md-7" style={{cursor:"pointer"}}>
                                {expand ? 
                                    <div className="p-4">
                                        <Form>
                                            <Form.Group>
                                                <Form.Control as="textarea" rows={1} placeholder="Announce something to the class" style={{borderRadius:"20px"}} name='announce' value={announce} onChange={(e)=>{setAnnounce(e.target.value)}} />
                                            </Form.Group>
                                        </Form>
                                        <div className="mt-3 btns">
                                            <Button variant="outline-danger" className="btn-sm" onClick={() => { setExpand(false) }} >Cancel</Button>
                                            <p> {error} </p>
                                            <Button variant="outline-success" className="btn-sm" onClick={submitPost}>Submit</Button>
                                        </div>
                                    </div>
                                    :
                                    <div className="p-4" onClick={()=>{setExpand(true)}}>Announce something to the class</div>
                                    
                                }
                            </Jumbotron>
                        </div>
                        {posts.map((p, index) => {
                                return (
                                <div key={index} className="d-md-flex align-items-center justify-content-center">
                                    <Card className="mt-4 announcement col-sm-12 col-md-7">
                                        <Card.Body className="p-4">
                                            <Card.Title>
                                                <p> {p.author.name} </p>
                                                <p style={{fontSize:'0.8rem', position:'absolute', right: '1rem', top: '1rem'}}> {(p.updatedAt.split("T")[0])} </p>
                                            </Card.Title>
                                            <Card.Text>
                                                {p.content}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                                );
                            })}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default A_Class
