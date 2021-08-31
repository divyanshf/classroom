import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Jumbotron, Card,Form, Button } from 'react-bootstrap'
import Navbar2 from './Navbar2'
import { useParams } from 'react-router'

const A_Class = () => {
    const [expand,setExpand] = useState(false);
    const [posts, setPosts] = useState([]);
    const params = useParams();

    useEffect(() => {
        const fetchCls = async () => {
            let res = await fetch(`/class/${params.id}/posts`);
            res = res.json();
            return res;
        };

        fetchCls().then(res => {
            setPosts(res.posts)
        });
    }, [])

    return (
        <>
            <Navbar2 id={params.id}/>
            <Container className="mt-5">
                <Row >
                    <Col>
                        <div className="d-md-flex align-items-center justify-content-center">
                            <Jumbotron className="jumbo p-5 mt-4 col-md-9">
                                <h1>Subject Name</h1>
                                <p>Class_Code</p>
                                <p>Meet Link:  https://meet.google.com</p>
                            </Jumbotron>
                        </div>
                        <div className="d-md-flex align-items-center justify-content-center">
                            <Jumbotron className="mt-4 announce col-sm-12 col-md-7" style={{cursor:"pointer"}}>
                                {expand ? 
                                    <div className="p-4">
                                        <Form>
                                            <Form.Group>
                                                <Form.Control as="textarea" rows={1} placeholder="Announce something to the class" style={{borderRadius:"20px"}} />
                                            </Form.Group>
                                        </Form>
                                        <div className="mt-3 btns">
                                            <Button variant="outline-danger" className="btn-sm" onClick={()=>{setExpand(false)}} >Cancel</Button>
                                            <Button variant="outline-success" className="btn-sm">Submit</Button>
                                        </div>
                                    </div>
                                    :
                                    <div className="p-4" onClick={()=>{setExpand(true)}}>Announce something to the class</div>
                                    
                                }
                            </Jumbotron>
                        </div>
                            {posts.forEach(p => {
                                return (
                                <div className="d-md-flex align-items-center justify-content-center">
                                    <Card className="mt-4 announcement col-sm-12 col-md-7">
                                        <Card.Body className="p-4">
                                            <Card.Title>
                                                <p> {p.title} </p>
                                                <p> {p.updateAt} </p>
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
