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
import { FaChalkboardTeacher } from 'react-icons/fa';
import { UserContext } from '../context/userContext';

import Navbar from './Navbar';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [c_password, setC_Password] = useState('');
    const [role, setRole] = useState('Student');

    const [loader, setLoader] = useState(false);
    const [err, setErr] = useState('');

    const [user, setUser] = useContext(UserContext);
    const hist = useHistory();

    const onChangeHandler = (e) => {
        switch (e.target.name) {
            case 'name':
                setName(e.target.value);
                break;
            case 'email':
                setEmail(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            case 'c_password':
                setC_Password(e.target.value);
                break;
            case 'role':
                console.log(e.target.value);
                setRole(e.target.value);
                break;
        }
    };

    const submitHandler = () => {
        if (!name || !email || !password || !c_password) {
            //empty field
            setErr('Empty field!');
        }
        if (password !== c_password) {
            //password does not match
            setErr('Password does not match!');
        } else {
            //if password matched
            fetchClassPosts().then((res) => {
                if (!res.error) {
                    setUser({
                        username: res.user.username,
                        email: res.user.email,
                        role: res.user.role,
                    });
                    hist.push('/');
                } else {
                    console.log(res);
                    setErr('Something went wrong!');
                }
            });
        }
    };

    const fetchClassPosts = async () => {
        let res = await fetch('/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                username: name,
                email: email,
                password: password,
                role: role,
            }),
        });
        res = await res.json();
        return res;
    };

    return (
        <>
            <Navbar />
            <Container className="p-5 p-md-0">
                <Row className="mt-5 justify-content-center align-content-center">
                    <Col
                        md="12"
                        xl="6"
                        className="mt-5 p-md-5 p-sm-5 mb-5 bg-white align-content-center justify-content-center form_bg"
                    >
                        <h3 className="mb-5 mt-4">Sign Up</h3>
                        <Form className="mb-5 ">
                            <Form.Group
                                as={Row}
                                className="mb-3 justify-content-center align-content-center"
                            >
                                <Form.Label column md="1" xs="1">
                                    <MdAccountBox
                                        style={{ fontSize: '20px' }}
                                    />
                                </Form.Label>
                                <Col md="8" xs="10">
                                    <Form.Control
                                        className="form_bg1"
                                        name="name"
                                        value={name}
                                        onChange={onChangeHandler}
                                        type="text"
                                        placeholder="Name"
                                        autoComplete="off"
                                    />
                                </Col>
                            </Form.Group>
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
                                className="mb-3 justify-content-center align-content-center"
                            >
                                <Form.Label column md="1" xs="1">
                                    <MdLock style={{ fontSize: '20px' }} />
                                </Form.Label>
                                <Col md="8" xs="10">
                                    <Form.Control
                                        className="form_bg1"
                                        name="c_password"
                                        value={c_password}
                                        onChange={onChangeHandler}
                                        type="password"
                                        placeholder="Confirm Password"
                                        autoComplete="off"
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="mb-3 justify-content-center align-content-center"
                            >
                                <Form.Label column md="1" xs="1">
                                    <FaChalkboardTeacher
                                        style={{ fontSize: '20px' }}
                                    />
                                </Form.Label>
                                <Col md="8" xs="10">
                                    <Form.Control
                                        as="select"
                                        name="role"
                                        onChange={onChangeHandler}
                                        className="form_bg1"
                                    >
                                        <option>Student</option>
                                        <option>Teacher</option>
                                    </Form.Control>
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
                                        Create Account
                                    </Button>
                                </Col>
                            </Form.Group>
                            <p className="mt-3 danger">{err}</p>
                        </Form>
                        <p>
                            <NavLink className="nav-link" to="/signin">
                                Already have an account? Sign in
                            </NavLink>
                        </p>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default SignUp;
