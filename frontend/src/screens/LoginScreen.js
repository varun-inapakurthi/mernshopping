import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Button, Col, Form, Row } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userAction';
import Loader from '../components/loader';
import Message from '../components/message';
const LoginScreen = ({ location, history }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo, loading, error } = userLogin;
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, redirect, userInfo])
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }
    return (
        <FormContainer>
            <h1>Sing In</h1>
            {loading && <Loader />}
            {error && <Message variant='danger'>{error}</Message>}
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                            console.log(e.target.value)
                            setEmail(e.target.value)
                        }}
                    ></Form.Control>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type="submit">Sign In</Button>
                <Row className="py-3">
                    <Col>
                        New Customer?
                    < Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>Register</Link>
                    </Col>
                </Row>

            </Form>
        </FormContainer>
    );
}

export default LoginScreen;