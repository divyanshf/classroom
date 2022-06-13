import React, { useState, useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {
    Col,
    Container,
    Row,
    Form,
    Button,
    Media,
    Image,
    Spinner,
} from 'react-bootstrap';
import { MdAccountBox, MdEmail, MdLock } from 'react-icons/md';

import { UserContext } from '../context/userContext';

import { FaChalkboardTeacher } from 'react-icons/fa';
import Navbar1 from './Navbar';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');

    const [loader, setLoader] = useState(false);

    const [user, setUser] = useContext(UserContext);
    const hist = useHistory();

    const onChangeHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmail(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
        }
    };

    const submitHandler = () => {
        if (!email || !password) {
            //empty field
            setErr('Empty field!');
        } else {
            //if password matched
            fetchClassPosts().then((res) => {
                console.log(res);
                if (!res.error) {
                    setUser({
                        email: res.user.email,
                        role: res.user.role,
                    });
                    hist.push('/');
                } else {
                    setErr('Something went wrong!');
                }
            });
        }
    };

    const fetchClassPosts = async () => {
        let res = await fetch('/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        res = await res.json();
        return res;
    };

    return (
        <>
            <Navbar1 />
            <Container className="p-5 p-md-0">
                <Row className="mt-5 justify-content-center align-content-center">
                    <Col
                        sm="12"
                        md="7"
                        xl="5"
                        className="mt-5 p-md-5 p-sm-5 mb-5 bg-white align-content-center justify-content-center form_bg"
                    >
                        <h3 className="mb-5 mt-4">Sign In</h3>
                        <Form className="mb-5">
                            <Form.Group
                                as={Row}
                                className="mb-3 justify-content-center align-content-center"
                            >
                                <Form.Label column md="1" xs="1">
                                    <MdEmail style={{ fontSize: '20px' }} />
                                </Form.Label>
                                <Col md="8" xs="10">
                                    <Form.Control
                                        className="form_bg1"
                                        name="email"
                                        value={email}
                                        onChange={onChangeHandler}
                                        type="email"
                                        placeholder="Enter email"
                                        autoComplete="off"
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="mb-3 justify-content-center align-content-center"
                            >
                                <Form.Label column md="1" xs="1">
                                    <MdLock style={{ fontSize: '20px' }} />
                                </Form.Label>
                                <Col md="8" xs="10">
                                    <Form.Control
                                        className="form_bg1"
                                        name="password"
                                        value={password}
                                        onChange={onChangeHandler}
                                        type="password"
                                        placeholder="Password"
                                        autoComplete="off"
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="mt-4 justify-content-center align-content-center"
                            >
                                <Col md="8" xs="10">
                                    <Button
                                        onClick={submitHandler}
                                        className="button"
                                    >
                                        Log In
                                    </Button>
                                </Col>
                            </Form.Group>
                            <p>{err}</p>
                        </Form>
                        <NavLink className="nav-link" to="/signup">
                            Don't have an Account? Sign up
                        </NavLink>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Signin;
